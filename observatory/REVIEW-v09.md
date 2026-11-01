# 0.9 · V4 MoE通信计算开销：依据、公式与有限核查

核查日期：2026-10-31。本站没有连接GPU或运行DeepSeek，所有可调结果都是教学估算。以下只陈述已检查的配置、源码语义和模型约定，不保证未覆盖内容无误。

## 证据层次

| 类型 | 使用范围 | 依据 |
|---|---|---|
| 模型事实 | V4.1 Flash：D=5120，I=2304，384 routed experts选6，1 shared，routing scale=1.5，clamp=10 | [固定config 314113f](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/config.json#L22-L58) |
| 论文背景 | 模型与推理系统；不能证明本页双域部署的性能 | [V4.1技术报告v1](https://arxiv.org/html/2609.19969v1) |
| V4实现 | 路由、grouped GEMM、权重/clamp/cast与异步通信 | [DeepInfer 5537415 mlp.py L379–511](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L379-L511) |
| 融合/分解边界 | MegaMoE限于NVLink域；公开存在分解fallback，不能据此断言作者已实测跨域V4 | [MegaMoE条件](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L184-L188)；[分解路径](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L565-L616) |
| 资源竞争依据 | EPBuffer允许hybrid、通信占SM；本页预留比例是近似假设 | [userbuffer.py L63–91](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/parallel_utils/userbuffer.py#L63-L91) |
| 通信行为 | 按目标域/GPU去重；域内转发；选择层次预归约 | [DeepEP V2.5 f6aa38f dispatch L390–451](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L390-L451)；[域内转发 L551–625](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L551-L625)；[combine L454–565](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_combine.cuh#L454-L565) |

V4 wrapper返回idx、weights，和旧V3 reference Gate的次序分开。权重在专家侧应用一次，combine不再次乘权。DeepEP V2.5使用Gin并占SM，不能套用旧V1低延迟路径的“零SM”描述。[固定示例与异步重叠约定](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/README.md#example-use-in-model-training-and-inference)

## 教学实验定义

Batch是A0发出的总token数，不是每GPU batch或用户并发。仅研究一个MoE层的routed分支。V4的EP16、两域各8GPU、每GPU静态24专家、A0/B0转发、固定路由与有效速率都是实验假设；不据此判断全模型容量或生产拓扑。V4没有沿用V3的最多四组限制。V3对照保留EP64映射，本次只向展示的A/B两节点路由；负载均值统一以展示的16GPU计算。

生成器按基础预设轮换目标GPU和本地expert offset。热点比例按确定性配额选择token，再将同目标域的指派集中到少量GPU，保持每token专家唯一及目标域的指派数量。它没有运行真实gate、EPLB或复制专家权重。热点既可能减小去重后的通信份数，也会增大最慢GPU的计算量。

每个分块逐token计数：

- RDMA dispatch每个有远端目标的token一份；combine在层次预归约假设下返回一个节点贡献。
- A域通信按不同目标GPU计数，排除源A0；B域排除入口B0，同GPU多个专家复用激活。
- dispatch FP8数据为D byte，BF16为2D byte；combine固定BF16为2D byte。V4分别5 KiB和10 KiB。
- 专家三次矩阵乘按6DI FLOP/expert-token：V4为70,778,880 FLOP，batch总量为B×6×6DI。shared、激活和其他工作另行排除。

## 时间与资源约定

单位：GB/s=10^9 byte/s，TFLOP/s=10^12 FLOP/s，时间以μs表示。因此通信服务时间为latency + byte/(GB/s×1000)，GPU服务时间为launch + FLOP/(TFLOP/s×10^6)。400 Gb/s÷8=50 GB/s只是原始线速换算。

资源池有两域NVLink预算、RDMA TX/RX两个方向、16个GPU计算池。一个NVLink域双向共享预算，两个RDMA方向可独立服务。有效带宽是可输入的聚合预算，不能解释为某代链路峰值。每GPU串行处理自己的分块，GPU之间并行。

每块DAG保留：远端RDMA dispatch→B域扇出→B专家计算→B域归约→RDMA返回；A专家等待其输入后计算→A域返回。A0/B0本地复用不添加不必要域内复制。本地与远端独立分支、不同分块可重叠；没有让专家越过dispatch依赖。

固定优先规则选择最早可开始任务，开始时间取依赖完成与资源可用的最大值；不是最优调度或周期精确硬件模拟。串行参考逐块完成分发、并行GPU计算、返回后再处理下一块。流水有效TF=输入TF×(1−通信预留比例)，串行参考不扣此项；因此重叠可能更慢，页面如实保留该结果。实际SM、HBM争用没有被求解。

诊断固定同一路由和工作量，将NVLink带宽、RDMA带宽或专家有效算力单独翻倍，并对比启动开销减半，比较所选模式的完工时间。列出全部敏感性；关键路径上启动延迟占主导（>50%）时明确提示启动开销主导，避免误归因；最大带宽/算力收益不足1%时诊断为limited。结果不是硬件认证，启动与调度也可能主导。

手算检查点：V4 mixed，B=1、chunk=1，FP8，NVLink/RDMA各100 GB/s、有效算力100 TFLOP/s，启动与预留均0；RDMA dispatch=5120 byte、combine=10240 byte。串行参考1.6293888 μs，流水1.3221888 μs。该例一个分块仍有独立本地/远端分支重叠。

省略：gate、pack、scale（V4 `1×32` UE8M0或DeepEP `1×128` FP32均为160 B/份，约占5120 B净载荷的3.125%，页面已提供量化参照但未并入D字节净载荷主公式以保持手算检查点精确）、padding、协议头/ACK/重传、拥塞、buffer限制、PCIe/GPU–NIC/HBM分项、权重内存、真实GEMM效率曲线、shared expert、attention、残差、激活/clamp/cast。输入有效速率允许以后校准，本版未校准。

## 作者测量单独展示

[DeepInfer固定性能章节](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/README.md#performance-benchmarks)报告prefill 4×SM100和decode 64×SM100，各自在单一scale-up域。它们是推理曲线，不是本页跨节点单层MoE时间；本轮没有取得可直接对齐的V4跨域单层测量点。

历史DeepEP V1固定77bb07a、2025-02-27，H800，每GPU CX7 IB400Gb/s，4096 token每rank，hidden7168、top8、最多四组，FP8 dispatch/BF16 combine。8GPU域内作者带宽153/158 GB/s，16GPU跨节点43/43 GB/s。[作者表](https://github.com/deepseek-ai/DeepEP/blob/77bb07aa20c62c76b1f2b4859dd4670e3e024169/README.md#L11-L22)与[统计代码](https://github.com/deepseek-ai/DeepEP/blob/77bb07aa20c62c76b1f2b4859dd4670e3e024169/tests/test_internode.py#L159-L186)按逻辑载荷/内核时间计算，旧FP8计入每128元素一个FP32 scale修正，不是线上完整物理流量或系统聚合。它不是V4、V2.5或本站实测，且未回填本页输入。

## 已做的有限检查

自动检查覆盖32组profile/路由/精度/热点组合、逐token专家唯一性、全局/每GPU计数、精确载荷和FLOP、依赖完成、同资源排他、关键路径时长与双域泳道可见性、手算检查点、热点、延迟、教学预设和启动主导判定、URL边界；另做288组路由/DAG参数审查。浏览器检查覆盖桌面、窄屏、参数输入、模块展开、时间条键盘操作与旧播放器。既有章节的语法、矩阵、文献、原图资产检查保留。

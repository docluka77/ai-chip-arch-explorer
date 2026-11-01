# 0.8 · MoE双域拓扑依据与核查范围

复核：2026-10-31。原资料快照与已有页面保留。本轮没有运行DeepEP、GPU内核或真实RNIC trace。

## 为什么选V3

DeepSeek-V3报告公开了跨节点中转与域内转发的关系，适合解释scale-up/out。本页不是既有V4.1/SM100案例的硬件配置延伸，也不把V3 reference实现冒称为直接调用DeepEP。通信机制同时对照固定DeepEP V2.5源码，两个版本的证据身份分开。

- [V3报告v2 §3.2.2](https://arxiv.org/html/2412.19437v2#S3.SS2.SSS2)：IB先到目标节点同in-node index GPU，再经NVLink分发；combine反向转发与累加。
- [V3固定配置](https://github.com/deepseek-ai/DeepSeek-V3/blob/9b4e9788e4a3a731f7567338ed15d3ec549ce03b/inference/configs/config_671B.json)：7168维、256 routed、top8、1 shared、route_scale2.5。
- [V3固定Gate/MoE](https://github.com/deepseek-ai/DeepSeek-V3/blob/9b4e9788e4a3a731f7567338ed15d3ec549ce03b/inference/model.py#L560-L693)：Gate返回weights在前、indices在后；专家输出与有效路由权重语义。

## 固定通信源码

DeepEP固定为f6aa38fe06cd4a0489e7730365d4e0114970a2f3（V2.5 / NCCL Gin）。所选模式显式启用allow_hybrid_mode与allow_multiple_reduction，不能把此配置的份数泛化为所有传输模式。

- [跨域去重L390–451](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L390-L451)。
- [域内转发及回程元数据L551–625](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L551-L625)。
- [combine分层归约分支L454–565](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/include/deep_ep/impls/ep/hybrid_combine.cuh#L454-L565)。
- [配置L210–279](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/buffers/ep.py#L210-L279)、[dispatch与事件L562–637](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/buffers/ep.py#L562-L637)、[combine接口L770–811](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/deep_ep/buffers/ep.py#L770-L811)。
- [expanded布局示例](https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/README.md#example-use-in-model-training-and-inference)：专家计算应用有效权重后，combine仅求和，不再乘权。
- [GPUDirect顺序规则](https://docs.nvidia.com/cuda/gpudirect-rdma/#synchronization-and-memory-ordering)：源端完成不等价于远端GPU消费。

## 教学假设

- 采用EP64/8节点的逻辑组织，展开A/B各8GPU，其他6节点本次token未选、未展开。每GPU连续4专家是人为映射，未取生产路由日志。
- 四组选择均8个唯一专家，只涉及1–2个路由组，满足最多4组限制。切换控件改变路由选择，不表示迁移专家。
- B0是A0对应的同local-index入口；在mixed预设中没有目标专家，仍负责RDMA↔NVLink转发。
- 二维专家输出按expert ID固定生成，只用于手算；真实维度7168。示例有效权重为人为比例乘2.5，不是模型输出。shared放在A0仅为公式切面，残差和attention未展开。
- FP8净数据为7168 byte，scale另计；BF16为14336 byte。combine固定BF16。净载荷比较省略元数据、padding、协议、重传及物理内存读写，不推导真实线速或时延。
- 预归约由GPU通信内核执行，不假定NVLink交换机执行任意算术。多级归约可能改变浮点求和顺序，二维数值忽略舍入。
- V3原报告使用IB；图中的跨域网络写明RDMA/IB，没有改称原系统使用RoCE。V2.5的能力与原报告运行环境分别核对。

## 验证

脚本检查4种分布×2精度×12步：专家映射、路由组约束、权重和、局部/远端贡献守恒、payload份数、正反箭头、URL状态与异常输入边界。既有算子、90条文献、原图与数值检查继续通过。

浏览器逐一查看四种分布的十二步、两种精度的代码/载荷同步与模块弹窗；图中文字位于各自模块内。布局与动画属于教学表达，不能作为真实设备性能或实现符合性认证。

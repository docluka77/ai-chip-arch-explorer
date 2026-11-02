# 现代 AI 芯片架构观察室 0.9.4

0.9.4：重构芯片微架构深层钻取体系（L0 GPU → L1 GPC → L2 TPC → L3 SM → L4 SM 子分区 → L5 矩阵运算），加入面包屑导航与硬件物理尺度比例标签；全量支持Prefill（算力吞吐受限）与Decode（显存带宽受限）两阶段动态响应式机理解释与SVG阶段徽章；4×4矩阵教学沙盘与画布动态联动；彻底消除遗留的高对比深绿黑配色并修复文字排版与缩放截断；严格遵守GB202完整模板与零售RTX 5090（170 SM / 96 MB L2）的硬件真实边界。

0.9.3：精炼12步MoE架构表述、二维加权守恒台账与双域拓扑美术细节——升级双域容器角色徽章（`SOURCE · A0 发起` / `REMOTE · B0 中转`）、NVLink互连条职责副标题、中央阶段方向指示、右侧二维加权守恒台账（`z_A` / `z_B` / `routed` / `shared`）与展开表四列守恒汇总；敏感性诊断同步显示新完工时间（`μs`）与相对降幅（`%`）；全面润色12步分镜说明、6类模块弹窗、五条建模规范与历史测量口径对照列。

0.9.2：升级V4开销实验与双域拓扑的视觉层级和数据真实性——时间图内置启动开销分段、分块标签（`c0`..`cN`）、关键路径与阻塞源虚线连接、每泳道累计忙时与占比；关键路径构成增加比例堆叠条与计算被通信流水掩盖说明，量化去重节省比例与FP8 scale附加字节；双域拓扑卡片同时显示`t0`单token职责（`仅中转`/`选N专家`）与整批指派数，补全100%热点时`t0`重路由说明。

0.9：默认使用DeepSeek-V4.1 Flash，新增多token/分块、专家热点比例、有效NVLink/RDMA带宽与启动延迟、专家有效算力和通信预留。资源约束时间图、16GPU负载和单项翻倍敏感性联动；保留t0单步拓扑与V3对照。配置事实、用户假设、教学估算、历史作者测量分别标识。

0.8：07的Scale-up/out新增DeepSeek-V3 MoE双域交互拓扑，12步dispatch→专家计算→combine，支持播放/暂停、前后单步、模块展开、4种路由分布、FP8/BF16逻辑载荷和URL恢复。依据V3技术报告与固定DeepEP V2.5源码，区别既有V4.1/SM100算子案例。

0.7：统一浅色阅读界面、增强字号与视觉主次。RDMA首页增加七步张量旅程，可播放、暂停、前后单步、切换数据/控制视角、打开模块与恢复分享位置。新增可追溯的关键表述核查记录，细化SRNIC数字测试条件，补全真实SwiGLU调用的裁剪、路由权重与cast边界。

从官方原图，逐层拆到计算单元内部。原仓库的 CNN / MAESTRO 页面继续保留在根目录，本目录提供新的独立界面。

在线入口：[芯片架构观察室](https://docluka77.github.io/ai-chip-arch-explorer/observatory/)。直接打开本目录 index.html 也能阅读，不需要安装或构建。官方远程图片与资料链接需要联网。

新增：[07 RDMA与集群互连](https://docluka77.github.io/ai-chip-arch-explorer/observatory/?v=0.9.4#rdma) · 4张原论文图、6组图解模型，90条阅读文献、八条路线，SRNIC模块，有损/乱序，scale-up/out与开销实验。

新入口：[算子执行显微镜](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#operator)。克隆仓库后，在本目录运行 `node scripts/serve.mjs` 预览，运行 `node scripts/check-all.mjs` 核对语法、矩阵结果、形状/数据格式和来源契约；不需要安装依赖。

## 阅读顺序

1. 从原图拆芯片：切换官方图并放大；推荐按RTX Blackwell的GPU → GPC → TPC → SM → 子分区逐层进入。
2. 算子执行显微镜（02下方入口）：Python → CUDA → TMA → SMEM → Tensor Core / TMEM → 写回，15步暂停/单步，点击模块展开；从PE阵列到GPU复用，以及集群网络四条路径。
3. DeepSeek怎么跑：V4.1 Flash的真实40层配置、CSA2共享、MoE路由教学、DeepInfer执行与开源边界。
4. 瓶颈实验：保留可编辑的Dense Decode简化模型，不将它套到复杂MoE模型。
5. 看懂设计差异：先讲三个问题，完整技术表折叠在后面。
6. 原始资料：161份资料及具体证据边界。
7. 我的笔记：当前浏览器保存，可备份迁移。
8. 07 RDMA与集群互连：文章/产品边界、RC WRITE动画、SRNIC、丢包与乱序例子、scale-up/out、开销模型、90条精选文献。

公式与有限核查范围：[0.9核查记录](REVIEW-v09.md)。

## 继续修改

- moe-cost-model.js：可复现路由、载荷计数、资源约束DAG和敏感性。
- moe-cost.js / moe-cost.css：可调假设、时间图、负载与分开的作者测量。
- moe-topology-data.js / moe-topology.js：V4/V3配置、固定证据、t0拓扑与暂停/单步。
- data.js：初版芯片条目。
- research-data.js：原图、资料版本、DeepSeek官方配置和40层共享关系。
- layers.js：多层微架构重绘、原图查看、矩阵教学。
- case-study.js：DeepSeek / DeepInfer案例。
- operator-data.js / operator-provenance.js：算子阶段、数学沙盘、固定代码的形状/数据格式/tile契约与来源。
- operator.js：播放状态、暂停/单步、动态图和模块弹层；operator-context.js：复用与网络故事。
- operator.css：显微镜排版与手机阅读。
- rdma-data.js：RDMA依赖、模块、丢包教学和单位明确的开销公式。
- rdma-evidence.js：22篇论文的作者/机制/实验/图页，以及官方标准与产品公开边界。
- rdma-library-data.js：90条阅读记录、13专题、8条路线和55条新增唯一来源，原有来源升级为阅读卡时复用。
- rdma-library.js / rdma-library.css：目录、组合筛选、分类与证据范围展示；分享链接保存筛选状态。
- rdma-visuals.js / rdma-visuals.css：按文档流布局的架构模型、原图与放大查看。
- rdma.js / rdma.css：07专题交互、动画、筛选阅读、开销实验及响应布局。
- app.js：应用交互、对照、实验、笔记、深链接。
- theme.css / responsive.css：新版浅色主题、大字号及手机阅读。

旧观察室0.1完整保存在 [archive/v01/index.html](archive/v01/index.html)。

## 不应混淆的边界

完整GB202为192SM，RTX5090启用170SM；数据中心SM100与消费级GB202也不同。矩阵4×4沙盘是数学教学，不是厂商未披露的物理PE布线。

真武M890已有技术文档；V900另分代。MI455X封装渲染、HC1板卡照片与真正内部框图分别标注；ByteDance暂无核实到的官方内部图。

DeepInfer是推理软件而非芯片。模型结构、软件引擎、硬件映射分开；浏览器不运行模型。厂商生产系统全图并不等于完整在线服务已经开源。

资料快照：2026-10-30；本轮重点复核：2026-10-31，未连接自动抓取更新。

## 许可

原创代码与表达保留所有权利，公开可读，复用须获授权；不是开源许可证。第三方官方图、字体及软件许可独立适用，不纳入本项目独占权利。

详见 [LICENSE](LICENSE)、[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。Noto Sans SC字体采用SIL OFL，许可位于assets/fonts/OFL.txt。

### 0.7 核查范围

重点复核RDMA WRITE/CQE/GPU可见性、RoCE/iWARP协议分层、SRNIC状态/资源/实验口径、scale-up/out边界、NVIDIA GB202与SM100/SM120区别、DeepSeek专家GEMM与后续激活、早期加速器职责类比。未逐句审读90篇全文，未做真实设备符合性测试。资料快照与复核日期分开记录，不能把今天复核解释为所有产品数据都在今天更新。

### 0.8 MoE拓扑

- 展开EP64中的A/B两个8GPU节点，其他6节点本token未选、未展开；专家编号与路由为人为教学映射。
- 域内NVLink、GPU–NIC路径、跨节点RDMA（本例IB）分别画。B0即使没有目标expert，也承担转发。
- 明确选择hybrid与allow_multiple_reduction=True；专家侧一次应用有效路由权重，combine只求和。
- FP8 dispatch原始向量7KiB，BF16为14KiB；combine固定BF16。净载荷计数不等于线速、包数或实测时延。
- 4种分布×2种精度×12步模型检查，验证映射、最多4组、权重守恒、回程箭头和分享状态。
- [本轮依据与核查边界](REVIEW-v08.md)。未运行DeepEP或真实设备trace。

# 现代 AI 芯片架构观察室 0.7

0.7：统一浅色阅读界面、增强字号与视觉主次。RDMA首页增加七步张量旅程，可播放、暂停、前后单步、切换数据/控制视角、打开模块与恢复分享位置。新增可追溯的关键表述核查记录，细化SRNIC数字测试条件，补全真实SwiGLU调用的裁剪、路由权重与cast边界。

从官方原图，逐层拆到计算单元内部。原仓库的 CNN / MAESTRO 页面继续保留在根目录，本目录提供新的独立界面。

在线入口：[芯片架构观察室](https://docluka77.github.io/ai-chip-arch-explorer/observatory/)。直接打开本目录 index.html 也能阅读，不需要安装或构建。官方远程图片与资料链接需要联网。

新增：[07 RDMA与集群互连](https://docluka77.github.io/ai-chip-arch-explorer/observatory/?v=0.7#rdma) · 4张原论文图、6组图解模型，90条阅读文献、八条路线，SRNIC模块，有损/乱序，scale-up/out与开销实验。

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

## 继续修改

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

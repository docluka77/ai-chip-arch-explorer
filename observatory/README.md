# 现代 AI 芯片架构观察室 v0.9.4 (AI Chip Observatory)

从官方原图出发，逐层拆解到计算单元与集群网络内部。本目录为项目的 **网页 02（现代 AI 芯片架构观察室）**；项目根目录保留 **网页 01（经典 CNN 加速器与 MAESTRO 空间探索器）**。

---

## 🚀 核心在线入口与直达链接

- **网页 02 主入口（当前目录）**：**[芯片架构观察室 v0.9.4](https://docluka77.github.io/ai-chip-arch-explorer/observatory/)**
  - **[01 从原图拆芯片 (`#explore`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#explore)** — 10 款现代芯片官方原图 + `L0 GPU → L1 GPC → L2 TPC → L3 SM → L4 子分区 → L5 4×4 矩阵沙盘` 逐层钻取
  - **[02 DeepSeek 怎么跑 (`#case`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#case)** — DeepSeek-V4.1 Flash 40 层真实配置、CSA2 共享、MoE 路由与开源边界
  - **[↳ 算子执行显微镜 (`#operator`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#operator)** — SM100 上 `Python → CUDA → TMA → SMEM → Tensor Core / TMEM → SwiGLU` 15 步单步追踪
  - **[03 瓶颈实验 (`#lab`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#lab)** & **[04 看懂设计差异 (`#compare`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#compare)** — Dense Decode 算术强度实验与跨芯片三核心问题对照
  - **[05 原始资料 (`#sources`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#sources)** & **[06 我的笔记 (`#notes`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#notes)** — 161 份权威资料证据边界与浏览器本地笔记
  - **[07 RDMA 与集群互连 (`#rdma`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/?v=0.9.4#rdma)** — RC WRITE 7 步张量旅程、SRNIC 模块、丢包/乱序、DeepSeek EP64 双域 MoE 12 步拓扑与开销实验、90 条精选文献
- **网页 01 主入口（根目录）**：**[经典 AI 加速器与 MAESTRO 空间探索器](https://docluka77.github.io/ai-chip-arch-explorer/)**（Eyeriss / ShiDianNao / NVDLA / Transformer 映射 / MAESTRO DSE）
- **历史初版归档**：**[观察室 0.1 初版](archive/v01/index.html)**

> 直接用浏览器打开本目录 `index.html` 即可阅读，无需安装或构建。克隆仓库后，可在本目录运行 `node scripts/serve.mjs` 启动本地预览，运行 `node scripts/check-all.mjs` 执行全套自动化核查（语法、矩阵结果、形状/数据格式、MoE 守恒台账与来源契约）。

---

## 🧭 推荐阅读顺序

1. **从原图拆芯片 (`#explore`)**：切换官方原图并放大；推荐按 RTX Blackwell 的 `GPU → GPC → TPC → SM → 子分区 → 矩阵运算` 逐层进入，支持切换 Prefill（算力吞吐受限）与 Decode（显存带宽受限）动态机理解释。
2. **算子执行显微镜 (`#operator`)**：15 步暂停/单步，点击任意硬件模块展开详情；串联从经典 PE 阵列到现代 GPU Tensor Core 复用，以及集群网络四条通信路径。
3. **DeepSeek 怎么跑 (`#case`)**：V4.1 Flash 的真实 40 层配置、CSA2 共享、MoE 路由教学、DeepInfer 执行与开源边界。
4. **瓶颈实验 (`#lab`) & 看懂设计差异 (`#compare`)**：保留可编辑的 Dense Decode 简化模型；先讲三个核心架构问题，完整技术参数表折叠在后。
5. **07 RDMA 与集群互连 (`#rdma`)**：论文/产品边界、RC WRITE 7 步动画、SRNIC、丢包与乱序例子、Scale-up/out 12 步 MoE 双域拓扑、资源约束开销模型与 90 条精选文献。
6. **原始资料 (`#sources`) & 我的笔记 (`#notes`)**：161 份资料及具体证据边界；当前浏览器本地保存笔记并支持 JSON 备份迁移。

---

## ⚠️ 不应混淆的事实与建模边界

- **硬件规格边界**：完整 GB202 为 192 SM，零售 RTX 5090 启用 170 SM / 96 MB L2；数据中心 SM100 与消费级 GB202 (SM120) 架构不同。矩阵 4×4 沙盘是数学教学，不是厂商未披露的物理 PE 布线。
- **国产与前沿芯片图件边界**：真武 PPU 890 已有技术文档，V900 另分代；MI455X 封装渲染、HC1 板卡照片与真正内部框图分别标注；ByteDance 暂无核实到的官方内部微架构图。
- **软件与系统边界**：DeepInfer 是推理软件而非芯片。模型结构、软件引擎、硬件映射分开标示；浏览器不运行真实大模型。
- **MoE 拓扑与开销实验边界**：
  - 展开 EP64 中的 A / B 两个 8-GPU 节点（其余 6 节点本 token 未选中、未展开）；域内 NVLink、GPU–NIC 路径、跨节点 RDMA 分别绘制，B0 即使无目标专家也承担跨节点转发。
  - 配置事实、用户可调假设、教学估算、历史作者测量四类口径分开标识。详见核查记录：[`REVIEW-v09.md`](REVIEW-v09.md)、[`REVIEW-v08.md`](REVIEW-v08.md)、[`REVIEW-v07.md`](REVIEW-v07.md)。
- **资料快照日期**：`2026-10-30`；重点复核日期：`2026-11-01`（静态快照，未连接自动抓取更新）。

---

## 🛠️ 核心代码模块索引

- `data.js` / `research-data.js`：10 款芯片条目、161 份权威资料版本、官方原图与 DeepSeek-V4.1 40 层共享配置。
- `layers.js`：L0–L5 多层微架构重绘、原图查看、Prefill/Decode 阶段响应与 4×4 矩阵教学沙盘。
- `case-study.js`：DeepSeek / DeepInfer 推理案例。
- `operator-data.js` / `operator-provenance.js` / `operator-context.js` / `operator.js`：SM100 算子阶段、数学沙盘、形状/数据格式/tile 契约、15 步播放器与复用/网络故事。
- `rdma-data.js` / `rdma-evidence.js` / `rdma-story.js` / `rdma-visuals.js` / `rdma.js`：RDMA 7 步张量旅程、22 篇核心论文拆解、SRNIC 模块、丢包/乱序模型与开销公式。
- `rdma-library-data.js` / `rdma-library.js`：90 条文献阅读卡、13 专题、8 条路线与组合筛选。
- `moe-topology-data.js` / `moe-topology.js` / `moe-cost-model.js` / `moe-cost.js`：DeepSeek V4/V3 双域 12 步拓扑、二维加权守恒台账、可复现路由、资源约束 DAG 时间图与敏感性诊断。
- `app.js` / `experience.js` / `review-ledger.js`：主导航、对照、瓶颈实验、本地笔记、URL 深链接状态恢复与核查台账。

---

## 📜 版本演进摘要

- **v0.9.4**：重构芯片微架构 6 层钻取体系（L0 GPU → L5 矩阵运算），加入面包屑导航与硬件物理尺度标签；全量支持 Prefill 与 Decode 两阶段动态机理解释与 SVG 徽章；4×4 矩阵沙盘与画布动态联动；严格对齐 GB202 完整模板与零售 RTX 5090（170 SM / 96 MB L2）边界。
- **v0.9.3**：精炼 12 步 MoE 架构表述、二维加权守恒台账（`z_A` / `z_B` / `routed` / `shared`）与双域容器角色徽章；敏感性诊断同步显示新完工时间（`μs`）与相对降幅（`%`）。
- **v0.9.2 / v0.9**：默认使用 DeepSeek-V4.1 Flash，新增多 token 分块（`c0`..`cN`）、专家热点比例、有效 NVLink/RDMA 带宽与启动延迟、资源约束时间图、关键路径堆叠条与 16-GPU 负载联动。
- **v0.8 / v0.7**：新增 DeepSeek-V3/V4 EP64 双域 12 步交互拓扑、RDMA 首页 7 步张量旅程、统一浅色高可读性主题与核查台账（完整记录见 [`CHANGELOG.md`](CHANGELOG.md)）。

---

## 📄 许可说明

原创代码与表达保留所有权利，公开可读，复用须获授权；不是开源许可证。第三方官方图、字体及软件许可独立适用，不纳入本项目独占权利。详见 [`LICENSE`](LICENSE)、[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)（Noto Sans SC 字体采用 SIL OFL，位于 `assets/fonts/OFL.txt`）。

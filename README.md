# AI 芯片架构探索与观察室 (AI Chip Architecture Explorer)

本仓库包含 **两个独立的纯前端交互式可视化网页**（零构建依赖，支持在线直接访问或本地打开），覆盖从 **经典 DNN 空间/流水线加速器与 MAESTRO 数据流建模** 到 **现代大模型芯片（Blackwell / TPU / Groq / 昇腾等）、DeepSeek 算子显微镜与 RDMA 万卡互连集群** 的完整演进脉络。

---

## 🚀 核心在线展示直达 (Core Showcase Links)

| 网页应用 | 在线主入口 | 核心展示模块一键直达 |
| :--- | :--- | :--- |
| **网页 01**<br>**经典加速器与 MAESTRO 空间探索器**<br>(`index.html`) | **[🔗 打开网页 01 主界面](https://docluka77.github.io/ai-chip-arch-explorer/)** | • **[01 架构拓扑与周期级数据流仿真 (`#explorer`)](https://docluka77.github.io/ai-chip-arch-explorer/#explorer)**（Eyeriss / ShiDianNao / NVDLA）<br>• **[02 横向对比与 CNN 算力映射器 (`#compare`)](https://docluka77.github.io/ai-chip-arch-explorer/#compare)**（五维雷达图 + Workload Mapper）<br>• **[03 Transformer 适配与瓶颈沙盘 (`#transformer`)](https://docluka77.github.io/ai-chip-arch-explorer/#transformer)**（6 大算子映射 + Prefill/Decode 压力）<br>• **[04 MAESTRO 指令与硬件 DSE (`#maestro`)](https://docluka77.github.io/ai-chip-arch-explorer/#maestro)**（`.m` DSL 解析 + YR-P / YX-P / KC-P 探索） |
| **网页 02**<br>**现代 AI 芯片架构观察室 v0.9.4**<br>(`observatory/index.html`) | **[🔗 打开网页 02 观察室](https://docluka77.github.io/ai-chip-arch-explorer/observatory/)** | • **[01 从原图拆 10 款现代芯片 (`#explore`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#explore)**（GPU → GPC → TPC → SM → 子分区 → 4×4 矩阵沙盘）<br>• **[02 DeepSeek 怎么跑 (`#case`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#case)**（DeepSeek-V4.1 Flash 40 层配置、CSA2 共享与 MoE 路由）<br>• **[↳ SM100 算子执行显微镜 (`#operator`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#operator)**（Python → TMA → SMEM → Tensor Core / TMEM → SwiGLU 15 步追踪）<br>• **[07 RDMA 与集群互连实验室 (`#rdma`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#rdma)**（RC WRITE 7 步旅程、SRNIC、EP64 双域 MoE 12 步拓扑与通信开销实验、90 篇文献库）<br>• **[03 瓶颈实验 (`#lab`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#lab)** · **[04 看懂设计差异 (`#compare`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#compare)** · **[05 161份原始资料 (`#sources`)](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#sources)** |

---

## 🧭 两个网页的内容定位与核心功能

### 网页 01：经典加速器与 MAESTRO 空间探索器 ([`index.html`](index.html))
**核心问题**：经典空间/流水线加速器如何通过片上存储层次与互连网络压榨局部复用？当它们遇上 Transformer 时，数据流冲突在哪、硬件利用率掉多少？

1. **架构拓扑与周期级数据流仿真 (`#explorer`)**
   - 交互式芯片顶层结构与微架构检视器：**Eyeriss**（MIT，Row-Stationary + GIN/LN 双层网络 + RLC 游程压缩）、**ShiDianNao**（中科院计算所，Output-Stationary 8×8 2D 网格移位 + 全片上 NBin/NBout/SB）、**NVDLA**（NVIDIA，CONV / SDP / PDP / CDP / RUBIK 模块化流水线）。
   - 6 拍周期级 PE 阵列交互仿真（支持自动播放、前后单步与 `T0`–`T5` 周期直达）。
2. **横向对比与算力映射器 (`#compare`)**
   - 五维架构能力雷达图、实时计算利用率的 CNN Workload Mapper（可调 `Cin` / `Kout` / `R×S`）与全维参数对照表。
3. **Transformer 适配分析 (`#transformer`)**
   - 6 个核心算子阶段（QKV 投影、$Q\times K^T$、Softmax、$P\times V$ 与 KV Cache、LayerNorm、FFN+GELU）在三款硬件上的映射路径与瓶颈拆解，以及 Prefill vs. Decode 阶段压力仿真。
4. **MAESTRO 数据中心指令与硬件 DSE (`#maestro`)**
   - 解析 `SpatialMap` / `TemporalMap` / `Cluster` 指令，推导 `YR-P`、`YX-P`、`KC-P` 与自适应数据流的四维复用；四参数硬件 DSE 仿真器实时评估利用率、延迟、CACTI 能耗拆解与 NoC 带宽屋顶线。

---

### 网页 02：现代 AI 芯片架构观察室 v0.9.4 ([`observatory/index.html`](observatory/index.html))
**核心问题**：沿着一个 Token 的执行路径，现代 GPU、DSA 与万卡集群如何协同完成大模型 Prefill / Decode 与跨节点 MoE 专家并行？

1. **01 从原图拆芯片 (`#explore`)**：收录 NVIDIA RTX Blackwell (GB202)、B200 (SM100)、Google TPU v5p/Trillium、Groq LPU、Taalas HC1、AMD MI455X、华为昇腾 910B/C、阿里真武 PPU 890、百度昆仑芯 P800、字节自研芯片共 10 款架构；支持 L0→L5 六层钻取、Prefill/Decode 双阶段切换与 4×4 矩阵教学沙盘。
2. **02 DeepSeek 怎么跑 (`#case`) & 算子执行显微镜 (`#operator`)**：基于 DeepSeek-V4.1 Flash 真实 40 层配置解析 CSA2 KV 共享与 MoE 路由；在 SM100 上以 15 步单步显微镜跟踪 `Python → CUDA → TMA → SMEM → Tensor Core / TMEM → SwiGLU`。
3. **03 瓶颈实验 (`#lab`) & 04 看懂设计差异 (`#compare`)**：可调 Batch 与精度的算术强度实验、三核心问题对比与完整技术参数表。
4. **05 原始资料 (`#sources`) & 06 我的笔记 (`#notes`)**：161 份可溯源权威资料（明确区分配置事实、教学估算与证据边界）及浏览器本地研究笔记导出/导入。
5. **07 RDMA 与集群互连 (`#rdma`)**：
   - **RC RDMA WRITE 7 步张量旅程**（支持数据/控制视角切换与模块拆解）。
   - **阿里云 SRNIC 架构、丢包/乱序恢复机制**与 4 张原论文图、6 组架构图解模型。
   - **DeepSeek EP64 双域 MoE 12 步交互拓扑**（`dispatch → 专家计算 → combine`）与 **多参数资源约束通信开销实验室**（分块流水、热点偏斜、NVLink/RDMA 带宽与启动延迟敏感性诊断）。
   - **90 条精选网络与系统论文阅读库**（支持按 13 个专题与 8 条阅读路线组合筛选）。

---

## 📁 仓库结构与本地预览

```text
ai-chip-arch-explorer/
├── index.html                  # 网页 01：经典 DNN 加速器、Transformer 映射与 MAESTRO 空间探索器
├── README.md                   # 项目总览与双网页核心展示链接索引
└── observatory/                # 网页 02：现代 AI 芯片架构观察室 v0.9.4
    ├── index.html              # 观察室主入口
    ├── README.md               # 观察室详细模块说明与版本核查边界
    ├── app.js / layers.js / ...# 架构拆解、DeepSeek 案例、SM100 算子显微镜、RDMA 与 MoE 引擎
    ├── archive/v01/index.html  # 观察室 0.1 历史初版归档
    └── scripts/                # 本地静态预览服务 (serve.mjs) 与自动化校验套件 (check-all.mjs)
```

### 本地运行与自动化校验
两个网页均为纯前端静态页面，可直接用浏览器打开 `index.html` 或 `observatory/index.html`。若需在本地启动 HTTP 服务或运行观察室的数据与契约自检（无需 `npm install`）：

```bash
# 启动本地静态服务器预览观察室
node observatory/scripts/serve.mjs

# 运行全部语法、矩阵计算、MoE 守恒台账、RDMA 文献与分享状态边界校验
node observatory/scripts/check-all.mjs
```

---

## 📚 核心参考与许可说明

- **经典架构与建模**：Eyeriss (ISCA'16 / JSSC'17) · ShiDianNao (ISCA'15) · NVIDIA NVDLA Hardware Spec · MAESTRO (MICRO'19)
- **现代芯片与集群系统**：NVIDIA Blackwell / Hopper Architecture Whitepapers · Google TPU v4/v5p · Groq ISCA'20/22 · DeepSeek-V3 / V4.1 & DeepEP · Alibaba SRNIC (NSDI'23) 等共 161 份公开技术文献（详见 [观察室 `#sources`](https://docluka77.github.io/ai-chip-arch-explorer/observatory/#sources) 与 [`observatory/README.md`](observatory/README.md)）。
- **许可说明**：原创代码与可视化表达保留所有权利（详见 [`observatory/LICENSE`](observatory/LICENSE) 与 [`observatory/THIRD_PARTY_NOTICES.md`](observatory/THIRD_PARTY_NOTICES.md)）。

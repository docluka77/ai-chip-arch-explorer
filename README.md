> 新增：[现代 AI 芯片架构观察室 0.3.0](observatory/) · DeepSeek算子执行显微镜、GPU/SM/Tensor Core、PE复用与TCP/IP/RDMA。原CNN / MAESTRO页面保留。

# AI 芯片架构与 MAESTRO 空间探索器

一个单文件的交互式可视化页面，把经典 CNN 加速器（Eyeriss / ShiDianNao / NVDLA）的架构与数据流，
和 MAESTRO 的数据中心指令（Data-Centric Directives）设计空间探索放在同一张图里对照。

**核心问题**：当经典 CNN 加速器遇上 Transformer，数据流冲突在哪、算子怎么映射、硬件利用率掉多少。

## 在线预览

用浏览器直接打开 `index.html` 即可（无构建、无依赖安装）。

## 页面内容

### 经典 CNN 加速器
- **芯片顶层结构与片上互连框图** —— 三款加速器的层级结构、总线与存储层次对比
- **PE（Processing Element）内部微架构**
- **Eyeriss Row-Stationary（行驻留）数据流周期级交互仿真** —— 可单步 / 播放，观察数据在 PE 阵列与 Global Buffer / psum 之间的流动
- **三款加速器五维架构特性雷达图**
- **CNN 算子映射与硬件利用率仿真器（Workload Mapper）** —— 输入 Cin / Kout / kernel 尺寸，实时计算映射效率
- **Eyeriss vs. ShiDianNao vs. NVDLA 核心架构参数全维对比表**

### Transformer 视角
- **Transformer 算子级硬件映射交互沙盘** —— 把 QKV 投影、Attention、FFN 等算子映射到加速器流水线上，看瓶颈落在哪
- **Prefill vs. Decode 硬件压力仿真器** —— 两个阶段计算密集型与访存密集型的差异
- **CNN vs. Transformer（Prefill / Decode）效率对比**

### MAESTRO 设计空间探索
- **数据中心指令（`.m` DSL）交互解析器** —— 解析逻辑维度与物理维度，推导四维复用（Temporal / Spatial × 输入 / 权重 / 输出）情况
- **硬件参数 DSE 仿真器** —— 可调 PE 数量、L1 / L2 容量、NoC 带宽，观察代价模型的变化

## 技术栈

- 纯前端单文件：HTML + CSS + 原生 JavaScript
- Tailwind CSS 3.4（CDN）
- Chart.js 4.4（CDN）
- Inter / JetBrains Mono 字体（Google Fonts CDN）

> 页面依赖 CDN 资源，需要联网打开才能获得完整样式与图表。离线场景可自行下载这三个依赖改为本地引用。

## 部署到 GitHub Pages

1. 把仓库设置为 Public（或在支持私有 Pages 的套餐下直接开启）。
2. Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。
3. 等一两分钟后访问 `https://<用户名>.github.io/<仓库名>/`。

## 参考

- Eyeriss: A Spatial Architecture for Energy-Efficient Dataflow for Convolutional Neural Networks (ISCA 2016)
- ShiDianNao: Shifting Vision Processing Closer to the Sensor (ISCA 2015)
- NVDLA: NVIDIA Deep Learning Accelerator
- MAESTRO: A Data-Centric Approach to Analyze the Design Space of Hardware Accelerators

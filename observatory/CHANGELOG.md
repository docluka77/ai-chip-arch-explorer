# 0.4 · 07 RDMA与集群互连

2026-10-30。原始CNN/MAESTRO根首页、观察室既有章节和0.1归档继续保留。

## 阅读内容

- 完整阅读用户提供的芯东西文章，确定郭传雄、比特智路、400GE FPGA与在研800GE TCU。产品微架构、工艺、功耗、QP容量、PCIe与测试参数未公开核实，保留未知。SRNIC不是上述产品的实现证据。
- 22篇主线与延伸论文；本人参与与领域对照分开。SRNIC作者/模块和原型条件、Collie NSDI2022、ByteExpress 2026-10 v2预印本、DCP2025条件均标明。CloudBrain为项目入口，QoS用SecondNet作关联，不补造同名论文。
- 12步RC WRITE依赖动画，可暂停/单步，模块弹层和Python/verbs语义、MR/QP、DMA、completion/消费依赖分别解释。
- 8包教学对比物理丢包与纯乱序、按序丢弃基线与选择补缺，保留payload到齐和最终交接两步。SRNIC拆到WQE-cache-free调度、host bitmap/CtrlQ/RetryQ、协议扩展与退出恢复同步。
- scale-up/out按通信域、语义和拓扑解释。核对UALink Common2.0、UE1.1 UnifiedLocal、NVLink6及ConnectX9/BlueField3 DPA的公开/未知范围。
- 开销实验：byte/Gb/s换算、网络/每端GPU-NIC路径、host内存流量、固定/逐跳/排队、注册复用；分别显示流水、串行、首次和均摊，不预测P99或厂商跑分。
- 现有来源总数106。新增论文搜索与作者分类，原文PDF/关键图页可跳转。活跃界面的存储单位改为byte；ByteDance名称和原始标题保持准确，归档内容按原样保留。
- 顶层JS/CSS及本地字体带0.4版本参数，避免已打开旧页面的缓存混用。

## 复核

node scripts/check-all.mjs检查全部脚本语法、原有模型与算子、22篇作者归属、106个来源ID、缺包/乱序计数、量纲/瓶颈/注册均摊、分享状态边界与缓存版本引用。浏览器检查六个子章节、播放暂停/单步、模块弹层、论文切换/搜索、开销控件、URL恢复与窄屏。没有加载模型、发出真实RDMA流量或执行硬件测速。

---

# 0.3 · 算子执行显微镜

2026-10-30。原仓库根页、观察室既有内容和0.1归档继续保留。

- 15步可暂停/继续、前后单步、重置及0.5×/1×/2×播放；精确步骤、模块、数学输出格、阅读层次和暂停位置写入分享链接，重新打开保持暂停。
- 固定DeepInfer 5537415 / DeepGEMM 1fc9c66：本地专家gate/up，逻辑[Mₑ,5120]×[4608,5120]ᵀ；FP8激活、FP4权重、UE8M0 scale、FP32 TMEM累加、BF16输出。明确非MegaMoE分解路径。
- Python → C++ binding / JIT → TMA发射 → HBM/L2响应 → SMEM → mbarrier → scale/UTCCP/TMEM → tcgen05 → epilogue → TMA store → SwiGLU。
- 可点击GPU / SM / Tensor通路模块；展开实际8-warp/CTA分工、默认条件下的256×128×128逻辑tile、双CTA、scale布局、swapAB、512列TMEM复用与输出store等待。4×4是可手算数学示意，非物理PE。
- 独立比较SM100与RTX5090 SM120：SM120有TMA，但不走此tcgen05/TMEM内核；GeForce50不支持TMA multicast。
- 复用对照：Eyeriss RS、ShiDianNao FIFO / buffers、NVDLA CDMA/CBUF/CSC/CMAC/CACC、GPU tile。统一输入访问计数不是性能排名。
- 专家通信：4-rank缩小例子，Python all_to_all语义；可切换RoCEv2+GDR、IB+GDR、host-staging TCP回退、NVLink域内路径。明确RoCEv2使用UDP/IP、combine不是AllReduce、DeepEP版本与设备支持边界。
- 共59份资料；源码/论文分类；本地字体重新裁剪，手机图保留可读字号、支持内部横向滑动。

## 验证

运行node scripts/check-all.mjs，检查全部脚本语法、原有模型/图资源、NT矩阵结果、形状/精度/缓冲契约、TMA因果顺序、四种网络模式、来源引用与链接状态边界。浏览器检查播放/暂停/单步、模块弹层、链接恢复和手机布局。未加载模型、未运行CUDA、未进行GPU/网络测速。

---

# 0.2 · 从原图进入细节

2026-10-30。独立入口继续保留，原 CNN / MAESTRO 页面保留在原仓库根目录，观察室 0.1 存档在 `dist/archive/v01/`。

## 阅读与交互

浅色阅读主题，本地 Noto Sans SC 可变中文字体，正文与图中标签放大。官方原图直接进入 01 主页面；图片可放大，保留图号、PDF 页码、原文链接和权利人。

导航改为：01 从原图拆芯片；02 DeepSeek 怎么跑；03 瓶颈实验；04 看懂设计差异；05 原始资料；06 我的笔记。

RTX Blackwell 深入路径：GPU → GPC → TPC → SM → SM 子分区 → 矩阵运算教学例子。特别区分完整 GB202 的 192 SM / 128 MB L2 与 RTX 5090 启用的 170 SM / 96 MB L2。Tensor Core 物理 PE 布线未公开，不臆造；4×4 矩阵例子只演示乘加数学。

新发现 M890 官方架构简介，增加 CE/CU、L1/TSM、SREG/VREG、VALU/TFU/SALU/SFU/LSU 与 AIU 职责展开。保留“10 CE×4 CU”与“总39 CU”的原文口径差异；不套用于 V900。

Groq 增加官方 LPU 功能块与 GPU attention / LPU FFN 系统示例。RDNA4 有官方 CU 与 AI 加速器原图。MI455X 现有图是封装渲染，Taalas 是板卡照片；字节没有核实到官方内部框图，界面明确显示缺口。

## DeepSeek / DeepInfer

使用固定版本的官方模型配置、报告与 DeepInfer 源码，共33份资料。

- 40层 Causal Encoder–Decoder，真实的 Full/Reindex/Reuse 和共享来源可逐层选择。
- 区分 CSA2 的 Top-512 位置与 MoE 的 Top-6/384 专家。
- 区分模型结构、软件引擎、硬件映射；浏览器没有载入权重或运行模型。
- DeepInfer 发布版支持对象与 RTX 结构教学样本分开；生产系统全图与已开源离线核心范围分开。
- 552B backbone、196B Engram、激活参数和完整张量统计的计数范围分别保留，不转成虚假的显存要求。

## 维护入口

| 文件 | 内容 |
| --- | --- |
| `dist/research-data.js` | 原图、版本、来源、DeepSeek固定配置与40层映射 |
| `dist/layers.js` | 原图展示、详细层级重绘、矩阵教学沙盘 |
| `dist/case-study.js` | DeepSeek案例、CSA2共享、DeepInfer讲解 |
| `dist/app.js` | 原有应用、对照、实验、笔记、导航与深链接 |
| `dist/theme.css` / `responsive.css` | 新版主题、字号、手机阅读 |
| `dist/assets/fonts/OFL.txt` | Noto Sans SC 字体许可 |
| `dist/assets/figures/source-provenance.json` | 官方PDF裁图来源与页码 |

`node scripts/check.mjs` 检查来源关联、40层共享拓扑、矩阵结果和本地原图资产；`node scripts/serve.mjs` 启动预览。图片和字体不需要构建。

本项目保留权利声明仅覆盖原创代码与表达；字体、论文图、厂商图和第三方软件许可独立适用。

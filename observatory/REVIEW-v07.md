# 0.7 关键内容与交互复核

复核日期：2026-10-31（America/Los_Angeles）。资料快照仍为2026-10-30。

本轮针对高风险技术语义、架构层次、固定代码路径、数字口径与页面呈现复核。未逐句审读90篇文献全文，未运行真实GPU内核或网卡符合性测试。以下结论有明确范围，不是对全部内容的绝对准确性保证。

## RDMA 与集群

- 普通WRITE不自动产生远端RECV CQE；源端完成、远端通知与GPU消费依赖分别处理。[rdma-core手册](https://github.com/linux-rdma/rdma-core/blob/master/libibverbs/man/ibv_post_send.3)、[GPUDirect顺序规则](https://docs.nvidia.com/cuda/gpudirect-rdma/#synchronization-and-memory-ordering)。
- RoCEv2使用UDP/IP；iWARP为RDMAP/DDP/MPA/TCP。端点可靠性、拥塞控制和PFC流控分开解释。[NVIDIA RoCE](https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet)、[RFC5040](https://www.rfc-editor.org/rfc/rfc5040.html)、[RFC5044](https://www.rfc-editor.org/rfc/rfc5044.html)。
- SRNIC QPC全量片上；MTT大表在host、片上有cache；软件恢复慢路径处理元数据，不能把所有payload画成绕CPU重排。ePSN退出条件按论文处理。[SRNIC §4.4–4.5 / Figure4、7、8](https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=7)。
- 补全SRNIC实验条件：两卡直连、单连接、1024-byte RoCE MTU；约97Gb/s对应超过4KB消息，约3.3μs对应64-byte消息。4096服务器规模为ns-3模拟；18×为指定基线每MB高效服务的连接数口径。[SRNIC §6](https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=11)。
- scale-up/out按协作域解释，不能由物理机箱或Ethernet名称直接二分。规范、产品支持与部署结果分别保留证据。[NVIDIA NVLink域](https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/)、[UE1.1官方发布](https://ultraethernet.org/ultra-ethernet-consortium-releases-specification-1-1-advancing-ai-and-hpc-networking/)。
- 目录抽查包括SRNIC/BURST/CSIG/Falcon署名、RFC8257的Informational分类、NCCL GIN的CPU Proxy/GDAKI区别；受限全文与公开标准概览继续保留获取范围说明。

## NVIDIA 与 DeepSeek 算子

- GB202完整设计192 SM与RTX5090启用170 SM分别标注，不猜测屏蔽位置。[NVIDIA白皮书](https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf)。
- SM100所选tcgen05路径与TMEM，不移植为RTX5090/SM120内部实现。[CUTLASS tcgen05说明](https://docs.nvidia.com/cutlass/4.5.2/media/docs/pythonDSL/mma_docs/tcgen05_programming.html)、[SM120示例](https://github.com/NVIDIA/cutlass/tree/main/examples/79_blackwell_geforce_gemm)。
- 专家gate/up逻辑形状为[Mₑ,5120]×[4608,5120]ᵀ。后续真实调用补注裁剪上限10、topk_weights和cast；基础SwiGLU式与4×4沙盘明确为简化模型，不补猜固定依赖中未读到的精确融合顺序。[固定DeepInfer MLP](https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L405-L449)、[官方模型配置](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/main/config.json)。
- 本次官方固定HF配置的在线抓取受限；读取官方main并与本地既存固定快照的关键字段交叉核对，不把它表述为固定文件完整hash再次取证。
- Eyeriss/ShiDianNao/NVDLA按数据复用、局部存储、累加等职责对照，不建立物理硬件一一对应。[Eyeriss](https://eyeriss.mit.edu/)、[ShiDianNao作者机构PDF](https://www.epfl.ch/labs/lap/wp-content/uploads/2018/05/DuJun15_ShiDianNaoShiftingVisionProcessingCloserToTheSensor_ISCA15.pdf)、[NVDLA单元规格](https://nvdla.org/hw/v1/ias/unit_description.html)。

## 前端验证

- 脚本检查：10个芯片、40层模型、矩阵结果、15步算子、90条文献及来源引用、恢复模型、数值量纲与共享状态边界。
- 新七步旅程：逐步选择、数据/控制切换、播放到终点、暂停、模块弹窗和URL恢复。
- 浏览器回归：桌面与390px手机的8个主页面；320px的RDMA各章节及3种通信域模型；未观察到整页横向溢出。
- 15步算子图逐模块检查文字包围盒，修复新增SwiGLU标题溢出；修复320px网络节点标签和箭头附近辅助标签挤压。
- 大型原图/架构允许在各自容器内滚动，保留可读字号；解说在图外，不叠在原图上。支持键盘与减少动画偏好。

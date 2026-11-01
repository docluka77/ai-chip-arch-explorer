/* Fixed-source implementation contract, reviewed 2026-10-30. */
'use strict';
(() => {
const D=window.OBS_OPERATOR_DATA;
const additions=[
  {
    "id": "op-kernel",
    "title": "DeepGEMM：SM100 FP8 × FP4 CUDA 内核",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/include/deep_gemm/impls/sm100_fp8_fp4_gemm_1d1d.cuh#L39-L567",
    "supports": "线程角色、共享内存、scale、TMEM与异步流水。",
    "publisher": "DeepSeek",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-heuristic",
    "title": "DeepGEMM：SM100 tile 与 CTA 启发式",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/heuristics/sm100.hpp#L164-L261",
    "supports": "配置相关的tile、双CTA与缓冲阶段选择。",
    "publisher": "DeepSeek",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-epilogue",
    "title": "DeepGEMM：swapAB epilogue / TMA store",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/include/deep_gemm/epilogue/sm100_store_cd_swap_ab.cuh#L87-L155",
    "supports": "TMEM读回、BF16转置、共享输出缓冲与store等待。",
    "publisher": "DeepSeek",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-linear",
    "title": "DeepInfer：量化粒度与尺度布局",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/layers/linear.py#L13-L24",
    "supports": "FP8激活每32个K一组的量化设置。",
    "publisher": "DeepSeek",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-binding",
    "title": "DeepGEMM：grouped API 校验与架构分支",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/apis/gemm.hpp#L181-L248",
    "supports": "NT逻辑形状、group布局与arch major10的限制。",
    "publisher": "DeepSeek",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-sm120-layout",
    "title": "CUTLASS：SM120 寄存器操作数约束",
    "url": "https://github.com/NVIDIA/cutlass/blob/e13f5cd4142c43efc37c2f6339923eb4a57afb99/include/cutlass/gemm/collective/sm120_blockscaled_mma_tma.hpp#L221-L223",
    "supports": "对应SM120 mainloop的A/B寄存器fragments。",
    "publisher": "NVIDIA",
    "date": "fixed source / reviewed 2026-10-30",
    "type": "technical",
    "limit": "针对链接固定版本；形状和调度需结合具体内核，不代表实测时钟或物理PE布局。"
  },
  {
    "id": "op-eyeriss",
    "title": "Eyeriss: A Spatial Architecture for Energy-Efficient Dataflow for Convolutional Neural Networks",
    "url": "https://dspace.mit.edu/entities/publication/f6342515-2b7d-411c-a8ad-a9edb23dd394",
    "publisher": "原论文作者",
    "date": "ISCA 2016",
    "type": "paper",
    "supports": "RS 联合利用权重、输入和部分和的局部性；PE 本地 RF、相邻通信、global buffer 与 DRAM 分层。逻辑 PE 集合的映射与物理阵列折叠需要区分。",
    "limit": "不要把 row-stationary 说成只有权重不动；不要把论文 65nm 的能耗归一化系数直接应用于现代 GPU。"
  },
  {
    "id": "op-shi",
    "title": "ShiDianNao: Shifting Vision Processing Closer to the Sensor",
    "url": "https://www.epfl.ch/labs/lap/wp-content/uploads/2018/05/DuJun15_ShiDianNaoShiftingVisionProcessingCloserToTheSensor_ISCA15.pdf",
    "publisher": "原论文作者",
    "date": "ISCA 2015, DOI 10.1145/2749469.2750389",
    "type": "paper",
    "supports": "NBin/NBout 保存神经元输入输出，SB 保存 synapses/weights，IB 保存指令。NFU 是二维 PE mesh；一个 PE 对一个输出神经元沿输入维度时间复用，本地累加。FIFO-H/V 支持输入向左、向下传递，减少重复 buffer 读取。",
    "limit": "论文的小型视觉 CNN、片上 SRAM 和 16-bit fixed-point 假设，不能扩展成任意 Transformer 都无需外部存储。含指令控制，仍不是 CUDA 式通用 SIMT SM。"
  },
  {
    "id": "op-nvdla",
    "title": "NVDLA Hardware Architectural Specification",
    "url": "https://nvdla.org/hw/v1/hwarch.html",
    "publisher": "NVIDIA",
    "date": "v1 architecture; concrete configurations vary",
    "type": "technical",
    "supports": "模块化 CNN 推理计算单元由 CPU 配置；独立模式可经内存连接，fused 模式经 FIFO 连接，减少中间结果的内存往返。Convolution buffer 保留输入与权重。",
    "limit": "固定功能不等于没有配置或指令；配置卷积尺寸不能等同于 SM 执行任意 CUDA kernel。"
  },
  {
    "id": "op-nvdla-units",
    "title": "NVDLA Unit Description",
    "url": "https://nvdla.org/hw/v1/ias/unit_description.html",
    "publisher": "NVIDIA",
    "date": "nvdlav1, not a universal NVDLA size",
    "type": "technical",
    "supports": "卷积流水线 CDMA → CBUF → CSC → CMAC → CACC；取数、局部存储、调度、乘法、累加分别可视化。Atomic-C/K 等配置与模型通道形状影响利用率。",
    "limit": "不要把 nvdlav1 的 MAC 数和 CBUF 容量泛化到所有 NVDLA 配置；CBUF 与可选的片上第二存储接口不是同一个概念。"
  },
  {
    "id": "op-reusegpu",
    "title": "Efficient GEMM in CUDA",
    "url": "https://docs.nvidia.com/cutlass/latest/media/docs/cpp/efficient_gemm.html",
    "publisher": "NVIDIA",
    "date": "CUTLASS latest, reviewed 2026-10-30",
    "type": "technical",
    "supports": "矩阵乘按 threadblock/warp/instruction 分块；shared memory 与 registers 形成复用层级。tile 越大可能增加复用，也会消耗更多存储并影响 occupancy。存在软件流水、异步拷贝和 producer/consumer 协作。",
    "limit": "这是 kernel 的逻辑 tile 映射，不是 Tensor Core 内部物理 PE 布线。Hopper 的 warp specialization 细节不能原封不动套到 Blackwell SM100，更不能套到 RTX SM120。"
  },
  {
    "id": "op-nvlink",
    "title": "NVIDIA NVLink and NVLink Switch",
    "url": "https://www.nvidia.com/en-us/data-center/nvlink/",
    "publisher": "NVIDIA",
    "date": "NVLink 6 / Vera Rubin NVL72 page reviewed 2026-10-30",
    "type": "technical",
    "supports": "NVLink 是 GPU 互连，NVLink Switch 将多个 NVLink 端点组成 scale-up 域。现代 rack-scale 方案可跨计算节点，因此不应定义成只在一台主机内部。",
    "limit": "scale-up 域大小、链路代际和拓扑取决于产品。不要把 NVSwitch 画成 Ethernet/InfiniBand 交换机，也不要把页面聚合带宽当应用有效吞吐。"
  },
  {
    "id": "op-roce",
    "title": "RDMA over Converged Ethernet",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "publisher": "NVIDIA",
    "date": "DOCA 3.5.0 archive",
    "type": "technical",
    "supports": "RoCEv1 是 Ethernet L2；RoCEv2 将 RDMA 封装在 UDP/IP 中，UDP 目的端口 4791，可经 IP 路由。UDP 在这里用于封装，可靠性机制不能按普通 UDP 应用理解。",
    "limit": "RDMA 是远程内存访问能力与接口/传输语义，不是与 TCP/IP 严格同层的单一线缆协议；RoCEv2 不是 TCP。"
  },
  {
    "id": "op-ipoib",
    "title": "IP over InfiniBand (IPoIB)",
    "url": "https://networking-docs.nvidia.com/mlnxofedswum/590560107/ip-over-infiniband-ipoib",
    "publisher": "NVIDIA",
    "date": "5.9-0.5.6.0.1.0.7 archive",
    "type": "technical",
    "supports": "IPoIB 可以在 InfiniBand transport 上封装 IP 数据报。它与 verbs/RDMA 数据路径要分开表示。",
    "limit": "不要写成 InfiniBand 永远没有 IP；也不要把 NCCL 使用的原生 IB verbs payload 全部画成先经 TCP/IP。"
  },
  {
    "id": "op-nccl-overview",
    "title": "Overview of NCCL",
    "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html",
    "publisher": "NVIDIA",
    "date": "2.32.3",
    "type": "technical",
    "supports": "NCCL 是拓扑感知的 GPU collective 与 send/receive 通信库，支持 PCIe、NVLink、InfiniBand Verbs、IP sockets；它是软件库，不是一种物理网络。",
    "limit": "collective 名称表达参与者间的语义，不能独自证明该机器实际选择了哪条硬件或协议路径。"
  },
  {
    "id": "op-nccl-env",
    "title": "NCCL Environment Variables",
    "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/env.html",
    "publisher": "NVIDIA",
    "date": "2.32.3",
    "type": "technical",
    "supports": "NCCL_IB_DISABLE 禁用 IB/RoCE 后可回退 IP sockets；NCCL_SHM_DISABLE 段说明 P2P 不可用时可经 host memory；NET_GDR_LEVEL 依据 GPU-NIC 距离控制 GDR。SOCKET_MAGIC 说明 IB bootstrap 也可用 TCP socket。",
    "limit": "这些是解释和诊断证据，不建议网站默认让用户改环境变量；不要将所有 NCCL 路径概括成端到端零拷贝。"
  },
  {
    "id": "op-deepep",
    "title": "DeepEP official source and examples",
    "url": "https://github.com/deepseek-ai/DeepEP",
    "publisher": "DeepSeek",
    "date": "main reports V2.5, reviewed 2026-10-30; moving branch",
    "type": "technical",
    "supports": "提供 MoE dispatch/combine、FP8 dispatch、NVLink 与 RDMA 通信。当前 EPBuffer 可返回 expanded expert layout；示例在 expert 计算侧应用 router weights，combine 对提供的结果求和。",
    "limit": "不要用旧版 NVSHMEM 架构介绍当前 V2.5，也不要声称当前主线 EP 是 zero-SM；不要把第三方优化分支能力当主线能力。DeepEP 与名为 DeepInfer 的项目不是同一对象。"
  }
];
D.sources.find(s=>s.id==='op-mlp').url="https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L405-L449";
D.sources.find(s=>s.id==='op-sm120').url='https://github.com/NVIDIA/cutlass/blob/e13f5cd4142c43efc37c2f6339923eb4a57afb99/examples/79_blackwell_geforce_gemm/79a_blackwell_geforce_nvfp4_bf16_gemm.cu#L30-L51';
D.sources.find(s=>s.id==='op-torch').url='https://docs.pytorch.org/docs/2.15/distributed.html#torch.distributed.all_to_all_single';
D.geometry={
  "status": "Derived from this exact fixed code, assuming default DeepInfer SM100 expert alignment256 and even num_sms. Not measured; runtime knobs and future commits can differ.",
  "logical_tile": {
    "BLOCK_M": 256,
    "BLOCK_N": 128,
    "BLOCK_K": 128,
    "cluster_m": 1,
    "cluster_n": 2,
    "swap_ab": true
  },
  "why": "DeepInfer sets alignment from get_theoretical_mk_alignment_for_contiguous_layout()=256 on SM100. M-grouped heuristic uses block_M=alignment, block_N128, block_K128 for MXFP8FP4; cluster_n2 iff ceil(N/128) even and num_sms even. N4608 gives36 output-column tiles.",
  "single_cluster_notes": "2CTA/2SM cooperative variant, not an entire expert per SM. Logical tiles are scheduled persistently across experts/output columns. For odd num_sms cluster_n1. A simplified one-SM storyboard must be labelled a specialization/teaching cutaway rather than guaranteed full production launch.",
  "per_CTA_mainloop_stage": {
    "A_smem": {
      "shape": [
        128,
        128
      ],
      "bytes": 16384
    },
    "B_smem": {
      "shape": [
        128,
        128
      ],
      "bytes": 16384,
      "GMEM_values_FP4_payload_bytes": 8192,
      "notes": "B uses unpacked SMEM slots; this is per-CTA representation, not a measured global-DRAM-traffic count."
    },
    "SFA_smem": {
      "packed_int32_words": 256,
      "bytes": 1024,
      "scales_per_logical_row_per_K_tile": 4
    },
    "SFB_smem": {
      "packed_int32_words": 128,
      "bytes": 512,
      "scales_per_logical_row_per_K_tile": 4
    }
  },
  "K_loop": {
    "K": 5120,
    "BLOCK_K": 128,
    "mainloop_panels": 40,
    "UMMA_K": 32,
    "UMMA_substeps_per_panel": 4,
    "total_UMMA_substeps_per_output_tile": 160,
    "warning": "160 describes code-level MMA substeps for a full K reduction, not elapsed clock cycles or physical PE operations."
  },
  "epilogue_store": {
    "STORE_BLOCK_M": 16,
    "STORE_BLOCK_N": 128,
    "dtype": "BF16",
    "bytes_per_smem_store_buffer": 4096,
    "store_buffers": 2,
    "warning": "Per-CTA epilogue scratch staging, not the full output tile. Dynamic effective M changes number of store iterations."
  },
  "TMEM": {
    "allocated_columns": 512,
    "accumulator_stages": 2,
    "max_UMMA_N": 256,
    "SFA_columns": 8,
    "SFB_columns": 4,
    "overlapped_columns": 12,
    "notes": "Code computes 2*256 accumulator columns plus12 scale columns, then overlaps12 with a preceding accumulator stage to fit512 columns. The overlap barrier prevents overwrite before epilogue reads. These are logical allocation columns; do not draw a physical TensorCore PE map."
  },
  "threads": {
    "per_CTA": 256,
    "non_epilogue": 128,
    "epilogue": 128,
    "TMA_issue": "warp0 elected lane",
    "MMA_issue": "warp1 elected lane, leader CTA only",
    "scale_transpose": "warp2 for this BLOCK_K128 configuration",
    "epilogue_warps": "4..7"
  },
  "pipeline_stage_count": "Heuristic derives available stages from SMEM capacity232448 minus C/D scratch, barriers and pointer storage; do not treat two visual teaching buffers as the actual fixed mainloop stage count.",
  "sources": [
    "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L250-L251",
    "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/heuristics/runtime.hpp#L57-L65",
    "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/heuristics/sm100.hpp#L30-L45",
    "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/heuristics/sm100.hpp#L164-L261",
    "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/include/deep_gemm/impls/sm100_fp8_fp4_gemm_1d1d.cuh#L64-L124"
  ]
};
D.apiCode="# shape准确的API伪代码，需先完成路由、量化和布局\n# A_q: FP8 [M_alloc,5120]；W_q: packed FP4 [G,4608,2560] bytes\n# SFA/SFB: UE8M0编码，每32个K一组，4个编码打包为int32\n# psum_end: 有效行末偏移；专家间还有alignment padding\nD = torch.empty((A_q.shape[0],4608), device='cuda', dtype=torch.bfloat16)\ndeep_gemm.m_grouped_fp8_fp4_gemm_nt_contiguous(\n    (A_q,SFA), (W_q,SFB), D, psum_end,\n    recipe_a=(1,32), recipe_b=(1,32),\n    use_psum_layout=True, expected_m_for_psum_layout=expected_m,\n)\n# 分解路径的下一个算子：SwiGLU（clamp limit=10、topk_weights）+ cast，再进入down投影\n# 上述张量的stride/转置/对齐由runtime工具生成，非朴素row-major scales";
D.callChain=[
  {
    "stage": "Python model",
    "symbol": "MoE.routed_experts_forward -> _grouped_gemm",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L405-L449"
  },
  {
    "stage": "Python imported binding",
    "symbol": "deep_gemm._C.m_grouped_fp8_fp4_gemm_nt_contiguous",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/__init__.py#L30-L47"
  },
  {
    "stage": "Pybind module",
    "symbol": "PYBIND11_MODULE -> deep_gemm::gemm::register_apis",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/python_api.cpp#L24-L50"
  },
  {
    "stage": "C++ API",
    "symbol": "m_grouped_fp8_fp4_gemm_nt_contiguous",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/apis/gemm.hpp#L181-L248"
  },
  {
    "stage": "SM100 host",
    "symbol": "sm100_m_grouped_fp8_fp4_gemm_contiguous_1d1d",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/impls/sm100_fp8_fp4_gemm_1d1d.hpp#L169-L251"
  },
  {
    "stage": "Runtime compilation and launch",
    "symbol": "SM100FP8FP4Gemm1D1DRuntime::compile_and_launch",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/csrc/jit_kernels/impls/sm100_fp8_fp4_gemm_1d1d.hpp#L35-L93"
  },
  {
    "stage": "CUDA persistent kernel",
    "symbol": "sm100_fp8_fp4_gemm_1d1d_impl",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/include/deep_gemm/impls/sm100_fp8_fp4_gemm_1d1d.cuh#L39-L567"
  },
  {
    "stage": "PTX instruction wrapper",
    "symbol": "SM100_MMA_MXF8F6F4_SS or SM100_MMA_MXF8F6F4_2x1SM_SS",
    "url": "https://github.com/deepseek-ai/DeepGEMM/blob/1fc9c66975ee322d628b3288534ca0e9ce12a64d/deep_gemm/include/deep_gemm/ptx/tcgen05.cuh#L46-L90"
  }
];
D.contract={
  "id": "v41-expert-gate-up-sm100",
  "label_zh": "一个 MoE 专家的 Gate / Up 投影",
  "context": "DeepSeek V4.1 Flash: H=5120, expert I=2304; routed expert count384/top6 and one shared expert are model-level facts. Select one already-routed local expert, then explain the grouped kernel that batches many such experts.",
  "logical_math": "D_e = A_e @ B_e.T; D_e[i,j] = sum_k (qA_e[i,k] * SFA_e[i,floor(k/32)]) * (qB_e[j,k] * SFB_e[j,floor(k/32)])",
  "logical_shapes": {
    "A_e": [
      "M_e",
      5120
    ],
    "B_e": [
      4608,
      5120
    ],
    "D_e": [
      "M_e",
      4608
    ],
    "gate_output": [
      "M_e",
      2304
    ],
    "up_output": [
      "M_e",
      2304
    ]
  },
  "grouped_api_shapes": {
    "A": [
      "M_alloc",
      5120
    ],
    "B": [
      "G_local_physical",
      4608,
      5120
    ],
    "D": [
      "M_alloc",
      4608
    ],
    "grouped_layout": [
      "G_local_physical"
    ],
    "meaning": "Rows of A/D are arranged by expert, with alignment padding; grouped_layout is int32 valid end offsets with use_psum_layout=True. Start_e = align_up(end_{e-1}, alignment), not simply end_{e-1}. G can include EPLB replicas and is not necessarily384."
  },
  "precision": {
    "A": "FP8 E4M3FN",
    "B": "Packed FP4 E2M1, two logical values per byte in GMEM; mixed kernel TMA uses unpacksmem representation (8-bit storage slots in SMEM, still FP4 values)",
    "scales": "UE8M0 powers-of-two, 32 consecutive K elements per scale for both A and B; packed four 8-bit scale encodings in each int32 word, with TMA-aligned layouts. int32 is packed storage, not integer arithmetic scale.",
    "accumulator": "FP32 in TMEM during MMA",
    "D": "BF16 in global memory for this DeepInfer call"
  },
  "scale_shapes": {
    "logical_sfa": [
      "M_alloc",
      160
    ],
    "logical_sfb": [
      "G_local_physical",
      4608,
      160
    ],
    "packed_k_words": 40,
    "warning": "These are logical cardinalities; actual tensor strides, transpose, MN-major layout and alignment must come from quantization/layout utilities. Do not allocate a naïve row-major int32 scale array and claim it is directly executable."
  },
  "bytes_derived": {
    "weight_e_elements": 23592960,
    "packed_fp4_weight_e_bytes_excluding_scales": 11796480,
    "FP8_A_bytes_per_active_row": 5120,
    "BF16_D_bytes_per_active_row": 9216,
    "logical_scales_per_A_row": 160,
    "logical_scales_per_B_row": 160
  },
  "path_caveat": "DeepInfer can select fused MegaMoE (dispatch+GEMM1+SwiGLU+GEMM2+combine), especially fp8xfp4 within the NVLink domain. This selected decomposed path is public code, not a claim of universal production default. Gate/up GEMM alone does not implement routing, SwiGLU, down projection, or MoE combine.",
  "urls": [
    "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L405-L449",
    "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L174-L190",
    "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/config.json"
  ]
};
D.python[2]='deep_gemm.m_grouped_fp8_fp4_gemm_nt_contiguous(...)';
D.modules.scheduler.details[2]='固定实现每CTA 256线程 / 8 warp。warp0选中lane发射TMA，warp1发射MMA（双CTA由leader提交），warp2处理当前BK128的scale布局，warp4–7做epilogue。具体tile / 协作仍由启发式决定。';
D.modules.scales.details[0]='FP8激活与FP4权重均按每行连续32个K一组使用scale。UE8M0编码二次幂，4个8-bit编码打包到int32；还需满足runtime规定的布局/对齐。';
D.modules.registers.details[0]='固定swapAB epilogue：TMEM读回寄存器 → BF16 → STSM_T转置到shared输出缓冲 → TMA store。全局C的语义形状保持[M,N]。';
for(const s of D.sources)if(s.type==='technical')s.type='official';
/* Release version is defined once in data.js. */
for(const s of additions){if(s.type==='technical')s.type='official';D.sources.push(s);if(!window.OBS_DATA.sources.some(v=>v.id===s.id))window.OBS_DATA.sources.push(s);}
for(const [id,refs]of Object.entries({tma:['op-kernel','op-cutlass'],scheduler:['op-kernel','op-tcgen'],smem:['op-kernel','op-cutlass'],barrier:['op-kernel','op-epilogue'],scales:['op-kernel','op-linear'],tensor:['op-kernel','op-tcgen'],tmem:['op-kernel','op-tcgen'],registers:['op-epilogue','op-sm120-layout'],output:['op-epilogue','op-mlp']}))D.modules[id].refs=refs;
})();

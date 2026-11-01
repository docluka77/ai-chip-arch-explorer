/* Primary-source atlas, reviewed 2026-10-30. Vendor figures retain their original rights. */
window.OBS_FIGURES = {
  "rubin": {
    "title": "Inside NVIDIA Rubin GPU Architecture",
    "source": "https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/",
    "version": "Rubin GPU, July 2026 article",
    "guide": [
      "先找到 HBM、L2 与 GPC",
      "顶层图帮助定位资源，但不提供完整 Rubin SM 内部结构。深入 SM 的示范采用单独标明版本的 RTX Blackwell。"
    ],
    "limit": "Does not supply a complete Rubin SM physical internal layout. RTX GB202 internal diagrams cannot be labelled Rubin.",
    "figures": [
      {
        "title": "Rubin GPU 顶层结构",
        "kind": "官方架构图",
        "image": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/07/nvidia-rubin-gpu-chip-architecture-1.webp",
        "original": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/07/nvidia-rubin-gpu-chip-architecture-1.webp",
        "source": "https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/",
        "page": null,
        "figure": 2,
        "copyright": "© NVIDIA",
        "layer": null
      },
      {
        "title": "K 维度指令吞吐",
        "kind": "官方原理图",
        "image": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/07/rubin-k-dimension-instruction-throughput-1.webp",
        "original": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/07/rubin-k-dimension-instruction-throughput-1.webp",
        "source": "https://developer.nvidia.com/blog/inside-nvidia-rubin-gpu-architecture-powering-the-era-of-agentic-ai/",
        "page": null,
        "figure": 4,
        "copyright": "© NVIDIA",
        "layer": null
      }
    ]
  },
  "groq": {
    "title": "Inside NVIDIA Groq 3 LPX",
    "source": "https://developer.nvidia.com/blog/inside-nvidia-groq-3-lpx-the-low-latency-inference-accelerator-for-the-nvidia-vera-rubin-platform/",
    "version": "Groq 3 LP30 / LPX, official March-August 2026 material",
    "guide": [
      "先看 SRAM 与控制，再看系统分工",
      "第一张是厂商主动简化的 LPU 框图；第三张显示 Rubin attention 与 LPU FFN 的异构执行示例。"
    ],
    "limit": "Official Figure3 is explicitly simplified; private matrix-unit physical PE geometry is not thereby disclosed. No early GroqChip1 counts should be ported to Groq3.",
    "figures": [
      {
        "title": "Groq 3 LPU 内部功能块",
        "kind": "官方简化框图",
        "image": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/Groq-3-Architecture.webp",
        "original": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/Groq-3-Architecture.webp",
        "source": "https://developer.nvidia.com/blog/inside-nvidia-groq-3-lpx-the-low-latency-inference-accelerator-for-the-nvidia-vera-rubin-platform/",
        "page": null,
        "figure": 3,
        "copyright": "© NVIDIA",
        "layer": null
      },
      {
        "title": "LPX 计算托盘",
        "kind": "官方系统图",
        "image": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/image1-18.webp",
        "original": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/image1-18.webp",
        "source": "https://developer.nvidia.com/blog/inside-nvidia-groq-3-lpx-the-low-latency-inference-accelerator-for-the-nvidia-vera-rubin-platform/",
        "page": null,
        "figure": 2,
        "copyright": "© NVIDIA",
        "layer": null
      },
      {
        "title": "GPU 与 LPU 的 Decode 分工",
        "kind": "官方原理图",
        "image": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/Decode-Loop.webp",
        "original": "https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/Decode-Loop.webp",
        "source": "https://developer.nvidia.com/blog/inside-nvidia-groq-3-lpx-the-low-latency-inference-accelerator-for-the-nvidia-vera-rubin-platform/",
        "page": null,
        "figure": 6,
        "copyright": "© NVIDIA",
        "layer": null
      }
    ]
  },
  "tpu8i": {
    "title": "Inside the eighth-generation TPU: An architecture deep dive",
    "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
    "version": "TPU 8i, April 2026",
    "guide": [
      "计算之外，注意 CAE 与 Vmem",
      "矩阵单元只是其中一部分。图中的集合通信和存储组织，解释了这一代为何面向推理取舍。"
    ],
    "limit": "Public ASIC block diagram is not a transistor-level or cycle-exact MXU implementation. A toy systolic grid must not be sold as its actual physical PE dimensions.",
    "figures": [
      {
        "title": "TPU 8i ASIC 框图",
        "kind": "官方架构图",
        "image": "https://storage.googleapis.com/gweb-cloudblog-publish/images/4_v1_nUZDsJM.max-1800x1800.png",
        "original": "https://storage.googleapis.com/gweb-cloudblog-publish/images/4_v1_nUZDsJM.max-1800x1800.png",
        "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
        "page": null,
        "figure": 4,
        "copyright": "© Google",
        "layer": null
      },
      {
        "title": "Boardfly 系统拓扑",
        "kind": "官方系统拓扑",
        "image": "https://storage.googleapis.com/gweb-cloudblog-publish/images/5_I1mUzjb.max-1300x1300.png",
        "original": "https://storage.googleapis.com/gweb-cloudblog-publish/images/5_I1mUzjb.max-1300x1300.png",
        "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
        "page": null,
        "figure": 5,
        "copyright": "© Google",
        "layer": null
      }
    ]
  },
  "tpu8t": {
    "title": "Inside the eighth-generation TPU: An architecture deep dive",
    "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
    "version": "TPU 8t, April 2026",
    "guide": [
      "把 MXU、VPU 与 SparseCore 分开",
      "三类任务的职责不同。不要把 SparseCore 画成所有 dense 矩阵任务必须经过的模块。"
    ],
    "limit": "Avoid deriving physical array dimensions or mandatory per-operator data paths from abstract lines.",
    "figures": [
      {
        "title": "TPU 8t ASIC 框图",
        "kind": "官方架构图",
        "image": "https://storage.googleapis.com/gweb-cloudblog-publish/images/1_v4.max-1600x1600.png",
        "original": "https://storage.googleapis.com/gweb-cloudblog-publish/images/1_v4.max-1600x1600.png",
        "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
        "page": null,
        "figure": 1,
        "copyright": "© Google",
        "layer": null
      },
      {
        "title": "TPU 8t 与 Virgo 互连",
        "kind": "官方系统拓扑",
        "image": "https://storage.googleapis.com/gweb-cloudblog-publish/images/2_TPU_8t_rack_level_connectivity_to_Virgo_.max-2000x2000.png",
        "original": "https://storage.googleapis.com/gweb-cloudblog-publish/images/2_TPU_8t_rack_level_connectivity_to_Virgo_.max-2000x2000.png",
        "source": "https://cloud.google.com/blog/products/compute/tpu-8t-and-tpu-8i-technical-deep-dive",
        "page": null,
        "figure": 2,
        "copyright": "© Google",
        "layer": null
      }
    ]
  },
  "amd": {
    "title": "Introducing AMD CDNA 5 and the AMD Helios Rackscale Solution",
    "source": "https://rocm.blogs.amd.com/ecosystems-and-partners/cdna5-helios/README.html",
    "version": "Instinct MI455X / CDNA5, August 2026",
    "guide": [
      "这是一张封装图，不是 CU 电路图",
      "保留厂商原图的真实类型。没有足够依据时，不把上一代 CDNA 内部结构改名为 CDNA 5。"
    ],
    "limit": "Figure1 is a package render, NOT a full labelled CU architecture diagram. This research did not find a primary detailed CDNA5 CU/WGP diagram. Do not substitute CDNA3/4 diagrams without explicit generation labels.",
    "figures": [
      {
        "title": "MI455X 封装渲染",
        "kind": "官方封装渲染 · 非内部框图",
        "image": "https://rocm.blogs.amd.com/_images/mi455x-die.png",
        "original": "https://rocm.blogs.amd.com/_images/mi455x-die.png",
        "source": "https://rocm.blogs.amd.com/ecosystems-and-partners/cdna5-helios/README.html",
        "page": null,
        "figure": 1,
        "copyright": "© AMD",
        "layer": null
      },
      {
        "title": "Helios 机架",
        "kind": "官方机架图",
        "image": "https://rocm.blogs.amd.com/_images/helios-rack.png",
        "original": "https://rocm.blogs.amd.com/_images/helios-rack.png",
        "source": "https://rocm.blogs.amd.com/ecosystems-and-partners/cdna5-helios/README.html",
        "page": null,
        "figure": 2,
        "copyright": "© AMD",
        "layer": null
      }
    ]
  },
  "taalas": {
    "title": "Taalas HC1 Products",
    "source": "https://taalas.com/products/",
    "version": "HC1 Technology Demonstrator",
    "guide": [
      "可以看到板卡，还不能看到内部电路",
      "HC1 产品页公开了板卡和演示。模型专用路径的教学重绘与真实微架构披露是两个层次。"
    ],
    "limit": "Board photograph is not a model circuit or internal architecture figure. Does not disclose attention engine, weight encoding or physical PE array.",
    "figures": [
      {
        "title": "HC1 官方板卡照片",
        "kind": "官方板卡照片 · 非内部框图",
        "image": "https://taalas.com/h-content/uploads/2026/02/Taalas-HC1.png",
        "original": "https://taalas.com/h-content/uploads/2026/02/Taalas-HC1.png",
        "source": "https://taalas.com/products/",
        "page": null,
        "figure": null,
        "copyright": "© Taalas",
        "layer": null
      }
    ]
  },
  "zhenwu": {
    "title": "平头哥真武 M890 架构简介",
    "source": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
    "version": "M890 Architecture Introduction v1.0, 2026-09-16; SAIL SDK v2.2.0 docs",
    "guide": [
      "从 CE 继续看到 CU、缓存与异步搬运",
      "这里用的是 M890 架构简介 v1.0。V900 是后续型号，不能沿用这张图当作其内部结构。"
    ],
    "limit": "Do not apply M890 internals to V900. No physical TFU DP-array dimensions supplied. Source has restrictive copyright boilerplate despite publicly accessible docs; prefer direct official loading and links, do not claim a redistribution licence.",
    "figures": [
      {
        "title": "M890 芯片架构 · 图 2-1",
        "kind": "官方架构图",
        "image": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739069/37ca39e8b85560d9a9b6921f0ef1a947/fig2-1-m890-chip-arch.png",
        "original": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739069/37ca39e8b85560d9a9b6921f0ef1a947/fig2-1-m890-chip-arch.png",
        "source": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
        "page": 9,
        "figure": "2-1",
        "copyright": "© 平头哥 / T-Head",
        "layer": "chip"
      },
      {
        "title": "OAM8 环形互连",
        "kind": "官方系统拓扑",
        "image": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739231/dd29ba89230febcf7ad3cc0221f01599/fig7-1-ring-network-oam8.png",
        "original": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739231/dd29ba89230febcf7ad3cc0221f01599/fig7-1-ring-network-oam8.png",
        "source": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
        "page": 14,
        "figure": "7-1",
        "copyright": "© 平头哥 / T-Head",
        "layer": "chip"
      },
      {
        "title": "ICN64 拓扑",
        "kind": "官方系统拓扑",
        "image": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739387/4e320f148b920a48f66cfd1e2709a9e3/fig7-2-icn64-topology.png",
        "original": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739387/4e320f148b920a48f66cfd1e2709a9e3/fig7-2-icn64-topology.png",
        "source": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
        "page": 15,
        "figure": "7-2",
        "copyright": "© 平头哥 / T-Head",
        "layer": "chip"
      },
      {
        "title": "ICN1024 拓扑",
        "kind": "官方系统拓扑",
        "image": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739549/9db8c6ac0f6ecfd3a3cef1cbe60328e5/fig7-3-icn1024-topology.png",
        "original": "https://thead-marketing-public.oss-cn-hangzhou.aliyuncs.com/1790766739549/9db8c6ac0f6ecfd3a3cef1cbe60328e5/fig7-3-icn1024-topology.png",
        "source": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
        "page": 16,
        "figure": "7-3",
        "copyright": "© 平头哥 / T-Head",
        "layer": "chip"
      }
    ]
  },
  "bytedance": {
    "title": "No verified official microarchitecture figure located",
    "source": null,
    "version": "Reported projects; no official chip-level diagram confirmed",
    "guide": [],
    "limit": "Do not fill its gallery with a generic Groq diagram, company logo or media illustration labelled as official ByteDance chip architecture. An explicit unavailable state is accurate.",
    "figures": []
  },
  "rtx5090": {
    "title": "NVIDIA RTX Blackwell GPU Architecture",
    "source": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
    "version": "RTX Blackwell GB202 whitepaper v1.1",
    "guide": [
      "从整颗 GPU，找到一个 SM",
      "白皮书画完整 GB202：192 SM。RTX 5090 成品启用 170 SM，不能根据整片图臆测屏蔽位置。"
    ],
    "limit": "Retail RTX5090 has 170 enabled SMs and 96 MB L2; full GB202 diagram has 192 and 128 MB. Tensor Core transistor-level PE geometry remains unspecified.",
    "figures": [
      {
        "title": "完整 GB202 · GPU 顶层",
        "kind": "官方架构图",
        "image": "assets/figures/rtx-blackwell-page-08-figure.webp",
        "original": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf#page=8",
        "source": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
        "page": 8,
        "figure": 3,
        "copyright": "© NVIDIA",
        "layer": "chip"
      },
      {
        "title": "GPC / TPC / SM 层级",
        "kind": "官方架构图",
        "image": "assets/figures/rtx-blackwell-page-09-figure.webp",
        "original": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf#page=9",
        "source": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
        "page": 9,
        "figure": 4,
        "copyright": "© NVIDIA",
        "layer": "gpc"
      },
      {
        "title": "SM 四子分区",
        "kind": "官方架构图",
        "image": "assets/figures/rtx-blackwell-page-11-figure.webp",
        "original": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf#page=11",
        "source": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
        "page": 11,
        "figure": 5,
        "copyright": "© NVIDIA",
        "layer": "sm"
      },
      {
        "title": "SM 子分区与统一整数单元",
        "kind": "官方架构图",
        "image": "assets/figures/rtx-blackwell-page-12-figure.webp",
        "original": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf#page=12",
        "source": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
        "page": 12,
        "figure": 6,
        "copyright": "© NVIDIA",
        "layer": "partition"
      }
    ]
  },
  "rx9070": {
    "title": "AMD RDNA4 / Radeon RX9000 Series Keynote",
    "source": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf",
    "version": "RDNA4 / RX9000 launch, February 2025",
    "guide": [
      "这次看清 CU 内部与 AI 路径",
      "RDNA 4 图来自官方发布资料。WMMA 的指令 tile 与物理 PE 阵列的尺寸不是同一概念。"
    ],
    "limit": "WMMA instruction tile is not the physical PE array. Do not transfer this RDNA4 layout into CDNA5.",
    "figures": [
      {
        "title": "RDNA 4 CU 计算单元",
        "kind": "官方架构图",
        "image": "assets/figures/rdna4-keynote-page-08-figure.webp",
        "original": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf#page=8",
        "source": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf",
        "page": 8,
        "figure": null,
        "copyright": "© AMD",
        "layer": "cu"
      },
      {
        "title": "第二代 AI 加速器",
        "kind": "官方架构图",
        "image": "assets/figures/rdna4-keynote-page-10-figure.webp",
        "original": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf#page=10",
        "source": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf",
        "page": 10,
        "figure": null,
        "copyright": "© AMD",
        "layer": "matrix"
      },
      {
        "title": "AI 加速器矩阵路径",
        "kind": "官方架构图",
        "image": "assets/figures/rdna4-ai-accelerator.PNG",
        "original": "https://gpuopen.com/images/7_AMD_2nd_gen_AI_accelerator.4zKz0_Kh.PNG",
        "source": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf",
        "page": null,
        "figure": null,
        "copyright": "© AMD",
        "layer": "matrix"
      }
    ]
  }
};
window.OBS_CASE_DATA = {
  "reviewed": "2026-10-30",
  "config": {
    "hiddenSize": 5120,
    "layers": 40,
    "encoderLayers": 20,
    "decoderLayers": 20,
    "context": 1048576,
    "mainQueryHeads": 64,
    "mainHeadDim": 512,
    "queryLoRARank": 1280,
    "outputGroups": 8,
    "outputLoRARank": 1024,
    "moeExperts": 384,
    "sharedExperts": 1,
    "routedTopK": 6,
    "moeIntermediate": 2304,
    "swaWindow": 128,
    "kvSourceLayerIdsZeroBased": [
      2,
      8,
      14,
      20
    ],
    "indexSourceLayerIdsZeroBased": [
      2,
      8,
      14,
      20,
      24,
      28,
      32,
      36
    ],
    "attentionTopK": 512,
    "indexerQueryHeads": 32,
    "indexerHeadDim": 128,
    "decoderCandidateSourceLayerZeroBased": 20,
    "candidateTopKBlocks": 2048,
    "candidateBlockSize": 8,
    "candidatePositions": 16384,
    "engramLayerIdsZeroBased": [
      1,
      14
    ],
    "engramParamsBillions": 196,
    "residualStreams": 4,
    "dsparkBlocks": 3,
    "dsparkDraftPositions": 5,
    "dsparkTargetLayerIdsZeroBased": [
      37,
      38,
      39
    ],
    "dsparkRoutedExperts": 128,
    "dsparkRoutedTopK": 3,
    "vision": {
      "layers": 32,
      "hidden": 1024,
      "heads": 16,
      "patch": 14,
      "downsample": "3x3 pixel unshuffle",
      "maxImageTokens": 1024
    },
    "quantization": {
      "mainKV": "FP4 E2M1 + one E4M3 scale / 16 channels",
      "indexerKV": "MXFP4 /32 ue8m0",
      "routedExpertWeights": "MXFP4 /32 ue8m0",
      "swaKV": "FP8 / runtime doc specifies MXFP8",
      "fullCheckpointConfig": "fp8 dynamic, 32x32 block weights, expert_dtype fp4"
    }
  },
  "layers": [
    {
      "index": 0,
      "label": "L1",
      "segment": "encoder",
      "attention": "SWA",
      "window": 128,
      "moe": "1 shared + 6/384 routed",
      "engram": false
    },
    {
      "index": 1,
      "label": "L2",
      "segment": "encoder",
      "attention": "SWA",
      "window": 128,
      "moe": "1 shared + 6/384 routed",
      "engram": true
    },
    {
      "index": 2,
      "label": "L3",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Full",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 3,
      "label": "L4",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 4,
      "label": "L5",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 5,
      "label": "L6",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 6,
      "label": "L7",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 7,
      "label": "L8",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 2,
      "indexSourceIndex": 2,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 8,
      "label": "L9",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Full",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 9,
      "label": "L10",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 10,
      "label": "L11",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 11,
      "label": "L12",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 12,
      "label": "L13",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 13,
      "label": "L14",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 8,
      "indexSourceIndex": 8,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 14,
      "label": "L15",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Full",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": true,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 15,
      "label": "L16",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 16,
      "label": "L17",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 17,
      "label": "L18",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 18,
      "label": "L19",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 19,
      "label": "L20",
      "segment": "encoder",
      "attention": "CSA2",
      "compressionRatio": 2,
      "mode": "Reuse",
      "kvSourceIndex": 14,
      "indexSourceIndex": 14,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 20,
      "label": "L21",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Full",
      "kvSourceIndex": 20,
      "indexSourceIndex": 20,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 21,
      "label": "L22",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 20,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 22,
      "label": "L23",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 20,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 23,
      "label": "L24",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 20,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 24,
      "label": "L25",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reindex",
      "kvSourceIndex": 20,
      "indexSourceIndex": 24,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 25,
      "label": "L26",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 24,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 26,
      "label": "L27",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 24,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 27,
      "label": "L28",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 24,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 28,
      "label": "L29",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reindex",
      "kvSourceIndex": 20,
      "indexSourceIndex": 28,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 29,
      "label": "L30",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 28,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 30,
      "label": "L31",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 28,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 31,
      "label": "L32",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 28,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 32,
      "label": "L33",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reindex",
      "kvSourceIndex": 20,
      "indexSourceIndex": 32,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 33,
      "label": "L34",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 32,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 34,
      "label": "L35",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 32,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 35,
      "label": "L36",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 32,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 36,
      "label": "L37",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reindex",
      "kvSourceIndex": 20,
      "indexSourceIndex": 36,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 37,
      "label": "L38",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 36,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 38,
      "label": "L39",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 36,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    },
    {
      "index": 39,
      "label": "L40",
      "segment": "decoder",
      "attention": "CSA2",
      "compressionRatio": 1,
      "mode": "Reuse",
      "kvSourceIndex": 20,
      "indexSourceIndex": 36,
      "ownQuery": true,
      "ownSlidingWindowKV": true,
      "window": 128,
      "engram": false,
      "moe": "1 shared + 6/384 routed"
    }
  ],
  "modes": [
    {
      "name": "Full",
      "currentLayerComputes": [
        "main Q",
        "main KV",
        "indexer Q",
        "indexer K",
        "Top-512 indices",
        "SWA KV"
      ],
      "reuses": [],
      "meaning": "产生共享缓存与新的稀疏选择。Decoder Full的globalKV来自encoder最终输出。"
    },
    {
      "name": "Reindex",
      "currentLayerComputes": [
        "main Q",
        "indexer Q",
        "Top-512 indices",
        "SWA KV"
      ],
      "reuses": [
        "main KV",
        "indexer K"
      ],
      "meaning": "共享存储，但重新选择512个位置。Decoder较深Reindex只搜索共享候选池。"
    },
    {
      "name": "Reuse",
      "currentLayerComputes": [
        "main Q",
        "SWA KV"
      ],
      "reuses": [
        "main KV",
        "indexer K（通过已选索引间接使用）",
        "Top-512 indices"
      ],
      "meaning": "不再算indexer Q/分数；仍计算当前层query、SWA和attention结果。"
    }
  ],
  "story": [
    {
      "step": 1,
      "title": "输入到嵌入",
      "description": "文本经token embedding；有图像时先经32层ViT和两层MLP projector映射为语言hidden维度，再与文本一起输入。",
      "source": "v41-report §2.1.1"
    },
    {
      "step": 2,
      "title": "20层因果Encoder",
      "description": "L1–2是SWA；L3–20是三组[Full+5Reuse] CSA2(r=2)，每层后面都有MoE。Engram注入零基层1/14。",
      "source": "v41-report §4.2.1 + config"
    },
    {
      "step": 3,
      "title": "Encoder输出生成Decoder共享KV",
      "description": "Decoder globalKV投影来源为最终Encoder hidden，输入提示词大多数token不必完整走20层Decoder。",
      "source": "v41-report §2.2"
    },
    {
      "step": 4,
      "title": "重建局部SWA",
      "description": "Decoder只对最近窗口做bounded replay，近似恢复局部SWA状态；模型窗口128，DeepInfer默认保留suffix140包含额外保护/回退余量，不能混同。",
      "source": "v41-report §3.2.2; DeepInfer README"
    },
    {
      "step": 5,
      "title": "Decode遍历模型并复用缓存",
      "description": "新token经过40层；Decoder L21 Full构造top512和最多16384候选位置，L25/29/33/37 Reindex在候选池重选，其余复用；每层Q与SWA仍单独计算。",
      "source": "v41-report §2.3/4.2.1"
    },
    {
      "step": 6,
      "title": "MoE路由到6个专家",
      "description": "router为当前token从384路由专家选择6，另有1共享专家。DeepInfer将token按expert发到EP器件、执行专家GEMM后合并。",
      "source": "config + DeepInfer Q&A Expert-parallel load balancing"
    },
    {
      "step": 7,
      "title": "DSpark草稿与验证",
      "description": "3块drafter一次生成5个位置的draft，confidence head估计接受概率，调度选择验证长度；主模型验证后接受前缀，必要时回退。",
      "source": "v41-report §2.4.3; DeepInfer Q&A Speculative decoding"
    },
    {
      "step": 8,
      "title": "输出与上下文复用",
      "description": "sampler产生token并逐步输出；globalKV持久化，活跃SWA在host内存短期保留，缺失时bounded replay。",
      "source": "DeepInfer Q&A KV cache storage"
    }
  ],
  "deepinfer": {
    "isChip": false,
    "kind": "推理框架 / 软件与系统层",
    "repository": "https://github.com/deepseek-ai/DeepInfer",
    "commit": "553741557a57df44a46fb3ab72b6aafeaf945337",
    "supportedHardware": [
      "NVIDIA SM100 GPUs",
      "Huawei Ascend 950 NPUs"
    ],
    "releaseIncludes": [
      "离线推理",
      "优化kernel与model/sampler runtime",
      "Attention DP / balanced CP能力",
      "MoE EP + EPLB",
      "DSpark confidence-scheduled verification",
      "SWA bounded replay",
      "CPU/GPU异步调度",
      "batch invariant与确定采样（NVIDIA限定配置）",
      "结构化输出"
    ],
    "releaseDoesNotInclude": [
      "完整KV cache服务",
      "完整VE/Prefill/Decode分离服务",
      "prefill/decode跨DP副本在线负载均衡"
    ],
    "productionDeployment": {
      "visionEncoder": "E：一般单GPU实例，可用便宜器件",
      "prefill": "P：EP2–8/DP2–8，在HBM允许下取小规模",
      "decode": "D：EP64–128/DP64–128 Wide-EP",
      "parallelismCaveat": "README列balanced CP能力；部署Q&A说当前生产推荐不使用TP/CP，两者不要矛盾合并",
      "storage": "独立3FS集群保存block KV；SWA在本地host DRAM短期保留；in-flight KV在GPU内存"
    },
    "kernels": {
      "attention": "FlashMLA",
      "gemm": "DeepGEMM",
      "expertDispatchCombine": "DeepEP",
      "indexing": "DeepSelect",
      "other": "TileKernels + custom TileLang kernels"
    },
    "asyncSchedule": "GPU执行forward(N)与sample(N)时，CPU安排schedule(N+1)与post-process(N−1)，减少设备空闲。"
  },
  "figures": [
    {
      "title": "DeepSeek V4.1 Flash 总体架构（Figure 3）",
      "kind": "官方论文图",
      "pdfPageOneBased": 7,
      "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf#page=7",
      "localScreenshot": "work/deepseek-research/deepseek-v41-figure3.png",
      "caption": "官方报告Figure3，原始模型结构；已用Poppler截取并视觉检查。",
      "image": "assets/figures/deepseek-v41-figure3.png"
    },
    {
      "title": "CSA2 Full / Reindex / Reuse（Figure 4）",
      "kind": "官方论文图",
      "pdfPageOneBased": 10,
      "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf#page=10",
      "localScreenshot": "work/deepseek-research/deepseek-v41-figure4.png",
      "image": "assets/figures/deepseek-v41-figure4.png"
    },
    {
      "title": "DeepInfer / V4.1 Flash 生产推理系统",
      "kind": "官方仓库系统图",
      "url": "https://raw.githubusercontent.com/deepseek-ai/DeepInfer/553741557a57df44a46fb3ab72b6aafeaf945337/doc/images/architecture_overview.png",
      "source": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md",
      "caveat": "表示生产系统全貌，部分控制面/存储组件未开源",
      "image": "assets/figures/deepinfer-system.png"
    }
  ],
  "sources": [
    {
      "id": "v41-card",
      "title": "DeepSeek-V4.1-Flash official model card",
      "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/README.md",
      "supports": "CED、40层、552B主干、196BEngram、激活参数、CSA2、DSpark、视觉输入",
      "limit": "是厂商定义与报告，不是独立硬件性能实测"
    },
    {
      "id": "v41-config",
      "title": "官方模型 config.json（已核对1017一致）",
      "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/config.json",
      "supports": "模型精确参数、层号、共享源、专家数、query/indexer尺寸",
      "local": "work/deepseek-research/config.json"
    },
    {
      "id": "v41-1017",
      "title": "DeepSeek-V4.1-Flash-1017 model card",
      "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/1bae0e1088993b9b82de08f59de5be5a34e42170/README.md",
      "supports": "1017为minor checkpoint update；本次比较config与原版逐行一致",
      "limit": "不外推为架构改变；更新成绩是厂商测试"
    },
    {
      "id": "v41-report",
      "title": "DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression",
      "url": "https://arxiv.org/html/2609.19969v1",
      "pdf": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/resolve/main/DeepSeek_V41_Tech_Report.pdf",
      "supports": "2.2 CED、2.3 CSA2、2.4扩展、3.2系统、4.2.1精确层配置",
      "local": "work/deepseek-research/DeepSeek_V41_Tech_Report.pdf"
    },
    {
      "id": "deepinfer-readme",
      "title": "DeepInfer README",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/README.md",
      "supports": "官方框架定位，离线release、kernel生态、硬件、已含/未含功能",
      "limit": "生产架构图不等于本repo包含完整在线服务"
    },
    {
      "id": "deepinfer-qa",
      "title": "DeepSeek V4.1 Flash Inference Deployment Q&A",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md",
      "supports": "E/P/D分离、EP/DP、KV存储、bounded replay、低精度、异步调度",
      "limit": "生产部署推荐不是所有硬件的最低运行要求"
    },
    {
      "id": "deepinfer-crosslayer",
      "title": "SharedLayerTopology / CrossLayerRuntime",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/cross_layer.py",
      "supports": "配置推导跨层KV、index-K、Top-K共享及合法性验证"
    },
    {
      "id": "deepinfer-layer",
      "title": "DeepseekDecoderLayer.forward",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/decoder_layer.py",
      "supports": "Engram干预钩子、mHC/norm、attention、MoE调用顺序"
    },
    {
      "id": "deepinfer-index",
      "title": "Indexer implementation",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/index_attn.py",
      "supports": "candidate pool / sparse indexer调用"
    },
    {
      "id": "deepinfer-yoco",
      "title": "YOCO boundary / bounded decoder path",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/yoco.py",
      "supports": "CED consumer边界与prefill压缩路径"
    },
    {
      "id": "deepinfer-moe",
      "title": "DeepseekMoE",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py",
      "supports": "路由专家和融合实现"
    },
    {
      "id": "deepinfer-offline",
      "title": "Official offline inference example",
      "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/examples/offline_inference.py",
      "supports": "官方运行方式及EP/DP/CP参数",
      "limit": "示例默认maxlen32768不等于模型架构maxcontext"
    }
  ]
};
/* Release version is defined once in data.js. */
window.OBS_DATA.sources.push(...[
  {
    "id": "detail-groq",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "Groq 3 LP30 / LPX, official March-August 2026 material",
    "title": "Inside NVIDIA Groq 3 LPX",
    "url": "https://developer.nvidia.com/blog/inside-nvidia-groq-3-lpx-the-low-latency-inference-accelerator-for-the-nvidia-vera-rubin-platform/",
    "supports": "Groq 3 LPU 功能块与异构 Decode 示例。",
    "limit": "Official Figure3 is explicitly simplified; private matrix-unit physical PE geometry is not thereby disclosed. No early GroqChip1 counts should be ported to Groq3."
  },
  {
    "id": "detail-zhenwu",
    "publisher": "T-Head 开发者文档",
    "type": "official",
    "date": "2026-09-16",
    "title": "平头哥真武 M890 架构简介",
    "url": "https://developer.t-head.cn/docs_center/doc_detail/index.html?projectId=48&chapterId=768",
    "supports": "M890 的 CE/CU、L1/TSM、寄存器与 AIU 等功能分工。",
    "limit": "10 CE×4 CU 与总39 CU 存在原文口径冲突，保留差异；不套用于V900。"
  },
  {
    "id": "detail-rtx5090",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "RTX Blackwell GB202 whitepaper v1.1",
    "title": "NVIDIA RTX Blackwell GPU Architecture",
    "url": "https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf",
    "supports": "完整 GB202、GPC/TPC、SM、四个子分区及 RTX 5090 启用规格。",
    "limit": "完整芯片 192 SM；RTX 5090 启用 170 SM。未披露物理 Tensor PE 布线。"
  },
  {
    "id": "detail-rx9070",
    "publisher": "AMD",
    "type": "official",
    "date": "RDNA4 / RX9000 launch, February 2025",
    "title": "AMD RDNA4 / Radeon RX9000 Series Keynote",
    "url": "https://www.amd.com/content/dam/amd/en/documents/products/graphics/radeon/amd-radeon-rx-9000-series-keynote.pdf",
    "supports": "RDNA 4 CU 与第二代 AI 加速器。",
    "limit": "不迁移到CDNA5；WMMA tile不等于物理PE尺寸。"
  },
  {
    "id": "v41-card",
    "publisher": "DeepSeek 官方",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepSeek-V4.1-Flash official model card",
    "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/README.md",
    "supports": "CED、40层、552B主干、196BEngram、激活参数、CSA2、DSpark、视觉输入",
    "limit": "是厂商定义与报告，不是独立硬件性能实测"
  },
  {
    "id": "v41-config",
    "publisher": "DeepSeek 官方",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "官方模型 config.json（已核对1017一致）",
    "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/config.json",
    "supports": "模型精确参数、层号、共享源、专家数、query/indexer尺寸",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "v41-1017",
    "publisher": "DeepSeek 官方",
    "type": "official",
    "date": "2026-10-17",
    "title": "DeepSeek-V4.1-Flash-1017 model card",
    "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/blob/1bae0e1088993b9b82de08f59de5be5a34e42170/README.md",
    "supports": "1017为minor checkpoint update；本次比较config与原版逐行一致",
    "limit": "不外推为架构改变；更新成绩是厂商测试"
  },
  {
    "id": "v41-report",
    "publisher": "DeepSeek 官方",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepSeek-V4.1-Flash: Pushing the Limits of KV Cache Compression",
    "url": "https://arxiv.org/html/2609.19969v1",
    "supports": "2.2 CED、2.3 CSA2、2.4扩展、3.2系统、4.2.1精确层配置",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-readme",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepInfer README",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/README.md",
    "supports": "官方框架定位，离线release、kernel生态、硬件、已含/未含功能",
    "limit": "生产架构图不等于本repo包含完整在线服务"
  },
  {
    "id": "deepinfer-qa",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepSeek V4.1 Flash Inference Deployment Q&A",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/doc/inference_deployment_qa.md",
    "supports": "E/P/D分离、EP/DP、KV存储、bounded replay、低精度、异步调度",
    "limit": "生产部署推荐不是所有硬件的最低运行要求"
  },
  {
    "id": "deepinfer-crosslayer",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "SharedLayerTopology / CrossLayerRuntime",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/cross_layer.py",
    "supports": "配置推导跨层KV、index-K、Top-K共享及合法性验证",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-layer",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepseekDecoderLayer.forward",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/decoder_layer.py",
    "supports": "Engram干预钩子、mHC/norm、attention、MoE调用顺序",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-index",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "Indexer implementation",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/index_attn.py",
    "supports": "candidate pool / sparse indexer调用",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-yoco",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "YOCO boundary / bounded decoder path",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/yoco.py",
    "supports": "CED consumer边界与prefill压缩路径",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-moe",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "DeepseekMoE",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py",
    "supports": "路由专家和融合实现",
    "limit": "仅依据本次固定版本；教学映射不等于实际测量。"
  },
  {
    "id": "deepinfer-offline",
    "publisher": "DeepSeek · DeepInfer",
    "type": "official",
    "date": "2026 · 固定 commit / 报告版本",
    "title": "Official offline inference example",
    "url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/examples/offline_inference.py",
    "supports": "官方运行方式及EP/DP/CP参数",
    "limit": "示例默认maxlen32768不等于模型架构maxcontext"
  }
]);

(() => {
 const c=window.OBS_DATA.chips.find(c=>c.id==='zhenwu');
 Object.assign(c,{name:'真武 M890 · 官方架构已公开',short:'真武 M890',kind:'CE / CU / AIU · V900另分代',family:'zhenwu',status:'official',statusLabel:'M890 技术文档 v1.0',tag:'CE → CU → TFU / VALU',headline:'已有资料，能够从 CE 拆到 CU 与异步张量搬运',summary:'依据平头哥 M890 官方架构简介 v1.0，可逐层查看 CE/CU 组织、LLC/L2/L1+TSM 三级存储、SREG/VREG 寄存器以及 AIU 异步多维张量加载；这些细节不代替后续 V900。',memory:'10 CE / 39 CU',memoryType:'M890 公开口径（保留差异）',bandwidth:'LLC → L2 → TSM',bandwidthType:'三级缓存 + AIU 异步搬运',control:'全局分发 GD + CU 线程调度器（分发至 5 类执行单元）',storage:'全芯片共享 LLC → CE 内共享 L2 → CU 本地 L1 / TSM + SREG / VREG',compute:'每 CU：VALU（向量）、TFU（张量）、SALU（标量）、SFU（特殊函数）、LSU ×4（访存）',network:'OAM8 环形互连与 ICN64 / ICN1024 系统拓扑；片内职责见官方图 2-1',software:'SAIL SDK v2.2.0；M890 架构简介 v1.0',flexibility:'训练与推理的可编程 GPU；不将 M890 内部参数外推至 V900',tradeoff:'标明文档版本与原文口径差异（10 CE × 4 CU vs 总 39 CU），比跨代拼接数字更可靠。',prefill:'大矩阵吞吐下，AIU 可异步将多维张量从 Global Memory 搬入 TSM，与 TFU 张量计算形成重叠。',decode:'逐 token 生成受限于显存带宽与 KV 读取；LSU ×4 一般访存、AIU 异步加载与寄存器驻留需结合具体 kernel 分析。',notes:'依据 M890 官方架构简介 v1.0 核对。原文同时出现 10 CE × 4 CU 与总 39 CU，此处原样保留差异；V900 不沿用。',sources:['detail-zhenwu','zhenwu','zhenwum890'],cards:[['新证据','从证据缺口进入真实结构','M890 的官方开发者文档已公开，提供可点击的 CE / CU / 三级缓存与 AIU 职责示意。'],['重要分工','LSU ×4 普通访存 vs AIU 异步张量搬运','每 CU 含 4 个 LSU 负责一般加载/存储；AIU 独立承担 Global Memory 到 TSM 的异步多维张量搬运。'],['保留差异','39 CU 与 10×4 的原文口径','严格保留文档原文的两处计数表述，不自行猜测某个 CU 被屏蔽，也不把 M890 结构转移到 V900。']]});
 const g=window.OBS_DATA.chips.find(c=>c.id==='groq');g.sources.unshift('detail-groq');g.notes='新增Groq3官方内部功能图与GPU attention / LPU FFN的异构Decode示例，版本与系统边界分别记录。';
 const r=window.OBS_DATA.chips.find(c=>c.id==='rtx5090');r.sources.unshift('detail-rtx5090');r.notes='完整GB202：192SM / 128MB L2；RTX5090启用170SM / 96MB L2。深钻不臆测被屏蔽位置。';
 window.OBS_DATA.chips.find(c=>c.id==='rx9070').sources.unshift('detail-rx9070');
})();

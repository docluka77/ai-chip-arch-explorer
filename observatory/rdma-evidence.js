/* Reviewed primary-source reading records; no third-party paper text or images bundled. */
'use strict';
(() => {
const D=window.OBS_RDMA_DATA;
D.papers=[
  {
    "id": "dcell",
    "short": "DCell",
    "title": "DCell: A Scalable and Fault-Tolerant Network Structure for Data Centers",
    "year": 2008,
    "venue": "ACM SIGCOMM 2008",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Chuanxiong Guo",
      "Haitao Wu",
      "Kun Tan",
      "Lei Shi",
      "Yongguang Zhang",
      "Songwu Lu"
    ],
    "authors_url": "https://www.microsoft.com/en-us/research/publication/dcell-a-scalable-and-fault-tolerant-network-structure-for-data-centers/",
    "doi": "10.1145/1402958.1402968",
    "question": "只用低端交换机与少量服务器网口，网络如何扩到百万节点？",
    "problem": "树状网络上层瓶颈及单点故障。",
    "mechanism": "递归DCell：低层单元之间用服务器直连形成完全图式互联；服务器同时转发；DFR结合本地绕行与更高层代理绕行。",
    "cost": "每层增加服务器端口、直连布线与转发负担；结构与路由要共同设计。",
    "not_for": "不是现代RDMA transport或RNIC芯片；不能据此推断今天RoCE、NVLink或某网卡的实现。",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 3,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/dcell.pdf#page=3",
        "read_for": "n=4时，5个DCell0如何组成20-server DCell1。"
      },
      {
        "label": "Figures 7–8",
        "pdf_page_one_based": 8,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/dcell.pdf#page=8",
        "read_for": "节点/链路随机失效时，DFR与最短路的可达性差别。"
      }
    ],
    "experiment": {
      "environment": "论文§7.2：20-server DCell1，Dell 755DT、2.33GHz双核、2GB内存、Intel PRO/1000 PT四口网卡仅用两口、1GbE D-Link mini-switches。另有拓扑仿真。",
      "result": "小型原型验证故障绕路，特定多流实验吞吐约为传统树的2倍；百万节点规模来自结构分析与仿真。",
      "limit": "20节点物理原型不能写成百万节点部署实测。"
    },
    "next": [
      "bcube",
      "roce_scale"
    ],
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/dcell.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-dcell"
  },
  {
    "id": "bcube",
    "short": "BCube",
    "title": "BCube: A High Performance, Server-centric Network Architecture for Modular Data Centers",
    "year": 2009,
    "venue": "ACM SIGCOMM 2009",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Chuanxiong Guo",
      "Guohan Lu",
      "Dan Li",
      "Haitao Wu",
      "Xuan Zhang",
      "Yunfeng Shi",
      "Chen Tian",
      "Yongguang Zhang",
      "Songwu Lu"
    ],
    "authors_url": "https://conferences.sigcomm.org/sigcomm/2009/program.php",
    "doi": "10.1145/1592568.1592577",
    "question": "模块化机房里，如何同时加速一对一、一对多与全互联通信？",
    "problem": "集装箱数据中心维修困难，带宽密集任务需要多条独立路径。",
    "mechanism": "每个服务器连接k+1层小交换机；递归构造BCube，生成k+1条并行路径；端系统BSR选择路径并处理故障。",
    "cost": "服务器多网口、源路由和转发CPU开销、更多布线。",
    "not_for": "不是Clos的别名，也不是今天GPU scale-up交换机方案。",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 3,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/comm136-guo.pdf#page=3",
        "read_for": "BCube1(n=4)的16服务器与8交换机。"
      },
      {
        "label": "Figure 4",
        "pdf_page_one_based": 4,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/comm136-guo.pdf#page=4",
        "read_for": "两个端点如何获得多条并行路径。"
      }
    ],
    "experiment": {
      "environment": "§7.3：16 Dell Precision490服务器，8个D-Link 8口1GbE交换机，Intel四口网卡，Windows Server2003；关闭Ethernet xon/xoff，测试不访问磁盘。",
      "result": "原型展示并行路径、故障退化与带宽密集应用加速；仿真比较all-to-all容量。",
      "limit": "需同时阅读§7.4 CPU转发成本，不能只看总带宽。"
    },
    "next": [
      "dcell",
      "byteps"
    ],
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/comm136-guo.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-bcube"
  },
  {
    "id": "dcqcn",
    "short": "DCQCN",
    "title": "Congestion Control for Large-Scale RDMA Deployments",
    "year": 2015,
    "venue": "ACM SIGCOMM 2015",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Yibo Zhu",
      "Haggai Eran",
      "Daniel Firestone",
      "Chuanxiong Guo",
      "Marina Lipshteyn",
      "Yehonatan Liron",
      "Jitendra Padhye",
      "Shachar Raindel",
      "Mohamad Haj Yahia",
      "Ming Zhang"
    ],
    "authors_url": "https://www.microsoft.com/en-us/research/project/rdma-for-cloud-computing/",
    "doi": "10.1145/2785956.2787484",
    "question": "PFC已经防丢包，为什么还必须端到端控制发送速率？",
    "problem": "PFC按链路/优先级暂停，造成不公平、拥塞扩散和无辜victim-flow受损。",
    "mechanism": "交换机根据队列ECN标记；接收端NP返回CNP；发送端RP维护alpha和目标/当前速率，降速后按定时/byte阶段恢复；ECN应早于PFC保护阈值触发。",
    "cost": "需要RNIC速率控制、CNP支持、交换机阈值和缓冲参数调优；反馈需要往返时间。",
    "not_for": "不是可靠重传协议，也不等于关闭PFC；不能凭DCQCN声称突发incast都能避免。",
    "key_figures": [
      {
        "label": "Figures 3–4",
        "pdf_page_one_based": 3,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p523.pdf#page=3",
        "read_for": "沿PFC暂停链追踪公平性与victim-flow。"
      },
      {
        "label": "Figures 5–7",
        "pdf_page_one_based": 5,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p523.pdf#page=5",
        "read_for": "ECN→NP/CNP→RP完整反馈环。"
      },
      {
        "label": "Figures 8–9",
        "pdf_page_one_based": 6,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p523.pdf#page=6",
        "read_for": "机制是否修复前面的两个具体反例。"
      }
    ],
    "experiment": {
      "environment": "40Gbps三层Clos，4 ToR+4 leaf+2 spine，Arista7050QX32；ConnectX-3 Pro原型，另用480机器一天生产trace提取流大小分布并生成测试流。",
      "result": "解决所示PFC不公平与victim-flow问题，并在分布式负载下改善吞吐及尾部完成时间。",
      "limit": "trace是提取流大小分布的合成测试依据，不能称原封不动回放全部生产流；非所有负载统一倍数。"
    },
    "next": [
      "roce_scale",
      "timely",
      "hpcc",
      "byteexpress"
    ],
    "pdf_url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p523.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-dcqcn"
  },
  {
    "id": "pingmesh",
    "short": "Pingmesh",
    "title": "Pingmesh: A Large-Scale System for Data Center Network Latency Measurement and Analysis",
    "year": 2015,
    "venue": "ACM SIGCOMM 2015",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Chuanxiong Guo",
      "Lihua Yuan",
      "Dong Xiang",
      "Yingnong Dang",
      "Ray Huang",
      "Dave Maltz",
      "Zhaoyi Liu",
      "Vin Wang",
      "Bin Pang",
      "Hua Chen",
      "Zhi-Wei Lin",
      "Varugis Kurien"
    ],
    "authors_url": "https://sysnetome.com/publication.html",
    "doi": "10.1145/2785956.2787496",
    "question": "应用说网络慢，怎样用持续证据判断是否真是网络故障？",
    "problem": "临时ping和单设备计数器难覆盖大机房，静默丢包、尾延迟和非网络故障易混淆。",
    "mechanism": "Controller按拓扑生成pinglist；全服务器Agent持续TCP/HTTP探测；分层mesh覆盖ToR与数据中心；Cosmos/SCOPE分析、可视化和SLA追踪。",
    "cost": "额外探测、日志存储和分析成本，需限频；端到端测量也包含主机/NIC影响。",
    "not_for": "不是RDMA传输协议，不控制拥塞，也不承诺每一对服务器每时刻都实际直测。",
    "key_figures": [
      {
        "label": "Figure 2",
        "pdf_page_one_based": 4,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/pingmesh_sigcomm2015.pdf#page=4",
        "read_for": "Controller、Agent、存储分析三部分的闭环。"
      },
      {
        "label": "Figure 7",
        "pdf_page_one_based": 10,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/pingmesh_sigcomm2015.pdf#page=10",
        "read_for": "正常硬件计数器没有解释的静默随机丢包如何被探测到。"
      }
    ],
    "experiment": {
      "environment": "Microsoft生产数据中心持续运行超过4年，每天数十TB测量；每服务器通常探测2000–5000 peer，受频率和数量阈值限制。",
      "result": "给出不同Pod/跨Pod延迟分布，定位silent-drop和packet-blackhole事故；Figure3评估Agent资源占用。",
      "limit": "监控关联是诊断证据，不自动证明唯一根因；不能把TCP探测RTT当纯交换机排队延迟。"
    },
    "next": [
      "collie",
      "roce_scale",
      "byteexpress"
    ],
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/pingmesh_sigcomm2015.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-pingmesh"
  },
  {
    "id": "roce_scale",
    "short": "RoCE at Scale",
    "title": "RDMA over Commodity Ethernet at Scale",
    "year": 2016,
    "venue": "ACM SIGCOMM 2016",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Chuanxiong Guo",
      "Haitao Wu",
      "Zhong Deng",
      "Gaurav Soni",
      "Jianxi Ye",
      "Jitendra Padhye",
      "Marina Lipshteyn"
    ],
    "authors_url": "https://www.microsoft.com/en-us/research/publication/rdma-commodity-ethernet-scale/",
    "doi": "10.1145/2934872.2934908",
    "question": "从实验室的快RDMA，走到生产以太网需要解决哪些失败模式？",
    "problem": "VLAN优先级限制跨IP大规模部署；PFC deadlock、pause storm、transport livelock、慢接收端破坏服务。",
    "mechanism": "DSCP到优先级/PFC映射支持L3范围；梳理并修复PFC和NIC故障模式；配合DCQCN、监控、配置检查和分阶段上线。",
    "cost": "交换机/NIC配置协同，固件修复，持续监控和运维；安全性来自多个机制共同工作。",
    "not_for": "论文是保留并管理PFC的2016部署经验，不能当作2026有损RNIC或某创业公司产品验证。",
    "key_figures": [
      {
        "label": "Figure 3",
        "pdf_page_one_based": 3,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/rdma_sigcomm2016.pdf#page=3",
        "read_for": "VLAN-based与DSCP-based PFC标识路径。"
      },
      {
        "label": "Figure 4",
        "pdf_page_one_based": 5,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/rdma_sigcomm2016.pdf#page=5",
        "read_for": "Ethernet flooding与PFC传播如何形成deadlock。"
      },
      {
        "label": "Figure 5",
        "pdf_page_one_based": 6,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/rdma_sigcomm2016.pdf#page=6",
        "read_for": "故障NIC如何触发持续pause storm。"
      }
    ],
    "experiment": {
      "environment": "Microsoft生产RoCEv2部署一年半经验；另含三层Clos吞吐测试和两ToR的慢接收者复现实验。",
      "result": "展示网络/主机故障会让吞吐与端到端延迟严重恶化；以检测、隔离、配置与协议修复共同恢复。",
      "limit": "案例验证与小型控制测试结合，不能读成单一算法保证所有网络永不死锁。"
    },
    "next": [
      "dcqcn",
      "irn",
      "pingmesh",
      "collie"
    ],
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/rdma_sigcomm2016.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-roce_scale"
  },
  {
    "id": "byteps",
    "short": "BytePS",
    "title": "A Unified Architecture for Accelerating Distributed DNN Training in Heterogeneous GPU/CPU Clusters",
    "year": 2020,
    "venue": "USENIX OSDI 2020",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Yimin Jiang",
      "Yibo Zhu",
      "Chang Lan",
      "Bairen Yi",
      "Yong Cui",
      "Chuanxiong Guo"
    ],
    "authors_url": "https://www.usenix.org/conference/osdi20/presentation/jiang",
    "question": "GPU训练时，闲置CPU和网络带宽能否用于梯度汇总？",
    "problem": "纯all-reduce或传统PS不能充分利用异构集群额外CPU/带宽，CPU optimizer又可能成为瓶颈。",
    "mechanism": "将梯度求和Summation Service与模型相关optimizer更新分开；CPU用AVX求和，GPU执行optimizer；优化PCIe/NVLink与跨机通信，all-reduce和PS成为框架特例。",
    "cost": "注册内存、CPU内存带宽、额外CPU服务器/调度与pipeline复杂性；优化依赖拓扑。",
    "not_for": "主要是dense DNN训练梯度聚合，不是MoE token dispatch、KV-cache迁移或通用RDMA拥塞控制。",
    "key_figures": [
      {
        "label": "Figure 5",
        "pdf_page_one_based": 6,
        "url": "https://www.usenix.org/system/files/osdi20-jiang.pdf#page=6",
        "read_for": "GPU worker、CPU Summation Service和参数更新的职责分离。"
      },
      {
        "label": "Figure 6",
        "pdf_page_one_based": 7,
        "url": "https://www.usenix.org/system/files/osdi20-jiang.pdf#page=7",
        "read_for": "PCIe-only机内拓扑如何限制数据流。"
      },
      {
        "label": "Figures 15–16",
        "pdf_page_one_based": 14,
        "url": "https://www.usenix.org/system/files/osdi20-jiang.pdf#page=14",
        "read_for": "六种模型、8–256GPU的吞吐与资源基线。"
      }
    ],
    "experiment": {
      "environment": "TeslaV100 32GB，8–256GPU，100GbE RDMA；同时测PCIe-only和NVLink机内拓扑。对照Horovod+NCCL及TensorFlow/MXNet原生RDMA PS；有额外CPU时CPU机器数等于GPU机器数。",
      "result": "报告最高较all-reduce快84%、较PS快245%；优势随模型通信/计算比和可用CPU资源变化。",
      "limit": "带额外CPU的比较要展示资源投入；论文最优性受所建模带宽/拓扑假设限制。"
    },
    "code_url": "https://github.com/bytedance/byteps",
    "next": [
      "byteexpress",
      "deepseek_v3",
      "megascale_moe"
    ],
    "pdf_url": "https://www.usenix.org/system/files/osdi20-jiang.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-byteps"
  },
  {
    "id": "collie",
    "short": "Collie",
    "title": "Collie: Finding Performance Anomalies in RDMA Subsystems",
    "year": 2022,
    "venue": "USENIX NSDI 2022",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Xinhao Kong",
      "Yibo Zhu",
      "Huaping Zhou",
      "Zhuo Jiang",
      "Jianxi Ye",
      "Chuanxiong Guo",
      "Danyang Zhuo"
    ],
    "authors_url": "https://www.usenix.org/conference/nsdi22/presentation/kong",
    "question": "厂商微架构不可见，怎样系统找出会触发RDMA异常的应用负载？",
    "problem": "常规微基准覆盖不足，RNIC、PCIe、内存、CPU组合可产生吞吐骤降或PFC storm。",
    "mechanism": "构造verbs/队列/内存/批量等工作负载搜索空间，以性能和诊断计数器驱动模拟退火；用minimal feature set归纳触发条件并避开重复区域。",
    "cost": "需要实际硬件、计数器、反复压测与搜索时间；不能保证找齐所有异常或自动确定内部根因。",
    "not_for": "不是可靠传输协议，也不是形式化验证；MFS是最小触发条件集合，不必一一对应独立硬件bug。",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 4,
        "url": "https://www.usenix.org/system/files/nsdi22-paper-kong.pdf#page=4",
        "read_for": "把RNIC内部、PCIe、内存和部署环境看成整体。"
      },
      {
        "label": "Figure 2",
        "pdf_page_one_based": 5,
        "url": "https://www.usenix.org/system/files/nsdi22-paper-kong.pdf#page=5",
        "read_for": "Workload engine→计数器→search→MFS闭环。"
      },
      {
        "label": "Figures 4–5",
        "pdf_page_one_based": 12,
        "url": "https://www.usenix.org/system/files/nsdi22-paper-kong.pdf#page=12",
        "read_for": "随机、BO、仅性能计数器和诊断计数器搜索的时间差。"
      }
    ],
    "experiment": {
      "environment": "8种RDMA子系统，CX5/CX6等25–200Gbps NIC、Intel/AMD CPU、PCIe3/4、部分V100/A100；Table1列硬件组合。",
      "result": "重现3个已知并发现15个新异常；新异常获厂商确认，论文时7个已修。§7.3展示如何指导RPC库和分布式ML框架规避。",
      "limit": "厂商确认不等于公开披露全部微架构；论文是NSDI2022，勿与NSDI2023的Husky混淆。"
    },
    "next": [
      "guidelines",
      "byteexpress",
      "irn"
    ],
    "pdf_url": "https://www.usenix.org/system/files/nsdi22-paper-kong.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-collie"
  },
  {
    "id": "byteexpress",
    "short": "ByteExpress",
    "title": "Deploying RDMA for Distributed Inference and Training at Scale",
    "year": 2026,
    "venue": "arXiv:2610.12815v2, 12 Oct 2026",
    "group": "guo_core",
    "guo_coauthor": true,
    "evidence_status": "Author preprint v2; submitted8Oct2026, revised12Oct2026. Not a peer-reviewed or independently reproduced product benchmark.",
    "authors": [
      "Yibo Huang",
      "Yi Cui",
      "Yukai Huang",
      "Huaping Zhou",
      "Jiancong Tong",
      "Zhaoyu Wu",
      "Gen Miao",
      "Haoran Wei",
      "Boyan Ding",
      "Zhuo Jiang",
      "Jianxi Ye",
      "Yibo Zhu",
      "Chuanxiong Guo",
      "Yang Xu",
      "Jie Wu"
    ],
    "authors_url": "https://arxiv.org/abs/2610.12815v2",
    "question": "RC硬件卸载之外，生产推理/训练RPC还缺哪几层软件控制？",
    "problem": "动态大消息、许多逻辑连接、incast、内存注册与故障恢复相互作用。",
    "mechanism": "bemalloc注册内存池与跨层buffer ownership；RC QP复用、每线程资源域/共享CQ；receive credits保护RQ；独立软件send-window限制在途byte；Archon负责请求重试、replica选择与TCP fallback。",
    "cost": "缓冲生命周期、QP共享公平性、credit/window参数、RPC幂等与恢复复杂性；共享QP仍有阻塞风险。",
    "not_for": "这是参数服务器式推荐推理/训练通信层，不是LLM MoE all-to-all库，不是新RNIC；不是作者新公司产品性能证据。",
    "key_figures": [
      {
        "label": "Figure 2",
        "pdf_page_one_based": 3,
        "url": "https://arxiv.org/pdf/2610.12815v2#page=3",
        "read_for": "Archon RPC、ByteExpress和RC RNIC的三层职责。"
      },
      {
        "label": "Figure 7",
        "pdf_page_one_based": 6,
        "url": "https://arxiv.org/pdf/2610.12815v2#page=6",
        "read_for": "WR链的in-flight/pending/free与RQ信用。"
      },
      {
        "label": "Figure 16",
        "pdf_page_one_based": 11,
        "url": "https://arxiv.org/pdf/2610.12815v2#page=11",
        "read_for": "匹配operation load的生产Fetch延迟时间序列；结合Tables5–7。"
      }
    ],
    "experiment": {
      "environment": "推理300参数服务器+124 ranker，训练124参数服务器+346 trainer；均25Gbps CX5。微基准另测25/100/200Gbps和1/4KB MTU。",
      "result": "推理Fetch mean12.6→8.1ms、P99 63.1→35.5ms，CPU57.45%→51.31%（相对降10.69%，非10.69百分点）。训练Push P99 TCP1.03s→HW-only RDMA1.12s→HW+SW268ms。",
      "limit": "训练无PFC pause仅为观测期结果，PFC仍启用；未证明可禁PFC、无拥塞或通用exactly-once；v1原题Large-Scale Inference and Training Workloads不可当v2标题。"
    },
    "next": [
      "erpc",
      "dcqcn",
      "collie"
    ],
    "pdf_url": "https://arxiv.org/pdf/2610.12815v2",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-byteexpress"
  },
  {
    "id": "farm",
    "short": "FaRM",
    "title": "FaRM: Fast Remote Memory",
    "year": 2014,
    "venue": "USENIX NSDI 2014",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Aleksandar Dragojević",
      "Dushyanth Narayanan",
      "Orion Hodson",
      "Miguel Castro"
    ],
    "authors_url": "https://www.microsoft.com/en-us/research/publication/farm-fast-remote-memory/",
    "question": "把远端内存当共享对象空间，事务系统怎样从one-sided RDMA受益？",
    "problem": "TCP数据访问开销大，直接远程读还面对一致性、地址翻译和连接缓存成本。",
    "mechanism": "对象/region共享地址空间、版本验证的lock-free RDMA reads；写事务OCC+优化2PC、消息和日志；数据与计算collocation减少跨机。",
    "cost": "需要注册内存、版本元数据、对象布局和故障恢复；多个依赖读仍要多轮往返。",
    "not_for": "one-sided RDMA不是所有KV/RPC都最佳；不能把“远CPU不参与某次read”写成系统无CPU。",
    "key_figures": [
      {
        "label": "Figures 4–5",
        "pdf_page_one_based": 5,
        "url": "https://www.usenix.org/system/files/conference/nsdi14/nsdi14-paper-dragojevic.pdf#page=5",
        "read_for": "物理连续内存与连接复用对RDMA性能的决定性影响。"
      },
      {
        "label": "Figure 9",
        "pdf_page_one_based": 9,
        "url": "https://www.usenix.org/system/files/conference/nsdi14/nsdi14-paper-dragojevic.pdf#page=9",
        "read_for": "相邻对象的版本如何支持lock-free读取。"
      },
      {
        "label": "Figure 12",
        "pdf_page_one_based": 11,
        "url": "https://www.usenix.org/system/files/conference/nsdi14/nsdi14-paper-dragojevic.pdf#page=11",
        "read_for": "lookup吞吐/延迟随集群规模的关系。"
      }
    ],
    "experiment": {
      "environment": "20机器40Gbps ConnectX3 RoCE，单SX1036交换机；WindowsServer2012R2、双E5-2665、128GB DRAM。",
      "result": "原论文摘要报告20机167M lookup/s和31μs；正文展示数据布局、页表缓存、QP复用贡献。",
      "limit": "Microsoft网页摘要曾写160M，展示数字以所链接原PDF版本167M为准；数据项/批量/读写比例要随结果一起读。"
    },
    "next": [
      "herd",
      "fasst",
      "guidelines"
    ],
    "pdf_url": "https://www.usenix.org/system/files/conference/nsdi14/nsdi14-paper-dragojevic.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-farm"
  },
  {
    "id": "herd",
    "short": "HERD",
    "title": "Using RDMA Efficiently for Key-Value Services",
    "year": 2014,
    "venue": "ACM SIGCOMM 2014",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Anuj Kalia",
      "Michael Kaminsky",
      "David G. Andersen"
    ],
    "authors_url": "https://istc-cc.cmu.edu/publications/papers/2014/herd_readable_abs.shtml",
    "doi": "10.1145/2619239.2626299",
    "question": "为什么让远端CPU处理请求，反而可以比远程读哈希表更快？",
    "problem": "one-sided hash traversal的多次往返及READ responder NIC吞吐限制。",
    "mechanism": "client用UC WRITE把请求放进server内存；server CPU查表，UD SEND回响应；把读表的多个网络往返压成一个RPC往返，并利用PCIe和verbs成本差异。",
    "cost": "server轮询和查表占CPU；请求缓冲与通知需要管理；面向小KV的特定结构。",
    "not_for": "不是READ永远比WRITE慢；不是通用可靠RPC或大消息传输完整方案。",
    "key_figures": [
      {
        "label": "Figures 2–4",
        "pdf_page_one_based": 6,
        "url": "https://www.cs.cmu.edu/~dga/papers/herd-sigcomm2014-readable.pdf#page=6",
        "read_for": "延迟、inbound/outbound verbs吞吐差异。"
      },
      {
        "label": "Figure 8",
        "pdf_page_one_based": 9,
        "url": "https://www.cs.cmu.edu/~dga/papers/herd-sigcomm2014-readable.pdf#page=9",
        "read_for": "server请求内存的布局与轮询。"
      }
    ],
    "experiment": {
      "environment": "Apt集群CX3 56Gbps IB/PCIe3×8；Susitna另测40Gbps IB/RoCE与PCIe2×8；小值KV、95%GET及balanced负载。",
      "result": "§5.4：6个server CPU core时最高26M ops/s、平均约5μs；≤60B value时可达到/超过原始READ吞吐量级。",
      "limit": "Pilaf/FaRM-KV比较使用去掉后端数据结构的通信仿真实现，非完整原系统重跑；不能拿26M当今天所有RDMA硬件基准。"
    },
    "code_url": "https://github.com/efficient/HERD",
    "next": [
      "fasst",
      "erpc",
      "guidelines"
    ],
    "pdf_url": "https://www.cs.cmu.edu/~dga/papers/herd-sigcomm2014-readable.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-herd"
  },
  {
    "id": "timely",
    "short": "TIMELY",
    "title": "TIMELY: RTT-based Congestion Control for the Datacenter",
    "year": 2015,
    "venue": "ACM SIGCOMM 2015",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Radhika Mittal",
      "Vinh The Lam",
      "Nandita Dukkipati",
      "Emily Blem",
      "Hassan Wassel",
      "Monia Ghobadi",
      "Amin Vahdat",
      "Yaogong Wang",
      "David Wetherall",
      "David Zats"
    ],
    "authors_url": "https://research.google/pubs/timely-rtt-based-congestion-control-for-the-datacenter/",
    "doi": "10.1145/2785956.2787510",
    "question": "不读交换机队列，能否用RTT变化预测拥塞？",
    "problem": "低延迟数据中心的微秒排队不易被软件时间戳准确测得，ECN也未必反映多优先级整体延迟。",
    "mechanism": "NIC辅助精确RTT测量；低/高阈值与平滑RTT梯度控制发送速率；正常区间根据梯度增减并支持offload大segment。",
    "cost": "精确时间戳、ACK及pacing支持；反向路径拥塞/测量噪声和非网络主机延迟会影响信号。",
    "not_for": "不需要ECN反馈不等于不需要网络管理；原测试保留PFC，不是PFC-free可靠性协议。",
    "key_figures": [
      {
        "label": "Figures 1–2",
        "pdf_page_one_based": 2,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p537.pdf#page=2",
        "read_for": "硬件时间戳噪声与RTT对队列的相关性。"
      },
      {
        "label": "Figures 6–7",
        "pdf_page_one_based": 4,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p537.pdf#page=4",
        "read_for": "发送控制器与completion中计算RTT。"
      },
      {
        "label": "Figures 19–22",
        "pdf_page_one_based": 12,
        "url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p537.pdf#page=12",
        "read_for": "大规模offered load、throughput、尾延迟要一起看。"
      }
    ],
    "experiment": {
      "environment": "Linux OS-bypass、10Gbps链路为主；rack级incast与数百机器Clos all-to-all测试；对照无CC的PFC fabric及优化内核DCTCP。",
      "result": "在论文负载中P99延迟较仅PFC降约9倍、较DCTCP约13倍，同时保持接近线速。",
      "limit": "这是特定基线/负载下尾延迟结果，不能替换成应用吞吐统一9倍；反向拥塞与RTT噪声在正文有专门实验。"
    },
    "next": [
      "dcqcn",
      "hpcc",
      "erpc"
    ],
    "pdf_url": "https://conferences.sigcomm.org/sigcomm/2015/pdf/papers/p537.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-timely"
  },
  {
    "id": "irn",
    "short": "IRN",
    "title": "Revisiting Network Support for RDMA",
    "year": 2018,
    "venue": "ACM SIGCOMM 2018",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Radhika Mittal",
      "Alexander Shpiner",
      "Aurojit Panda",
      "Eitan Zahavi",
      "Arvind Krishnamurthy",
      "Sylvia Ratnasamy",
      "Scott Shenker"
    ],
    "authors_url": "https://doi.org/10.1145/3230543.3230557",
    "doi": "10.1145/3230543.3230557",
    "question": "RDMA依赖无损网络，是语义本身必需，还是当时RNIC设计造成？",
    "problem": "go-back-N面对丢包代价大，PFC又引入HOL、拥塞扩散和死锁。",
    "mechanism": "RNIC selective recovery，OOO包直接DMA到最终主机地址并用bitmap追踪；BDP-FC限制在途包；扩展头字段及completion规则保持RDMA语义。",
    "cost": "RNIC硬件/协议修改、位图与额外ACK；需要处理首包信息、WQE匹配和completion等乱序细节。",
    "not_for": "不能在未修改旧RoCE RNIC时直接关PFC；IRN也不是拥塞控制算法的替代。",
    "key_figures": [
      {
        "label": "Figures 1–5",
        "pdf_page_one_based": 5,
        "url": "https://homes.cs.washington.edu/~arvind/papers/irn.pdf#page=5",
        "read_for": "分别切换PFC、recovery和显式CC，分离贡献。"
      },
      {
        "label": "Figure 7",
        "pdf_page_one_based": 6,
        "url": "https://homes.cs.washington.edu/~arvind/papers/irn.pdf#page=6",
        "read_for": "BDP-FC与go-back-N的ablation。"
      }
    ],
    "experiment": {
      "environment": "INET/OMNeT++中建模CX4；默认54-server、45个6口交换机、三层fat-tree、40Gbps、2μs/link、70%负载、约110MTU BDP；另有FPGA模块综合开销估算。",
      "result": "报告相较RoCE+PFC典型场景性能提高6–83%，RNIC资源额外约3–10%。",
      "limit": "网络效果主要仿真+硬件模块评估，不是全网生产部署实测；带宽/流大小/拓扑改变会改变收益。"
    },
    "next": [
      "roce_scale",
      "collie",
      "byteexpress"
    ],
    "pdf_url": "https://homes.cs.washington.edu/~arvind/papers/irn.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-irn"
  },
  {
    "id": "erpc",
    "short": "eRPC",
    "title": "Datacenter RPCs can be General and Fast",
    "year": 2019,
    "venue": "USENIX NSDI 2019",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Anuj Kalia",
      "Michael Kaminsky",
      "David G. Andersen"
    ],
    "authors_url": "https://www.usenix.org/conference/nsdi19/presentation/kalia",
    "question": "高性能是否一定要one-sided RDMA与无损网络？",
    "problem": "专门的硬件/协议设计牺牲通用性，RC连接状态和每client缓冲轮询限制规模。",
    "mechanism": "用户态packet I/O、每会话信用与BDP限制、软件可靠性、TIMELY式CC；优化小消息/短handler/无拥塞常见路径，长handler可交worker。",
    "cost": "软件协议与轮询耗CPU，需buffer/session管理；大消息和长handler走更贵路径。",
    "not_for": "Ethernet测试使用普通UDP而非RoCE；IB测试用UD。它是RDMA方案的重要对照，不能列成one-sided RDMA库。",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 6,
        "url": "https://www.usenix.org/system/files/nsdi19-kalia.pdf#page=6",
        "read_for": "CX5连接状态规模与性能变化。"
      },
      {
        "label": "Figure 3",
        "pdf_page_one_based": 8,
        "url": "https://www.usenix.org/system/files/nsdi19-kalia.pdf#page=8",
        "read_for": "每session2credits的request/response流。"
      },
      {
        "label": "Figures 4–5",
        "pdf_page_one_based": 10,
        "url": "https://www.usenix.org/system/files/nsdi19-kalia.pdf#page=10",
        "read_for": "单核吞吐和100节点多线程扩展。"
      }
    ],
    "experiment": {
      "environment": "CX3:11机56Gbps IB；CX4:100机25Gbps lossy Ethernet；CX5:8机双口40Gbps Ethernet。另测Raft与Masstree。",
      "result": "单核最高10M小RPC/s或大消息75Gbps；Raft replication约5.5μs。",
      "limit": "这些峰值来自不同配置/微基准，不是同一场景同时实现；不能把普通UDP benchmark写成RDMA read测试。"
    },
    "code_url": "https://github.com/erpc-io/eRPC",
    "next": [
      "herd",
      "fasst",
      "byteexpress"
    ],
    "pdf_url": "https://www.usenix.org/system/files/nsdi19-kalia.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-erpc"
  },
  {
    "id": "hpcc",
    "short": "HPCC",
    "title": "HPCC: High Precision Congestion Control",
    "year": 2019,
    "venue": "ACM SIGCOMM 2019",
    "group": "field_core",
    "guo_coauthor": false,
    "authors": [
      "Yuliang Li",
      "Rui Miao",
      "Hongqiang Harry Liu",
      "Yan Zhuang",
      "Fei Feng",
      "Lingbo Tang",
      "Zheng Cao",
      "Ming Zhang",
      "Frank Kelly",
      "Mohammad Alizadeh",
      "Minlan Yu"
    ],
    "authors_url": "https://dspace.mit.edu/entities/publication/2414a72f-069e-4df4-bc0e-b0db4474c959",
    "doi": "10.1145/3341302.3342085",
    "question": "ECN太粗、RTT有噪声，能否直接用每跳负载做精确控制？",
    "problem": "低延迟、高吞吐、稳定性三者难兼顾，保守限速减少PFC却浪费带宽。",
    "mechanism": "交换机INT携带队列长度、已发byte及时间戳；ACK返回链路状态；发送端估计in-flight/利用率，区分per-ACK fast reaction与per-RTT full update，抑制重复反馈过度反应。",
    "cost": "需要INT交换机和可编程NIC，增加包头及状态/计算；反馈时延、遥测噪声和每流调度能力需工程处理。",
    "not_for": "不是只开某个开关即可部署到任意旧RNIC；不能仅把ECN阈值换成队列长度就称HPCC。",
    "key_figures": [
      {
        "label": "Figure 4",
        "pdf_page_one_based": 5,
        "url": "https://liyuliang001.github.io/publications/hpcc.pdf#page=5",
        "read_for": "INT、receiver ACK与sender窗口闭环。"
      },
      {
        "label": "Figure 5",
        "pdf_page_one_based": 6,
        "url": "https://liyuliang001.github.io/publications/hpcc.pdf#page=6",
        "read_for": "两个连续ACK反馈同一拥塞如何造成过度反应。"
      },
      {
        "label": "Figures 7–8",
        "pdf_page_one_based": 8,
        "url": "https://liyuliang001.github.io/publications/hpcc.pdf#page=8",
        "read_for": "实际packet format和FPGA NIC实现。"
      },
      {
        "label": "Figure 9",
        "pdf_page_one_based": 10,
        "url": "https://liyuliang001.github.io/publications/hpcc.pdf#page=10",
        "read_for": "四种微基准的HPCC/DCQCN动态比较；Figures10–11另在PDF第11页。"
      }
    ],
    "experiment": {
      "environment": "32-server原型，双25Gbps NIC、4ToR+1Agg/100Gbps上联；FPGA NIC+P4 switch。NS3另模拟320-server、100Gbps host/400Gbps交换链路。",
      "result": "在所测负载中维持近零队列、快速利用新带宽，对DCQCN/TIMELY的FCT最高改善95%。",
      "limit": "最高95%并非普遍值；原型每25GE端口300并发流，ASIC更大规模是设计估计，不能当已测规模。"
    },
    "next": [
      "dcqcn",
      "timely",
      "byteexpress"
    ],
    "pdf_url": "https://liyuliang001.github.io/publications/hpcc.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-hpcc"
  },
  {
    "id": "fasst",
    "short": "FaSST",
    "title": "FaSST: Fast, Scalable and Simple Distributed Transactions with Two-Sided (RDMA) Datagram RPCs",
    "year": 2016,
    "venue": "USENIX OSDI 2016",
    "group": "extension",
    "guo_coauthor": false,
    "authors": [
      "Anuj Kalia",
      "Michael Kaminsky",
      "David G. Andersen"
    ],
    "authors_url": "https://www.usenix.org/conference/osdi16/technical-sessions/presentation/kalia",
    "question": "把HERD式RPC从单server扩到all-to-all，能否做可串行化且持久的事务？",
    "problem": "RC QP缓存和one-sided限制使事务系统扩展差，远程地址读取协议复杂。",
    "mechanism": "UD datagram RPC避免每peer RC状态；doorbell batching节约CPU/PCIe；服务端执行索引/OCC逻辑，并做复制日志与事务提交。",
    "cost": "服务端CPU、软件事务逻辑；假设底层几乎不丢包，罕见loss转为机器failure并执行恢复。",
    "not_for": "不能把“UD连接可扩展”理解成UD自带可靠性，也不能直接替代lossy Ethernet上的完整重传协议。",
    "key_figures": [
      {
        "label": "Figures 2–3",
        "pdf_page_one_based": 7,
        "url": "https://www.usenix.org/system/files/conference/osdi16/osdi16-kalia.pdf#page=7",
        "read_for": "连接数增长时RC READ和UD RPC的性能。"
      },
      {
        "label": "Figure 6",
        "pdf_page_one_based": 11,
        "url": "https://www.usenix.org/system/files/conference/osdi16/osdi16-kalia.pdf#page=11",
        "read_for": "事务消息与容错日志路径。"
      }
    ],
    "experiment": {
      "environment": "CX3 56Gbps与双口Connect-IB 2×56Gbps，测RPC、TATP、SmallBank；与FaRM/DrTM+R还使用已发表结果及不同硬件配置比较。",
      "result": "展示datagram RPC的连接可扩展性和CPU效率；论文报告TATP近2倍FaRM、SmallBank约1.7倍DrTM+R。",
      "limit": "后两数字不是同硬件重跑的严格因果比较，必须展示Table3硬件差异与loss假设。"
    },
    "code_url": "https://github.com/efficient/fasst",
    "next": [
      "herd",
      "erpc",
      "byteexpress"
    ],
    "pdf_url": "https://www.usenix.org/system/files/conference/osdi16/osdi16-kalia.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-fasst"
  },
  {
    "id": "guidelines",
    "short": "RDMA Design Guidelines",
    "title": "Design Guidelines for High Performance RDMA Systems",
    "year": 2016,
    "venue": "USENIX ATC 2016",
    "group": "extension",
    "guo_coauthor": false,
    "authors": [
      "Anuj Kalia",
      "Michael Kaminsky",
      "David G. Andersen"
    ],
    "authors_url": "https://www.usenix.org/conference/atc16/technical-sessions/presentation/kalia",
    "question": "同样的verbs API，为什么低层选项会让性能相差数十倍？",
    "problem": "MMIO、WQE/CQE DMA、PCIe带宽、NIC cache与处理单元并行性容易成为隐藏瓶颈。",
    "mechanism": "逐条计算操作的PCIe事务；减少CPU MMIO、doorbell batching、unsignaled completion、WQE优化、利用NIC并行并避免cache thrashing。",
    "cost": "依赖硬件代际与应用语义；更大batch减少开销却可能增加延迟和资源占用。",
    "not_for": "不是永恒的最优参数表，不能将2016 ConnectX/Connect-IB结论直接当2026芯片测量。",
    "key_figures": [
      {
        "label": "Figure 4",
        "pdf_page_one_based": 4,
        "url": "https://www.usenix.org/system/files/conference/atc16/atc16_paper-kalia.pdf#page=4",
        "read_for": "WQE-by-MMIO与doorbell的CPU↔NIC事务差异；Figures5–6另在PDF第5页。"
      },
      {
        "label": "Figure 7",
        "pdf_page_one_based": 7,
        "url": "https://www.usenix.org/system/files/conference/atc16/atc16_paper-kalia.pdf#page=7",
        "read_for": "sequencer各项优化的贡献；HERD Figure9另在PDF第8页。"
      }
    ],
    "experiment": {
      "environment": "3代RDMA硬件与PCIe计数器，network sequencer和HERD case study。",
      "result": "最佳sequencer122M ops/s；HERD CPU效率+83%、吞吐+35%；不同优化的收益依业务结构变化。",
      "limit": "不是所有优化可叠加，sequencer和通用KV选择不同通信设计。"
    },
    "code_url": "https://github.com/efficient/rdma_bench",
    "next": [
      "collie",
      "herd",
      "byteexpress"
    ],
    "pdf_url": "https://www.usenix.org/system/files/conference/atc16/atc16_paper-kalia.pdf",
    "evidence_status": "Peer-reviewed conference paper; original PDF and methods/evaluation checked",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-guidelines"
  },
  {
    "id": "deepseek_v3",
    "short": "DeepSeek-V3通信章节",
    "title": "DeepSeek-V3 Technical Report",
    "year": 2024,
    "venue": "arXiv:2412.19437v1, 26 Dec 2024",
    "group": "ai_bridge",
    "guo_coauthor": false,
    "evidence_status": "Official author technical report, not a transport-protocol paper; fixed v1 for historical communication design.",
    "authors": [
      "DeepSeek-AI (collective author; full individual credits in official report)"
    ],
    "authors_complete": false,
    "authors_url": "https://arxiv.org/abs/2412.19437v1",
    "question": "MoE的token all-to-all，如何在NVLink域内与跨节点网络之间分工？",
    "problem": "专家分布和节点间带宽限制使all-to-all暴露在训练critical path。",
    "mechanism": "重点读§3.2.1 DualPipe和§3.2.2跨节点all-to-all：拓扑感知转发、通信/计算重叠和node-limited routing；把dispatch/combine放回完整MoE执行图。",
    "cost": "通信kernel、SM预算、拓扑与路由约束；更多重叠需要同步/缓冲管理。",
    "not_for": "这是V3的历史训练基础设施，不能套成V4.1模型参数或当前DeepEP API。",
    "key_figures": [
      {
        "label": "DualPipe / cross-node all-to-all figures and §3.2.2",
        "url": "https://arxiv.org/html/2412.19437v1#S3.SS2.SSS2",
        "read_for": "按文本和原图区分机内/跨机、转发/计算、通信隐藏与带宽。"
      }
    ],
    "experiment": {
      "environment": "官方V3 H800集群训练报告；读§3基础设施，勿用model quality表证明network算法性能。",
      "result": "报告通过联合设计隐藏部分all-to-all通信；把它当系统架构实例。",
      "limit": "报告不是DeepEP独立库的严格网络对照benchmark，也不是V4.1结构来源。"
    },
    "next": [
      "megascale_moe",
      "deep_ep"
    ],
    "pdf_url": "https://arxiv.org/pdf/2412.19437v1",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-deepseek_v3"
  },
  {
    "id": "megascale_moe",
    "short": "MegaScale-MoE",
    "title": "MegaScale-MoE: Large-Scale Communication-Efficient Training of Mixture-of-Experts Models in Production",
    "year": 2025,
    "venue": "arXiv:2505.11432v1, 16 May 2025",
    "group": "ai_bridge",
    "guo_coauthor": false,
    "evidence_status": "Author preprint v1; no peer-reviewed venue claimed here.",
    "authors": [
      "Chao Jin",
      "Ziheng Jiang",
      "Zhihao Bai",
      "Zheng Zhong",
      "Juncai Liu",
      "Xiang Li",
      "Ningxin Zheng",
      "Xi Wang",
      "Cong Xie",
      "Wen Heng",
      "Yiyuan Ma",
      "Wenlei Bao",
      "Size Zheng",
      "Yanghua Peng",
      "Haibin Lin",
      "Xuanzhe Liu",
      "Xin Jin",
      "Xin Liu"
    ],
    "authors_url": "https://arxiv.org/abs/2505.11432v1",
    "question": "MoE通信如何与并行策略、GEMM和低精度一起优化？",
    "problem": "仅替换all-to-all库不能消除注意力与专家层的不同通信瓶颈。",
    "mechanism": "attention用sequence parallel、FFN用expert parallel；跨算子与算子内细粒度重叠；结合通信模式调整低精度压缩。",
    "cost": "调度/同步复杂性、通信精度误差验证；固定batch强扩展仍有pipeline bubbles。",
    "not_for": "不是RDMA transport/RNIC方案；训练结论不直接证明在线decode latency。",
    "key_figures": [
      {
        "label": "Table3 and Figure11",
        "url": "https://arxiv.org/html/2505.11432v1#S6.SS1",
        "read_for": "分开固定batch强扩展和同比增batch弱扩展，核对baseline commit和并行配置。"
      }
    ],
    "experiment": {
      "environment": "352B MoE，240–1440 H800；global batch720、sequence8192、PP15；Megatron-LM基线commit f1f03922，分别选最优并行。另测Mixtral8×7B于32GPU。",
      "result": "1440H800时约1.4077M token/s，相对Megatron0.7466M为1.88倍；强扩展MFU32.48%降至27.89%。",
      "limit": "收益是整个系统联合优化，不全归RDMA或一个all-to-all算子；强/弱扩展不能混用。"
    },
    "next": [
      "deep_ep",
      "deepseek_v3"
    ],
    "pdf_url": "https://arxiv.org/pdf/2505.11432v1",
    "interpretation_note": "cost / not_for 字段包含基于原文机制的教学适用性判断；不把它们当作作者测得的通用下界。",
    "sourceId": "rd-paper-megascale_moe"
  },
  {
    "id": "srnic",
    "short": "SRNIC",
    "title": "SRNIC: A Scalable Architecture for RDMA NICs",
    "year": 2023,
    "venue": "USENIX NSDI 2023",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Zilong Wang",
      "Layong Luo",
      "Qingsong Ning",
      "Chaoliang Zeng",
      "Wenxue Li",
      "Xinchen Wan",
      "Peng Xie",
      "Tao Feng",
      "Ke Cheng",
      "Xiongfei Geng",
      "Tianhao Wang",
      "Weicheng Ling",
      "Kejia Huo",
      "Pingbo An",
      "Kui Ji",
      "Shideng Zhang",
      "Bin Xu",
      "Ruiqing Feng",
      "Tao Ding",
      "Kai Chen",
      "Chuanxiong Guo"
    ],
    "authors_url": "https://www.usenix.org/conference/nsdi23/presentation/wang-zilong",
    "pdf_url": "https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf",
    "sourceId": "rd-srnic",
    "question": "连接更多以后，RNIC怎样避免片上状态和乱序恢复成为瓶颈？",
    "problem": "WQE cache、接收乱序buffer与请求状态消耗有限片上内存。",
    "mechanism": "cache-free SQ调度、扩展header的in-place placement，恢复元数据经CtrlQ交host bitmap，RetryQ发起选择重传。",
    "cost": "host软件慢路径、额外DMA/重取、协议扩展与恢复退出同步；性能依赖多数流量顺序且丢包较少。",
    "not_for": "不是比特智路400GE/800GE产品的公开内部设计；不能将memory-free解读为无CPU/无内存。",
    "key_figures": [
      {
        "label": "Figure 4",
        "pdf_page_one_based": 7,
        "url": "https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=7",
        "read_for": "Host、DMA、Transport、Basic NIC的职责划分。"
      },
      {
        "label": "Figure 6",
        "pdf_page_one_based": 8,
        "url": "https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=8",
        "read_for": "EMUX事件、ready/credit与SQ调度。"
      },
      {
        "label": "Figures 7–8",
        "pdf_page_one_based": 9,
        "url": "https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=9",
        "read_for": "host bitmap慢路径，下一页继续看恢复退出条件。"
      }
    ],
    "experiment": {
      "environment": "Two directly connected RNICs; 1024-byte RoCE MTU. Connection test: 16 threads/side, 512B SEND, 128-10K QPs. Loss test: 4KB messages, intermediate FPGA random drops, congestion control disabled. Larger networks are ns-3 simulations (up to 4096 servers), not a 100K-GPU deployment.",
      "result": "Slides16-19 report 97Gbps and 3.3us in 100GE prototype experiments. The 18x metric is performant QPs per MB versus its CX-5 baseline, not 18x bandwidth or modern ConnectX-9 superiority.",
      "limit": "100GE FPGA研究原型；最多4096服务器网络为ns-3模拟，非十万GPU生产实测。"
    },
    "evidence_status": "Peer-reviewed paper / prototype and ns-3 evaluated",
    "next": [
      "irn",
      "dcp2025",
      "collie"
    ]
  },
  {
    "id": "secondnet",
    "short": "SecondNet",
    "title": "SecondNet: A Data Center Network Virtualization Architecture with Bandwidth Guarantees",
    "year": 2010,
    "venue": "ACM CoNEXT2010",
    "group": "guo_related",
    "guo_coauthor": true,
    "authors": [
      "Chuanxiong Guo",
      "Guohan Lu",
      "Helen J. Wang",
      "Shuang Yang",
      "Chao Kong",
      "Peng Sun",
      "Wenfei Wu",
      "Yongguang Zhang"
    ],
    "authors_url": "https://conferences.sigcomm.org/co-next/2010/CoNEXT_papers/15-Guo.pdf",
    "pdf_url": "https://conferences.sigcomm.org/co-next/2010/CoNEXT_papers/15-Guo.pdf",
    "sourceId": "rd-paper-secondnet",
    "question": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
    "problem": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
    "mechanism": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
    "cost": "部署/准入策略、遥测与应用侧配合；不是一颗网卡单独解决全部问题。",
    "not_for": "与新闻主题关联，不证明新闻系统或产品就采用这篇论文的实现。",
    "key_figures": [],
    "experiment": {
      "environment": "见链接原文的设计与评估条件。",
      "result": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
      "limit": "本页以机制关联为主，不从该论文外推当前产品性能。"
    },
    "evidence_status": "Original conference paper; scope-specific interpretation",
    "next": []
  },
  {
    "id": "gray_failure",
    "short": "Gray Failure",
    "title": "Gray Failure: The Achilles’ Heel of Cloud-Scale Systems",
    "year": 2017,
    "venue": "ACM HotOS2017",
    "group": "guo_related",
    "guo_coauthor": true,
    "authors": [
      "Peng Huang",
      "Chuanxiong Guo",
      "Lidong Zhou",
      "Jacob R. Lorch",
      "Yingnong Dang",
      "Murali Chintalapati",
      "Randolph Yao"
    ],
    "authors_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf",
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf",
    "sourceId": "rd-paper-gray_failure",
    "question": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
    "problem": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
    "mechanism": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
    "cost": "部署/准入策略、遥测与应用侧配合；不是一颗网卡单独解决全部问题。",
    "not_for": "与新闻主题关联，不证明新闻系统或产品就采用这篇论文的实现。",
    "key_figures": [],
    "experiment": {
      "environment": "见链接原文的设计与评估条件。",
      "result": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
      "limit": "本页以机制关联为主，不从该论文外推当前产品性能。"
    },
    "evidence_status": "Original conference paper; scope-specific interpretation",
    "next": []
  },
  {
    "id": "dcp2025",
    "short": "DCP",
    "title": "Revisiting RDMA Reliability for Lossy Fabrics",
    "year": 2025,
    "venue": "ACM SIGCOMM2025",
    "group": "extension",
    "guo_coauthor": false,
    "authors": [
      "Wenxue Li",
      "Xiangzhou Liu",
      "Yunxuan Zhang",
      "Zihao Wang",
      "Wei Gu",
      "Tao Qian",
      "Gaoxiong Zeng",
      "Shoushou Ren",
      "Xinyang Huang",
      "Zhenghang Ren",
      "Bowen Liu",
      "Junxue Zhang",
      "Kai Chen",
      "Bingyang Liu"
    ],
    "authors_url": "https://leewxgit.github.io/pdf/dcp-sigcomm25.pdf",
    "pdf_url": "https://leewxgit.github.io/pdf/dcp-sigcomm25.pdf",
    "sourceId": "rd-paper-dcp2025",
    "question": "selective-repeat仍会把多路径乱序误判为丢包，尾包/重传包丢失依赖RTO。",
    "problem": "selective-repeat仍会把多路径乱序误判为丢包，尾包/重传包丢失依赖RTO。",
    "mechanism": "交换机trim拥塞包payload，以header-only通知驱动精确重传；扩展头支持OOO直接DMA，message计数替代packet bitmap。",
    "cost": "交换机+RNIC协同改造及受保护控制队列；HO极少丢失是假设而非绝对保证，控制头丢失/设备故障时仍有coarse-grained timeout fallback。",
    "not_for": "DCP+AR对比CX5+ECMP并非仅换恢复机制；不是LLM端到端训练实测。",
    "key_figures": [
      {
        "url": "https://leewxgit.github.io/pdf/dcp-sigcomm25.pdf#page=5",
        "label": "Figure3",
        "pdf_page_one_based": 5,
        "read_for": "DCP整体workflow：trimming→HO→重传→OOO接收→ACK。"
      },
      {
        "url": "https://leewxgit.github.io/pdf/dcp-sigcomm25.pdf#page=9",
        "label": "Figures8–12",
        "pdf_page_one_based": 9,
        "read_for": "原型基础性能、测试拓扑、loss goodput、多路径与AI collective测试。"
      }
    ],
    "experiment": {
      "limit": "与CX5对照的AI测试同时使用DCP+AR vs CX5+ECMP，收益不是只改可靠性模块的单变量结果；并非真实LLM端到端训练实测。",
      "result": "对CX5的goodput优势随0.01%–5%丢包率变化为1.6–72倍，AI AllReduce/AllToAll完成时间最多降42%；大规模另为仿真。",
      "environment": "2台P4交换机，每台连8块FPGA，100Gbps链路，交换机间8条并行链路；RNIC FPGA为PCIe3×16、300MHz。"
    },
    "evidence_status": "Original conference paper; scope-specific interpretation",
    "next": []
  }
];
D.scaleSources=[
  {
    "id": "ualink-1",
    "published": "2025-04-10 deck",
    "url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "supports": "Pod-scale load/store/atomic semantics with software coherency; PDF pages 5-6 show scale-up pod and semantic boundary.",
    "limits": "Not automatically CPU-style hardware cache coherence; standard limits are not measured product scale."
  },
  {
    "id": "ualink-2",
    "published": "2026-04-07",
    "url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "supports": "Common2.0 introduces in-network compute; DL/PL2.0, chiplet1.0 and manageability1.0 published separately.",
    "limits": "Do not describe UALink1.0 alone as the current complete specification set, or infer every chip implements Common2.0."
  },
  {
    "id": "uec-1.1",
    "published": "2026-10-12",
    "url": "https://ultraethernet.org/ultra-ethernet-consortium-releases-specification-1-1-advancing-ai-and-hpc-networking/",
    "supports": "UE1.1 explicitly adds scale-up Unified Local profile, read/write/atomics, UFH, in-network collectives and programmable congestion management.",
    "limits": "Ethernet is not inherently scale-out-only. UE/UET is not merely a new spelling of RoCEv2; product support must be checked."
  },
  {
    "id": "nvlink",
    "published": "2026-07-20",
    "url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "supports": "NVLink/NVLink Switch scale-up domains; rack-level connectivity, collectives, and MoE communication.",
    "limits": "Some bandwidth figures differ from the current NVIDIA product page; avoid mixing 3.6TB/s/260TB/s article figures with 3TB/s/216TB/s product-page figures without a version note. Vendor comparisons are not independent benchmarks."
  },
  {
    "id": "nvlink-resiliency",
    "published": "2026-09-15",
    "url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "supports": "Separates switch data plane from NVOS management CPU; public resilience architecture.",
    "limits": "Not a full router-microarchitecture or buffer-depth specification."
  },
  {
    "id": "connectx9",
    "published": "manual last updated 2026-09-10",
    "url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "supports": "800GbE / XDR IB configurations, PCIe/SocketDirect, RDMA, congestion control and offload capabilities.",
    "limits": "Feature availability depends on OPN, firmware and driver. A block diagram drawn from generic RDMA theory is not its private physical pipeline."
  },
  {
    "id": "bluefield3-dpa",
    "published": "2025-01-16 archive update",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "supports": "Public DPA execution units, cache hierarchy, memory apertures, DMA, doorbell, NIC data-path interface.",
    "limits": "Version-specific BlueField3 subsystem; do not label it BlueField4 or ConnectX9 internals."
  },
  {
    "id": "bluefield-hardware",
    "published": null,
    "url": "https://docs.nvidia.com/doca/sdk/hardware-architecture.pdf",
    "supports": "Official public hardware architecture image at PDF page3: Arm, packet pipeline, DPA, accelerators and PCIe switch.",
    "limits": "Undated current PDF; block layout is explanatory rather than a floorplan. Source redistribution terms should be kept separate from original-site licensing."
  },
  {
    "id": "rdma-programming",
    "published": "DOCA3.5.0, September2026 archive",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-aware-networks-programming-guide",
    "supports": "QP/SQ/RQ, memory regions and lkey/rkey, work requests and completions.",
    "limits": "RDMA WRITE completion is not remote GPU kernel completion; application visibility and synchronization must follow the chosen API."
  },
  {
    "id": "nccl-gin",
    "published": "NCCL2.32.3 docs, publication date not shown",
    "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "supports": "LSA, multimem/NVLS and GIN are distinct device-communication facilities; explicit signals/barriers/flush semantics.",
    "limits": "A GIN API label alone does not expose every backend/topology detail; local buffer reuse and remote completion differ."
  },
  {
    "id": "gpunetio",
    "published": "2026-10-06",
    "url": "https://developer.nvidia.com/blog/doca-gpunetio-gda-ki-unified-gpu-networking/",
    "supports": "CPU control path creates queues/registers memory/exports descriptors; the supported GDA-KI data path lets GPU code prepare WQEs, ring doorbells and poll completion.",
    "limits": "GPUDirect RDMA addresses payload access, while GDA-KI additionally addresses work initiation. Neither means setup needs no CPU or GPU communication kernels use no SMs."
  },
  {
    "id": "gpudirect-rdma",
    "published": "CUDA13.4 docs; date not shown",
    "url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "supports": "GPU-to-peer-device direct path and platform/PCIe/IOMMU/topology constraints.",
    "limits": "Do not infer capability from GPU model logo or nominal NIC line rate; GPUDirect RDMA is not NVLink and does not eliminate all synchronization."
  },
  {
    "id": "rocev2",
    "published": "DOCA3.5.0 archive",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "supports": "RoCEv2 encapsulates RDMA in UDP/IP, destination port4791.",
    "limits": "RDMA does not mean IP-free; RoCEv2 is not TCP."
  }
];
D.chipComparison=[
  {
    "chip": "SRNIC research FPGA prototype",
    "role": "Published transport/scheduler architecture",
    "public": "Explicit modules, queue scheduling, recovery split, memory accounting and tests",
    "unknown": "No confirmed linkage to the company's present products"
  },
  {
    "chip": "NVIDIA ConnectX9 SuperNIC",
    "role": "Network endpoint for scale-out / RDMA",
    "public": "Ports/interfaces, SocketDirect, RDMA and named acceleration capabilities",
    "unknown": "Full private scheduler/cache/buffer microarchitecture; capability availability per firmware"
  },
  {
    "chip": "NVIDIA BlueField3 DPA",
    "role": "Programmable I/O-processing subsystem",
    "public": "Execution units, L1/L2/L3 hierarchy, memory apertures, DMA and NIC interface",
    "unknown": "Do not transplant subsystem details into BlueField4/ConnectX9"
  },
  {
    "chip": "NVIDIA NVLink6 Switch",
    "role": "Scale-up fabric switching / supported in-network collectives",
    "public": "Rack/tray/domain and resilience architecture",
    "unknown": "Port pipeline implementation, exact internal queues and full physical layout"
  }
];
D.prototype={
  "source": "slides pages15-18; PCIe and full memory breakdown additionally paper section5/Table2",
  "fpgaVendor": "Xilinx",
  "clockMHz": 300,
  "ethernetGbps": 100,
  "pcie": "Gen3 x16",
  "onChipMemoryMB": 4.4,
  "qpcMB": 2.3,
  "mttCacheMB": 1.2,
  "receivingBufferMB": 0.6,
  "sqSchedulerMB": 0.3,
  "qps": 10000
};
D.articleProducts=[
  {
    "name": "400GE FPGA RDMA NIC",
    "statusInArticle": "Performance validation / customer deployment claimed",
    "primaryProductSpecificationLocated": false,
    "officialVerifiedLinkRate": null,
    "officialVerifiedMicroarchitecture": null,
    "unknown": [
      "FPGA part",
      "PCIe interface",
      "SRAM capacity",
      "QP count",
      "loss-recovery state machine",
      "reordering mechanism",
      "RDMA compatibility",
      "GPU direct access",
      "benchmarks and test topology"
    ],
    "display": "媒体披露：400GE FPGA 网卡；微架构未公开核实"
  },
  {
    "name": "800GE TCU",
    "statusInArticle": "In development; targets 100K-plus accelerator clusters",
    "primaryProductSpecificationLocated": false,
    "officialVerifiedLinkRate": null,
    "officialVerifiedMicroarchitecture": null,
    "unknown": [
      "TCU official expansion",
      "tape-out / production status",
      "process",
      "die area",
      "power",
      "latency",
      "PCIe / CXL",
      "port configuration",
      "protocol engines",
      "on-chip memory",
      "offload engines"
    ],
    "display": "媒体披露：800GE TCU 在研；不得画成已发布量产 ASIC"
  }
];
D.companion=[
  {
    "id": "deep_ep",
    "kind": "Official code, not a paper",
    "title": "DeepEP: an efficient expert-parallel communication library",
    "url": "https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/README.md",
    "commit": "f6aa38fe06cd4a0489e7730365d4e0114970a2f3",
    "provenance": "Exact vendor/DeepEP gitlink in DeepInfer553741557a57df44a46fb3ab72b6aafeaf945337.",
    "learn": "MoE dispatch/combine、expanded expert layout与grouped GEMM接口、FP8 dispatch、NVLink域内和RDMA域间通信。",
    "version_guard": "固定commit是V2.5/NCCL Gin，移除V1/NVSHMEM；EP仍用GPU SM，不能引用旧V1零SM说法。主仓要求Hopper或更新、NVLink和RDMA；不同实验分支依赖不能混进主API。",
    "toy": "2个NVLink域各2GPU、8token/top2：先按目标expert分桶，域内NVLink转发/本地、跨域RDMA、目标GPU grouped GEMM、反向combine。仅教学拓扑，非全部真实部署。",
    "not_for": "库不等于NIC、拥塞协议或NVLink交换机；不能把旧README性能数字当当前v2.5独立实测。"
  },
  {
    "id": "cloudbrain",
    "kind": "Official project",
    "title": "CloudBrain for Automatic Troubleshooting for the Cloud",
    "url": "https://www.microsoft.com/en-us/research/project/cloudbrain/publications/",
    "learn": "官方项目列出Pingmesh与Gray Failure。CloudBrain不是一篇同名RDMA transport论文。"
  }
];
D.readingRoutes=[
  {
    "id": "guo",
    "label": "gcx参与的论文",
    "ids": [
      "dcell",
      "bcube",
      "dcqcn",
      "pingmesh",
      "roce_scale",
      "byteps",
      "collie",
      "byteexpress"
    ],
    "lesson": "拓扑→拥塞/可观测性→生产RDMA→ML训练→异常发现→推理训练通信集成。"
  },
  {
    "id": "rdma_core",
    "label": "RDMA领域其他核心论文",
    "ids": [
      "farm",
      "herd",
      "timely",
      "irn",
      "erpc",
      "hpcc"
    ],
    "lesson": "展示相互争论的设计选择；作者标签与上组严格分开。"
  },
  {
    "id": "six_stop",
    "label": "先读这6篇",
    "ids": [
      "roce_scale",
      "dcqcn",
      "irn",
      "collie",
      "byteexpress",
      "erpc"
    ],
    "lesson": "每站回答一个问题：上线什么会坏、如何控速、可靠性是否要PFC、如何找到异常、应用还缺什么、是否必须硬件RDMA。"
  },
  {
    "id": "applications",
    "label": "远程读还是RPC",
    "ids": [
      "farm",
      "herd",
      "fasst",
      "erpc",
      "byteexpress"
    ],
    "lesson": "同一目标下比较往返次数、CPU、NIC缓存、可靠性与消息尺寸，而非选唯一赢家。"
  },
  {
    "id": "congestion",
    "label": "三个反馈信号",
    "ids": [
      "dcqcn",
      "timely",
      "hpcc"
    ],
    "lesson": "ECN/CNP vs RTT gradient vs 每跳INT。先固定同一瓶颈场景，再切换信号与控制。"
  },
  {
    "id": "ai_bridge",
    "label": "从BytePS到MoE",
    "ids": [
      "byteps",
      "deepseek_v3",
      "megascale_moe",
      "deep_ep"
    ],
    "lesson": "区分梯度归约、参数拉取与token dispatch/combine，scale-up与scale-out分别画。"
  }
];
const additions=[
  {
    "id": "rd-scale-ualink-1",
    "publisher": "UALink Consortium",
    "type": "official",
    "date": "2025-04-10 deck",
    "title": "ualink-1",
    "url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "supports": "Pod-scale load/store/atomic semantics with software coherency; PDF pages 5-6 show scale-up pod and semantic boundary.",
    "limit": "Not automatically CPU-style hardware cache coherence; standard limits are not measured product scale."
  },
  {
    "id": "rd-scale-ualink-2",
    "publisher": "UALink Consortium",
    "type": "official",
    "date": "2026-04-07",
    "title": "ualink-2",
    "url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "supports": "Common2.0 introduces in-network compute; DL/PL2.0, chiplet1.0 and manageability1.0 published separately.",
    "limit": "Do not describe UALink1.0 alone as the current complete specification set, or infer every chip implements Common2.0."
  },
  {
    "id": "rd-scale-uec-1.1",
    "publisher": "Ultra Ethernet Consortium",
    "type": "official",
    "date": "2026-10-12",
    "title": "uec-1.1",
    "url": "https://ultraethernet.org/ultra-ethernet-consortium-releases-specification-1-1-advancing-ai-and-hpc-networking/",
    "supports": "UE1.1 explicitly adds scale-up Unified Local profile, read/write/atomics, UFH, in-network collectives and programmable congestion management.",
    "limit": "Ethernet is not inherently scale-out-only. UE/UET is not merely a new spelling of RoCEv2; product support must be checked."
  },
  {
    "id": "rd-scale-nvlink",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "2026-07-20",
    "title": "nvlink",
    "url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "supports": "NVLink/NVLink Switch scale-up domains; rack-level connectivity, collectives, and MoE communication.",
    "limit": "Some bandwidth figures differ from the current NVIDIA product page; avoid mixing 3.6TB/s/260TB/s article figures with 3TB/s/216TB/s product-page figures without a version note. Vendor comparisons are not independent benchmarks."
  },
  {
    "id": "rd-scale-nvlink-resiliency",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "2026-09-15",
    "title": "nvlink-resiliency",
    "url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "supports": "Separates switch data plane from NVOS management CPU; public resilience architecture.",
    "limit": "Not a full router-microarchitecture or buffer-depth specification."
  },
  {
    "id": "rd-scale-connectx9",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "manual last updated 2026-09-10",
    "title": "connectx9",
    "url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "supports": "800GbE / XDR IB configurations, PCIe/SocketDirect, RDMA, congestion control and offload capabilities.",
    "limit": "Feature availability depends on OPN, firmware and driver. A block diagram drawn from generic RDMA theory is not its private physical pipeline."
  },
  {
    "id": "rd-scale-bluefield3-dpa",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "2025-01-16 archive update",
    "title": "bluefield3-dpa",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "supports": "Public DPA execution units, cache hierarchy, memory apertures, DMA, doorbell, NIC data-path interface.",
    "limit": "Version-specific BlueField3 subsystem; do not label it BlueField4 or ConnectX9 internals."
  },
  {
    "id": "rd-scale-bluefield-hardware",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "reviewed 2026-10-30",
    "title": "bluefield-hardware",
    "url": "https://docs.nvidia.com/doca/sdk/hardware-architecture.pdf",
    "supports": "Official public hardware architecture image at PDF page3: Arm, packet pipeline, DPA, accelerators and PCIe switch.",
    "limit": "Undated current PDF; block layout is explanatory rather than a floorplan. Source redistribution terms should be kept separate from original-site licensing."
  },
  {
    "id": "rd-scale-rdma-programming",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "DOCA3.5.0, September2026 archive",
    "title": "rdma-programming",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-aware-networks-programming-guide",
    "supports": "QP/SQ/RQ, memory regions and lkey/rkey, work requests and completions.",
    "limit": "RDMA WRITE completion is not remote GPU kernel completion; application visibility and synchronization must follow the chosen API."
  },
  {
    "id": "rd-scale-nccl-gin",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "NCCL2.32.3 docs, publication date not shown",
    "title": "nccl-gin",
    "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "supports": "LSA, multimem/NVLS and GIN are distinct device-communication facilities; explicit signals/barriers/flush semantics.",
    "limit": "A GIN API label alone does not expose every backend/topology detail; local buffer reuse and remote completion differ."
  },
  {
    "id": "rd-scale-gpunetio",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "2026-10-06",
    "title": "gpunetio",
    "url": "https://developer.nvidia.com/blog/doca-gpunetio-gda-ki-unified-gpu-networking/",
    "supports": "CPU control path creates queues/registers memory/exports descriptors; the supported GDA-KI data path lets GPU code prepare WQEs, ring doorbells and poll completion.",
    "limit": "GPUDirect RDMA addresses payload access, while GDA-KI additionally addresses work initiation. Neither means setup needs no CPU or GPU communication kernels use no SMs."
  },
  {
    "id": "rd-scale-gpudirect-rdma",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "CUDA13.4 docs; date not shown",
    "title": "gpudirect-rdma",
    "url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "supports": "GPU-to-peer-device direct path and platform/PCIe/IOMMU/topology constraints.",
    "limit": "Do not infer capability from GPU model logo or nominal NIC line rate; GPUDirect RDMA is not NVLink and does not eliminate all synchronization."
  },
  {
    "id": "rd-scale-rocev2",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "DOCA3.5.0 archive",
    "title": "rocev2",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "supports": "RoCEv2 encapsulates RDMA in UDP/IP, destination port4791.",
    "limit": "RDMA does not mean IP-free; RoCEv2 is not TCP."
  },
  {
    "id": "rd-paper-dcell",
    "publisher": "ACM SIGCOMM 2008",
    "type": "paper",
    "date": "2008",
    "title": "DCell: A Scalable and Fault-Tolerant Network Structure for Data Centers",
    "url": "https://www.microsoft.com/en-us/research/publication/dcell-a-scalable-and-fault-tolerant-network-structure-for-data-centers/",
    "supports": "递归DCell：低层单元之间用服务器直连形成完全图式互联；服务器同时转发；DFR结合本地绕行与更高层代理绕行。",
    "limit": "不是现代RDMA transport或RNIC芯片；不能据此推断今天RoCE、NVLink或某网卡的实现。"
  },
  {
    "id": "rd-paper-bcube",
    "publisher": "ACM SIGCOMM 2009",
    "type": "paper",
    "date": "2009",
    "title": "BCube: A High Performance, Server-centric Network Architecture for Modular Data Centers",
    "url": "https://conferences.sigcomm.org/sigcomm/2009/program.php",
    "supports": "每个服务器连接k+1层小交换机；递归构造BCube，生成k+1条并行路径；端系统BSR选择路径并处理故障。",
    "limit": "不是Clos的别名，也不是今天GPU scale-up交换机方案。"
  },
  {
    "id": "rd-paper-dcqcn",
    "publisher": "ACM SIGCOMM 2015",
    "type": "paper",
    "date": "2015",
    "title": "Congestion Control for Large-Scale RDMA Deployments",
    "url": "https://www.microsoft.com/en-us/research/project/rdma-for-cloud-computing/",
    "supports": "交换机根据队列ECN标记；接收端NP返回CNP；发送端RP维护alpha和目标/当前速率，降速后按定时/byte阶段恢复；ECN应早于PFC保护阈值触发。",
    "limit": "不是可靠重传协议，也不等于关闭PFC；不能凭DCQCN声称突发incast都能避免。"
  },
  {
    "id": "rd-paper-pingmesh",
    "publisher": "ACM SIGCOMM 2015",
    "type": "paper",
    "date": "2015",
    "title": "Pingmesh: A Large-Scale System for Data Center Network Latency Measurement and Analysis",
    "url": "https://sysnetome.com/publication.html",
    "supports": "Controller按拓扑生成pinglist；全服务器Agent持续TCP/HTTP探测；分层mesh覆盖ToR与数据中心；Cosmos/SCOPE分析、可视化和SLA追踪。",
    "limit": "不是RDMA传输协议，不控制拥塞，也不承诺每一对服务器每时刻都实际直测。"
  },
  {
    "id": "rd-paper-roce_scale",
    "publisher": "ACM SIGCOMM 2016",
    "type": "paper",
    "date": "2016",
    "title": "RDMA over Commodity Ethernet at Scale",
    "url": "https://www.microsoft.com/en-us/research/publication/rdma-commodity-ethernet-scale/",
    "supports": "DSCP到优先级/PFC映射支持L3范围；梳理并修复PFC和NIC故障模式；配合DCQCN、监控、配置检查和分阶段上线。",
    "limit": "论文是保留并管理PFC的2016部署经验，不能当作2026有损RNIC或某创业公司产品验证。"
  },
  {
    "id": "rd-paper-byteps",
    "publisher": "USENIX OSDI 2020",
    "type": "paper",
    "date": "2020",
    "title": "A Unified Architecture for Accelerating Distributed DNN Training in Heterogeneous GPU/CPU Clusters",
    "url": "https://www.usenix.org/conference/osdi20/presentation/jiang",
    "supports": "将梯度求和Summation Service与模型相关optimizer更新分开；CPU用AVX求和，GPU执行optimizer；优化PCIe/NVLink与跨机通信，all-reduce和PS成为框架特例。",
    "limit": "主要是dense DNN训练梯度聚合，不是MoE token dispatch、KV-cache迁移或通用RDMA拥塞控制。"
  },
  {
    "id": "rd-paper-collie",
    "publisher": "USENIX NSDI 2022",
    "type": "paper",
    "date": "2022",
    "title": "Collie: Finding Performance Anomalies in RDMA Subsystems",
    "url": "https://www.usenix.org/conference/nsdi22/presentation/kong",
    "supports": "构造verbs/队列/内存/批量等工作负载搜索空间，以性能和诊断计数器驱动模拟退火；用minimal feature set归纳触发条件并避开重复区域。",
    "limit": "不是可靠传输协议，也不是形式化验证；MFS是最小触发条件集合，不必一一对应独立硬件bug。"
  },
  {
    "id": "rd-paper-byteexpress",
    "publisher": "arXiv:2610.12815v2, 12 Oct 2026",
    "type": "paper",
    "date": "2026",
    "title": "Deploying RDMA for Distributed Inference and Training at Scale",
    "url": "https://arxiv.org/abs/2610.12815v2",
    "supports": "bemalloc注册内存池与跨层buffer ownership；RC QP复用、每线程资源域/共享CQ；receive credits保护RQ；独立软件send-window限制在途byte；Archon负责请求重试、replica选择与TCP fallback。",
    "limit": "这是参数服务器式推荐推理/训练通信层，不是LLM MoE all-to-all库，不是新RNIC；不是作者新公司产品性能证据。"
  },
  {
    "id": "rd-paper-farm",
    "publisher": "USENIX NSDI 2014",
    "type": "paper",
    "date": "2014",
    "title": "FaRM: Fast Remote Memory",
    "url": "https://www.microsoft.com/en-us/research/publication/farm-fast-remote-memory/",
    "supports": "对象/region共享地址空间、版本验证的lock-free RDMA reads；写事务OCC+优化2PC、消息和日志；数据与计算collocation减少跨机。",
    "limit": "one-sided RDMA不是所有KV/RPC都最佳；不能把“远CPU不参与某次read”写成系统无CPU。"
  },
  {
    "id": "rd-paper-herd",
    "publisher": "ACM SIGCOMM 2014",
    "type": "paper",
    "date": "2014",
    "title": "Using RDMA Efficiently for Key-Value Services",
    "url": "https://istc-cc.cmu.edu/publications/papers/2014/herd_readable_abs.shtml",
    "supports": "client用UC WRITE把请求放进server内存；server CPU查表，UD SEND回响应；把读表的多个网络往返压成一个RPC往返，并利用PCIe和verbs成本差异。",
    "limit": "不是READ永远比WRITE慢；不是通用可靠RPC或大消息传输完整方案。"
  },
  {
    "id": "rd-paper-timely",
    "publisher": "ACM SIGCOMM 2015",
    "type": "paper",
    "date": "2015",
    "title": "TIMELY: RTT-based Congestion Control for the Datacenter",
    "url": "https://research.google/pubs/timely-rtt-based-congestion-control-for-the-datacenter/",
    "supports": "NIC辅助精确RTT测量；低/高阈值与平滑RTT梯度控制发送速率；正常区间根据梯度增减并支持offload大segment。",
    "limit": "不需要ECN反馈不等于不需要网络管理；原测试保留PFC，不是PFC-free可靠性协议。"
  },
  {
    "id": "rd-paper-irn",
    "publisher": "ACM SIGCOMM 2018",
    "type": "paper",
    "date": "2018",
    "title": "Revisiting Network Support for RDMA",
    "url": "https://doi.org/10.1145/3230543.3230557",
    "supports": "RNIC selective recovery，OOO包直接DMA到最终主机地址并用bitmap追踪；BDP-FC限制在途包；扩展头字段及completion规则保持RDMA语义。",
    "limit": "不能在未修改旧RoCE RNIC时直接关PFC；IRN也不是拥塞控制算法的替代。"
  },
  {
    "id": "rd-paper-erpc",
    "publisher": "USENIX NSDI 2019",
    "type": "paper",
    "date": "2019",
    "title": "Datacenter RPCs can be General and Fast",
    "url": "https://www.usenix.org/conference/nsdi19/presentation/kalia",
    "supports": "用户态packet I/O、每会话信用与BDP限制、软件可靠性、TIMELY式CC；优化小消息/短handler/无拥塞常见路径，长handler可交worker。",
    "limit": "Ethernet测试使用普通UDP而非RoCE；IB测试用UD。它是RDMA方案的重要对照，不能列成one-sided RDMA库。"
  },
  {
    "id": "rd-paper-hpcc",
    "publisher": "ACM SIGCOMM 2019",
    "type": "paper",
    "date": "2019",
    "title": "HPCC: High Precision Congestion Control",
    "url": "https://dspace.mit.edu/entities/publication/2414a72f-069e-4df4-bc0e-b0db4474c959",
    "supports": "交换机INT携带队列长度、已发byte及时间戳；ACK返回链路状态；发送端估计in-flight/利用率，区分per-ACK fast reaction与per-RTT full update，抑制重复反馈过度反应。",
    "limit": "不是只开某个开关即可部署到任意旧RNIC；不能仅把ECN阈值换成队列长度就称HPCC。"
  },
  {
    "id": "rd-paper-fasst",
    "publisher": "USENIX OSDI 2016",
    "type": "paper",
    "date": "2016",
    "title": "FaSST: Fast, Scalable and Simple Distributed Transactions with Two-Sided (RDMA) Datagram RPCs",
    "url": "https://www.usenix.org/conference/osdi16/technical-sessions/presentation/kalia",
    "supports": "UD datagram RPC避免每peer RC状态；doorbell batching节约CPU/PCIe；服务端执行索引/OCC逻辑，并做复制日志与事务提交。",
    "limit": "不能把“UD连接可扩展”理解成UD自带可靠性，也不能直接替代lossy Ethernet上的完整重传协议。"
  },
  {
    "id": "rd-paper-guidelines",
    "publisher": "USENIX ATC 2016",
    "type": "paper",
    "date": "2016",
    "title": "Design Guidelines for High Performance RDMA Systems",
    "url": "https://www.usenix.org/conference/atc16/technical-sessions/presentation/kalia",
    "supports": "逐条计算操作的PCIe事务；减少CPU MMIO、doorbell batching、unsignaled completion、WQE优化、利用NIC并行并避免cache thrashing。",
    "limit": "不是永恒的最优参数表，不能将2016 ConnectX/Connect-IB结论直接当2026芯片测量。"
  },
  {
    "id": "rd-paper-deepseek_v3",
    "publisher": "arXiv:2412.19437v1, 26 Dec 2024",
    "type": "paper",
    "date": "2024",
    "title": "DeepSeek-V3 Technical Report",
    "url": "https://arxiv.org/abs/2412.19437v1",
    "supports": "重点读§3.2.1 DualPipe和§3.2.2跨节点all-to-all：拓扑感知转发、通信/计算重叠和node-limited routing；把dispatch/combine放回完整MoE执行图。",
    "limit": "这是V3的历史训练基础设施，不能套成V4.1模型参数或当前DeepEP API。"
  },
  {
    "id": "rd-paper-megascale_moe",
    "publisher": "arXiv:2505.11432v1, 16 May 2025",
    "type": "paper",
    "date": "2025",
    "title": "MegaScale-MoE: Large-Scale Communication-Efficient Training of Mixture-of-Experts Models in Production",
    "url": "https://arxiv.org/abs/2505.11432v1",
    "supports": "attention用sequence parallel、FFN用expert parallel；跨算子与算子内细粒度重叠；结合通信模式调整低精度压缩。",
    "limit": "不是RDMA transport/RNIC方案；训练结论不直接证明在线decode latency。"
  },
  {
    "id": "rd-paper-secondnet",
    "publisher": "ACM CoNEXT2010",
    "type": "paper",
    "date": "2010",
    "title": "SecondNet: A Data Center Network Virtualization Architecture with Bandwidth Guarantees",
    "url": "https://conferences.sigcomm.org/co-next/2010/CoNEXT_papers/15-Guo.pdf",
    "supports": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
    "limit": "与新闻主题关联，不证明新闻系统或产品就采用这篇论文的实现。"
  },
  {
    "id": "rd-paper-gray_failure",
    "publisher": "ACM HotOS2017",
    "type": "paper",
    "date": "2017",
    "title": "Gray Failure: The Achilles’ Heel of Cloud-Scale Systems",
    "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf",
    "supports": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
    "limit": "与新闻主题关联，不证明新闻系统或产品就采用这篇论文的实现。"
  },
  {
    "id": "rd-paper-dcp2025",
    "publisher": "ACM SIGCOMM2025",
    "type": "paper",
    "date": "2025",
    "title": "Revisiting RDMA Reliability for Lossy Fabrics",
    "url": "https://leewxgit.github.io/pdf/dcp-sigcomm25.pdf",
    "supports": "交换机trim拥塞包payload，以header-only通知驱动精确重传；扩展头支持OOO直接DMA，message计数替代packet bitmap。",
    "limit": "DCP+AR对比CX5+ECMP并非仅换恢复机制；不是LLM端到端训练实测。"
  },
  {
    "id": "rd-extra-deep_ep",
    "publisher": "DeepSeek",
    "type": "code",
    "date": "f6aa38fe06cd4a0489e7730365d4e0114970a2f3",
    "title": "DeepEP: an efficient expert-parallel communication library",
    "url": "https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/README.md",
    "supports": "MoE dispatch/combine、expanded expert layout与grouped GEMM接口、FP8 dispatch、NVLink域内和RDMA域间通信。",
    "limit": "固定commit是V2.5/NCCL Gin，移除V1/NVSHMEM；EP仍用GPU SM，不能引用旧V1零SM说法。主仓要求Hopper或更新、NVLink和RDMA；不同实验分支依赖不能混进主API。"
  },
  {
    "id": "rd-extra-cloudbrain",
    "publisher": "Microsoft Research",
    "type": "official",
    "date": "reviewed 2026-10-30",
    "title": "CloudBrain for Automatic Troubleshooting for the Cloud",
    "url": "https://www.microsoft.com/en-us/research/project/cloudbrain/publications/",
    "supports": "官方项目列出Pingmesh与Gray Failure。CloudBrain不是一篇同名RDMA transport论文。",
    "limit": "项目入口，不是同名RDMA transport论文。"
  }
];
for(const a of additions){if(!D.sources.some(v=>v.id===a.id))D.sources.push(a);if(!window.OBS_DATA.sources.some(v=>v.id===a.id))window.OBS_DATA.sources.push(a);}
window.OBS_DATA.version='0.5.0';
})();

/* Curated primary-source reading directory. Original sources retain their own rights. */
'use strict';
(() => {
const D=window.OBS_RDMA_DATA;
const profiles={
  "dcell": {
    "kind": "paper",
    "topics": [
      "scale-out"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "只用低端交换机与少量服务器网口，网络如何扩到百万节点？",
    "reading_guide": [
      "n=4时，5个DCell0如何组成20-server DCell1。",
      "节点/链路随机失效时，DFR与最短路的可达性差别。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "bcube": {
    "kind": "paper",
    "topics": [
      "scale-out"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "模块化机房里，如何同时加速一对一、一对多与全互联通信？",
    "reading_guide": [
      "BCube1(n=4)的16服务器与8交换机。",
      "两个端点如何获得多条并行路径。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "dcqcn": {
    "kind": "paper",
    "topics": [
      "congestion"
    ],
    "reading_level": "foundation",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "PFC已经防丢包，为什么还必须端到端控制发送速率？",
    "reading_guide": [
      "沿PFC暂停链追踪公平性与victim-flow。",
      "ECN→NP/CNP→RP完整反馈环。",
      "机制是否修复前面的两个具体反例。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "pingmesh": {
    "kind": "paper",
    "topics": [
      "operations",
      "scale-out"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "应用说网络慢，怎样用持续证据判断是否真是网络故障？",
    "reading_guide": [
      "Controller、Agent、存储分析三部分的闭环。",
      "正常硬件计数器没有解释的静默随机丢包如何被探测到。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "roce_scale": {
    "kind": "paper",
    "topics": [
      "transport",
      "congestion",
      "operations",
      "scale-out"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "从实验室的快RDMA，走到生产以太网需要解决哪些失败模式？",
    "reading_guide": [
      "VLAN-based与DSCP-based PFC标识路径。",
      "Ethernet flooding与PFC传播如何形成deadlock。",
      "故障NIC如何触发持续pause storm。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "byteps": {
    "kind": "paper",
    "topics": [
      "collectives",
      "training"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "GPU训练时，闲置CPU和网络带宽能否用于梯度汇总？",
    "reading_guide": [
      "GPU worker、CPU Summation Service和参数更新的职责分离。",
      "PCIe-only机内拓扑如何限制数据流。",
      "六种模型、8–256GPU的吞吐与资源基线。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "collie": {
    "kind": "paper",
    "topics": [
      "nic",
      "operations"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "厂商微架构不可见，怎样系统找出会触发RDMA异常的应用负载？",
    "reading_guide": [
      "把RNIC内部、PCIe、内存和部署环境看成整体。",
      "Workload engine→计数器→search→MFS闭环。",
      "随机、BO、仅性能计数器和诊断计数器搜索的时间差。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "byteexpress": {
    "kind": "report",
    "topics": [
      "transport",
      "operations",
      "training",
      "serving"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "RC硬件卸载之外，生产推理/训练RPC还缺哪几层软件控制？",
    "reading_guide": [
      "Archon RPC、ByteExpress和RC RNIC的三层职责。",
      "WR链的in-flight/pending/free与RQ信用。",
      "匹配operation load的生产Fetch延迟时间序列；结合Tables5–7。"
    ],
    "verification_scope": "Author preprint v2; submitted8Oct2026, revised12Oct2026. Not a peer-reviewed or independently reproduced product benchmark."
  },
  "farm": {
    "kind": "paper",
    "topics": [
      "transport",
      "fundamentals"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "把远端内存当共享对象空间，事务系统怎样从one-sided RDMA受益？",
    "reading_guide": [
      "物理连续内存与连接复用对RDMA性能的决定性影响。",
      "相邻对象的版本如何支持lock-free读取。",
      "lookup吞吐/延迟随集群规模的关系。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "herd": {
    "kind": "paper",
    "topics": [
      "transport",
      "serving",
      "nic"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "为什么让远端CPU处理请求，反而可以比远程读哈希表更快？",
    "reading_guide": [
      "延迟、inbound/outbound verbs吞吐差异。",
      "server请求内存的布局与轮询。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "timely": {
    "kind": "paper",
    "topics": [
      "congestion"
    ],
    "reading_level": "foundation",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "不读交换机队列，能否用RTT变化预测拥塞？",
    "reading_guide": [
      "硬件时间戳噪声与RTT对队列的相关性。",
      "发送控制器与completion中计算RTT。",
      "大规模offered load、throughput、尾延迟要一起看。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "irn": {
    "kind": "paper",
    "topics": [
      "transport",
      "congestion"
    ],
    "reading_level": "foundation",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "RDMA依赖无损网络，是语义本身必需，还是当时RNIC设计造成？",
    "reading_guide": [
      "分别切换PFC、recovery和显式CC，分离贡献。",
      "BDP-FC与go-back-N的ablation。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "erpc": {
    "kind": "paper",
    "topics": [
      "transport",
      "serving"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "高性能是否一定要one-sided RDMA与无损网络？",
    "reading_guide": [
      "CX5连接状态规模与性能变化。",
      "每session2credits的request/response流。",
      "单核吞吐和100节点多线程扩展。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "hpcc": {
    "kind": "paper",
    "topics": [
      "congestion"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "ECN太粗、RTT有噪声，能否直接用每跳负载做精确控制？",
    "reading_guide": [
      "INT、receiver ACK与sender窗口闭环。",
      "两个连续ACK反馈同一拥塞如何造成过度反应。",
      "实际packet format和FPGA NIC实现。",
      "四种微基准的HPCC/DCQCN动态比较；Figures10–11另在PDF第11页。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "fasst": {
    "kind": "paper",
    "topics": [
      "transport"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "把HERD式RPC从单server扩到all-to-all，能否做可串行化且持久的事务？",
    "reading_guide": [
      "连接数增长时RC READ和UD RPC的性能。",
      "事务消息与容错日志路径。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "guidelines": {
    "kind": "paper",
    "topics": [
      "fundamentals",
      "nic"
    ],
    "reading_level": "foundation",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "同样的verbs API，为什么低层选项会让性能相差数十倍？",
    "reading_guide": [
      "WQE-by-MMIO与doorbell的CPU↔NIC事务差异；Figures5–6另在PDF第5页。",
      "sequencer各项优化的贡献；HERD Figure9另在PDF第8页。"
    ],
    "verification_scope": "Peer-reviewed conference paper; original PDF and methods/evaluation checked"
  },
  "deepseek_v3": {
    "kind": "report",
    "topics": [
      "moe",
      "training",
      "collectives"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "MoE的token all-to-all，如何在NVLink域内与跨节点网络之间分工？",
    "reading_guide": [
      "按文本和原图区分机内/跨机、转发/计算、通信隐藏与带宽。"
    ],
    "verification_scope": "Official author technical report, not a transport-protocol paper; fixed v1 for historical communication design."
  },
  "megascale_moe": {
    "kind": "report",
    "topics": [
      "moe",
      "training",
      "collectives"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "MoE通信如何与并行策略、GEMM和低精度一起优化？",
    "reading_guide": [
      "分开固定batch强扩展和同比增batch弱扩展，核对baseline commit和并行配置。"
    ],
    "verification_scope": "Author preprint v1; no peer-reviewed venue claimed here."
  },
  "srnic": {
    "kind": "paper",
    "topics": [
      "nic",
      "transport"
    ],
    "reading_level": "deep",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "连接更多以后，RNIC怎样避免片上状态和乱序恢复成为瓶颈？",
    "reading_guide": [
      "Host、DMA、Transport、Basic NIC的职责划分。",
      "EMUX事件、ready/credit与SQ调度。",
      "host bitmap慢路径，下一页继续看恢复退出条件。"
    ],
    "verification_scope": "Peer-reviewed paper / prototype and ns-3 evaluated"
  },
  "secondnet": {
    "kind": "paper",
    "topics": [
      "scale-out",
      "operations"
    ],
    "reading_level": "deep",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "虚拟数据中心带宽保证、准入/放置和路径资源分配；与新闻QoS主题相关，不能断言新闻的QoS系统就专指SecondNet。",
    "reading_guide": [
      "先读VDC抽象、带宽保证与资源分配，分清准入/放置、路径和运维责任。",
      "对照原文的仿真/原型范围；带宽保证不等于端点拥塞控制或可靠重传。"
    ],
    "verification_scope": "Original conference paper; scope-specific interpretation"
  },
  "gray_failure": {
    "kind": "paper",
    "topics": [
      "operations"
    ],
    "reading_level": "core",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "用differential observability解释为什么heartbeat健康仍可能应用超时；连接Pingmesh和ByteExpress恢复层。",
    "reading_guide": [
      "先看differential observability与局部异常案例，理解检测器健康与应用退化为何可同时出现。",
      "再读可观测性与诊断讨论，连接Pingmesh和ByteExpress的故障处理问题。"
    ],
    "verification_scope": "Original conference paper; scope-specific interpretation"
  },
  "dcp2025": {
    "kind": "paper",
    "topics": [
      "transport",
      "congestion",
      "nic"
    ],
    "reading_level": "deep",
    "authors_complete": true,
    "authorship": "individuals",
    "added_in": "0.4",
    "year_basis": "publication",
    "reviewed": "2026-10-30",
    "why_read": "selective-repeat仍会把多路径乱序误判为丢包，尾包/重传包丢失依赖RTO。",
    "reading_guide": [
      "DCP整体workflow：trimming→HO→重传→OOO接收→ACK。",
      "原型基础性能、测试拓扑、loss goodput、多路径与AI collective测试。"
    ],
    "verification_scope": "Original conference paper; scope-specific interpretation"
  }
};
for(const p of D.papers)Object.assign(p,profiles[p.id]||{});
D.papers.push(...[
  {
    "id": "rfc5040",
    "short": "RFC 5040 · RDMAP 基础",
    "title": "A Remote Direct Memory Access Protocol Specification",
    "year": 2007,
    "venue": "IETF RFC 5040",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "R. Recio",
      "B. Metzler",
      "P. Culley",
      "J. Hilland",
      "D. Garcia"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc5040/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc5040.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc5040/",
    "doi": "10.17487/RFC5040",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport"
    ],
    "reading_level": "foundation",
    "problem": "远端内存访问究竟提供什么语义？",
    "question": "远端内存访问究竟提供什么语义？",
    "mechanism": "在DDP上定义READ、WRITE、SEND及ordering/completion；将工作语义与直接数据放置分层。",
    "cost": "需内存授权、连接状态和上层生命周期管理。它描述iWARP协议族，不能拿字段解释所有RoCE或NVLink。",
    "not_for": "需内存授权、连接状态和上层生命周期管理。它描述iWARP协议族，不能拿字段解释所有RoCE或NVLink。",
    "why_read": "读论文前先建立“数据放置、交付、完成”词汇。",
    "reading_guide": [
      "从§1.3层次、§5传输读起，重点看§5.5 Ordering and Completions。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Standards Track；扩展需同时对照RFC7306。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Standards Track；扩展需同时对照RFC7306。",
    "version": "RFC 5040",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport"
    ],
    "added_in": "0.6",
    "sourceId": "rd-iwarp"
  },
  {
    "id": "rfc5041",
    "short": "RFC 5041 · DDP / 直接放置",
    "title": "Direct Data Placement over Reliable Transports",
    "year": 2007,
    "venue": "IETF RFC 5041",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "H. Shah",
      "J. Pinkerton",
      "R. Recio",
      "P. Culley"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc5041/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc5041.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc5041/",
    "doi": "10.17487/RFC5041",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport",
      "nic"
    ],
    "reading_level": "foundation",
    "problem": "接收端怎样知道数据应该放进哪个buffer？",
    "question": "接收端怎样知道数据应该放进哪个buffer？",
    "mechanism": "Tagged使用STag与offset定位授权buffer；Untagged由接收端提供队列顺序。分段放置与消息边界分开。",
    "cost": "提前授权和资源管理仍必需；直接放置不等于应用已消费。此RFC以可靠底层为前提。",
    "not_for": "提前授权和资源管理仍必需；直接放置不等于应用已消费。此RFC以可靠底层为前提。",
    "why_read": "解释WRITE和SEND为什么有不同的接收资源语义。",
    "reading_guide": [
      "先看Tagged/Untagged buffer模型，再读§5 Placement、Ordering and Delivery规则。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Proposed Standard；RFC Editor列有RFC7146更新。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Proposed Standard；RFC Editor列有RFC7146更新。",
    "version": "RFC 5041",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport",
      "nic"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc5041"
  },
  {
    "id": "rfc5042",
    "short": "RFC 5042 · DDP / RDMAP 保护",
    "title": "Direct Data Placement Protocol (DDP) / Remote Direct Memory Access Protocol (RDMAP) Security",
    "year": 2007,
    "venue": "IETF RFC 5042",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "J. Pinkerton",
      "E. Deleganes"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc5042/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc5042.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc5042/",
    "doi": "10.17487/RFC5042",
    "kind": "standard",
    "topics": [
      "security",
      "nic",
      "operations"
    ],
    "reading_level": "deep",
    "problem": "旁路内核后，哪些权限与共享资源仍必须保护？",
    "question": "旁路内核后，哪些权限与共享资源仍必须保护？",
    "mechanism": "建立RNIC资源、信任与隔离模型，分析STag、buffer、CQ和Read请求队列的越界、共享及耗尽风险。",
    "cost": "权限键不是加密；资源配额、生命周期与传输保护需各自设计。不是现代GPU/RNIC产品的安全认证。",
    "not_for": "权限键不是加密；资源配额、生命周期与传输保护需各自设计。不是现代GPU/RNIC产品的安全认证。",
    "why_read": "把“少CPU参与”与“无需保护/配额”区分开。",
    "reading_guide": [
      "先读Trust and Resource Sharing，再看§6.4资源耗尽和附录中的实现要求。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Proposed Standard；RFC Editor列有RFC7146更新。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Proposed Standard；RFC Editor列有RFC7146更新。",
    "version": "RFC 5042",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "security",
      "nic",
      "operations"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc5042"
  },
  {
    "id": "rfc5044",
    "short": "RFC 5044 · MPA / TCP 成帧",
    "title": "Marker PDU Aligned Framing for TCP Specification",
    "year": 2007,
    "venue": "IETF RFC 5044",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "P. Culley",
      "U. Elzur",
      "R. Recio",
      "S. Bailey",
      "J. Carrier"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc5044/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc5044.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc5044/",
    "doi": "10.17487/RFC5044",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport"
    ],
    "reading_level": "core",
    "problem": "TCP是byte stream，怎样承载可直接放置的消息？",
    "question": "TCP是byte stream，怎样承载可直接放置的消息？",
    "mechanism": "MPA为DDP提供FPDU成帧、对齐与CRC32c相关规则，配合TCP承载；marker与CRC各有协商/处理条件。",
    "cost": "有头部、校验与连接协商开销；不能把TCP segment边界直接当应用消息边界。",
    "not_for": "有头部、校验与连接协商开销；不能把TCP segment边界直接当应用消息边界。",
    "why_read": "是理解“RDMA可以运行在TCP之上”的关键桥梁。",
    "reading_guide": [
      "看MPA Framing、§4.4 CRC Calculation和Connection Setup；对照TCP与DDP两端接口。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Proposed Standard；更新关系包括RFC6581、RFC7146。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Proposed Standard；更新关系包括RFC6581、RFC7146。",
    "version": "RFC 5044",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport"
    ],
    "added_in": "0.6",
    "sourceId": "rd-mpa"
  },
  {
    "id": "rfc7306",
    "short": "RFC 7306 · RDMAP atomic / immediate",
    "title": "Remote Direct Memory Access (RDMA) Protocol Extensions",
    "year": 2014,
    "venue": "IETF RFC 7306",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "H. Shah",
      "F. Marti",
      "W. Noureddine",
      "A. Eiriksson",
      "R. Sharp"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc7306/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc7306.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc7306/",
    "doi": "10.17487/RFC7306",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport"
    ],
    "reading_level": "deep",
    "problem": "原子操作与immediate data怎样加入远端内存协议？",
    "question": "原子操作与immediate data怎样加入远端内存协议？",
    "mechanism": "扩展RFC5040，增加atomic请求/响应和immediate data；定义header、匹配与操作顺序约束。",
    "cost": "需要端点支持；协议原子语义不自动等于GPU/CPU缓存一致，也不保证任意网卡支持。",
    "not_for": "需要端点支持；协议原子语义不自动等于GPU/CPU缓存一致，也不保证任意网卡支持。",
    "why_read": "避免将所有RDMA版本的能力当作完全相同。",
    "reading_guide": [
      "先读Header Format Extensions、Atomic Operations，再看Ordering规则与Immediate Data。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Standards Track，属于RDMAP扩展，不是RoCEv2通用升级公告。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Standards Track，属于RDMAP扩展，不是RoCEv2通用升级公告。",
    "version": "RFC 7306",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc7306"
  },
  {
    "id": "rfc8166",
    "short": "RFC 8166 · RPC-over-RDMA v1",
    "title": "Remote Direct Memory Access Transport for Remote Procedure Call Version 1",
    "year": 2017,
    "venue": "IETF RFC 8166",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "C. Lever",
      "W. Simpson",
      "T. Talpey"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc8166/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc8166.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc8166/",
    "doi": "10.17487/RFC8166",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport",
      "serving"
    ],
    "reading_level": "core",
    "problem": "有了READ/WRITE，RPC还要补什么？",
    "question": "有了READ/WRITE，RPC还要补什么？",
    "mechanism": "用inline消息和Read/Write/Reply chunks映射RPC数据，credit约束事务资源，并定义内存注册、错误和上层绑定。",
    "cost": "应用仍有消息编组、buffer管理与流控；不是直接对一个地址WRITE就完成任意RPC。",
    "not_for": "应用仍有消息编组、buffer管理与流控；不是直接对一个地址WRITE就完成任意RPC。",
    "why_read": "展示如何把底层RDMA组成可用的上层协议。",
    "reading_guide": [
      "从§3框架与资源管理读起，再看§4.3 Chunk Lists、§4.4 Memory Registration。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Standards Track；废止RFC5666，并由RFC8797更新。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Standards Track；废止RFC5666，并由RFC8797更新。",
    "version": "RFC 8166",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport",
      "serving"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc8166"
  },
  {
    "id": "rfc8797",
    "short": "RFC 8797 · RDMA-CM / RPC 协商",
    "title": "Remote Direct Memory Access - Connection Manager (RDMA-CM) Private Data for RPC-over-RDMA Version 1",
    "year": 2020,
    "venue": "IETF RFC 8797",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "C. Lever"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc8797/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc8797.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc8797/",
    "doi": "10.17487/RFC8797",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport"
    ],
    "reading_level": "deep",
    "problem": "小消息门限和remote invalidation能否在建连时协商？",
    "question": "小消息门限和remote invalidation能否在建连时协商？",
    "mechanism": "为RPC-over-RDMA v1定义可选CM Private Data，交换双向inline threshold和remote invalidation支持情况。",
    "cost": "连接重建要重新交换；双方能力与STag可失效条件都要满足，不能无条件启用。",
    "not_for": "连接重建要重新交换；双方能力与STag可失效条件都要满足，不能无条件启用。",
    "why_read": "把小消息快路径放回真实的能力协商与生命周期条件中。",
    "reading_guide": [
      "重点读§3 Advertised Transport Properties与§4 Private Data Message Format。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Proposed Standard；更新RFC8166，不改变RPC-over-RDMA v1的协议版本号。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Proposed Standard；更新RFC8166，不改变RPC-over-RDMA v1的协议版本号。",
    "version": "RFC 8797",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc8797"
  },
  {
    "id": "rfc3168",
    "short": "RFC 3168 · ECN 基础",
    "title": "The Addition of Explicit Congestion Notification (ECN) to IP",
    "year": 2001,
    "venue": "IETF RFC 3168",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "K. Ramakrishnan",
      "S. Floyd",
      "D. Black"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc3168/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc3168.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc3168/",
    "doi": "10.17487/RFC3168",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "congestion"
    ],
    "reading_level": "foundation",
    "problem": "ECN怎样把拥塞信息送回端点？",
    "question": "ECN怎样把拥塞信息送回端点？",
    "mechanism": "定义IP的ECN字段与TCP反馈/响应机制，让支持的网络在部分情况下标记而非直接丢包。",
    "cost": "ECN是信号，不是完整RDMA拥塞算法；突发仍可能丢包，RoCE CNP/DCQCN也不能等同TCP ECE处理。",
    "not_for": "ECN是信号，不是完整RDMA拥塞算法；突发仍可能丢包，RoCE CNP/DCQCN也不能等同TCP ECE处理。",
    "why_read": "分清ECN标记、发送端控制算法与PFC链路暂停。",
    "reading_guide": [
      "先看IP codepoints与TCP ECN反馈；对照DCTCP论文及RFC8257，再查更新关系。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Proposed Standard；原始基础RFC，后续更新列于RFC Editor状态页。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Proposed Standard；原始基础RFC，后续更新列于RFC Editor状态页。",
    "version": "RFC 3168",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "congestion"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc3168"
  },
  {
    "id": "rfc8257",
    "short": "RFC 8257 · DCTCP 实现说明",
    "title": "Data Center TCP (DCTCP): TCP Congestion Control for Data Centers",
    "year": 2017,
    "venue": "IETF RFC 8257",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "S. Bensley",
      "D. Thaler",
      "P. Balasubramanian",
      "L. Eggert",
      "G. Judd"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc8257/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc8257.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc8257/",
    "doi": "10.17487/RFC8257",
    "kind": "report",
    "topics": [
      "congestion",
      "operations"
    ],
    "reading_level": "core",
    "problem": "DCTCP论文变成操作系统实现后，部署还有哪些前提？",
    "question": "DCTCP论文变成操作系统实现后，部署还有哪些前提？",
    "mechanism": "通过ECN标记比例估计拥塞程度并调节TCP窗口；记录端点反馈、loss处理与实现部署问题。",
    "cost": "这是Informational RFC；面向受控数据中心，不能无额外措施搬到公网，也不是RDMA rate controller。",
    "not_for": "这是Informational RFC；面向受控数据中心，不能无额外措施搬到公网，也不是RDMA rate controller。",
    "why_read": "把论文算法与真实协商、共存和ACK丢失问题连起来。",
    "reading_guide": [
      "读§3算法、§4实现、§5共存部署及§6已知问题；不要只看alpha公式。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Informational，不标成正式Internet Standard。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Informational，不标成正式Internet Standard。",
    "version": "RFC 8257",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "report",
    "original_topics": [
      "congestion",
      "operations"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc8257"
  },
  {
    "id": "rfc9293",
    "short": "RFC 9293 · TCP 基础规范",
    "title": "Transmission Control Protocol (TCP)",
    "year": 2022,
    "venue": "IETF RFC 9293",
    "publisher": "IETF / RFC Editor",
    "authors": [
      "W. Eddy"
    ],
    "authors_complete": true,
    "authorship": "individuals",
    "guo_coauthor": false,
    "authors_url": "https://www.rfc-editor.org/info/rfc9293/",
    "pdf_url": "https://www.rfc-editor.org/rfc/rfc9293.html",
    "primary_url": "https://www.rfc-editor.org/info/rfc9293/",
    "doi": "10.17487/RFC9293",
    "kind": "standard",
    "topics": [
      "fundamentals",
      "transport"
    ],
    "reading_level": "foundation",
    "problem": "TCP可靠byte stream与RDMA内存操作有什么根本差别？",
    "question": "TCP可靠byte stream与RDMA内存操作有什么根本差别？",
    "mechanism": "汇总TCP连接、序号、重传、流控与数据通信的规范要求，替代RFC793及相关更新。",
    "cost": "本身不定义远端内存注册、rkey或RDMA WRITE语义；与TCP上承载的iWARP分层阅读。",
    "not_for": "本身不定义远端内存注册、rkey或RDMA WRITE语义；与TCP上承载的iWARP分层阅读。",
    "why_read": "给TCP/IP与RDMA比较提供原始定义，避免“TCP必然多次CPU拷贝”的误推。",
    "reading_guide": [
      "阅读Functional Specification中的Sequence Numbers、Connection Establishment、Data Communication及要求汇总。"
    ],
    "key_figures": [],
    "experiment": {
      "environment": "协议规范/实现说明；这里不摘硬件跑分。",
      "result": "Internet Standard / STD7，2022年8月发布。",
      "limit": "适用范围以文中规范和更新关系为准；不由RFC推出某款商用设备的实现。"
    },
    "evidence_status": "Internet Standard / STD7，2022年8月发布。",
    "version": "RFC 9293",
    "reviewed": "2026-10-30",
    "verification_scope": "核对RFC Editor署名/状态、摘要与指定机制章节；不声称复核全部勘误。",
    "year_basis": "publication",
    "original_kind": "standard",
    "original_topics": [
      "fundamentals",
      "transport"
    ],
    "added_in": "0.6",
    "sourceId": "rd-lit-rfc9293"
  },
  {
    "id": "dctcp",
    "short": "DCTCP",
    "title": "Data Center TCP (DCTCP)",
    "year": 2010,
    "venue": "ACM SIGCOMM 2010",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Mohammad Alizadeh",
      "Albert Greenberg",
      "David A. Maltz",
      "Jitendra Padhye",
      "Parveen Patel",
      "Balaji Prabhakar",
      "Sudipta Sengupta",
      "Murari Sridharan"
    ],
    "authors_display": "Mohammad Alizadeh, Albert Greenberg, David A. Maltz, Jitendra Padhye, Parveen Patel, Balaji Prabhakar, Sudipta Sengupta, Murari Sridharan",
    "authors_complete": true,
    "authors_url": "https://www.microsoft.com/en-us/research/publication/data-center-tcp-dctcp/",
    "primary_url": "https://www.microsoft.com/en-us/research/publication/data-center-tcp-dctcp/",
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2017/01/dctcp-sigcomm2010.pdf",
    "topics": [
      "congestion",
      "fundamentals"
    ],
    "kind": "paper",
    "reading_level": "foundation",
    "question": "一个ECN位怎样提供拥塞程度，而不只是有无拥塞？",
    "problem": "长流积压交换机缓冲会拖慢查询短流，突发incast又会触发丢包和超时；需要同时保住低排队和高利用率。",
    "mechanism": "交换机按队列阈值标记ECN，发送端估计被标记byte的比例并平滑为α，再按α缩减窗口；其反馈量来自一段标记序列，而不是单个包携带多位数值。",
    "cost": "需要端到端ECN与配套接收反馈；阈值、往返时延及新旧TCP混跑需要管理，极端同步突发也不因ECN自动消失。",
    "not_for": "它是TCP拥塞控制，不是RDMA可靠传输；不证明PFC可直接关闭，也不解决RNIC微架构隔离。",
    "experiment": {
      "environment": "6000服务器生产流量用于诊断；协议验证在94台机器、1/10GbE浅缓冲交换机测试床进行。",
      "result": "在给定工作负载中同时降低缓冲占用并保住吞吐，解释后续DCQCN、DCTCP式硬件控制的出发点。",
      "limit": "生产测量、受控测试床及不同链路速率不可合并成一个部署规模或通用倍率。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "先读它再读DCQCN，能分清ECN信号、控制律与可靠性。",
    "reading_guide": [
      "§2生产工作负载与三类性能损伤",
      "§3标记比例、α与窗口规则",
      "§4测试条件、incast和混合工作负载"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-dctcp",
    "original_kind": "paper",
    "original_topics": [
      "congestion-control",
      "ECN",
      "foundation"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "pfabric",
    "short": "pFabric",
    "title": "pFabric: Minimal Near-Optimal Datacenter Transport",
    "year": 2013,
    "venue": "ACM SIGCOMM 2013",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Mohammad Alizadeh",
      "Shuang Yang",
      "Milad Sharif",
      "Sachin Katti",
      "Nick McKeown",
      "Balaji Prabhakar",
      "Scott Shenker"
    ],
    "authors_display": "Mohammad Alizadeh, Shuang Yang, Milad Sharif, Sachin Katti, Nick McKeown, Balaji Prabhakar, Scott Shenker",
    "authors_complete": true,
    "authors_url": "https://yuba.stanford.edu/~nickm/papers/pfabric.pdf",
    "primary_url": "https://yuba.stanford.edu/~nickm/papers/pfabric.pdf",
    "pdf_url": "https://yuba.stanford.edu/~nickm/papers/pfabric.pdf",
    "topics": [
      "congestion",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "foundation",
    "question": "流完成时间由速率控制，还是由谁先发决定？",
    "problem": "小流被大流占据的队列挡住，即使平均吞吐很高，尾部完成时间仍可能很差；论文把调度与速率控制拆开研究。",
    "mechanism": "包携带剩余流大小等优先级，交换机以小缓冲按优先级接纳、丢弃与发送；端点先以线速启动，只有持续严重丢包才退让。",
    "cost": "交换机需实现精确优先级入队及淘汰，端点也要修改；依赖可取得的优先级信息，不是普通FIFO交换机改阈值即可完整复现。",
    "not_for": "它是全新传输设计与比较基线，不能当成现有RoCE、NCCL或商用RNIC已经采用的机制。",
    "experiment": {
      "environment": "主要为包级仿真；144台主机、9个leaf与4个spine，主机10Gbps、上联40Gbps的无超售拓扑。",
      "result": "仿真展示了优先级调度对短流尾延迟的价值，并以理想调度基线检验效率。",
      "limit": "这里的近最优结论属于论文的目标函数、拓扑与负载；没有百万GPU实网部署证据。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "给Homa、NDP和现代MoE流调度提供一个清楚的调度参照。",
    "reading_guide": [
      "设计部分的包优先级、队列接纳与速率控制",
      "§4实现可行性",
      "§5仿真配置与负载分布"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-pfabric",
    "original_kind": "paper",
    "original_topics": [
      "flow-scheduling",
      "congestion-control",
      "switch-architecture"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "expresspass",
    "short": "ExpressPass",
    "title": "Credit-Scheduled Delay-Bounded Congestion Control for Datacenters",
    "year": 2017,
    "venue": "ACM SIGCOMM 2017",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Inho Cho",
      "Keon Jang",
      "Dongsu Han"
    ],
    "authors_display": "Inho Cho, Keon Jang, Dongsu Han",
    "authors_complete": true,
    "authors_url": "https://people.csail.mit.edu/inhocho/papers/sigcomm17credit.pdf",
    "primary_url": "https://people.csail.mit.edu/inhocho/papers/sigcomm17credit.pdf",
    "pdf_url": "https://people.csail.mit.edu/inhocho/papers/sigcomm17credit.pdf",
    "topics": [
      "transport",
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "能否在数据入网之前完成拥塞准入？",
    "problem": "靠已发生的排队或丢包再减速，面对高速短流和同步incast常常反应太迟；快速起速与缓冲安全相互冲突。",
    "mechanism": "接收端先发credit，交换机逐链路限制反向credit流；发送端按收到的credit发送数据，使数据到达顺序在入网前被调节，并通过反馈及随机扰动处理credit损失与公平性。",
    "cost": "额外控制包占用带宽，端点处理抖动和正反向路径、速率配置会影响所需缓冲；启动也需要credit握手。",
    "not_for": "这是端到端协议与交换机协作，不是RC的接收WQE credit，也不能直接视为标准RoCE拥塞控制。",
    "experiment": {
      "environment": "SoftNIC软件端点与商用交换机的10Gbps测试床；另用ns-2扩展负载和链路条件。",
      "result": "受控实验说明先调度credit可同时加快收敛并降低队列，突发和公平性仍需分别验证。",
      "limit": "更高速与更大规模部分来自仿真，软件credit处理时间的假设须保留。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "把PFC的逐跳暂停与端到端接收credit分开看。",
    "reading_guide": [
      "设计中credit调度及缓冲界限的推导",
      "credit反馈、随机抖动和启动停止机制",
      "实现与评估部分：区分10Gbps测试床和ns-2"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-expresspass",
    "original_kind": "paper",
    "original_topics": [
      "receiver-driven",
      "congestion-control",
      "credits"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "ndp",
    "short": "NDP",
    "title": "Re-architecting Datacenter Networks and Stacks for Low Latency and High Performance",
    "year": 2017,
    "venue": "ACM SIGCOMM 2017",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Mark Handley",
      "Costin Raiciu",
      "Alexandru Agache",
      "Andrei Voinescu",
      "Andrew W. Moore",
      "Gianni Antichi",
      "Marcin Wójcik"
    ],
    "authors_display": "Mark Handley, Costin Raiciu, Alexandru Agache, Andrei Voinescu, Andrew W. Moore, Gianni Antichi, Marcin Wójcik",
    "authors_complete": true,
    "authors_url": "https://discovery.ucl.ac.uk/id/eprint/10068163/",
    "primary_url": "https://discovery.ucl.ac.uk/id/eprint/10068163/",
    "pdf_url": "https://discovery.ucl.ac.uk/id/eprint/10068163/1/ndp.pdf",
    "topics": [
      "transport"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "交换机拥塞时，保留包头能带来什么？",
    "problem": "Clos提供多条高容量路径，传统端点协议却难以同时实现极低时延、满吞吐与强incast容忍；隐藏需求和队列积压尤其困难。",
    "mechanism": "极浅缓冲满时将数据包裁为包头，并优先转发包头；接收端由此观察需求，通过pull调度数据与重传，并结合多路径发送。",
    "cost": "需要支持裁剪及包头优先转发的交换机、配套端点与pull流控；控制包、重传和接收调度本身都有资源成本。",
    "not_for": "它是独立传输架构，不等于现有RC网卡天然支持乱序和trimming；也不提供GPU消费可见性的替代协议。",
    "experiment": {
      "environment": "作者公开记录确认Linux/DPDK端点、软件交换机、NetFPGA与P4实现，以及大规模仿真。",
      "result": "原型与仿真展示浅缓冲、需求反馈和接收调度的组合可改善不同负载。",
      "limit": "本轮官方馆藏PDF读取受限，未标确切图号、页码或未核实的测试床节点数。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "理解IRN、DCP与EQDS为何会选择不同的可靠性和队列边界。",
    "reading_guide": [
      "先读架构中trimmed header、pull和优先级的关系",
      "再读实现部分的端点/交换机修改",
      "最后区分原型和大规模仿真；本轮不提供确切章节号"
    ],
    "evidence_status": "Author-institution publication record checked; original PDF linked but fetch blocked; no exact figure/page or unverified evaluation numbers claimed",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-ndp",
    "original_kind": "paper",
    "original_topics": [
      "receiver-driven",
      "packet-trimming",
      "multipath"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "公开摘要/官方介绍已核对，全文获取受限；不声称完整读过论文。 Author-institution publication record checked; original PDF linked but fetch blocked; no exact figure/page or unverified evaluation numbers claimed"
  },
  {
    "id": "homa",
    "short": "Homa",
    "title": "Homa: A Receiver-Driven Low-Latency Transport Protocol Using Network Priorities",
    "year": 2018,
    "venue": "ACM SIGCOMM 2018",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Behnam Montazeri",
      "Yilong Li",
      "Mohammad Alizadeh",
      "John Ousterhout"
    ],
    "authors_display": "Behnam Montazeri, Yilong Li, Mohammad Alizadeh, John Ousterhout",
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/1803.09615",
    "primary_url": "https://arxiv.org/abs/1803.09615",
    "pdf_url": "https://arxiv.org/pdf/1803.09615",
    "topics": [
      "transport",
      "serving",
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "RPC短消息怎样避免排在大消息后面？",
    "problem": "数据中心RPC包含大量极短消息；按byte stream与平均带宽组织传输，不能保证小消息在高负载时仍接近硬件时延。",
    "mechanism": "小消息先发送unscheduled数据；长消息由接收端grant控制。动态优先级近似最短剩余处理时间，适度overcommit接收带宽，避免单个发送端阻塞让链路空闲。",
    "cost": "需要端点新协议、交换机优先级和发送端限队列；接收调度及状态有开销，极端不可预测incast仍消耗缓冲。",
    "not_for": "这是RPC消息协议而非verbs RC；2018实现的结论不能替代2026 Linux实现、草案或GPU通信库的兼容性验证。",
    "experiment": {
      "environment": "RAMCloud原型：16个CloudLab节点、10GbE，8客户端/8服务器；另有144主机两级网络包级仿真。",
      "result": "混合短长消息下展示接收端调度和优先级对尾延迟的作用。",
      "limit": "InfiniBand比较来自不同CPU和链路配置；不能把那条对照曲线当成等硬件比较。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "与RDMA对照时明确比较的是RPC语义和调度，而非单个WRITE时延。",
    "reading_guide": [
      "§2动机与关键概念",
      "§3grant、unscheduled与优先级",
      "§5.1实现实验、§5.2仿真；§6限制"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-homa",
    "original_kind": "paper",
    "original_topics": [
      "receiver-driven",
      "RPC",
      "flow-scheduling"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "swift",
    "short": "Swift",
    "title": "Swift: Delay is Simple and Effective for Congestion Control in the Datacenter",
    "year": 2020,
    "venue": "ACM SIGCOMM 2020",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Gautam Kumar",
      "Nandita Dukkipati",
      "Keon Jang",
      "Hassan M. G. Wassel",
      "Xian Wu",
      "Behnam Montazeri",
      "Yaogong Wang",
      "Kevin Springborn",
      "Christopher Alfeld",
      "Michael Ryan",
      "David Wetherall",
      "Amin Vahdat"
    ],
    "authors_display": "Gautam Kumar, Nandita Dukkipati, Keon Jang, Hassan M. G. Wassel, Xian Wu, Behnam Montazeri, Yaogong Wang, Kevin Springborn, Christopher Alfeld, Michael Ryan, David Wetherall, Amin Vahdat",
    "authors_complete": true,
    "authors_url": "https://research.google/pubs/swift-delay-is-simple-and-effective-for-congestion-control-in-the-datacenter/",
    "primary_url": "https://research.google/pubs/swift-delay-is-simple-and-effective-for-congestion-control-in-the-datacenter/",
    "pdf_url": "https://dl.acm.org/doi/pdf/10.1145/3387514.3406591",
    "topics": [
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "RTT升高来自网络，还是接收主机处理不过来？",
    "problem": "仅控制交换机队列会忽略NIC和主机端点排队；持续演进的异构集群也让依赖交换机专有信号的方案难维护。",
    "mechanism": "借助NIC与软件时间戳拆分fabric和endpoint延迟，分别维护窗口；按目标延迟执行AIMD，并在极端拥塞时使用小于一个包的窗口及pacing。",
    "cost": "需要准确时间戳、时钟映射、合适目标值与软件栈支持；目标过紧会降吞吐，过松则增加排队。",
    "not_for": "它是Pony Express/Snap内的控制方案，不是把TIMELY的梯度参数调一下，也不是所有RoCE硬件可直接装载的算法。",
    "experiment": {
      "environment": "60台50Gbps机器测试床与约500台100Gbps测试床，另有Google生产部署经验。",
      "result": "分别验证incast、端点拥塞、目标延迟和大规模随机通信，说明延迟信号也能支撑高吞吐。",
      "limit": "生产经验与受控基准分开记录，不能把最低尾延迟外推到任意平台。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "承接TIMELY，补上经常遗漏的端点拥塞。",
    "reading_guide": [
      "§3延迟组成、两个窗口及target scaling",
      "§5测试床与目标延迟敏感性",
      "生产经验部分和附录的时间戳/软件栈限制"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-swift",
    "original_kind": "paper",
    "original_topics": [
      "congestion-control",
      "delay",
      "endpoint-congestion"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "eqds",
    "short": "EQDS",
    "title": "An Edge-Queued Datagram Service for All Datacenter Traffic",
    "year": 2022,
    "venue": "USENIX NSDI 2022",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Vladimir Olteanu",
      "Haggai Eran",
      "Dragos Dumitrescu",
      "Adrian Popa",
      "Cristi Baciu",
      "Mark Silberstein",
      "Georgios Nikolaidis",
      "Mark Handley",
      "Costin Raiciu"
    ],
    "authors_display": "Vladimir Olteanu, Haggai Eran, Dragos Dumitrescu, Adrian Popa, Cristi Baciu, Mark Silberstein, Georgios Nikolaidis, Mark Handley, Costin Raiciu",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi22/presentation/olteanu",
    "primary_url": "https://www.usenix.org/conference/nsdi22/presentation/olteanu",
    "pdf_url": "https://www.usenix.org/system/files/nsdi22-paper-olteanu.pdf",
    "topics": [
      "transport",
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "能否让TCP、RDMA等不同控制回路共用一张网络？",
    "problem": "不同传输依赖交换机队列交互，直接混跑容易互相伤害；换掉整个上层栈又使新协议难部署。",
    "mechanism": "引入边缘排队的数据报服务，将等待移到发送端EQIF，由接收端pull决定入网；不同上层传输使用各自队列和反馈接口，底层可裁剪或以RTS方式发起。",
    "cost": "增加隧道、边缘缓冲和调度；SmartNIC原型搬运及ARM处理会成为瓶颈，必须给上层RDMA引擎有效反压。",
    "not_for": "EQDS不是直接替换RDMA动词的API，也没有证明完全无排队；等待主要被迁到边缘。",
    "experiment": {
      "environment": "DPDK、Linux内核与SmartNIC实现；原型RDMA实验因SmartNIC内部互连限制配置为10Gbps；另有仿真。",
      "result": "展示TCP/RDMA共存、NVMeOF和不同EQIF的价值。",
      "limit": "不要把原生EQDS达到的100Gbps，与RDMA-over-SmartNIC的10Gbps实验混为一谈。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "把边缘队列、网络队列和传输控制三层拆清。",
    "reading_guide": [
      "服务模型与EQIF分类",
      "§6 RDMA EQIF、CNP/PFC与端侧反馈",
      "§7实现及评估中的原型瓶颈"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-eqds",
    "original_kind": "paper",
    "original_topics": [
      "receiver-driven",
      "transport-coexistence",
      "queueing"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "justitia",
    "short": "Justitia",
    "title": "Justitia: Software Multi-Tenancy in Hardware Kernel-Bypass Networks",
    "year": 2022,
    "venue": "USENIX NSDI 2022",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Yiwen Zhang",
      "Yue Tan",
      "Brent Stephens",
      "Mosharaf Chowdhury"
    ],
    "authors_display": "Yiwen Zhang, Yue Tan, Brent Stephens, Mosharaf Chowdhury",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi22/presentation/zhang-yiwen",
    "primary_url": "https://www.usenix.org/conference/nsdi22/presentation/zhang-yiwen",
    "pdf_url": "https://www.usenix.org/system/files/nsdi22-paper-zhang_yiwen.pdf",
    "topics": [
      "operations",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "内核旁路之后，谁执行共享策略？",
    "problem": "应用直接把操作交给RNIC后，传统内核流控失去仲裁点；带宽密集、操作率密集和时延敏感流量会发生不同争用。",
    "mechanism": "软件中介将连接调节与消息级整形分开，结合发送端资源仲裁、接收端反馈和被动时延监测，以目标尾时延约束共享并支持公平或加权分配。",
    "cost": "需要应用通过对应软件路径，整形、分块与监测会增加开销，紧时延目标可能牺牲部分利用率。",
    "not_for": "不提供恶意租户无法绕过的完整安全边界，也未覆盖所有RNIC隐藏资源；后续Husky专门检验了这些缺口。",
    "experiment": {
      "environment": "主要测试56Gbps IB、40Gbps RoCEv2/iWARP，另有10/100Gbps设置；使用DARE、Crail和微基准。",
      "result": "受控实验说明同时管理byte速率与操作率比只限制带宽更有效。",
      "limit": "结论应保留依赖受控软件中介及工作负载的条件，不能描述成公开云全部资源的强隔离。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "形成Justitia→Husky→Harmonic的隔离研究路线。",
    "reading_guide": [
      "§3不同应用的干扰实例",
      "设计部分的Split Connection和消息整形",
      "§6与附录A/C；随后对照Husky Table 3"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-justitia",
    "original_kind": "paper",
    "original_topics": [
      "performance-isolation",
      "RNIC",
      "software-mediation"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "husky",
    "short": "Husky",
    "title": "Understanding RDMA Microarchitecture Resources for Performance Isolation",
    "year": 2023,
    "venue": "USENIX NSDI 2023",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Xinhao Kong",
      "Jingrong Chen",
      "Wei Bai",
      "Yechen Xu",
      "Mahmoud Elhaddad",
      "Shachar Raindel",
      "Jitendra Padhye",
      "Alvin R. Lebeck",
      "Danyang Zhuo"
    ],
    "authors_display": "Xinhao Kong, Jingrong Chen, Wei Bai, Yechen Xu, Mahmoud Elhaddad, Shachar Raindel, Jitendra Padhye, Alvin R. Lebeck, Danyang Zhuo",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi23/presentation/kong",
    "primary_url": "https://www.usenix.org/conference/nsdi23/presentation/kong",
    "pdf_url": "https://www.usenix.org/system/files/nsdi23-kong.pdf",
    "topics": [
      "nic",
      "operations"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "只保带宽，为什么仍会被低带宽邻居拖慢？",
    "problem": "RNIC的处理单元、缓存和PCIe不是一条带宽数字能代表的资源；错误处理及控制动词也会影响其他租户。",
    "mechanism": "建立动词到微架构资源的操作模型，生成系统性Husky测试，分别消耗处理单元、缓存和PCIe，并比较硬件TC、SR-IOV及Justitia等隔离方式。",
    "cost": "这是一套揭示和定位资源争用的模型与测试，不是直接修好隔离的完整架构；需要特定设备和驱动上的对照实验。",
    "not_for": "不能将当年固件中的反例写成所有后续RNIC永久存在的问题；SR-IOV地址隔离也不等于性能隔离。",
    "experiment": {
      "environment": "研究NVIDIA、Chelsio和Intel RNIC；隔离方案评估主要为两台100Gbps CX-5，真实应用为四台CX-5，另复查CX-6。",
      "result": "展示现有方法可保住带宽却在微架构压力下失守，促进后续硬件感知隔离设计。",
      "limit": "不同厂商的隔离机制并未全部成功启用；不得称为所有厂商同一套隔离配置的比较。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "理解图中RNIC缓存与处理单元为何必须作为共享资源。",
    "reading_guide": [
      "操作模型与控制/数据/异常分类",
      "§5与Table 3的具体失守条件",
      "厂商反馈和未来隔离要求"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-husky",
    "original_kind": "paper",
    "original_topics": [
      "RNIC-microarchitecture",
      "performance-isolation",
      "benchmarking"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "harmonic",
    "short": "Harmonic",
    "title": "Harmonic: Hardware-assisted RDMA Performance Isolation for Public Clouds",
    "year": 2024,
    "venue": "USENIX NSDI 2024",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Jiaqi Lou",
      "Xinhao Kong",
      "Jinghan Huang",
      "Wei Bai",
      "Nam Sung Kim",
      "Danyang Zhuo"
    ],
    "authors_display": "Jiaqi Lou, Xinhao Kong, Jinghan Huang, Wei Bai, Nam Sung Kim, Danyang Zhuo",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi24/presentation/lou",
    "primary_url": "https://www.usenix.org/conference/nsdi24/presentation/lou",
    "pdf_url": "https://www.usenix.org/system/files/nsdi24-lou.pdf",
    "topics": [
      "operations",
      "nic",
      "gpu"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "怎样观察并约束每个租户消耗的隐藏NIC资源？",
    "problem": "只看网络byte速率和请求率无法识别原子操作、缓存和PCIe争用，租户可能在低网络占用下伤害邻居。",
    "mechanism": "FPGA原型的可编程智能PCIe交换机监测每租户RDMA资源使用，配合RDMA友好的限速机制；控制路径也受调节，不只限制数据包。",
    "cost": "增加PCIe硬件、可信映射和管理逻辑；用CNP复用RNIC限速器存在网络拥塞信号干扰等精度权衡。",
    "not_for": "不是不用改硬件的纯软件方案，也不是证明任意商用RNIC已经具有完整微架构分区。",
    "experiment": {
      "environment": "两个服务器各25Gbps CX-6 Dx，RNIC直接连接；FPGA PCIe交换机、Husky与Redis评估。",
      "result": "原型显示微架构感知的计量与调节能改善所测隔离场景。",
      "limit": "高带宽PCIe争用部分靠比例配置模拟；不能把25Gbps双机研究原型写成400Gbps生产部署。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "把Husky发现的问题接到一种具体硬件实现。",
    "reading_guide": [
      "设计中的PCIe观测和租户归属",
      "§6.1实验设置及Husky/Redis结果",
      "讨论部分CNP限速和通用性边界"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-harmonic",
    "original_kind": "paper",
    "original_topics": [
      "performance-isolation",
      "RNIC-microarchitecture",
      "PCIe"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "reverie",
    "short": "Reverie",
    "title": "Reverie: Low Pass Filter-Based Switch Buffer Sharing for Datacenters with RDMA and TCP Traffic",
    "year": 2024,
    "venue": "USENIX NSDI 2024",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Vamsi Addanki",
      "Wei Bai",
      "Stefan Schmid",
      "Maria Apostolaki"
    ],
    "authors_display": "Vamsi Addanki, Wei Bai, Stefan Schmid, Maria Apostolaki",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi24/presentation/addanki-reverie",
    "primary_url": "https://www.usenix.org/conference/nsdi24/presentation/addanki-reverie",
    "pdf_url": "https://www.usenix.org/system/files/nsdi24-addanki-reverie.pdf",
    "topics": [
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "TCP与PFC流量共用一块缓冲，为什么会互相伤害？",
    "problem": "入口和出口各自管理共享缓冲容易形成冲突视图；逐包响应瞬时队列变化，又会放大PFC流量与有损流量的差异。",
    "mechanism": "统一入口/出口准入视图，用低通滤波后的队列统计做阈值决策，在总缓冲界限内吸收突发，同时隔离有损和无损类别。",
    "cost": "需要交换机MMU能取得并使用相关状态；滤波参数影响突发、暂停和时延的权衡，最佳参数并非自动已知。",
    "not_for": "它改缓冲共享，不替代端侧拥塞控制与可靠重传，也不是声明所有RDMA必须或可以永远使用PFC。",
    "experiment": {
      "environment": "NS-3：256主机、16leaf/4spine、25Gbps、4倍超售，背景流和incast；比较DCQCN/PowerTCP与TCP。",
      "result": "仿真显示统一视图与平滑统计可改善混合流量的暂停和完成时间。",
      "limit": "本论文性能评估来自仿真，且用单一MMU简化真实ASIC；不是商用芯片部署实测。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "给PFC图补上交换机缓冲管理这一层。",
    "reading_guide": [
      "§2现有入口/出口缓冲模型的问题",
      "设计部分的统一准入及低通滤波",
      "§4.1设置与参数敏感性"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-reverie",
    "original_kind": "paper",
    "original_topics": [
      "switch-buffer",
      "PFC",
      "transport-coexistence"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "bolt",
    "short": "Bolt",
    "title": "Bolt: Sub-RTT Congestion Control for Ultra-Low Latency",
    "year": 2023,
    "venue": "USENIX NSDI 2023",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Serhat Arslan",
      "Yuliang Li",
      "Gautam Kumar",
      "Nandita Dukkipati"
    ],
    "authors_display": "Serhat Arslan, Yuliang Li, Gautam Kumar, Nandita Dukkipati",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi23/presentation/arslan",
    "primary_url": "https://www.usenix.org/conference/nsdi23/presentation/arslan",
    "pdf_url": "https://www.usenix.org/system/files/nsdi23-arslan.pdf",
    "topics": [
      "congestion",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "拥塞刚发生，能否在完整RTT之前收到反馈？",
    "problem": "链路越快，越多短传输在几个BDP内结束；等待完整RTT再调节，可能已经积压或错过新释放的带宽。",
    "mechanism": "交换机生成Sub-RTT Control，发送更及时的拥塞信号；Proactive Ramp-Up利用即将完成的流，Supply Matching补充突发空闲带宽，配合端点窗口控制。",
    "cost": "需要修改端点与交换机数据平面、维护信号和令牌状态；额外反馈也占带宽，缺少精准信号时仍有回退。",
    "not_for": "它是可编程网络协作算法，不是普通ECN阈值调整，也不表示任意RNIC或交换机可直接部署。",
    "experiment": {
      "environment": "Snap软件栈、Tofino2 P4原型；另有NS-3微基准、敏感性、公平性与规模实验。",
      "result": "实验分别验证快速降速和快速利用空闲带宽的贡献。",
      "limit": "高速及大规模曲线必须按原型与仿真区分，不能统一写成400Gbps生产部署。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "把Swift/HPCC之后的控制回路时长问题讲具体。",
    "reading_guide": [
      "§3的SRC、PRU、SM三机制",
      "§4主机与Tofino2实现",
      "§5.1–5.5：分开仿真与实验室原型"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-bolt",
    "original_kind": "paper",
    "original_topics": [
      "congestion-control",
      "programmable-switch",
      "fast-feedback"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "conweave",
    "short": "ConWeave",
    "title": "Network Load Balancing with In-network Reordering Support for RDMA",
    "year": 2023,
    "venue": "ACM SIGCOMM 2023",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Cha Hwan Song",
      "Xin Zhe Khooi",
      "Raj Joshi",
      "Inho Choi",
      "Jialin Li",
      "Mun Choon Chan"
    ],
    "authors_display": "Cha Hwan Song, Xin Zhe Khooi, Raj Joshi, Inho Choi, Jialin Li, Mun Choon Chan",
    "authors_complete": true,
    "authors_url": "https://conferences.sigcomm.org/sigcomm/2023/program.html",
    "primary_url": "https://conferences.sigcomm.org/sigcomm/2023/program.html",
    "pdf_url": "https://dl.acm.org/doi/pdf/10.1145/3603269.3604849",
    "topics": [
      "transport",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "不改旧RNIC，怎样做更细的路径切换？",
    "problem": "流级ECMP会碰撞，细粒度重路由又制造包乱序，而所测RDMA传输对乱序的恢复代价很高。",
    "mechanism": "源ToR检测路径状态并将流分epoch，目的ToR用交换机队列及控制状态掩盖路径切换导致的乱序；避免把同一epoch任意喷洒成无限乱序。",
    "cost": "消耗可编程交换机流水线、队列、状态与超时资源，路径探测和重路由策略需要配合；并非任意交换机具备同样能力。",
    "not_for": "它不是NIC中的无限乱序重组，也不改变GPU可见性或应用完成语义。",
    "experiment": {
      "environment": "Tofino2硬件原型与RNIC测试床；另有仿真比较ECMP、其他负载均衡及不同可靠传输条件。",
      "result": "说明网络内重排可在保留端点的条件下扩大负载均衡选择。",
      "limit": "不能把IRN与PFC不同设置的最好倍率混成一个固定收益，也不宣称所有负载都有提升。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "与Eunomia对比：乱序支持应该放在交换机，还是放在NIC？",
    "reading_guide": [
      "§3连续RTT监测、epoch与重路由",
      "重排机制及交换机资源约束",
      "§4区分仿真与硬件测试床"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-conweave",
    "original_kind": "paper",
    "original_topics": [
      "multipath",
      "packet-reordering",
      "programmable-switch"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "eunomia",
    "short": "Eunomia",
    "title": "Orderly Management of Packets in RDMA by Eunomia",
    "year": 2025,
    "venue": "ACM APNet 2025; author preprint 2024",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Sana Mahmood",
      "Jinqi Lu",
      "Soudeh Ghorbani"
    ],
    "authors_display": "Sana Mahmood, Jinqi Lu, Soudeh Ghorbani",
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2412.08540",
    "primary_url": "https://arxiv.org/abs/2412.08540",
    "pdf_url": "https://arxiv.org/pdf/2412.08540v1",
    "topics": [
      "nic",
      "transport"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "片上bitmap如何处理高乱序而不按最坏情况浪费内存？",
    "problem": "严格顺序要求限制细粒度负载均衡与不规则拓扑；固定为每连接预留最大乱序bitmap又会消耗大量片上空间。",
    "mechanism": "接收侧增加ordering层，按需分配hybrid-dynamic bitmap并使用专门内存控制器；payload直接放置，bitmap跟踪缺口，完成条件仍受顺序与可靠性约束。",
    "cost": "增加NIC逻辑、元数据与ACK带宽；内存不足可导致无法跟踪的包被丢弃并要求恢复，并非无限容量或免费乱序。",
    "not_for": "不是现有标准RoCE网卡只升级应用就具备的能力，也不允许应用在数据尚未齐全时提前消费。",
    "experiment": {
      "environment": "所读2024预印本：Vivado/Kintex UltraScale+模型的RTL实现和资源评估；网络性能为128主机100Gbps、PFC开启的NS-3。",
      "result": "展示乱序支持能使负载均衡、拓扑和故障策略更灵活。",
      "limit": "不要将RTL/综合可行性写成完整NIC实网性能；会议版与预印本需明确区分。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "承接IRN/SRNIC，比较bitmap留片上、按需分配与host onloading。",
    "reading_guide": [
      "预印本§3.3 HD bitmap、§3.4内存控制器",
      "§3.5.2应用完成条件",
      "§4实现与§5仿真条件"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-eunomia",
    "original_kind": "paper",
    "original_topics": [
      "RNIC-microarchitecture",
      "packet-reordering",
      "bitmap"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "tagger",
    "short": "Tagger",
    "title": "Tagger: Practical PFC Deadlock Prevention in Data Center Networks",
    "year": 2017,
    "venue": "ACM CoNEXT 2017",
    "group": "guo_core",
    "guo_coauthor": true,
    "authors": [
      "Shuihai Hu",
      "Yibo Zhu",
      "Peng Cheng",
      "Chuanxiong Guo",
      "Kun Tan",
      "Jitendra Padhye",
      "Kai Chen"
    ],
    "authors_display": "Shuihai Hu, Yibo Zhu, Peng Cheng, Chuanxiong Guo, Kun Tan, Jitendra Padhye, Kai Chen",
    "authors_complete": true,
    "authors_url": "https://www.microsoft.com/en-us/research/?p=431784",
    "primary_url": "https://www.microsoft.com/en-us/research/?p=431784",
    "pdf_url": "https://cse.hkust.edu.hk/~kaichen/papers/conext17-tagger.pdf",
    "topics": [
      "congestion",
      "operations",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "question": "即使每条路由都无环，PFC为何仍可能死锁？",
    "problem": "暂停的队列可形成循环缓冲依赖，死锁不一定来自单条路由环，故障改道还会扩大依赖循环并传播反压。",
    "mechanism": "运营者给定预期无损路径集合，离线生成tag规则；在路径转折处调整tag并映射到有限无损优先级，从依赖结构上阻断环。",
    "cost": "占用优先级及交换机规则，需明确允许的无损路径；偏离集合的流量在极端情况下可能被丢弃，不能同时要求所有改道永不丢包。",
    "not_for": "预防PFC死锁不等于消除拥塞、队头阻塞或所有暂停；它也不是选择重传协议。",
    "experiment": {
      "environment": "16服务器、40Gbps CX-3 Pro与10台Arista 7060 Clos测试床；另有规则规模分析和NS-3。",
      "result": "展示故障相关路径下的预防机制及有限优先级可行性。",
      "limit": "任意故障条件的保证依赖论文的路径/tag规则前提，不应简写为全网络永不死锁且永不丢包。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "gcx确证共同作者，补齐PFC问题的预防路线。",
    "reading_guide": [
      "循环缓冲依赖示例",
      "预期无损路径、bounce tagging与正确性条件",
      "§8硬件故障实验及规模分析"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-tagger",
    "original_kind": "paper",
    "original_topics": [
      "PFC",
      "deadlock",
      "routing"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "falcon",
    "short": "Falcon",
    "title": "Falcon: A Reliable, Low Latency Hardware Transport",
    "year": 2025,
    "venue": "ACM SIGCOMM 2025",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Arjun Singhvi",
      "Nandita Dukkipati",
      "Prashant Chandra",
      "Hassan M. G. Wassel",
      "Naveen Kr. Sharma",
      "Anthony Rebello",
      "Henry Schuh",
      "Praveen Kumar",
      "Behnam Montazeri",
      "Neelesh Bansod",
      "Sarin Thomas",
      "Inho Cho",
      "Hyojeong Lee Seibert",
      "Baijun Wu",
      "Rui Yang",
      "Yuliang Li",
      "Kai Huang",
      "Qianwen Yin",
      "Abhishek Agarwal",
      "Srinivas Vaduvatha",
      "Weihuang Wang",
      "Masoud Moshref",
      "Tao Ji",
      "David Wetherall",
      "Amin Vahdat"
    ],
    "authors_display": "Arjun Singhvi, Nandita Dukkipati, Prashant Chandra, Hassan M. G. Wassel, Naveen Kr. Sharma, Anthony Rebello, Henry Schuh, Praveen Kumar, Behnam Montazeri, Neelesh Bansod, Sarin Thomas, Inho Cho, Hyojeong Lee Seibert, Baijun Wu, Rui Yang, Yuliang Li, Kai Huang, Qianwen Yin, Abhishek Agarwal, Srinivas Vaduvatha, Weihuang Wang, Masoud Moshref, Tao Ji, David Wetherall, Amin Vahdat",
    "authors_complete": true,
    "authors_url": "https://praveenk.io/pubs/falcon/",
    "primary_url": "https://praveenk.io/pubs/falcon/",
    "pdf_url": "https://dl.acm.org/doi/pdf/10.1145/3718958.3754353",
    "topics": [
      "transport",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "硬件卸载能否摆脱专用无损后端网络的约束？",
    "problem": "传统硬件RDMA的部署常依赖专用网络、流控及受限应用组合；通用以太网需要面对丢包、异构上层协议和变化的业务。",
    "mechanism": "作者公开记录给出的组合是延迟拥塞控制、多路径负载均衡、简单请求响应事务接口、硬件重传与错误处理，以及可编程引擎；Google分层说明列出RDMA与NVMe等ULP。",
    "cost": "需要特定硬件、状态和编程支持；多层设计不能理解为纯应用补丁，也不能把生态开放等同任意现有网卡已兼容。",
    "not_for": "Falcon不是标准RoCEv2的另一个名字；不能拿论文标题证明某GPU平台或云实例已经配套。",
    "experiment": {
      "environment": "作者公开页确认首个200Gbps硬件实现及与CX-7 RoCE的拥塞/丢包比较；本轮全文被ACM访问限制。",
      "result": "研究方向把可靠性、拥塞、路径选择和多ULP支持放回同一个硬件系统。",
      "limit": "不摘取未读全文的图、参数或通用倍率；具体对照条件仍需用户沿原论文核对。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "为SRNIC之后的通用硬件传输提供产业研究对照。",
    "reading_guide": [
      "先读作者公开页和Google官方分层图",
      "再按论文目录读事务接口、可靠性、拥塞与评估",
      "本轮未取得全文，不提供确切章节号或图页"
    ],
    "evidence_status": "Complete authors and publication verified on author publication page/BibTeX; architecture scope cross-checked with Google official transport introduction; ACM PDF blocked, no unverified methods/figure claims",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-falcon",
    "original_kind": "paper",
    "original_topics": [
      "hardware-transport",
      "loss-recovery",
      "multipath",
      "programmability"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "公开摘要/官方介绍已核对，全文获取受限；不声称完整读过论文。 Complete authors and publication verified on author publication page/BibTeX; architecture scope cross-checked with Google official transport introduction; ACM PDF blocked, no unverified methods/figure claims"
  },
  {
    "id": "csig",
    "short": "CSIG",
    "title": "CSIG: Congestion Signaling for Datacenter Transports",
    "year": 2026,
    "venue": "ACM SIGCOMM 2026",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Abhiram Ravi",
      "Nandita Dukkipati",
      "Weiwu Pang",
      "Neal Cardwell",
      "Brad Karp",
      "Mohammad Jafar Akhbarizadeh",
      "Weida Huang",
      "Konstantinos Prasopoulos",
      "Kok Kiong Yap",
      "Arjun Singh",
      "Amin Vahdat"
    ],
    "authors_display": "Abhiram Ravi, Nandita Dukkipati, Weiwu Pang, Neal Cardwell, Brad Karp, Mohammad Jafar Akhbarizadeh, Weida Huang, Konstantinos Prasopoulos, Kok Kiong Yap, Arjun Singh, Amin Vahdat",
    "authors_complete": true,
    "authors_url": "https://research.google/pubs/csig-congestion-signaling-for-datacenter-transports/",
    "primary_url": "https://research.google/pubs/csig-congestion-signaling-for-datacenter-transports/",
    "pdf_url": "https://dl.acm.org/doi/pdf/10.1145/3789240.3829179",
    "topics": [
      "congestion"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "每个包能否带回瓶颈数值与位置，而不带整条路径？",
    "problem": "ECN仅给粗粒度标记，RTT混合多处延迟，逐跳追加遥测又增加可变包头与处理复杂度；突发业务需要及时且可部署的反馈。",
    "mechanism": "固定长度二层tag沿途比较替换，汇总路径最严重的瓶颈指标和定位信息；接收方将信息反射给发送方，再由控制算法使用，而不是把信号本身当完整拥塞控制。",
    "cost": "需要交换机测量、tag处理及端点反馈支持；量化、更新周期、增量部署和控制回路设计仍影响精度与开销。",
    "not_for": "论文、早期Internet-Draft和IEEE/UEC工作是不同版本；草案不是已批准标准，CSIG也不等于RoCE或可靠传输。",
    "experiment": {
      "environment": "官方论文记录披露跨五代交换机、四代NIC及五种传输栈验证，并有生产Fast Ramp-Up应用。",
      "result": "说明固定大小瓶颈摘要可以支持控制和逐流观测。",
      "limit": "本轮未取得2026全文，机制细节另核对作者2024协议草案；不将旧草案字段强称为最终论文逐位格式。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "对照HPCC的逐跳遥测思路，学习信号表达与部署成本。",
    "reading_guide": [
      "官方SIGCOMM记录和Google论文入口",
      "配套2024 draft §4协议生命期、§5信号、§6增量部署",
      "2026论文评估需沿原文核对；不提供未读到的图页"
    ],
    "evidence_status": "2026 publication/authors confirmed against official SIGCOMM program and Google; mechanism additionally read in author Internet-Draft; final 2026 PDF blocked",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-csig",
    "original_kind": "paper",
    "original_topics": [
      "congestion-signals",
      "in-band-telemetry",
      "congestion-control"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "公开摘要/官方介绍已核对，全文获取受限；不声称完整读过论文。 2026 publication/authors confirmed against official SIGCOMM program and Google; mechanism additionally read in author Internet-Draft; final 2026 PDF blocked"
  },
  {
    "id": "burst",
    "short": "BURST",
    "title": "BURST: Seeking High-performance, Interoperability and Scalability in Soft-RDMA",
    "year": 2026,
    "venue": "USENIX NSDI 2026",
    "group": "other_core",
    "guo_coauthor": false,
    "authors": [
      "Huijun Shen",
      "Zelong Yue",
      "Jian Yang",
      "Zhuo Jiang",
      "Lang An",
      "Yulin Chen",
      "Yong Zhang",
      "Luochangqi Ding",
      "Xiaolong Zhong",
      "Zhihong Wang",
      "Jie Ding",
      "Hongyu Wu",
      "Jianxi Ye",
      "Xijin Yin",
      "Xingyu Zhang",
      "Xingyu Guo",
      "Guo Chen"
    ],
    "authors_display": "Huijun Shen, Zelong Yue, Jian Yang, Zhuo Jiang, Lang An, Yulin Chen, Yong Zhang, Luochangqi Ding, Xiaolong Zhong, Zhihong Wang, Jie Ding, Hongyu Wu, Jianxi Ye, Xijin Yin, Xingyu Zhang, Xingyu Guo, Guo Chen",
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi26/presentation/shen",
    "primary_url": "https://www.usenix.org/conference/nsdi26/presentation/shen",
    "pdf_url": "https://www.usenix.org/system/files/nsdi26-shen.pdf",
    "topics": [
      "transport",
      "operations",
      "nic"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "question": "普通以太网NIC如何与硬件RNIC高效互通？",
    "problem": "异构集群存在没有RoCE硬件能力的节点，回退TCP开销大，内核RXE在高速网络又受协议处理与复制限制。",
    "mechanism": "独立用户态进程提供verbs兼容入口，采用无锁DPDK数据路径、增强共享队列和用户态连接管理；DSA卸载不可避免的接收复制，另提供受支持的软件GPU直达路径。",
    "cost": "仍消耗CPU、队列和DMA资源，需要支持的NIC/驱动及DSA条件；并非所有payload都天然零复制，也不保证单QP即可占满链路。",
    "not_for": "它是软件协议栈，不是新RNIC芯片；Guo Chen与gcx不是同一作者，不能因ByteDance署名就误归人物路线。",
    "experiment": {
      "environment": "400Gbps NR2R双机测试床，另用100Gbps CX-6 Dx评估DSA；多QP基准、企业CCL灰度和连接管理实验分别呈现。",
      "result": "说明软件数据路径和控制路径都可改善异构互通；附录也公开单QP吞吐瓶颈。",
      "limit": "400Gbps高吞吐使用多QP；不能将其改写成单QP或所有消息大小均线速。"
    },
    "key_figures": [],
    "next": [],
    "why_read": "为硬件卸载路线加入一个可核实的2026软件互通对照。",
    "reading_guide": [
      "§3–4架构、共享队列与UCM",
      "§5.1两种测试床及多QP条件",
      "§5.2应用、附录A.5复制与A.7单QP边界"
    ],
    "evidence_status": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source",
    "interpretation_note": "代价与适用边界包含据原文机制作出的教学判断；仿真、研究原型、作者生产披露分别标明，不作通用性能保证。",
    "sourceId": "rd-paper-burst",
    "original_kind": "paper",
    "original_topics": [
      "software-RDMA",
      "interoperability",
      "connection-scalability"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "verification_scope": "Original paper methods/design and evaluation scope checked; publication metadata verified against primary source"
  },
  {
    "id": "megascale2024",
    "short": "MegaScale",
    "title": "MegaScale: Scaling Large Language Model Training to More Than 10,000 GPUs",
    "year": 2024,
    "venue": "USENIX NSDI 2024",
    "authors": [
      "Ziheng Jiang",
      "Haibin Lin",
      "Yinmin Zhong",
      "Qi Huang",
      "Yangrui Chen",
      "Zhi Zhang",
      "Yanghua Peng",
      "Xiang Li",
      "Cong Xie",
      "Shibiao Nong",
      "Yulu Jia",
      "Sun He",
      "Hongmin Chen",
      "Zhihao Bai",
      "Qi Hou",
      "Shipeng Yan",
      "Ding Zhou",
      "Yiyao Sheng",
      "Zhuo Jiang",
      "Haohan Xu",
      "Haoran Wei",
      "Zhang Zhang",
      "Pengfei Nie",
      "Leqi Zou",
      "Sida Zhao",
      "Liang Xiang",
      "Zherui Liu",
      "Zhe Li",
      "Xiaoying Jia",
      "Jianxi Ye",
      "Xin Jin",
      "Xin Liu"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi24/presentation/jiang-ziheng",
    "pdf_url": "https://www.usenix.org/system/files/nsdi24-jiang-ziheng.pdf",
    "topics": [
      "training",
      "gpu",
      "operations",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-megascale2024",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 3",
        "pdf_page_one_based": 5,
        "url": "https://www.usenix.org/system/files/nsdi24-jiang-ziheng.pdf#page=5",
        "read_for": "TP/SP通信与GEMM如何重叠，而非全量通信完成后才开始计算。"
      }
    ],
    "question": "万卡训练为什么不能只优化一条RDMA链路？",
    "why_read": "把算子重叠、通信调优、可观测性与故障恢复放到同一生产系统中看。",
    "problem": "规模增大后，通信、数据管线、慢节点和故障一起影响有效训练时间。",
    "mechanism": "跨模型块、优化器、算子与网络协同设计，细化TP/SP通信重叠；用全栈诊断识别异常与straggler，再配合恢复机制。",
    "cost": "依赖完整工程栈与长周期观测；网络峰值或单次collective时延不能替代训练稳定性。",
    "not_for": "不是RNIC微架构论文，也不是MegaScale-MoE；MFU是指定模型/并行配置下的系统结果。",
    "experiment": {
      "environment": "正式论文报告175B模型、12,288 GPUs的训练，并讨论生产故障与性能诊断。",
      "result": "报告55.2% MFU；更值得对照重叠方式与故障处理过程。",
      "limit": "不把MFU提升全归给网络或RDMA，也不将生产经验等同所有代码已开源。"
    },
    "reading_guide": [
      "先看系统总览，再看通信重叠、网络调优、诊断与故障经验；最后核对模型与并行配置。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "training",
      "gpu",
      "operations",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/nsdi24/presentation/jiang-ziheng",
    "verification_scope": "USENIX正式页面完整BibTeX与原PDF；Figure3页与题注已核对"
  },
  {
    "id": "hpn2024",
    "short": "Alibaba HPN",
    "title": "Alibaba HPN: A Data Center Network for Large Language Model Training",
    "year": 2024,
    "venue": "ACM SIGCOMM 2024",
    "authors": [
      "Kun Qian",
      "Yongqing Xi",
      "Jiamin Cao",
      "Jiaqi Gao",
      "Yichi Xu",
      "Yu Guan",
      "Binzhang Fu",
      "Xuemei Shi",
      "Fangbo Zhu",
      "Rui Miao",
      "Chao Wang",
      "Peng Wang",
      "Pengcheng Zhang",
      "Xianlong Zeng",
      "Eddie Ruan",
      "Zhiping Yao",
      "Ennan Zhai",
      "Dennis Cai"
    ],
    "authors_complete": true,
    "authors_url": "https://doi.org/10.1145/3651890.3672265",
    "pdf_url": "https://rmiao.github.io/assets/pdf/sigcomm24-hpn.pdf",
    "topics": [
      "scale-out",
      "training",
      "operations"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-hpn2024",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 7",
        "pdf_page_one_based": 4,
        "url": "https://rmiao.github.io/assets/pdf/sigcomm24-hpn.pdf#page=4",
        "read_for": "区分前端/后端、rail、segment、dual-plane及Pod边界。"
      }
    ],
    "question": "为什么LLM大流会让ECMP负载均衡失灵？",
    "why_read": "给出GPU、rail、双ToR、双平面与Pod如何连接的真实生产架构。",
    "problem": "少量周期性突发大流容易哈希极化；同步训练对单ToR故障很敏感。",
    "mechanism": "后端采用rail-optimized、双ToR和双平面组织，减少ECMP选择阶段；前端网络与训练后端分开设计。",
    "cost": "需要相配的NIC端口、布线、交换端口和故障域规划；省层数不等于任意流量都有无阻塞带宽。",
    "not_for": "HPN是系统/网络架构，不是新的RDMA opcode或阿里GPU内部结构；跨Pod另有收敛假设。",
    "experiment": {
      "environment": "论文报告生产环境超过8个月经验，Pod设计覆盖约15K GPUs。",
      "result": "讨论ECMP极化、dual-ToR恢复及生产性能改善。",
      "limit": "按其工作负载和后端拓扑解释；不把各层端口速率拼成单GPU可用带宽。"
    },
    "reading_guide": [
      "先看§2负载与故障，再看§3总览、双ToR和双平面设计，最后读生产经验。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "scale-out",
      "training",
      "operations"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://doi.org/10.1145/3651890.3672265",
    "verification_scope": "作者公开正式SIGCOMM PDF首页作者/年份/DOI与§3/Figure7核对"
  },
  {
    "id": "rail_only",
    "short": "Rail-only",
    "title": "Rail-only: A Low-Cost High-Performance Network for Training LLMs with Trillion Parameters",
    "year": 2023,
    "venue": "arXiv 2307.12169 · v5修订于2024-09-15",
    "authors": [
      "Weiyang Wang",
      "Manya Ghobadi",
      "Kayvon Shakeri",
      "Ying Zhang",
      "Naader Hasani"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2307.12169v5",
    "pdf_url": "https://arxiv.org/pdf/2307.12169v5",
    "topics": [
      "scale-out",
      "scale-up",
      "training"
    ],
    "kind": "report",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-rail_only",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 6",
        "pdf_page_one_based": 5,
        "url": "https://arxiv.org/pdf/2307.12169v5#page=5",
        "read_for": "高带宽域与每rail独立全对分网络；跨rail流量借助HB域转发。"
      }
    ],
    "question": "训练集群是否一定需要全局any-to-any全对分带宽？",
    "why_read": "把模型并行通信需求反推网络，而非先给所有GPU铺满连接。",
    "problem": "传统全互联能力可能为训练中不常出现的跨组通信支付高成本。",
    "mechanism": "根据并行划分与稀疏通信组织高带宽域和rail连接，移除跨rail全互联需求；MoE all-to-all可通过转发实现。",
    "cost": "更依赖任务放置与通信模式；不规则跨域需求、转发和故障绕路会改变收益。",
    "not_for": "不是所有LLM/MoE负载都天然适合；成本/功耗数字来自其架构与分析条件，不是通用采购报价。",
    "experiment": {
      "environment": "v5结合并行策略分析、网络/训练模型和故障敏感性评估。",
      "result": "比较传统GPU网络的训练完成时间、网络成本和功耗；另分析MoE转发开销。",
      "limit": "大规模结果主要按论文建模假设理解，不表述为万卡生产部署实测。"
    },
    "reading_guide": [
      "先读高带宽域与跨域通信假设，再看rail-only构造、MoE转发和failure/sensitivity分析。"
    ],
    "original_kind": "report",
    "original_topics": [
      "scale-out",
      "scale-up",
      "training"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2307.12169v5",
    "verification_scope": "arXiv v5标题、5位作者、版本历史与原PDF核对"
  },
  {
    "id": "switchml",
    "short": "SwitchML",
    "title": "Scaling Distributed Machine Learning with In-Network Aggregation",
    "year": 2021,
    "venue": "USENIX NSDI 2021",
    "authors": [
      "Amedeo Sapio",
      "Marco Canini",
      "Chen-Yu Ho",
      "Jacob Nelson",
      "Panos Kalnis",
      "Changhoon Kim",
      "Arvind Krishnamurthy",
      "Masoud Moshref",
      "Dan Ports",
      "Peter Richtarik"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi21/presentation/sapio",
    "pdf_url": "https://www.usenix.org/system/files/nsdi21-sapio.pdf",
    "topics": [
      "collectives",
      "training",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-switchml",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 2",
        "pdf_page_one_based": 9,
        "url": "https://www.usenix.org/system/files/nsdi21-sapio.pdf#page=9",
        "read_for": "8-worker ResNet-110/CIFAR10收敛检查，不能泛化为任意模型无精度影响。"
      }
    ],
    "question": "交换机做梯度聚合，真正省掉什么流量？",
    "why_read": "理解in-network reduction需要端侧协议、数值表示和交换机资源共同配合。",
    "problem": "同步数据并行训练反复交换并聚合梯度，网络流量限制扩展。",
    "mechanism": "将模型更新分块放入可编程交换机的聚合槽，由主机与交换数据面协同处理，并为有限算术能力设计定点表示与恢复协议。",
    "cost": "占用交换机状态/数据面资源，还需端侧量化、槽复用、可靠性与框架集成。",
    "not_for": "不是普通以太网交换机默认支持的AllReduce；不适用于任意算子，也不等于GPU的Tensor Core计算。",
    "experiment": {
      "environment": "可编程交换机与端侧原型，含真实训练模型、通信微测和收敛评估。",
      "result": "在论文基线与模型上展示训练加速；同时检查定点表示是否维持训练精度。",
      "limit": "不能只引用最高加速，忽略交换机/worker配置及数值表示条件。"
    },
    "reading_guide": [
      "依次看数据面aggregator槽、可靠性/槽复用、floating-to-fixed表示与端到端实验；Figure2用于检查收敛条件。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "training",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/nsdi21/presentation/sapio",
    "verification_scope": "USENIX完整作者/年份，原PDF数值表示与Figure2核对"
  },
  {
    "id": "sccl",
    "short": "SCCL",
    "title": "Synthesizing Optimal Collective Algorithms",
    "year": 2021,
    "venue": "ACM PPoPP 2021",
    "authors": [
      "Zixian Cai",
      "Zhengyang Liu",
      "Saeed Maleki",
      "Madanlal Musuvathi",
      "Todd Mytkowicz",
      "Jacob Nelson",
      "Olli Saarikivi"
    ],
    "authors_complete": true,
    "authors_url": "https://ppopp21.sigplan.org/details/PPoPP-2021-main-conference/43/Synthesizing-Optimal-Collective-Algorithms",
    "pdf_url": "https://arxiv.org/pdf/2008.08708v2",
    "topics": [
      "collectives",
      "gpu",
      "scale-up"
    ],
    "kind": "paper",
    "reading_level": "foundation",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-sccl",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 2,
        "url": "https://arxiv.org/pdf/2008.08708v2#page=2",
        "read_for": "DGX-1 NVLink连接如何限制可行通信步骤。"
      }
    ],
    "question": "一个拓扑上最少几步、多少流量才能完成collective？",
    "why_read": "建立collective语义、链路拓扑与latency/bandwidth代价模型之间的联系。",
    "problem": "手工为不同GPU互连和collective实现高效算法，难以覆盖完整设计空间。",
    "mechanism": "将数据块移动、连接带宽与步骤约束编码为SMT，搜索延迟与带宽的Pareto前沿，再生成可执行实现。",
    "cost": "最优性依赖形式模型；求解复杂度与规模限制仍在，真实硬件争用未必完全由简化模型捕获。",
    "not_for": "“optimal”不是任意GPU集群/任意大小消息的现实性能保证，也不是RDMA可靠传输证明。",
    "experiment": {
      "environment": "针对NVIDIA DGX-1/V100与AMD GPU节点等论文拓扑生成并运行collective。",
      "result": "发现新的延迟/带宽折衷算法，并与手工通信库比较。",
      "limit": "应将模型最优、合成时间、运行时性能分开判断。"
    },
    "reading_guide": [
      "§2先看collective、拓扑与α/β模型；再读SMT编码、code generation和§5实测。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "gpu",
      "scale-up"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://ppopp21.sigplan.org/details/PPoPP-2021-main-conference/43/Synthesizing-Optimal-Collective-Algorithms",
    "verification_scope": "PPoPP正式页确认2021；原v2 PDF作者全名、代价模型与Figure1核对"
  },
  {
    "id": "mscclang",
    "short": "MSCCLang",
    "title": "MSCCLang: Microsoft Collective Communication Language",
    "year": 2023,
    "venue": "ACM ASPLOS 2023",
    "authors": [
      "Meghan Cowan",
      "Saeed Maleki",
      "Madanlal Musuvathi",
      "Olli Saarikivi",
      "Yifan Xiong"
    ],
    "authors_complete": true,
    "authors_url": "https://doi.org/10.1145/3575693.3575724",
    "pdf_url": "https://parsa.epfl.ch/course-info/cs723/papers/MSCCLang.pdf",
    "topics": [
      "collectives",
      "gpu",
      "scale-up",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-mscclang",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figures 1–3",
        "pdf_page_one_based": 3,
        "url": "https://parsa.epfl.ch/course-info/cs723/papers/MSCCLang.pdf#page=3",
        "read_for": "层级AllReduce、编译架构与对应DSL放在一起读。"
      }
    ],
    "question": "如何把collective的数据块调度安全地映射到GPU线程块？",
    "why_read": "连接Python式算法描述、依赖DAG、编译器优化和GPU通信runtime。",
    "problem": "高效自定义collective需要处理数据依赖、并发、通道和死锁，直接写CUDA成本高。",
    "mechanism": "用chunk-oriented DSL描述路由与规约，编译为chunk/instruction DAG及MSCCL-IR，进行聚合、融合、并行化与线程块调度，由runtime执行。",
    "cost": "仍需针对拓扑与数据大小设计算法并选择调度参数；runtime与后端连接有工程约束。",
    "not_for": "不是通用Python自动变成最优网络程序；论文中的IB路径仍可使用CPU helper发起RDMA，不能误称全部GPU自治。",
    "experiment": {
      "environment": "针对多种GPU节点配置与消息大小实现经典/自定义AllReduce和AllToAll。",
      "result": "比较生成算法与手工优化实现，分析流水化和编译优化作用。",
      "limit": "本文为ASPLOS23；不要因项目名相近混同SCCL或后来的MSCCL++。"
    },
    "reading_guide": [
      "先按Figure1的四阶段层级AllReduce读Figure3程序，再看compiler/runtime与§7评估。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "gpu",
      "scale-up",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://doi.org/10.1145/3575693.3575724",
    "verification_scope": "正式论文首页5位作者/ASPLOS23/DOI；Figure1–3和§7页内内容核对"
  },
  {
    "id": "taccl",
    "short": "TACCL",
    "title": "TACCL: Guiding Collective Algorithm Synthesis using Communication Sketches",
    "year": 2023,
    "venue": "USENIX NSDI 2023",
    "authors": [
      "Aashaka Shah",
      "Vijay Chidambaram",
      "Meghan Cowan",
      "Saeed Maleki",
      "Madan Musuvathi",
      "Todd Mytkowicz",
      "Jacob Nelson",
      "Olli Saarikivi",
      "Rachee Singh"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi23/presentation/shah",
    "pdf_url": "https://www.usenix.org/system/files/nsdi23-shah.pdf",
    "topics": [
      "collectives",
      "gpu",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-taccl",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 3",
        "pdf_page_one_based": 6,
        "url": "https://www.usenix.org/system/files/nsdi23-shah.pdf#page=6",
        "read_for": "共享交换机不能简单当成独立点到点链路。"
      }
    ],
    "question": "怎样让collective算法合成跨出单机，又不让搜索空间爆炸？",
    "why_read": "展示设计者的拓扑知识怎样以communication sketch形式进入自动合成。",
    "problem": "直接对多节点GPU连接求解，搜索空间与交换机争用使简单合成难以扩展。",
    "mechanism": "用sketch约束拓扑、路由与交换机连接策略，引导优化编码搜索并生成可由MSCCL执行的collective。",
    "cost": "需要设计者提供合理sketch、测量链路模型并运行求解器；错误约束会排除更好算法。",
    "not_for": "不是无条件自动找到真实硬件最优解；up-to数字不能推广到任意NCCL版本。",
    "experiment": {
      "environment": "论文考察DGX-2、Azure NDv2两类拓扑以及三种collective，并运行Transformer-XL/BERT任务。",
      "result": "合成算法与NCCL、端到端训练比较，展示拓扑和消息大小依赖。",
      "limit": "算法带宽收益与整模型收益不同；先检查拓扑、数据大小和运行时。"
    },
    "reading_guide": [
      "先读sketch抽象和switch-hyperedge policy，再看合成编码及实验对照。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "gpu",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/nsdi23/presentation/shah",
    "verification_scope": "USENIX完整9位作者/BibTeX；原PDFFigure3与评估范围核对"
  },
  {
    "id": "mscclpp_paper",
    "short": "MSCCL++论文",
    "title": "MSCCL++: Rethinking GPU Communication Abstractions for AI Inference",
    "year": 2026,
    "venue": "ACM ASPLOS 2026",
    "authors": [
      "Changho Hwang",
      "Peng Cheng",
      "Roshan Dathathri",
      "Abhinav Jangda",
      "Saeed Maleki",
      "Madan Musuvathi",
      "Olli Saarikivi",
      "Aashaka Shah",
      "Ziyue Yang",
      "Binyang Li",
      "Caio Rocha",
      "Qinghua Zhou",
      "Mahdieh Ghazimirsaeed",
      "Sreevatsa Anantharamu",
      "Jithin Jose"
    ],
    "authors_complete": true,
    "authors_url": "https://www.microsoft.com/en-us/research/publication/msccl-rethinking-gpu-communication-abstractions-for-ai-inference/",
    "pdf_url": "https://arxiv.org/pdf/2504.09014v4",
    "topics": [
      "collectives",
      "gpu",
      "serving",
      "scale-up",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-mscclpp_paper",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 1",
        "pdf_page_one_based": 4,
        "url": "https://arxiv.org/pdf/2504.09014v4#page=4",
        "read_for": "Host bootstrap、GPU primitives、三种channel及高层接口的关系。"
      }
    ],
    "question": "GPU主动通信需要什么最小抽象，而不是只给一个AllReduce？",
    "why_read": "从memory/port/switch channel理解GPU指针、网络传输与同步语义。",
    "problem": "硬件异构与应用自定义通信发展快，通用库较难同时提供高性能、可移植性和可控同步。",
    "mechanism": "提供GPU kernel可调用的低层primitives，再构建DSL和兼容collective API；CPU bootstrap与GPU执行职责分开。",
    "cost": "越接近primitive，程序员承担的依赖与算法设计越多；多节点还需对应网络与运行栈。",
    "not_for": "原始预印本始于2025，正式论文为ASPLOS26；不是把所有GPU/厂商设备自动变成统一缓存一致内存。",
    "experiment": {
      "environment": "§7的A100/H100/MI300X节点，每节点8GPU，节点内NVLink或xGMI，节点间IB；另含DeepSeek-V3/SGLang推理。",
      "result": "比较collective及应用推理表现，正式页报告两类收益分别统计。",
      "limit": "性能取决于primitive、消息大小、连接和应用；不把collective加速当成整模型同倍加速。"
    },
    "reading_guide": [
      "Figure1读三层API与硬件映射，随后读primitive语义、DSL、collective和§7环境。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "gpu",
      "serving",
      "scale-up",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.microsoft.com/en-us/research/publication/msccl-rethinking-gpu-communication-abstractions-for-ai-inference/",
    "verification_scope": "微软正式发表页确认ASPLOS2026和完整15作者；原PDFFigure1/§7核对"
  },
  {
    "id": "flux",
    "short": "FLUX",
    "title": "FLUX: Fast Software-based Communication Overlap On GPUs Through Kernel Fusion",
    "year": 2024,
    "venue": "arXiv 2406.06858 · v5/2024-10",
    "authors": [
      "Li-Wen Chang",
      "Wenlei Bao",
      "Qi Hou",
      "Chengquan Jiang",
      "Ningxin Zheng",
      "Yinmin Zhong",
      "Xuanrun Zhang",
      "Zuquan Song",
      "Ziheng Jiang",
      "Chengji Yao",
      "Haibin Lin",
      "Xin Jin",
      "Xin Liu"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2406.06858v5",
    "pdf_url": "https://arxiv.org/pdf/2406.06858v5",
    "topics": [
      "gpu",
      "collectives",
      "training",
      "serving"
    ],
    "kind": "report",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-flux",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "AllGather/ReduceScatter能否和同一层GEMM细粒度重叠？",
    "why_read": "最贴近“数据到GPU之后，通信怎样进入tile/SM计算”的工程论文之一。",
    "problem": "TP把collective与GEMM粗粒度串行化或分块，会暴露通信时延并损伤计算效率。",
    "mechanism": "将计算和通信进一步分解为tile级操作，结合数据依赖signal和kernel融合，让可用tile尽早计算或传出。",
    "cost": "需重写/融合高性能kernel并正确维护信号与内存依赖；重叠会争用SM和带宽。",
    "not_for": "固定为v5预印本；不是所有网络链路都可完全隐藏，也不能把ReduceScatter中的本地reduce画到任意交换机。",
    "experiment": {
      "environment": "原文覆盖不同GPU/互连的128GPU训练和8GPU推理场景。",
      "result": "报告对Megatron-LM、vLLM的系统收益，并分析通信隐藏比例。",
      "limit": "隐藏百分比是融合kernel条件下指标，不等于RDMA链路延迟消失。"
    },
    "reading_guide": [
      "先看TP的两个GEMM与AG/RS依赖，再读tiling、signal和push/pull方案，最后对照实验形状。"
    ],
    "original_kind": "report",
    "original_topics": [
      "gpu",
      "collectives",
      "training",
      "serving"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2406.06858v5",
    "verification_scope": "arXiv v5标题/作者与原PDF依赖、算法描述已核对；采用PDF作者顺序"
  },
  {
    "id": "comet",
    "short": "COMET",
    "title": "Comet: Fine-grained Computation-communication Overlapping for Mixture-of-Experts",
    "year": 2025,
    "venue": "arXiv 2502.19811 · v3/2025-03-04",
    "authors": [
      "Shulai Zhang",
      "Ningxin Zheng",
      "Haibin Lin",
      "Ziheng Jiang",
      "Wenlei Bao",
      "Chengquan Jiang",
      "Qi Hou",
      "Weihao Cui",
      "Size Zheng",
      "Li-Wen Chang",
      "Quan Chen",
      "Xin Liu"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2502.19811v3",
    "pdf_url": "https://arxiv.org/pdf/2502.19811v3",
    "topics": [
      "moe",
      "gpu",
      "collectives",
      "training"
    ],
    "kind": "report",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-comet",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "MoE的token重排、专家GEMM和通信，怎样同时保持高效？",
    "why_read": "把MoE数据依赖和SM资源分配联系起来，补充只画dispatch/combine箭头的不足。",
    "problem": "粗粒度MoE重叠虽能流水，却可能显著降低计算效率并暴露通信尾部。",
    "mechanism": "分析细粒度任务依赖、重排调度，并自适应分配计算/通信工作，结合低层GPU通信接口实现重叠。",
    "cost": "更细调度与信号管理增加实现复杂度，计算和通信仍共享有限GPU资源。",
    "not_for": "原文生产采用声明与实验规模不同：主要评估是单台8-H800 NVLink服务器，不能当成万卡RDMA实测。",
    "experiment": {
      "environment": "§5：8×H800 80GB，NVLink，CUDA12.3、NVSHMEM2.11、PyTorch2.4及固定Megatron-LM版本。",
      "result": "分别比较单MoE层和端到端执行，并分析token长度等因素。",
      "limit": "论文报告生产采用不替代可复现评估；单机NVLink结果不能无条件外推跨机网络。"
    },
    "reading_guide": [
      "读依赖分析、细粒度重排与工作分配，再看§5.1软件硬件版本以及single-layer/end-to-end的分开评价。"
    ],
    "original_kind": "report",
    "original_topics": [
      "moe",
      "gpu",
      "collectives",
      "training"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2502.19811v3",
    "verification_scope": "arXiv v3完整12作者与原PDF§5.1核对"
  },
  {
    "id": "heteccl",
    "short": "HeteCCL",
    "title": "HeteCCL: Synthesizing Near-Optimal Collective Communication Schedules for Heterogeneous GPU Clusters",
    "year": 2026,
    "venue": "USENIX NSDI 2026",
    "authors": [
      "Chenyang Hei",
      "Fuliang Li",
      "Jiayi Li",
      "Jiamin Cao",
      "Chengxi Gao",
      "Xiuzhu Sha",
      "Tongrui Liu",
      "Dengke Zhang",
      "Ennan Zhai",
      "Xingwei Wang"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/nsdi26/presentation/hei",
    "pdf_url": "https://www.usenix.org/system/files/nsdi26-hei.pdf",
    "topics": [
      "collectives",
      "gpu",
      "training",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-heteccl",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "链路和GPU代际不一致时，统一ring为什么浪费带宽？",
    "why_read": "接在SCCL/TACCL之后，研究异构拓扑与合成扩展性的现实限制。",
    "problem": "异构链路中，统一调度易被慢链路限制；细粒度搜索又使合成变慢。",
    "mechanism": "精细建模拓扑/带宽，按调度步骤量化chunk，将最大并行传输问题编码为SMT，并通过CEGIS迭代细化约束和剪枝。",
    "cost": "需要准确带宽/拓扑模型、求解与执行器；模型误差和动态共享会改变实际效果。",
    "not_for": "near-optimal依赖问题模型；不是证明所有混合厂商GPU训练软件都兼容。",
    "experiment": {
      "environment": "§6分别在H20 96GB与V100 16GB系统构造六类异构配置，主要涉及节点GPU数量与链路/拓扑差异；不是在此证明H20与V100混用的同一实体集群。",
      "result": "比较collective带宽、合成时间及端到端训练效率。",
      "limit": "不要将合成加速、带宽加速和训练加速混成同一指标。"
    },
    "reading_guide": [
      "从异构调度反例进入模型、SMT/CEGIS和实现，读§6的环境与各类指标，再看失效/扩展实验。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "gpu",
      "training",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/nsdi26/presentation/hei",
    "verification_scope": "USENIX正式PDF封面、完整10作者、NSDI26日期与§6.1已核对"
  },
  {
    "id": "syccl",
    "short": "SyCCL",
    "title": "SyCCL: Exploiting Symmetry for Efficient Collective Communication Scheduling",
    "year": 2025,
    "venue": "ACM SIGCOMM 2025",
    "authors": [
      "Jiamin Cao",
      "Shangfeng Shi",
      "Jiaqi Gao",
      "Weisen Liu",
      "Yifan Yang",
      "Yichi Xu",
      "Zhilong Zheng",
      "Yu Guan",
      "Kun Qian",
      "Ying Liu",
      "Mingwei Xu",
      "Tianshu Wang",
      "Ning Wang",
      "Jianbo Dong",
      "Binzhang Fu",
      "Dennis Cai",
      "Ennan Zhai"
    ],
    "authors_complete": true,
    "authors_url": "https://doi.org/10.1145/3718958.3750499",
    "pdf_url": "https://ennanzhai.github.io/pub/sigcomm25-syccl.pdf",
    "topics": [
      "collectives",
      "training",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-syccl",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 13",
        "pdf_page_one_based": 9,
        "url": "https://ennanzhai.github.io/pub/sigcomm25-syccl.pdf#page=9",
        "read_for": "A100 Clos与H800 rail评估拓扑；后者不能直接当实测机器数量。"
      }
    ],
    "question": "怎样在更大拓扑上用对称性减少collective合成时间？",
    "why_read": "将拓扑结构、sub-demand分解、求解和事件模拟的作用区分开。",
    "problem": "多节点任务的MILP搜索空间大，过粗的调度评价又会误判性能。",
    "mechanism": "利用collective和拓扑的对称性分解子需求，合成子调度再组合；用事件级模拟预测结果，并交由MSCCL executor运行。",
    "cost": "依赖对称性和测得的链路参数；开放实现的求解器与论文内部求解器不完全相同。",
    "not_for": "不能把生产规模模拟当成同规模实体集群实测，也不应把旧NCCL基线的算法限制概括成所有当前版本。",
    "experiment": {
      "environment": "论文包括32-A100实测平台，以及H800 rail等生产规模拓扑的模拟。",
      "result": "分别评价schedule性能、合成耗时、剪枝策略和训练应用。",
      "limit": "严格分开真实testbed、模拟拓扑与端到端训练。"
    },
    "reading_guide": [
      "先看需求分解与对称性，再看性能模拟、§6实现和§7评估；尤其核对Figure13中的拓扑。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "collectives",
      "training",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://doi.org/10.1145/3718958.3750499",
    "verification_scope": "作者正式PDF标题/17作者/DOI，§6–7与Figure13核对"
  },
  {
    "id": "distserve",
    "short": "DistServe",
    "title": "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving",
    "year": 2024,
    "venue": "USENIX OSDI 2024",
    "authors": [
      "Yinmin Zhong",
      "Shengyu Liu",
      "Junda Chen",
      "Jianbo Hu",
      "Yibo Zhu",
      "Xuanzhe Liu",
      "Xin Jin",
      "Hao Zhang"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/osdi24/presentation/zhong-yinmin",
    "pdf_url": "https://www.usenix.org/system/files/osdi24-zhong-yinmin.pdf",
    "topics": [
      "serving",
      "gpu",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-distserve",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 4",
        "pdf_page_one_based": 6,
        "url": "https://www.usenix.org/system/files/osdi24-zhong-yinmin.pdf#page=6",
        "read_for": "两A100下intra-op/inter-op与TTFT的权衡，展示通信和排队不可忽略。"
      }
    ],
    "question": "把prefill和decode拆开，何时值得付出KV传输成本？",
    "why_read": "把网络带宽放入goodput与SLO优化，而不是仅看单次KV拷贝速率。",
    "problem": "两阶段共享GPU会相互干扰，也耦合资源数量与并行配置。",
    "mechanism": "将阶段放到不同GPU，分别优化资源/并行方案，并根据集群带宽选择部署位置以控制KV cache转移。",
    "cost": "新增状态搬运、调度与资源池管理；低带宽下的放置策略尤其重要。",
    "not_for": "不是免费消除干扰；分离有流量与排队代价，也不意味着每个decode token都重新迁移整份KV。",
    "experiment": {
      "environment": "§6.1：4节点/32×A100-80GB，节点内NVLink，节点间25Gbps；实验主要用低带宽下的node-affinity放置，另有模拟消融。",
      "result": "展示goodput改善，而不是仅优化最大原始吞吐。",
      "limit": "不把DistServe直接当作高速RDMA部署报告；其原型跨节点用NCCL，带宽约束、placement与SLO都属于结论条件。"
    },
    "reading_guide": [
      "先读TTFT/TPOT和goodput定义，再看阶段内并行与阶段间放置，最后检查带宽限制下的评估。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "serving",
      "gpu",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/osdi24/presentation/zhong-yinmin",
    "verification_scope": "USENIX正式8作者/BibTeX，原PDFFigure4与设计描述核对"
  },
  {
    "id": "mooncake",
    "short": "Mooncake",
    "title": "Mooncake: Trading More Storage for Less Computation — A KVCache-centric Architecture for Serving LLM Chatbot",
    "year": 2025,
    "venue": "USENIX FAST 2025",
    "authors": [
      "Ruoyu Qin",
      "Zheming Li",
      "Weiran He",
      "Jialei Cui",
      "Feng Ren",
      "Mingxing Zhang",
      "Yongwei Wu",
      "Weimin Zheng",
      "Xinran Xu"
    ],
    "authors_complete": true,
    "authors_url": "https://www.usenix.org/conference/fast25/presentation/qin",
    "pdf_url": "https://www.usenix.org/system/files/fast25-qin.pdf",
    "topics": [
      "serving",
      "gpu",
      "scale-out",
      "operations"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-mooncake",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 2",
        "pdf_page_one_based": 3,
        "url": "https://www.usenix.org/system/files/fast25-qin.pdf#page=3",
        "read_for": "原架构图：区分prefill、decode、分布式KV池以及RDMA搬运职责。"
      }
    ],
    "question": "RDMA能否把闲置DRAM变成有用的分布式KV缓存？",
    "why_read": "展示内存、存储、NIC与调度共同决定推理吞吐的具体案例。",
    "problem": "长上下文会重复计算KV，单GPU显存又限制缓存容量与阶段分离。",
    "mechanism": "围绕分布式KVCache组织prefill/decoding资源池，以Transfer Engine搬运数据，由Conductor依据缓存位置和SLO调度；利用CPU DRAM/SSD/NIC资源。",
    "cost": "缓存命中、复制/淘汰、数据移动和负载均衡都要管理；容量更大不自动等于更低延迟。",
    "not_for": "这里固定FAST25正式论文，不能把后续项目/ToS扩展的特性倒写为该版本已有。",
    "experiment": {
      "environment": "真实会话trace、A800/H800集群与生产Kimi经验；原文注明不同测试设置。",
      "result": "以满足SLO的有效请求容量与生产请求承载能力评价。",
      "limit": "实验数字有各自baseline与负载，不跨阶段/版本统一排名。"
    },
    "reading_guide": [
      "先看Figure2三种资源池与Conductor，再看§3.2 Transfer Engine、缓存复用及KV负载平衡，最后读§5。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "serving",
      "gpu",
      "scale-out",
      "operations"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.usenix.org/conference/fast25/presentation/qin",
    "verification_scope": "USENIX FAST25正式标题与9作者、原PDFFigure2和设计章节核对"
  },
  {
    "id": "splitwise",
    "short": "Splitwise",
    "title": "Splitwise: Efficient Generative LLM Inference Using Phase Splitting",
    "year": 2024,
    "venue": "ACM/IEEE ISCA 2024",
    "authors": [
      "Pratyush Patel",
      "Esha Choukse",
      "Chaojie Zhang",
      "Aashaka Shah",
      "Íñigo Goiri",
      "Saeed Maleki",
      "Ricardo Bianchini"
    ],
    "authors_complete": true,
    "authors_url": "https://www.microsoft.com/en-us/research/publication/splitwise-efficient-generative-llm-inference-using-phase-splitting/",
    "pdf_url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2023/12/Splitwise_ISCA24.pdf",
    "topics": [
      "serving",
      "gpu",
      "scale-out"
    ],
    "kind": "paper",
    "reading_level": "foundation",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-splitwise",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [
      {
        "label": "Figure 5",
        "pdf_page_one_based": 4,
        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2023/12/Splitwise_ISCA24.pdf#page=4",
        "read_for": "DGX-H100上TTFT/TBT与batch大小关系；不要混作网络吞吐图。"
      }
    ],
    "question": "prefill与decode适合相同GPU和相同资源配比吗？",
    "why_read": "先理解为什么出现P/D分离，再理解它为何要求高速状态传输。",
    "problem": "prompt计算和逐token生成的算力、带宽、功耗特征不同，统一机器池可能过度配置。",
    "mechanism": "拆分两个阶段，按阶段选择同构/异构机器池；使用集群高速后端网络与优化通信库转移请求状态。",
    "cost": "阶段间KV/state搬运与资源调度可能抵消收益；网络、负载分布和SLO均要纳入。",
    "not_for": "不是“decode永远不需要算力”的定律；也别与同名2025边云Splitwise论文混淆。",
    "experiment": {
      "environment": "BLOOM-176B、Llama-2-70B及代码/对话trace；硬件profile与InfiniBand KV传输实测，集群配置/容量方案主要用经硬件与生产load校准的模拟器。",
      "result": "比较不同资源约束下的集群设计，而非只比kernel。",
      "limit": "分开读硬件实验与trace驱动集群模拟；云价格和GPU代际是论文当时参数，不作当前采购建议。"
    },
    "reading_guide": [
      "先读两阶段特征和请求长度分布，再读状态传输、调度和集群配置；Figure5用于核对TTFT/TBT差异。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "serving",
      "gpu",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://www.microsoft.com/en-us/research/publication/splitwise-efficient-generative-llm-inference-using-phase-splitting/",
    "verification_scope": "微软正式页确认ISCA2024；原PDF7作者与Figure5核对"
  },
  {
    "id": "flashmoe",
    "short": "FlashMoE",
    "title": "FlashMoE: Fast Distributed MoE in a Single Kernel",
    "year": 2025,
    "venue": "NeurIPS 2025",
    "authors": [
      "Osayamen Jonathan Aimuyo",
      "Byungsoo Oh",
      "Rachee Singh"
    ],
    "authors_complete": true,
    "authors_url": "https://papers.nips.cc/paper_files/paper/2025/file/918d938bd209e5b56072777366f8a211-Paper-Conference.pdf",
    "pdf_url": "https://papers.nips.cc/paper_files/paper/2025/file/918d938bd209e5b56072777366f8a211-Paper-Conference.pdf",
    "topics": [
      "moe",
      "gpu",
      "collectives"
    ],
    "kind": "paper",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-flashmoe",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "dispatch、专家计算和combine能否由一个常驻GPU kernel推进？",
    "why_read": "展示GPU自治、单边数据移动、任务局部性与SM利用率之间的联系。",
    "problem": "CPU管理调度、host发起通信与频繁kernel launch会造成空隙和全局同步开销。",
    "mechanism": "把MoE计算和设备发起的单边(R)DMA结合在persistent kernel中，细粒度流水化路由、计算与返回，避免不必要payload。",
    "cost": "需要复杂的设备侧调度、资源和可见性协议；单kernel并不免除同步或数据依赖。",
    "not_for": "面向推理，训练的后向融合属未来工作；主要是单节点多GPU算子研究，不能把distributed当成万卡RDMA扩展实测。",
    "experiment": {
      "environment": "正式论文包括2-A100及8-H100节点等评估，比较专家数、token数和模型层性能。",
      "result": "报告SM利用率、延迟、吞吐及重叠指标。",
      "limit": "论文部分对照存在FP32实现与FP16基线差别；读具体图/设置，别只摘最高倍率。"
    },
    "reading_guide": [
      "先读任务局部性和persistent调度，再看同步/通信路径，最后按GPU数、精度与基线逐组读实验。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "moe",
      "gpu",
      "collectives"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://papers.nips.cc/paper_files/paper/2025/file/918d938bd209e5b56072777366f8a211-Paper-Conference.pdf",
    "verification_scope": "NeurIPS正式PDF首页3作者、会议年份、评估图及精度说明核对"
  },
  {
    "id": "rails",
    "short": "RailS",
    "title": "RailS: Load Balancing for All-to-All Communication in Distributed Mixture-of-Experts Training",
    "year": 2025,
    "venue": "arXiv 2510.19262 · v2/2025-10-23",
    "authors": [
      "Heng Xu",
      "Zhiwei Yu",
      "Chengze Du",
      "Ying Zhou",
      "Letian Li",
      "Haojie Wang",
      "Weiqiang Cheng",
      "Jialong Li"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2510.19262v2",
    "pdf_url": "https://arxiv.org/pdf/2510.19262v2",
    "topics": [
      "moe",
      "training",
      "scale-out"
    ],
    "kind": "report",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-rails",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "MoE的不均匀all-to-all如何用好多NIC与多rail？",
    "why_read": "补充rail拓扑在稀疏、不均衡通信下的调度问题。",
    "problem": "只靠普通负载均衡，可能无法利用rail结构的确定性和并行NIC。",
    "mechanism": "利用拓扑对称性分析发送/接收负载关系，由各节点用LPT策略为流量分配并行rails，实现细粒度的本地调度。",
    "cost": "前提依赖rail结构与模型假设；需要消息分块、调度和多路径管理。",
    "not_for": "当前按固定arXiv预印本收录；PDF的ToN模板页眉不是已确认正式期刊卷期。",
    "experiment": {
      "environment": "§VI首先描述Mininet2.3.1b4 + Soft-RoCE的rail网络仿真，覆盖合成和MoE流量；模型可扩至128计算域。",
      "result": "比较带宽均衡、all-to-all完成时间和训练迭代指标。",
      "limit": "不能把Soft-RoCE/仿真规模写成128域实体GPU集群部署。"
    },
    "reading_guide": [
      "先核对发送均衡推出接收均衡的前提，再看LPT算法和§VI的simulation setup。"
    ],
    "original_kind": "report",
    "original_topics": [
      "moe",
      "training",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2510.19262v2",
    "verification_scope": "arXiv v2完整8作者与原PDF§VI仿真环境核对"
  },
  {
    "id": "moe_resource2026",
    "short": "MoE重叠资源分配",
    "title": "Analytical Resource Management for Fine-grained MoE Computation-Communication Overlap",
    "year": 2026,
    "venue": "arXiv 2609.07536 · v1；作者注明已获SC26 AI on HPC Workshop接收",
    "authors": [
      "Hongyu Liu",
      "Minyu Cui",
      "Miquel Pericas"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2609.07536v1",
    "pdf_url": "https://arxiv.org/pdf/2609.07536v1",
    "topics": [
      "moe",
      "gpu",
      "serving"
    ],
    "kind": "report",
    "reading_level": "deep",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-moe_resource2026",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "通信CTA占多少SM资源，才能真正帮助GEMM重叠？",
    "why_read": "把宏观“通信可重叠”落实到CTA驻留、wave和tile依赖，呼应SM底层研究。",
    "problem": "计算与通信CTA竞争有限驻留资源，固定分配不能适应token路由和GEMM形状变化。",
    "mechanism": "建立wave量化的分析模型，根据tile数、occupancy、驻留限制与依赖，在launch时选择通信CTA数量和资源划分。",
    "cost": "模型要贴合特定kernel、硬件和依赖协议；移植时需重新推导资源与服务率。",
    "not_for": "是2026预印本/已接受workshop的作者版本，不标成SC26主会；也不是跨机RDMA资源管理实验。",
    "experiment": {
      "environment": "§IV：同一节点4×A100-SXM4-40GB、NVLink、BF16，评估三种TP/EP配置与三个MoE模型。",
      "result": "分别测GEMM2+GatherRS算子、post-router层和整模型prefill，并与oracle资源划分比较。",
      "limit": "算子、层、整模型加速不能互换；小规模单机结论需谨慎推广。"
    },
    "reading_guide": [
      "从CTA驻留与wave模型看起，再读依赖递推、launch-time选择，最后看§IV的三层评价口径。"
    ],
    "original_kind": "report",
    "original_topics": [
      "moe",
      "gpu",
      "serving"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2609.07536v1",
    "verification_scope": "arXiv作者/接收说明、原PDF§IV硬件软件与评价范围核对"
  },
  {
    "id": "demystifying_nccl",
    "short": "Demystifying NCCL",
    "title": "Demystifying NCCL: An In-depth Analysis of GPU Communication Protocols and Algorithms",
    "year": 2025,
    "venue": "arXiv 2507.04786 · v3修订于2026-03-02",
    "authors": [
      "Zhiyi Hu",
      "Siyuan Shen",
      "Tommaso Bonato",
      "Sylvain Jeaugey",
      "Cedell Alexander",
      "Eric Spada",
      "James Dinan",
      "Jeff Hammond",
      "Torsten Hoefler"
    ],
    "authors_complete": true,
    "authors_url": "https://arxiv.org/abs/2507.04786v3",
    "pdf_url": "https://arxiv.org/pdf/2507.04786v3",
    "topics": [
      "collectives",
      "gpu",
      "scale-up",
      "scale-out"
    ],
    "kind": "report",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-demystifying_nccl",
    "evidence_status": "Author preprint; fixed version; not represented as peer-reviewed main-conference publication",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "NCCL的channel、Simple/LL/LL128与ring/tree分别决定什么？",
    "why_read": "适合从API下钻到GPU线程块、buffer和节点间传输，补齐“collective如何真正执行”。",
    "problem": "只读API难以理解NCCL的通道并行、数据分块、协议与拓扑执行细节。",
    "mechanism": "系统分析NCCL内部协议、节点内/节点间数据移动与ring/tree实现，并用于构造trace驱动的ATLAHS仿真通信模式。",
    "cost": "属于实现分析与建模资料，细节依赖选定版本；模拟准确性需另核对具体校准。",
    "not_for": "该v3发表于2026修订，但原文明确分析NCCL 2.19.1；不能把它当当前2.32等版本所有算法/设备API的完整描述。",
    "experiment": {
      "environment": "分析对象固定NCCL 2.19.1，涵盖GPU/CPU/NIC职责、通道、协议与collective。",
      "result": "提供结构解释与建模依据，而非提出一个通用替代库或统一硬件性能排名。",
      "limit": "论文版本日期与所分析软件版本不是一回事；使用时与对应tag源码和当前官方文档对照。"
    },
    "reading_guide": [
      "按Overview→channels→Simple/LL/LL128→数据移动→ring/tree顺序阅读；先在首页确认NCCL 2.19.1范围。"
    ],
    "original_kind": "report",
    "original_topics": [
      "collectives",
      "gpu",
      "scale-up",
      "scale-out"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://arxiv.org/abs/2507.04786v3",
    "verification_scope": "arXiv v3完整9作者、原PDF首页版本范围与摘要核对"
  },
  {
    "id": "crux",
    "short": "Crux",
    "title": "Crux: GPU-Efficient Communication Scheduling for Deep Learning Training",
    "year": 2024,
    "venue": "ACM SIGCOMM 2024",
    "authors": [
      "Jiamin Cao",
      "Yu Guan",
      "Kun Qian",
      "Jiaqi Gao",
      "Wencong Xiao",
      "Jianbo Dong",
      "Binzhang Fu",
      "Dennis Cai",
      "Ennan Zhai"
    ],
    "authors_complete": true,
    "authors_url": "https://doi.org/10.1145/3651890.3672239",
    "pdf_url": "https://ennanzhai.github.io/pub/sigcomm24-crux.pdf",
    "topics": [
      "training",
      "collectives",
      "scale-out",
      "operations"
    ],
    "kind": "paper",
    "reading_level": "core",
    "group": "ai_systems",
    "guo_coauthor": false,
    "sourceId": "rd-paper-crux",
    "evidence_status": "Peer-reviewed venue confirmed against publisher/conference or original paper",
    "interpretation_note": "代价与适用性含机制层面的教学判断。只展示选定版本的结论，不将论文测试范围外推为普遍硬件保证。",
    "checked_at": "2026-10-30",
    "key_figures": [],
    "question": "不同训练作业争网络时，应该先服务谁？",
    "why_read": "把网络流量调度目标从最短流完成时间转为GPU计算利用率。",
    "problem": "同一集群中多个训练作业共享链路，通信竞争会让GPU等待，单作业内collective优化不足以解决。",
    "mechanism": "用GPU intensity衡量通信延后对计算利用率的影响，并据此选择路径、安排优先级及压缩有限优先级。",
    "cost": "要观测作业特征与链路竞争，维护调度决策并与现有执行栈集成。",
    "not_for": "不是更换RDMA重传算法，也不是优化单个GEMM；收益与多租户作业组合相关。",
    "experiment": {
      "environment": "正式论文报告96-GPU testbed，以及大规模生产trace驱动模拟。",
      "result": "分别评价真实平台与模拟环境下的GPU计算利用率改善。",
      "limit": "不把大规模trace模拟误写为同规模实体部署，也不将利用率变化当成所有任务的固定吞吐倍率。"
    },
    "reading_guide": [
      "先看§2跨作业竞争，再读GPU intensity定义与§4路径/优先级机制，最后分开读testbed和trace模拟。"
    ],
    "original_kind": "paper",
    "original_topics": [
      "training",
      "collectives",
      "scale-out",
      "operations"
    ],
    "authorship": "individuals",
    "reviewed": "2026-10-30",
    "added_in": "0.6",
    "year_basis": "publication",
    "primary_url": "https://doi.org/10.1145/3651890.3672239",
    "verification_scope": "SIGCOMM24正式程序页及作者公开PDF的9作者、DOI、机制与评估范围核对"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "UALink Consortium"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "UALink Consortium",
    "venue": "UALink Consortium · 公开标准概览",
    "key_figures": [
      {
        "label": "UALink Creates the Scale-up Pod",
        "pdf_page_one_based": 5,
        "url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf#page=5",
        "read_for": "域边界与交换结构。"
      }
    ],
    "reading_guide": [
      {
        "label": "Pod拓扑与访问语义",
        "pdf_page_one_based": 5,
        "url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf#page=5",
        "read_for": "先看CPU连接和UALink域；下一页看software coherency。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "ualink_200g_overview",
    "short": "UALink 200G 1.0",
    "title": "UALink 200G 1.0 Specification Overview",
    "year": 2025,
    "published": "2025-04-10",
    "version": "200G 1.0 overview",
    "kind": "overview",
    "institution": "UALink Consortium",
    "existing_scale_source_id": "ualink-1",
    "topics": [
      "scale-up",
      "fundamentals"
    ],
    "pdf_url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "formal_spec_url": "https://ualinkconsortium.org/specification/ualink-200g-1-0-specification/",
    "evidence_status": "公开官方概览已读；正式规范需评估协议和信息登记，未接受协议或读取受限正文。",
    "problem": "需要开放的加速器到加速器scale-up互连。",
    "mechanism": "通过UALink交换机扩展pod，支持直接load/store/atomic与软件一致性。",
    "cost": "需支持相应端点、交换机、布线和软件同步。",
    "not_for": "不是正式规范全文，也不是所有GPU自动具有的互连。",
    "why_read": "先弄清远端内存访问与跨服务器消息传递的层级差别。",
    "reading_level": "foundation",
    "experiment": {
      "environment": "官方9页概览，无独立实验。",
      "result": "说明域与访问语义。",
      "limit": "规格上限不等于部署证明。"
    },
    "authors_url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "source_url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "question": "需要开放的加速器到加速器scale-up互连。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2025",
    "display_level": "入门",
    "original_kind": "standard_overview",
    "original_topics": [
      "scale_up",
      "load_store",
      "UALink",
      "标准概览"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "这份官方短讲从加速器之间的内存访问出发解释scale-up。它把主机到加速器的连接与加速器之间的UALink域分开，说明交换机如何把多个节点组织成一个pod，以及直接load、store、atomic为什么需要明确的一致性责任。材料采用软件一致性语义，不能把共享地址空间自动理解成CPU式硬件缓存一致性。它适合建立域、端点、交换机和事务的第一层模型，也可与NVLink和RoCE并排阅读。图中的最大规模与链路配置属于该版本的设计能力，不是已交付系统的实测规模。正式事务格式和实现义务仍应查阅规范，概览不能替代完整正文。可用同一张图分别追踪数据、事务与同步责任，再比较不同互连方案。",
    "primary_url": "https://ualinkconsortium.org/wp-content/uploads/2025/04/UALink-1.0-Specification-Overview_FINAL-1.pdf",
    "verification_scope": "公开官方概览已读；正式规范需评估协议和信息登记，未接受协议或读取受限正文。",
    "sourceId": "rd-scale-ualink-1"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "UALink Consortium"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "UALink Consortium",
    "venue": "UALink Consortium · 公开标准概览",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "New UALink Specifications",
        "pdf_page_one_based": 1,
        "url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf#page=1",
        "read_for": "核对四份规范各自负责的层级。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "ualink_common20_public",
    "short": "UALink Common 2.0",
    "title": "UALink Common 2.0: Public Specification Update and Evaluation Entry",
    "year": 2026,
    "published": "2026-04-07",
    "version": "Common 2.0 / 200G DL-PL 2.0 / Manageability 1.0 / Chiplet 1.0",
    "kind": "overview",
    "institution": "UALink Consortium",
    "existing_scale_source_id": "ualink-2",
    "topics": [
      "scale-up",
      "collectives"
    ],
    "pdf_url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "formal_spec_url": "https://ualinkconsortium.org/specification/ualink-common-2-0-specification/",
    "evidence_status": "官方公开更新与评估入口已核验；不是对受协议约束完整规范的技术审查。",
    "problem": "互连需要独立演进物理层、管理、chiplet集成和网络内计算。",
    "mechanism": "公开更新将Common2.0与DL/PL、管理、chiplet文件拆分。",
    "cost": "实现和互操作验证涉及多份配套规范。",
    "not_for": "不是任意在售UALink芯片已支持全部新能力的证明。",
    "why_read": "用版本矩阵阅读开放互连，避免把发布消息当微架构。",
    "reading_level": "foundation",
    "experiment": {
      "environment": "官方发布说明与协议入口，无实验。",
      "result": "确认规范族的公开发布范围。",
      "limit": "完整正文未读取；不提供虚构章节或页码。"
    },
    "authors_url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "source_url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "question": "互连需要独立演进物理层、管理、chiplet集成和网络内计算。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "入门/版本导读",
    "original_kind": "standard_overview",
    "original_topics": [
      "scale_up",
      "UALink",
      "in_network_compute",
      "标准版本"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "这条阅读卡用于纠正只停留在UALink1.0的版本认识。2026年公开更新把Common、数据链路及物理层、管理和chiplet定义分别列出，并宣布Common2.0加入网络内计算。分层发布意味着事务共同部分可以与不同物理链路演进分开，也意味着读者必须写清具体引用哪个文档版本。公开说明没有给出完整的规约状态机、交换缓存或所有计算指令，不能据此重建某颗芯片。正式正文入口要求评估协议和登记，本目录只链接该入口。规范发布、互操作认证、产品支持和规模交付是不同证据，不能相互替代。目录应保留公开说明与正式文件的双入口，帮助后续按实现版本继续核对。",
    "primary_url": "https://ualinkconsortium.org/wp-content/uploads/2026/04/UALink-2.0-Specification-PR_FINAL.pdf",
    "verification_scope": "官方公开更新与评估入口已核验；不是对受协议约束完整规范的技术审查。",
    "sourceId": "rd-scale-ualink-2"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "Ultra Ethernet Consortium"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "Ultra Ethernet Consortium",
    "venue": "Ultra Ethernet Consortium · 正式标准",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Introduction / conventions",
        "pdf_page_one_based": 21,
        "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf#page=21",
        "read_for": "先确认profile与normative/informative区别。"
      },
      {
        "label": "Layer overview",
        "pdf_page_one_based": 57,
        "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf#page=57",
        "read_for": "再连接到第3章UET子层。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "ue_spec10",
    "short": "Ultra Ethernet 1.0",
    "title": "Ultra Ethernet Specification v1.0",
    "year": 2025,
    "published": "2025-06-11",
    "version": "1.0, historical baseline; superseded by later releases",
    "kind": "standard",
    "institution": "Ultra Ethernet Consortium",
    "topics": [
      "scale-out",
      "transport",
      "congestion"
    ],
    "pdf_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf",
    "evidence_status": "官方562页正式PDF已读取封面、目录、架构/分层/配置关键段；不是全文实现符合性审查。",
    "problem": "AI/HPC的RDMA语义、包递送与拥塞管理需要共同标准。",
    "mechanism": "按层和profile描述软件映射、SES/PDS/CMS职责及接口。",
    "cost": "可选profile和实现要求需要逐项匹配。",
    "not_for": "不等于既有RoCE设备可直接无改动互通全部UET功能。",
    "why_read": "把协议分层与规范义务建立在正式正文上。",
    "reading_level": "deep",
    "experiment": {
      "environment": "正式规范；本次抽查14个架构/分层相关文件页。",
      "result": "给出要求和接口，不是性能实验。",
      "limit": "1.0为历史版本；不从562页篇幅推断所有条款已审查。"
    },
    "authors_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf",
    "source_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf",
    "question": "AI/HPC的RDMA语义、包递送与拥塞管理需要共同标准。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2025",
    "display_level": "进阶/规范",
    "original_kind": "standard",
    "original_topics": [
      "scale_out",
      "Ethernet",
      "UET",
      "拥塞控制",
      "正式规范"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "正式规范把UltraEthernet拆成软件接口、传输、网络、链路和物理层，适合从端点一直追踪到线上数据。UET又区分语义、包递送和拥塞管理职责，使应用操作、可靠交付、乱序处理和速率调节不再被画成一个黑盒。阅读时应先看profile和规范性措辞，再选与目标操作有关的状态机；不能把可选能力都视为每个端点的必选能力。1.0是理解设计来源与后续变化的历史基线，当前实现应核对较新版本。它既不是RoCEv2的别名，也不提供某种NIC已经达到特定大模型吞吐的实验结论。还应留意强制性、建议性与实现说明的措辞差别，不能只摘取带宽或功能名。",
    "primary_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf",
    "verification_scope": "官方562页正式PDF已读取封面、目录、架构/分层/配置关键段；不是全文实现符合性审查。",
    "sourceId": "rd-lit-ue_spec10"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "Ultra Ethernet Consortium"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "Ultra Ethernet Consortium",
    "venue": "Ultra Ethernet Consortium · 正式标准",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Profiles / layers",
        "pdf_page_one_based": 28,
        "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf#page=28",
        "read_for": "从profile与规范约定开始。"
      },
      {
        "label": "In-Network Collectives",
        "pdf_page_one_based": 154,
        "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf#page=154",
        "read_for": "看软件语义如何暴露网络内collective。"
      },
      {
        "label": "Programmable Congestion Management",
        "pdf_page_one_based": 516,
        "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf#page=516",
        "read_for": "将策略编程与线速包转发分开。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "ue_spec11",
    "short": "Ultra Ethernet 1.1",
    "title": "Ultra Ethernet Specification v1.1",
    "year": 2026,
    "published": "2026-10-12",
    "version": "1.1; current on official history page at review",
    "kind": "standard",
    "institution": "Ultra Ethernet Consortium",
    "existing_scale_source_id": "uec-1.1",
    "topics": [
      "scale-up",
      "scale-out",
      "transport",
      "collectives"
    ],
    "pdf_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf",
    "evidence_status": "官方764页正式PDF，封面/目录和24个关键文件页已读；升级原发布消息为正式阅读入口。",
    "problem": "传统长报文和固定传输设计难覆盖低开销scale-up及新集体通信。",
    "mechanism": "新增/扩展Unified Local、INC、CSIG和PCM等分层机制。",
    "cost": "端点、交换机与软件需支持所选profile及相应能力。",
    "not_for": "不能把公开规范直接当成某厂商量产芯片功能表。",
    "why_read": "用正式规范纠正Ethernet只能scale-out的固定分类。",
    "reading_level": "deep",
    "experiment": {
      "environment": "正式规范；抽查24个架构、软件层和新机制相关文件页。",
      "result": "定义行为与接口，不是部署benchmark。",
      "limit": "当前版本判断以官方history为准；不声称全篇审计。"
    },
    "authors_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf",
    "source_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf",
    "question": "传统长报文和固定传输设计难覆盖低开销scale-up及新集体通信。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "进阶/规范",
    "original_kind": "standard",
    "original_topics": [
      "scale_up",
      "scale_out",
      "Ethernet",
      "UET",
      "INC",
      "正式规范"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "1.1把以太网用于紧耦合加速器域的讨论落到正式文档中。它加入面向scale-up端点的UnifiedLocal语义、扩展软件映射，并描述网络内collective、拥塞信号和可编程拥塞管理等内容。阅读重点是哪些属于端点事务语义，哪些属于网络递送和遥测，哪些要求交换机实际支持；不能把它们统称成一条更快的网线。它说明Ethernet不必只承担scale-out，但也不意味着任何通用以太网交换机已经具有这些能力。规范发布与实现交付须分开记载，应按目标profile、端点、交换机及软件版本逐项核验。比较不同产品时，应先匹配双方实际支持的子集，再讨论互操作和应用收益。",
    "primary_url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf",
    "verification_scope": "官方764页正式PDF，封面/目录和24个关键文件页已读；升级原发布消息为正式阅读入口。",
    "sourceId": "rd-lit-ue_spec11"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "Intersect360 Research（Ultra Ethernet Consortium赞助）"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "Intersect360 Research（Ultra Ethernet Consortium赞助）",
    "venue": "Intersect360 Research（Ultra Ethernet Consortium赞助） · 原始白皮书",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "UET与工作组范围",
        "pdf_page_one_based": 3,
        "url": "https://ultraethernet.org/uec-1-0-whitepaper#page=3",
        "read_for": "辨认传输与其他层各自目标。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "uec10_whitepaper",
    "short": "UEC 1.0 白皮书",
    "title": "UEC 1.0: New High-Performance Standard for Scaling HPC-AI",
    "year": 2025,
    "published": "2025; exact day not stated",
    "version": "UEC 1.0 sponsored white paper",
    "kind": "report",
    "institution": "Intersect360 Research（Ultra Ethernet Consortium赞助）",
    "topics": [
      "transport"
    ],
    "pdf_url": "https://ultraethernet.org/uec-1-0-whitepaper",
    "evidence_status": "原始白皮书由Intersect360撰写、UEC赞助并托管；不是正式规范或独立互操作测评。",
    "problem": "读者缺少理解UEC组织目标和技术范围的背景。",
    "mechanism": "用工作负载与标准生态解释UET、拥塞管理和软件层目标。",
    "cost": "技术细节有限，市场预测和赞助关系需单独识别。",
    "not_for": "不能用白皮书替代正式协议或客观性能对比。",
    "why_read": "先读背景，再带着具体问题进入562/764页规范。",
    "reading_level": "foundation",
    "experiment": {
      "environment": "赞助白皮书，含市场分析与技术综述。",
      "result": "提供问题背景。",
      "limit": "不属于独立硬件benchmark。"
    },
    "authors_url": "https://ultraethernet.org/uec-1-0-whitepaper",
    "source_url": "https://ultraethernet.org/uec-1-0-whitepaper",
    "question": "读者缺少理解UEC组织目标和技术范围的背景。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2025",
    "display_level": "入门/背景",
    "original_kind": "whitepaper",
    "original_topics": [
      "Ethernet",
      "UET",
      "白皮书",
      "行业背景"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "这份九页白皮书适合作为正式规范前的背景读物，而不是实现手册。它解释AI和HPC为什么需要新的以太网传输、拥塞管理与软件协作，并把UET同工作负载、端点直达应用内存和多路径需求联系起来。材料也讨论产业投入和市场预测，因此必须区分技术方向、赞助方愿景与可复现实验。作者机构是Intersect360Research，UEC提供赞助和官方入口，不能把它标成UEC正式规范正文。读完可据此选择要进入的标准章节；判断包格式、状态机和兼容要求时仍应回到规范，预测不能写成已经发生的交付事实。可把它作为术语地图，但采购和工程判断不应只依赖这类概括性论述。",
    "primary_url": "https://ultraethernet.org/uec-1-0-whitepaper",
    "verification_scope": "原始白皮书由Intersect360撰写、UEC赞助并托管；不是正式规范或独立互操作测评。",
    "sourceId": "rd-lit-uec10_whitepaper"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 技术报告",
    "key_figures": [
      {
        "label": "Figure 1: NVSwitch topology",
        "pdf_page_one_based": 3,
        "url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf#page=3",
        "read_for": "单交换遍历与跨基板双遍历。"
      },
      {
        "label": "Figure 2: die shot",
        "pdf_page_one_based": 4,
        "url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf#page=4",
        "read_for": "公开芯片照片，不据此臆造缓存。"
      }
    ],
    "reading_guide": [
      {
        "label": "第3页：NVSwitch topology / crossbar",
        "read_for": "先沿Figure1区分同基板与跨基板路径，再核对端口速率和聚合带宽。",
        "url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf#page=3",
        "pdf_page_one_based": 3
      },
      {
        "label": "第4页：数据完整性说明与Figure2",
        "read_for": "再读CRC、重放、ECC及fabric manager职责，区分公开功能与未公开缓存细节。",
        "url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf#page=4",
        "pdf_page_one_based": 4
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nvswitch2018_overview",
    "short": "初代 NVSwitch",
    "title": "NVIDIA NVSwitch: The World’s Highest-Bandwidth On-Node Switch",
    "year": 2018,
    "published": "2018; release context cross-checked with NVIDIA March2018 article",
    "version": "First-generation NVSwitch / DGX-2 era",
    "kind": "report",
    "topics": [
      "scale-up"
    ],
    "pdf_url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf",
    "evidence_status": "官方8页technical overview已读；明确是初代设计而非NVLink6。",
    "problem": "点到点GPU互连无法让所有GPU对都获得同样直接的高带宽路径。",
    "mechanism": "多个18端口crossbar交换芯片并行组成基板及跨基板fabric。",
    "cost": "需要专用交换芯片、链路和fabric管理。",
    "not_for": "初代架构不能冒充NVLink6微架构。",
    "why_read": "以公开细节较多的历史芯片练习分清端口/系统带宽。",
    "reading_level": "core",
    "experiment": {
      "environment": "DGX-2时代官方概览，含特定配置性能宣称。",
      "result": "说明结构与带宽口径。",
      "limit": "厂商报告，不是当代不同互连的受控比较。"
    },
    "authors_url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf",
    "source_url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf",
    "question": "点到点GPU互连无法让所有GPU对都获得同样直接的高带宽路径。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2018",
    "display_level": "中级/体系结构",
    "original_kind": "technical_report",
    "original_topics": [
      "scale_up",
      "NVSwitch",
      "crossbar",
      "体系结构"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "这份早期技术概览比许多新产品宣传页更适合拆解交换芯片。它公开初代NVSwitch的十八端口全连接crossbar，以及GPU基板、并行交换芯片和跨基板连接如何组成十六GPU系统。读者可以把端口速率、双向聚合带宽、GPU可用带宽和系统二分带宽分别计算，避免把不同口径的数字直接排序。文档还描述CRC、重放、ECC与fabricmanager的作用，但没有公开所有缓存和仲裁细节。它提供的是可追溯的历史实现模型，不能把其端口数、时钟或拓扑直接迁移到今天的NVLinkSwitch；应用加速比也只对应文中给定配置。对照拓扑逐段标注路径经过几次交换，有助于解释为何聚合数字不等于单流能力。",
    "primary_url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf",
    "verification_scope": "官方8页technical overview已读；明确是初代设计而非NVLink6。",
    "sourceId": "rd-lit-nvswitch2018_overview"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "Jesse Clayton"
    ],
    "authors_complete": true,
    "author_attribution": "网页完整署名已核对。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文章",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "How scale-up networking determines AI factory economics",
        "read_for": "先按MoE通信过程辨认scale-up域与scale-out网络解决的不同问题。",
        "url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/"
      },
      {
        "label": "Evaluating scale-up technologies",
        "read_for": "再按端到端带宽、延迟、软件、可靠性评价，保留模拟与路线图限定。",
        "url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nvlink6_domain",
    "short": "NVLink 6 域",
    "title": "NVIDIA NVLink: The Scale-Up Network for AI Factories",
    "year": 2026,
    "published": "2026-07-20",
    "version": "NVLink6 / Vera Rubin NVL72 article",
    "kind": "docs",
    "existing_scale_source_id": "nvlink",
    "topics": [
      "scale-up",
      "moe"
    ],
    "pdf_url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "evidence_status": "官方技术文章；正文已读，性能对比为厂商披露且包含模拟。",
    "problem": "GPU算力增长不能抵消域内all-to-all通信瓶颈。",
    "mechanism": "GPU与交换fabric、collective软件协同组织低延迟scale-up域。",
    "cost": "需要专用fabric与平台软件协同。",
    "not_for": "文中路线图不是已交付规模，模拟比较不是普适实测。",
    "why_read": "把MoE通信模式和scale-up域边界联系起来。",
    "reading_level": "core",
    "experiment": {
      "environment": "厂商平台文章，部分模型对比明确基于simulation。",
      "result": "描述域级架构与评价维度。",
      "limit": "不采纳跨版本拼接的3.6/3.0TB/s或260/216TB/s口径。"
    },
    "authors_url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "source_url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "question": "GPU算力增长不能抵消域内all-to-all通信瓶颈。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "中级",
    "original_kind": "official_technical_article",
    "original_topics": [
      "scale_up",
      "NVLink",
      "NVSwitch",
      "MoE"
    ],
    "authorship": "individuals",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "文章把scale-up看成协同计算域，而不是一台服务器的同义词，并用MoE的dispatch与combine解释全互连、端到端延迟和collective的重要性。它连接GPU、NVLinkSwitch、机架和软件层，适合在单芯片图之后建立域级模型。阅读时必须分开链路额定值、机架聚合值和应用有效吞吐，特别标记文中模拟结果及未来路线图。本文带宽数字与检索时产品页口径存在差异，不能拼接成一张无版本比较表。它也不是开放的线协议规范，不能用来推断内部交换缓存或断言所有GPU可组成同样规模的域。专家并行组可以位于域内或跨域，服务器边框本身不能替代实际互连边界。",
    "primary_url": "https://developer.nvidia.com/blog/nvidia-nvlink-the-scale-up-network-for-ai-factories/",
    "verification_scope": "官方技术文章；正文已读，性能对比为厂商披露且包含模拟。",
    "sourceId": "rd-scale-nvlink"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "Farshad Ghodsian",
      "Jesse Clayton",
      "Jim Dinan",
      "Oren Reiss"
    ],
    "authors_complete": true,
    "author_attribution": "网页四位署名已核对。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文章",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Mitigating errors at the source via the Physical Layer",
        "read_for": "先区分FEC、物理层重试与链路恢复各自处理的错误。",
        "url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/"
      },
      {
        "label": "Isolating faults via Application Layer software recovery",
        "read_for": "再看contain-and-drain和控制平面迁移，回看链路层章节，避免把链路恢复等同于应用恢复。",
        "url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nvlink6_resilience",
    "short": "NVLink 6 恢复分层",
    "title": "How NVIDIA NVLink 6 Delivers Multi-Layer Resiliency for AI Factories",
    "year": 2026,
    "published": "2026-09-15",
    "version": "NVLink6; software features have separate availability status",
    "kind": "docs",
    "existing_scale_source_id": "nvlink-resiliency",
    "topics": [
      "scale-up",
      "transport",
      "operations"
    ],
    "pdf_url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "evidence_status": "官方技术文章；区分已描述硬件机制、原型软件与预计交付。",
    "problem": "大规模同步任务会放大链路、控制和进程故障影响。",
    "mechanism": "FEC/重试、信用流控、域内隔离和应用恢复分层配合。",
    "cost": "冗余与应用恢复有资源及状态维护开销。",
    "not_for": "预计GA或prototype描述不可标成当前普遍可用。",
    "why_read": "解释网络不丢包与应用持续可用之间仍存在多个层级。",
    "reading_level": "core",
    "experiment": {
      "environment": "官方分层设计与特定恢复案例。",
      "result": "给出不同故障恢复职责。",
      "limit": "不是所有工作负载、平台和软件版本的保证。"
    },
    "authors_url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "source_url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "question": "大规模同步任务会放大链路、控制和进程故障影响。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "中级/可靠性",
    "original_kind": "official_technical_article",
    "original_topics": [
      "scale_up",
      "可靠性",
      "NVLink",
      "控制平面"
    ],
    "authorship": "individuals",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "这篇文章适合把可靠性拆成多个时间尺度。物理层的纠错和重试处理信号错误，链路层依靠信用和链路调整组织流量，系统层再隔离故障并恢复控制功能，应用层仍可能需要副本或checkpoint。它还解释交换数据平面与运行管理软件的CPU为什么必须区分。阅读时不要把厂商对无损域的设计主张推广成所有RDMA都必需无损，也不能把纠错等同于业务永不中断。文中部分软件功能明确处于原型或预计后续可用状态，必须保留时间限定；链路恢复、进程恢复与训练状态恢复的代价也不能合并成一个延迟数字。",
    "primary_url": "https://developer.nvidia.com/blog/how-nvidia-nvlink-6-delivers-multi-layer-resiliency-for-ai-factories/",
    "verification_scope": "官方技术文章；区分已描述硬件机制、原型软件与预计交付。",
    "sourceId": "rd-scale-nvlink-resiliency"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "ConnectX-9 Extension Options",
        "read_for": "先核对SocketDirect与Down Stream Port的连接方式和适用OPN。",
        "url": "https://networking-docs.nvidia.com/connectx9hw/introduction"
      },
      {
        "label": "Features and Benefits",
        "read_for": "再读RDMA、PeerDirect与卸载能力，并按手册提示查具体驱动和固件可用性。",
        "url": "https://networking-docs.nvidia.com/connectx9hw/introduction"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "connectx9_manual",
    "short": "ConnectX-9 手册",
    "title": "NVIDIA ConnectX-9 SuperNIC User Manual — Introduction and Interfaces",
    "year": 2026,
    "published": "2026-09-10 manual update",
    "version": "ConnectX9 hardware manual; OPN-specific",
    "kind": "docs",
    "existing_scale_source_id": "connectx9",
    "topics": [
      "scale-out",
      "nic",
      "transport",
      "gpu"
    ],
    "pdf_url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "evidence_status": "官方硬件手册的产品/接口与能力表已核验；不是完整私有微架构。",
    "problem": "网络端口能力与主机PCIe/多socket路径可能不匹配。",
    "mechanism": "按OPN描述网络协议、PCIe、SocketDirect和硬件卸载。",
    "cost": "所需主机槽位、连接和固件配置随型号变化。",
    "not_for": "不能由功能名重建私有微架构或承诺应用吞吐。",
    "why_read": "从真实产品连接方式理解GPU-NIC-网络链路的瓶颈。",
    "reading_level": "core",
    "experiment": {
      "environment": "官方产品手册，无统一应用benchmark。",
      "result": "确认所列硬件配置和功能范围。",
      "limit": "功能可用性还须查driver/firmware release notes。"
    },
    "authors_url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "source_url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "question": "网络端口能力与主机PCIe/多socket路径可能不匹配。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "中级/产品核验",
    "original_kind": "official_docs",
    "original_topics": [
      "scale_out",
      "NIC",
      "RDMA",
      "PCIe",
      "产品手册"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "硬件手册把网卡的网络侧和主机侧连接放到同一个模型中，能纠正只看800G端口就判断应用性能的习惯。它列出不同料号的Ethernet或InfiniBand模式、PCIe连接、SocketDirect和扩展选项，也列出RDMA、拥塞控制与若干卸载能力。阅读时应从具体OPN进入接口和固件支持表，再判断GPU到NIC的路径，而不是把所有配置拼成一张万能功能图。这里公开的是产品接口和能力边界，不是完整QP调度器、片上缓存或包处理流水线。标称线速不等于GPU有效吞吐，某功能被列在手册中也不能代替实际驱动、固件和平台可用性检查。对照接口图检查主机侧承载能力，是理解网络标称速率与实际数据路径差别的起点。",
    "primary_url": "https://networking-docs.nvidia.com/connectx9hw/introduction",
    "verification_scope": "官方硬件手册的产品/接口与能力表已核验；不是完整私有微架构。",
    "sourceId": "rd-scale-connectx9"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Multiple Processes on Multiple Execution Units",
        "read_for": "先辨认DPA进程、线程、执行单元与RTOS隔离的关系。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem"
      },
      {
        "label": "DPA Memory and Caches",
        "read_for": "再追踪L1/L2/L3、memory apertures和外部内存，继续连接到NIC加速器与DMA。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "bluefield3_dpa_arch",
    "short": "BlueField-3 DPA",
    "title": "DPA Subsystem — NVIDIA BlueField-3",
    "year": 2025,
    "published": "2025-01-16 archive update",
    "version": "DOCA 3.0.0 VGT archive; BlueField3",
    "kind": "docs",
    "existing_scale_source_id": "bluefield3-dpa",
    "topics": [
      "nic",
      "gpu"
    ],
    "pdf_url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "evidence_status": "官方架构与内存层级章节已读；代际范围限定BlueField3。",
    "problem": "部分包/I/O工作需要靠近NIC又保留可编程性。",
    "mechanism": "DPA执行单元、分层缓存、内存窗口、DMA与NIC接口协作。",
    "cost": "需要资源配置、RTOS执行与数据/状态管理。",
    "not_for": "不属于GPU SM，也不是后续所有DPU/NIC的共同结构。",
    "why_read": "为通信offload画出实际执行位置与存储边界。",
    "reading_level": "deep",
    "experiment": {
      "environment": "官方BlueField3子系统文档。",
      "result": "描述程序执行和内存访问机制。",
      "limit": "不提供跨平台吞吐比较或下一代芯片内部细节。"
    },
    "authors_url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "source_url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "question": "部分包/I/O工作需要靠近NIC又保留可编程性。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2025",
    "display_level": "进阶/体系结构",
    "original_kind": "official_docs",
    "original_topics": [
      "DPU",
      "可编程网卡",
      "缓存",
      "DMA",
      "体系结构"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "DPA提供一个比泛称智能网卡更具体的可编程I/O处理模型。文档区分Host或DPU上负责加载和配置的应用、运行DPA进程的执行单元，以及可访问的NIC引擎和内存。它公开多级缓存、memoryaperture、DMA和事件处理的关系，也解释轻量RTOS与进程隔离。适合把此前SRNIC中CPU承担的异常处理，与另一种可编程I/O部署位置进行概念比较，但不能声称两者实现相同协议。绕过Host或Arm的数据路径不代表没有DPA核心执行工作；本篇也不能证明BlueField4或ConnectX9采用相同缓存大小、执行结构或调度策略。把执行单元、缓存和外部内存分别展开，才能看清卸载之后工作实际落在哪里。",
    "primary_url": "https://networking-docs.nvidia.com/doca/archive/3-0-0-vgt-update/dpa-subsystem",
    "verification_scope": "官方架构与内存层级章节已读；代际范围限定BlueField3。",
    "sourceId": "rd-scale-bluefield3-dpa"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "§3.7 Synchronization and Memory Ordering",
        "url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
        "read_for": "区分PCIe写入、NIC完成和GPU可见性。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "gpudirect_rdma_ordering",
    "short": "GPUDirect 内存语义",
    "title": "GPUDirect RDMA — Synchronization, Memory Ordering and Supported Systems",
    "year": null,
    "published": null,
    "version": "CUDA GPUDirect RDMA 13.4",
    "kind": "docs",
    "existing_scale_source_id": "gpudirect-rdma",
    "topics": [
      "gpu"
    ],
    "pdf_url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "evidence_status": "13.4官方指南§3.4/§3.7及映射生命周期相关段落已读；页面未标统一发布日期。",
    "problem": "直接DMA引入独立数据路径、地址映射与GPU可见性问题。",
    "mechanism": "内存注册/映射、驱动接口及明确同步建立数据访问关系。",
    "cost": "注册、映射生命周期、平台限制与同步均有成本。",
    "not_for": "不是NVLink；不能将NIC completion等同于GPU消费者完成。",
    "why_read": "把零拷贝口号落实为内存生命周期和happens-before问题。",
    "reading_level": "deep",
    "experiment": {
      "environment": "CUDA13.4开发指南，无性能实验。",
      "result": "定义支持条件和一致性注意事项。",
      "limit": "传统CPU同步说明与现代deviceAPI应按各自契约阅读。"
    },
    "authors_url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "source_url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "question": "直接DMA引入独立数据路径、地址映射与GPU可见性问题。",
    "reviewed": "2026-10-30",
    "publication_year_known": false,
    "display_year": "未标注（2026核验）",
    "display_level": "进阶/语义",
    "original_kind": "official_docs",
    "original_topics": [
      "GPU_NIC",
      "GPUDirect",
      "memory_ordering",
      "PCIe"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "这份指南说明GPUDirectRDMA解决的是第三方设备访问GPU内存的直接路径，重点不仅是减少Hoststaging，还包括固定内存、BAR映射、驱动协作和同步。最值得读的是内存顺序章节：NIC完成写入不能自动等同于正在运行的GPUkernel已按预期看见全部数据。另一重点是支持系统与拓扑限制，不能仅凭网卡和GPU的型号标识断言直达路径可用。文档保留传统CPU发起CUDA同步路径的说明，阅读现代GPU发起通信时应同时查相应API的信号和可见性契约，不能把旧段落机械推广成所有新接口的统一结论。应把发送方、网卡与接收方消费者画成三条时间线，逐个确认何时可以重用缓冲区。",
    "primary_url": "https://docs.nvidia.com/cuda/gpudirect-rdma/",
    "verification_scope": "13.4官方指南§3.4/§3.7及映射生命周期相关段落已读；页面未标统一发布日期。",
    "sourceId": "rd-scale-gpudirect-rdma"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Device API / Requirements",
        "read_for": "先分清LSA、multimem与GIN，再比较CPU Proxy和GDAKI backend要求。",
        "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html"
      },
      {
        "label": "GIN reference — Signals and Counters",
        "read_for": "再将put和flush同强/弱信号的可见性规则一起读，区分本地buffer复用和远端完成。",
        "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/api/device_gin.html"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nccl_device_gin",
    "short": "NCCL Device / GIN",
    "title": "NCCL Device-Initiated Communication and Device API – GIN",
    "year": null,
    "published": null,
    "version": "NCCL 2.32.3",
    "kind": "docs",
    "existing_scale_source_id": "nccl-gin",
    "topics": [
      "collectives",
      "gpu"
    ],
    "pdf_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "api_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/api/device_gin.html",
    "evidence_status": "2.32.3官方usage与GIN参考语义已读；不是只依据技术博客。",
    "problem": "用户kernel需要细粒度通信融合，同时必须管理完成与可见性。",
    "mechanism": "对称窗口、设备communicator、不同通信设施及显式同步原语。",
    "cost": "设备资源、注册与同步要求随backend变化。",
    "not_for": "GIN API本身不保证无CPU代理或零SM占用。",
    "why_read": "读懂从CUDA语义到实际网络backend之间的层次。",
    "reading_level": "deep",
    "experiment": {
      "environment": "NCCL2.32.3官方API契约与例程。",
      "result": "说明接口要求和同步保证。",
      "limit": "例程不是某模型的生产吞吐测试。"
    },
    "authors_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "source_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "question": "用户kernel需要细粒度通信融合，同时必须管理完成与可见性。",
    "reviewed": "2026-10-30",
    "publication_year_known": false,
    "display_year": "未标注（2026核验）",
    "display_level": "进阶/接口语义",
    "original_kind": "official_docs",
    "original_topics": [
      "NCCL",
      "GIN",
      "GPU_initiated",
      "collective",
      "memory_ordering"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "DeviceAPI让用户CUDAkernel直接组合通信原语，但不是一种固定物理网络。官方文档分别列出可经P2P访问的LSA、NVLinkSHARP的multimem和网络侧GIN，并列出GINCPUProxy与GDAKI不同backend的要求。这个区别非常关键：从GPU调用API不一定意味着每次进度都完全没有CPU代理。参考页还区分put、get、signal、counter和flush的语义；对put执行flush主要解决本地源buffer可复用，不单独保证远端消费者已经完成。读者应按具体版本、context、信号强弱和backend跟踪可见性，而不是把一个Python或CUDA调用直接等同于某条硬件路径。结合发送方和接收方时间线，把源缓冲区复用、远端写入可见和消费运算结束分别标记，能避免把不同完成事件画成同一个箭头。",
    "primary_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/deviceapi.html",
    "verification_scope": "2.32.3官方usage与GIN参考语义已读；不是只依据技术博客。",
    "sourceId": "rd-scale-nccl-gin"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Pointers to Symmetric Objects",
        "read_for": "先检查对称对象、地址有效范围与直接指针访问的限制。",
        "url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html"
      },
      {
        "label": "Ordering of Operations",
        "read_for": "再读fence与quiet，并结合Atomicity Guarantees检查混合访问和同步前提。",
        "url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nvshmem_memory_model",
    "short": "NVSHMEM 内存模型",
    "title": "NVSHMEM Memory Model, Data Consistency and API Ordering",
    "year": null,
    "published": null,
    "version": "Official latest documentation, reviewed 2026-10-30; page has no explicit release number",
    "kind": "docs",
    "topics": [
      "gpu",
      "fundamentals"
    ],
    "pdf_url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html",
    "related_urls": [
      "https://docs.nvidia.com/nvshmem/api/latest/using.html",
      "https://docs.nvidia.com/nvshmem/api/latest/api/overview.html"
    ],
    "evidence_status": "官方memory-model、using与API概览相关语义已读；latest为可变入口。",
    "problem": "一侧远端访问需要清晰的地址、顺序与完成语义。",
    "mechanism": "对称heap、RMA/atomic及fence/quiet/等待同步组合。",
    "cost": "对称分配和正确同步是程序义务。",
    "not_for": "不是CPU式全局硬件缓存一致性，也不自动保证任意混合访问合法。",
    "why_read": "把远端共享内存从直觉转换成可检查的程序规则。",
    "reading_level": "deep",
    "experiment": {
      "environment": "官方API与内存模型文档。",
      "result": "说明地址和同步契约。",
      "limit": "未把latest入口虚构成具体版本；无benchmark结论。"
    },
    "authors_url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html",
    "source_url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html",
    "question": "一侧远端访问需要清晰的地址、顺序与完成语义。",
    "reviewed": "2026-10-30",
    "publication_year_known": false,
    "display_year": "未标注（2026核验）",
    "display_level": "进阶/并发语义",
    "original_kind": "official_docs",
    "original_topics": [
      "NVSHMEM",
      "PGAS",
      "one_sided",
      "memory_ordering"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "NVSHMEM用对称对象和PE建立PGAS编程模型，允许kernel或stream发起远端访问；对称地址并不表示所有PE上的裸指针可随意交换使用。文档最有价值的部分是弱顺序与完成保证：fence、quiet、wait/test和barrier各自解决不同问题，Host发起与GPU发起操作的同步作用域也要分开。它适合用小型生产者消费者例子解释为什么写数据、发信号、消费数据之间必须建立明确关系。NVSHMEM并不等于硬件缓存一致共享内存，也不能由其API名称推出底层一定使用某条NVLink或RDMA路径。当前文档入口会更新，因此复现时应再冻结所用发行版。适合与前一篇通信接口文档交叉核对，比较相似名称背后不同的同步保证。",
    "primary_url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html",
    "verification_scope": "官方memory-model、using与API概览相关语义已读；latest为可变入口。",
    "sourceId": "rd-lit-nvshmem_memory_model"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "GPU-to-GPU communication / GPU-to-NIC communication",
        "read_for": "先验证peer access与GDR所需驱动路径，不能只看设备型号。",
        "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html"
      },
      {
        "label": "PCI Access Control Services (ACS) / Topology detection",
        "read_for": "再分别阅读裸机和虚拟机条件，最后核对实际sysfs拓扑视图。",
        "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "nccl_topology_acs",
    "short": "PCIe / ACS / IOMMU",
    "title": "NCCL GPU Troubleshooting — P2P, GPU-to-NIC, ACS and Topology Detection",
    "year": null,
    "published": null,
    "version": "NCCL 2.32.3",
    "kind": "docs",
    "topics": [
      "gpu",
      "operations"
    ],
    "pdf_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html",
    "evidence_status": "官方当前故障排查页相关章节已读；裸机与虚拟机要求明确分开。",
    "problem": "可见设备列表不能证明P2P/GDR路径正常。",
    "mechanism": "联查CUDA peer能力、驱动、PCIe重定向与系统拓扑。",
    "cost": "平台配置、隔离策略和虚拟化条件会约束路径。",
    "not_for": "不是建议在所有机器统一关闭ACS或IOMMU。",
    "why_read": "解释为什么同样的GPU/NIC在不同主机上表现不同。",
    "reading_level": "core",
    "experiment": {
      "environment": "官方排查指导，不是自动化实测。",
      "result": "提供可核查的条件和检查思路。",
      "limit": "本轮未改任何系统设置或执行硬件配置命令。"
    },
    "authors_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html",
    "source_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html",
    "question": "可见设备列表不能证明P2P/GDR路径正常。",
    "reviewed": "2026-10-30",
    "publication_year_known": false,
    "display_year": "未标注（2026核验）",
    "display_level": "中级/诊断",
    "original_kind": "official_docs",
    "original_topics": [
      "GPU_NIC",
      "PCIe",
      "ACS",
      "IOMMU",
      "拓扑诊断"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "这份短文档把逻辑上的两张GPU或一对GPU与NIC还原为实际PCIe路径。它解释CUDApeeraccess、GPUdirect所需驱动路径、DMA-BUF与nvidia-peermem，以及ACS、IOMMU和虚拟拓扑为什么会改变P2P行为。读者可据此理解同socket、同交换机与跨NUMA之间不是只差一根线，容器中的拓扑视图也不一定等同于真实硬件。文档对裸机和虚拟机提出不同处理条件，因此阅读卡不应把关闭某项功能当成所有系统的通用操作建议。拓扑矩阵是必要证据的一部分，却不能单独证明数据正确性、GDR已启用或实际吞吐已达到端口线速。实际诊断还应保留操作系统、驱动与虚拟化环境信息，避免把条件性问题归因于某个芯片。",
    "primary_url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html",
    "verification_scope": "官方当前故障排查页相关章节已读；裸机与虚拟机要求明确分开。",
    "sourceId": "rd-lit-nccl_topology_acs"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Architecture / Setup and Component Model",
        "read_for": "先沿CPU准备对象、导出handle、启动CUDA kernel的顺序理解控制路径。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design"
      },
      {
        "label": "GDAKI Data Path for Different Protocols",
        "read_for": "再选择Ethernet、RDMA、Verbs或DMA对应路径，辨认谁提交和推进工作。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "gpunetio_arch_design",
    "short": "GPUNetIO 架构",
    "title": "DOCA GPUNetIO — Architecture and Design",
    "year": 2026,
    "published": "2026-09-01 archive update",
    "version": "DOCA 3.5.0",
    "kind": "docs",
    "existing_scale_source_id": "gpunetio",
    "topics": [
      "gpu",
      "nic"
    ],
    "pdf_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design",
    "evidence_status": "官方架构与CPU配置/GPU运行章节已读；升级原博客来源为SDK编程文档。",
    "problem": "CPU逐次协调网络事务可能增加关键路径延迟。",
    "mechanism": "CPU创建并导出对象，GPUkernel通过专用接口控制网络或DMA。",
    "cost": "仍需初始化、handle管理、兼容硬件和正确同步。",
    "not_for": "GDR可用不等于所有GDAKI接口都可用。",
    "why_read": "直接回答通信到底由CPU、GPU还是NIC推进。",
    "reading_level": "deep",
    "experiment": {
      "environment": "DOCA3.5.0架构/样例指导。",
      "result": "说明分阶段对象和执行模型。",
      "limit": "没有将样例当生产MoE性能结果。"
    },
    "authors_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design",
    "source_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design",
    "question": "CPU逐次协调网络事务可能增加关键路径延迟。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "进阶/编程体系结构",
    "original_kind": "official_docs",
    "original_topics": [
      "GPU_initiated",
      "GDAKI",
      "GPUDirect",
      "NIC",
      "编程体系结构"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "架构文档将应用明确分为CPU配置阶段和GPU数据路径阶段：前者创建设备、内存和队列对象并导出GPUhandle，后者在CUDAkernel中操作这些对象。它进一步区分Ethernet、RDMA、Verbs与DMA路径所依赖的库，适合解释GPUDirectRDMA与GPU发起工作之间的差别。前者关心NIC能否直接访问GPUbuffer，后者还涉及谁准备工作、通知设备和观察完成。因而所谓移除关键路径上的CPU不代表完全没有Host初始化，也不表示传输工作不占用GPU执行资源。具体队列和同步方案取决于协议路径，不能把多个示例拼成一个所有平台都支持的通用实现。可先追踪一次对象创建和导出，再沿一次发送操作查找真正执行与等待的位置。",
    "primary_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design",
    "verification_scope": "官方架构与CPU配置/GPU运行章节已读；升级原博客来源为SDK编程文档。",
    "sourceId": "rd-lit-gpunetio_arch_design"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "NVIDIA SHARP Collective Library",
        "read_for": "先核对支持的collective和数据类型，区分库接口与交换机能力。",
        "url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library"
      },
      {
        "label": "NVIDIA SHARP Resource Tuning for Low Latency Operations / NVIDIA SHARP Streaming Aggregation",
        "read_for": "再查组、树、配额和streaming资源限制，不把卸载理解成无状态或无限资源。",
        "url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "sharp315_collectives",
    "short": "SHARP 3.15",
    "title": "NVIDIA SHARP 3.15.0 — Collective Library and Platform Requirements",
    "year": 2026,
    "published": "2026-06",
    "version": "3.15.0",
    "kind": "docs",
    "topics": [
      "transport",
      "collectives"
    ],
    "pdf_url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library",
    "related_urls": [
      "https://networking-docs.nvidia.com/sharpum/3150/release-notes",
      "https://networking-docs.nvidia.com/sharpum/3150/general-information"
    ],
    "evidence_status": "官方3.15 release、library与平台条件已读。",
    "problem": "端点反复转发规约数据会占用带宽与计算资源。",
    "mechanism": "受支持collective经聚合树与网络内规约资源卸载。",
    "cost": "需要匹配交换机/NIC/软件，且树和组资源有限。",
    "not_for": "不支持把任意模型算子当交换机程序。",
    "why_read": "给in-network compute加上操作集、资源和平台边界。",
    "reading_level": "core",
    "experiment": {
      "environment": "官方3.15库/平台说明。",
      "result": "定义可用接口与条件。",
      "limit": "不是所有collective自动卸载的保证。"
    },
    "authors_url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library",
    "source_url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library",
    "question": "端点反复转发规约数据会占用带宽与计算资源。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "中级/卸载机制",
    "original_kind": "official_docs",
    "original_topics": [
      "InfiniBand",
      "in_network_compute",
      "collective",
      "交换机卸载"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "SHARP文档提供网络内计算的具体软件与资源模型，比把交换机画成万能计算单元更有帮助。它列出库支持的collective和数据类型，并通过聚合树、组资源、streamingaggregation等配置说明卸载并非没有状态和资源限制。阅读时要把NCCL或MPI的上层语义、插件选择、交换芯片能力和固件软件条件分开；一个上层AllReduce调用不意味着必定由交换机执行。网络内规约可以减少端点间重复传输，但不是把任意专家GEMM或不规则MoE路由都搬进交换机。适合与NVLinkSHARP并列阅读，理解同名家族在不同fabric上仍有不同部署条件。读者还应分别核对操作、数据类型和资源配额，而不是只确认硬件支持这个品牌名。",
    "primary_url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library",
    "verification_scope": "官方3.15 release、library与平台条件已读。",
    "sourceId": "rd-lit-sharp315_collectives"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "InfiniBand Trade Association"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "InfiniBand Trade Association",
    "venue": "InfiniBand Trade Association · 公开标准概览",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "Volume1/2 scope",
        "pdf_page_one_based": 2,
        "url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf#page=2",
        "read_for": "先看规范职责与公开获取范围。"
      },
      {
        "label": "MRC",
        "pdf_page_one_based": 15,
        "url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf#page=15",
        "read_for": "多路径、可靠性和故障恢复的公开定义范围。"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "ibta_release21_public",
    "short": "IBTA Release 2.1",
    "title": "What’s New — InfiniBand Architecture Release 2.1, Volumes 1 and 2",
    "year": 2026,
    "published": "2026-07-31",
    "version": "Vol1/Vol2 Release 2.1 public overview",
    "kind": "overview",
    "institution": "InfiniBand Trade Association",
    "topics": [
      "transport"
    ],
    "pdf_url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf",
    "formal_spec_url": "https://infinibandta.org/ibta-specification/",
    "evidence_status": "19页官方更新导读已读；完整Vol1/2正文为会员/申请入口，未访问受限内容。",
    "problem": "旧版RoCE/IB认识不足以描述新的多路径和管理能力。",
    "mechanism": "Release2.1公开概览说明MRC、管理扩展与物理层变化。",
    "cost": "实现与互操作必须回到对应规范和产品版本核对。",
    "not_for": "公开导读不能冒充完整Vol1/2规范审读。",
    "why_read": "把无损/乱序/多路径讨论绑定到具体年代和规范。",
    "reading_level": "core",
    "experiment": {
      "environment": "官方规范更新报告；无性能实验。",
      "result": "确认发布范围及MRC的设计方向。",
      "limit": "不声称已读2294/835页会员正文。"
    },
    "authors_url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf",
    "source_url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf",
    "question": "旧版RoCE/IB认识不足以描述新的多路径和管理能力。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "中级/版本导读",
    "original_kind": "standard_overview",
    "original_topics": [
      "InfiniBand",
      "RoCE",
      "MRC",
      "多路径",
      "正式规范公开范围"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "publication",
    "overview": "这份公开更新导读能同时校正InfiniBand和RoCE的版本边界。它说明Volume1负责体系结构与传输，Volume2负责物理电气光学等接口，并明确完整正文的获取范围。特别值得关注的是加入MRC的说明：它在RCRoCEv2模型上增加显式多路径、拥塞控制、路径健康跟踪和故障恢复，目标环境包括best-effortEthernet。由此可见不能把旧论文对当年RoCE实现的限制当成永远不变的标准定义。但导读并非完整状态机或符合性条款，不能凭几页介绍声称某颗NIC已经实现全部机制，更不能把规范能力当成交付和生产实测证明。后续追踪量产硬件时，应继续核对它声明符合的版本、功能子集及固件状态。",
    "primary_url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf",
    "verification_scope": "19页官方更新导读已读；完整Vol1/2正文为会员/申请入口，未访问受限内容。",
    "sourceId": "rd-lit-ibta_release21_public"
  },
  {
    "group": "fabrics",
    "guo_coauthor": false,
    "authors": [
      "NVIDIA"
    ],
    "authors_complete": true,
    "author_attribution": "机构署名；不虚构个人作者。",
    "publisher": "NVIDIA",
    "venue": "NVIDIA · 官方技术文档",
    "key_figures": [],
    "reading_guide": [
      {
        "label": "RoCE Modes",
        "read_for": "先对照RoCEv1与RoCEv2封装，明确二层、UDP/IP及路由范围。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet"
      },
      {
        "label": "GID Table Population",
        "read_for": "再沿GID类型、QP设置和RDMA-CM看连接如何选定RoCE模式。",
        "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet"
      }
    ],
    "next": [],
    "interpretation_note": "cost、not_for和why_read含基于原文的教学适用性判断，不是通用性能测量。",
    "id": "roce_official_modes",
    "short": "RoCEv1 / RoCEv2",
    "title": "RDMA over Converged Ethernet — Modes, GIDs and RDMA-CM",
    "year": 2026,
    "published": "2026-10-26 page update",
    "version": "DOCA 3.5.0",
    "kind": "docs",
    "existing_scale_source_id": "rocev2",
    "topics": [
      "transport",
      "fundamentals"
    ],
    "pdf_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "evidence_status": "官方RoCE模式、GID和连接配置说明已读。",
    "problem": "将RDMA、Ethernet、UDP/IP和verbs误当同一层替代项。",
    "mechanism": "按RoCE模式、GID类型与RDMA-CM描述封装和路径选择。",
    "cost": "需要正确配置地址、模式和网络条件。",
    "not_for": "RoCEv2不是TCP；API不直接证明底层路径或无损属性。",
    "why_read": "以实际封装和连接配置解释RDMA可以同时使用IP。",
    "reading_level": "foundation",
    "experiment": {
      "environment": "DOCA驱动技术文档。",
      "result": "解释协议封装和连接配置。",
      "limit": "不是所有RoCE/NIC实现的永久能力表。"
    },
    "authors_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "source_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "question": "将RDMA、Ethernet、UDP/IP和verbs误当同一层替代项。",
    "reviewed": "2026-10-30",
    "publication_year_known": true,
    "display_year": "2026",
    "display_level": "入门/中级",
    "original_kind": "official_docs",
    "original_topics": [
      "RoCE",
      "UDP_IP",
      "RDMA_CM",
      "GID",
      "协议分层"
    ],
    "authorship": "organization",
    "added_in": "0.6",
    "year_basis": "version_or_review",
    "overview": "这页文档适合修正常见的协议层级误解：RDMA描述远端内存访问与传输能力，并不等于不用IP；RoCEv1工作在Ethernet二层，RoCEv2使用UDP/IP封装并可经IP路由。它还把GID、网口、RDMA-CM和连接建立串起来，让读者理解用户看到的verbs接口为什么不能直接代表线上封装。统计和管理路径也要区分，硬件卸载流量未必出现在普通网络接口计数中。它是特定驱动生态的部署说明，不能替代全部IBTA规范，也不应把其中的传统无损部署语境推广成所有当代RDMA只能依赖PFC；协议和产品需要按版本继续核验。建立连接使用的控制通信和承载大块数据的路径，也应在示意图中分别标记。",
    "primary_url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet",
    "verification_scope": "官方RoCE模式、GID和连接配置说明已读。",
    "sourceId": "rd-scale-rocev2"
  },
  {
    "year": 2026,
    "venue": "DeepSeek-AI · 固定版本工程文档",
    "publisher": "DeepSeek-AI",
    "authors": [
      "DeepSeek-AI"
    ],
    "authors_complete": true,
    "authorship": "organization",
    "kind": "code",
    "guo_coauthor": false,
    "reading_level": "core",
    "reviewed": "2026-10-30",
    "year_basis": "publication",
    "key_figures": [],
    "evidence_status": "官方固定commit的README与接口/范围说明；工程项目，不冒充同行评审论文。",
    "verification_scope": "核对固定版本README的接口、依赖、硬件与已公开/未公开范围。",
    "id": "deepep25_code",
    "short": "DeepEP V2.5",
    "title": "DeepEP: expert-parallel communication library · V2.5 pinned README",
    "version": "f6aa38fe06cd4a0489e7730365d4e0114970a2f3",
    "sourceId": "rd-extra-deep_ep",
    "authors_url": "https://github.com/deepseek-ai/DeepEP",
    "pdf_url": "https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/README.md",
    "topics": [
      "gpu",
      "moe",
      "collectives",
      "scale-up",
      "scale-out"
    ],
    "problem": "模型路由和grouped GEMM之间，通信buffer与异步依赖如何衔接？",
    "question": "从MoE论文走到能调用的dispatch/combine接口。",
    "why_read": "把NVLink、RDMA、通信SM与Python调用放进同一软件接口。",
    "mechanism": "EPBuffer统一训练/prefill/decode的dispatch/combine，提供expanded expert layout与异步event；该版本采用NCCL Gin后端。",
    "cost": "主线EP需要GPU SM、匹配的CUDA/NCCL与受支持NVLink/RDMA拓扑；CPU同步、容量和路由handle的生命周期会影响集成。",
    "not_for": "V2.5已移除旧V1/NVSHMEM依赖；不能引用旧版零SM说法。experimental的PP/Engram/Bucket也不等于所有生产能力已稳定。",
    "reading_guide": [
      "先读V2/V2.5 News与Requirements，再读EPBuffer初始化、dispatch/combine示例及异步event。",
      "对照do_cpu_sync、expanded layout和grouped GEMM输入；新路由需fresh dispatch。"
    ],
    "experiment": {
      "environment": "工程接口与测试说明；本卡不把README当成跨平台独立实测。",
      "result": "展示固定版本的软件依赖、buffer/API和通信计算交接。",
      "limit": "版本间API和后端变化明显，不能把旧实现与当前接口混用。"
    },
    "original_kind": "code",
    "original_topics": [
      "gpu",
      "moe",
      "collectives",
      "scale-up",
      "scale-out"
    ],
    "added_in": "0.6",
    "primary_url": "https://github.com/deepseek-ai/DeepEP"
  },
  {
    "year": 2026,
    "venue": "DeepSeek-AI · 固定版本工程文档",
    "publisher": "DeepSeek-AI",
    "authors": [
      "DeepSeek-AI"
    ],
    "authors_complete": true,
    "authorship": "organization",
    "kind": "code",
    "guo_coauthor": false,
    "reading_level": "core",
    "reviewed": "2026-10-30",
    "year_basis": "publication",
    "key_figures": [],
    "evidence_status": "官方固定commit的README与接口/范围说明；工程项目，不冒充同行评审论文。",
    "verification_scope": "核对固定版本README的接口、依赖、硬件与已公开/未公开范围。",
    "id": "deepinfer_code",
    "short": "DeepInfer · 发布范围",
    "title": "DeepInfer: High-performance, large-scale inference framework for DeepSeek models",
    "version": "553741557a57df44a46fb3ab72b6aafeaf945337",
    "sourceId": "deepinfer-readme",
    "authors_url": "https://github.com/deepseek-ai/DeepInfer",
    "pdf_url": "https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/README.md",
    "topics": [
      "gpu",
      "moe",
      "serving",
      "collectives"
    ],
    "problem": "框架、算子、EP通信和完整在线服务的公开边界在哪里？",
    "question": "DeepSeek的推理执行框架公开到了哪一层？",
    "why_read": "把02算子显微镜与07互连连接起来，同时保留开源release的实际边界。",
    "mechanism": "固定release支持V4.1-Flash离线推理，整合FlashMLA、DeepGEMM、DeepEP及其他kernel；包含Attention DP/CP、MoE EP/EPLB及异步调度。",
    "cost": "部署需匹配模型、依赖、硬件和配置；图中的生产服务全貌不表示该repo已经包含所有在线层。",
    "not_for": "此release未包含完整KV cache系统、完整VE/Prefill/Decode拆分服务及跨DP副本负载均衡，不能当作完整线上系统复现。",
    "reading_guide": [
      "先读Supported features/hardware与Required for a complete inference service，再读Performance benchmarks。",
      "接着看02固定版本的实际MLP调用；框架定位与单个kernel映射分别核对。"
    ],
    "experiment": {
      "environment": "README的prefill为4个SM100 GPU、decode为64个SM100 GPU，分别在一个scale-up域内。",
      "result": "给出复现入口和执行配置；本卡不把两组配置合并比较为单一加速倍率。",
      "limit": "GPU内、域内与跨域路径不能从这两组规模直接互推。"
    },
    "original_kind": "code",
    "original_topics": [
      "gpu",
      "moe",
      "serving",
      "collectives"
    ],
    "added_in": "0.6",
    "primary_url": "https://github.com/deepseek-ai/DeepInfer"
  }
]);
const extraSources=[
  {
    "id": "rd-lit-rfc5041",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 5041",
    "title": "Direct Data Placement over Reliable Transports",
    "url": "https://www.rfc-editor.org/info/rfc5041/",
    "supports": "Tagged使用STag与offset定位授权buffer；Untagged由接收端提供队列顺序。分段放置与消息边界分开。",
    "limit": "提前授权和资源管理仍必需；直接放置不等于应用已消费。此RFC以可靠底层为前提。"
  },
  {
    "id": "rd-lit-rfc5042",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 5042",
    "title": "Direct Data Placement Protocol (DDP) / Remote Direct Memory Access Protocol (RDMAP) Security",
    "url": "https://www.rfc-editor.org/info/rfc5042/",
    "supports": "建立RNIC资源、信任与隔离模型，分析STag、buffer、CQ和Read请求队列的越界、共享及耗尽风险。",
    "limit": "权限键不是加密；资源配额、生命周期与传输保护需各自设计。不是现代GPU/RNIC产品的安全认证。"
  },
  {
    "id": "rd-lit-rfc7306",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 7306",
    "title": "Remote Direct Memory Access (RDMA) Protocol Extensions",
    "url": "https://www.rfc-editor.org/info/rfc7306/",
    "supports": "扩展RFC5040，增加atomic请求/响应和immediate data；定义header、匹配与操作顺序约束。",
    "limit": "需要端点支持；协议原子语义不自动等于GPU/CPU缓存一致，也不保证任意网卡支持。"
  },
  {
    "id": "rd-lit-rfc8166",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 8166",
    "title": "Remote Direct Memory Access Transport for Remote Procedure Call Version 1",
    "url": "https://www.rfc-editor.org/info/rfc8166/",
    "supports": "用inline消息和Read/Write/Reply chunks映射RPC数据，credit约束事务资源，并定义内存注册、错误和上层绑定。",
    "limit": "应用仍有消息编组、buffer管理与流控；不是直接对一个地址WRITE就完成任意RPC。"
  },
  {
    "id": "rd-lit-rfc8797",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 8797",
    "title": "Remote Direct Memory Access - Connection Manager (RDMA-CM) Private Data for RPC-over-RDMA Version 1",
    "url": "https://www.rfc-editor.org/info/rfc8797/",
    "supports": "为RPC-over-RDMA v1定义可选CM Private Data，交换双向inline threshold和remote invalidation支持情况。",
    "limit": "连接重建要重新交换；双方能力与STag可失效条件都要满足，不能无条件启用。"
  },
  {
    "id": "rd-lit-rfc3168",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 3168",
    "title": "The Addition of Explicit Congestion Notification (ECN) to IP",
    "url": "https://www.rfc-editor.org/info/rfc3168/",
    "supports": "定义IP的ECN字段与TCP反馈/响应机制，让支持的网络在部分情况下标记而非直接丢包。",
    "limit": "ECN是信号，不是完整RDMA拥塞算法；突发仍可能丢包，RoCE CNP/DCQCN也不能等同TCP ECE处理。"
  },
  {
    "id": "rd-lit-rfc8257",
    "publisher": "IETF / RFC Editor",
    "type": "report",
    "date": "RFC 8257",
    "title": "Data Center TCP (DCTCP): TCP Congestion Control for Data Centers",
    "url": "https://www.rfc-editor.org/info/rfc8257/",
    "supports": "通过ECN标记比例估计拥塞程度并调节TCP窗口；记录端点反馈、loss处理与实现部署问题。",
    "limit": "这是Informational RFC；面向受控数据中心，不能无额外措施搬到公网，也不是RDMA rate controller。"
  },
  {
    "id": "rd-lit-rfc9293",
    "publisher": "IETF / RFC Editor",
    "type": "official",
    "date": "RFC 9293",
    "title": "Transmission Control Protocol (TCP)",
    "url": "https://www.rfc-editor.org/info/rfc9293/",
    "supports": "汇总TCP连接、序号、重传、流控与数据通信的规范要求，替代RFC793及相关更新。",
    "limit": "本身不定义远端内存注册、rkey或RDMA WRITE语义；与TCP上承载的iWARP分层阅读。"
  },
  {
    "id": "rd-paper-dctcp",
    "publisher": "ACM SIGCOMM 2010",
    "type": "paper",
    "date": "2010",
    "title": "Data Center TCP (DCTCP)",
    "url": "https://www.microsoft.com/en-us/research/publication/data-center-tcp-dctcp/",
    "supports": "交换机按队列阈值标记ECN，发送端估计被标记byte的比例并平滑为α，再按α缩减窗口；其反馈量来自一段标记序列，而不是单个包携带多位数值。",
    "limit": "它是TCP拥塞控制，不是RDMA可靠传输；不证明PFC可直接关闭，也不解决RNIC微架构隔离。"
  },
  {
    "id": "rd-paper-pfabric",
    "publisher": "ACM SIGCOMM 2013",
    "type": "paper",
    "date": "2013",
    "title": "pFabric: Minimal Near-Optimal Datacenter Transport",
    "url": "https://yuba.stanford.edu/~nickm/papers/pfabric.pdf",
    "supports": "包携带剩余流大小等优先级，交换机以小缓冲按优先级接纳、丢弃与发送；端点先以线速启动，只有持续严重丢包才退让。",
    "limit": "它是全新传输设计与比较基线，不能当成现有RoCE、NCCL或商用RNIC已经采用的机制。"
  },
  {
    "id": "rd-paper-expresspass",
    "publisher": "ACM SIGCOMM 2017",
    "type": "paper",
    "date": "2017",
    "title": "Credit-Scheduled Delay-Bounded Congestion Control for Datacenters",
    "url": "https://people.csail.mit.edu/inhocho/papers/sigcomm17credit.pdf",
    "supports": "接收端先发credit，交换机逐链路限制反向credit流；发送端按收到的credit发送数据，使数据到达顺序在入网前被调节，并通过反馈及随机扰动处理credit损失与公平性。",
    "limit": "这是端到端协议与交换机协作，不是RC的接收WQE credit，也不能直接视为标准RoCE拥塞控制。"
  },
  {
    "id": "rd-paper-ndp",
    "publisher": "ACM SIGCOMM 2017",
    "type": "paper",
    "date": "2017",
    "title": "Re-architecting Datacenter Networks and Stacks for Low Latency and High Performance",
    "url": "https://discovery.ucl.ac.uk/id/eprint/10068163/",
    "supports": "极浅缓冲满时将数据包裁为包头，并优先转发包头；接收端由此观察需求，通过pull调度数据与重传，并结合多路径发送。",
    "limit": "它是独立传输架构，不等于现有RC网卡天然支持乱序和trimming；也不提供GPU消费可见性的替代协议。"
  },
  {
    "id": "rd-paper-homa",
    "publisher": "ACM SIGCOMM 2018",
    "type": "paper",
    "date": "2018",
    "title": "Homa: A Receiver-Driven Low-Latency Transport Protocol Using Network Priorities",
    "url": "https://arxiv.org/abs/1803.09615",
    "supports": "小消息先发送unscheduled数据；长消息由接收端grant控制。动态优先级近似最短剩余处理时间，适度overcommit接收带宽，避免单个发送端阻塞让链路空闲。",
    "limit": "这是RPC消息协议而非verbs RC；2018实现的结论不能替代2026 Linux实现、草案或GPU通信库的兼容性验证。"
  },
  {
    "id": "rd-paper-swift",
    "publisher": "ACM SIGCOMM 2020",
    "type": "paper",
    "date": "2020",
    "title": "Swift: Delay is Simple and Effective for Congestion Control in the Datacenter",
    "url": "https://research.google/pubs/swift-delay-is-simple-and-effective-for-congestion-control-in-the-datacenter/",
    "supports": "借助NIC与软件时间戳拆分fabric和endpoint延迟，分别维护窗口；按目标延迟执行AIMD，并在极端拥塞时使用小于一个包的窗口及pacing。",
    "limit": "它是Pony Express/Snap内的控制方案，不是把TIMELY的梯度参数调一下，也不是所有RoCE硬件可直接装载的算法。"
  },
  {
    "id": "rd-paper-eqds",
    "publisher": "USENIX NSDI 2022",
    "type": "paper",
    "date": "2022",
    "title": "An Edge-Queued Datagram Service for All Datacenter Traffic",
    "url": "https://www.usenix.org/conference/nsdi22/presentation/olteanu",
    "supports": "引入边缘排队的数据报服务，将等待移到发送端EQIF，由接收端pull决定入网；不同上层传输使用各自队列和反馈接口，底层可裁剪或以RTS方式发起。",
    "limit": "EQDS不是直接替换RDMA动词的API，也没有证明完全无排队；等待主要被迁到边缘。"
  },
  {
    "id": "rd-paper-justitia",
    "publisher": "USENIX NSDI 2022",
    "type": "paper",
    "date": "2022",
    "title": "Justitia: Software Multi-Tenancy in Hardware Kernel-Bypass Networks",
    "url": "https://www.usenix.org/conference/nsdi22/presentation/zhang-yiwen",
    "supports": "软件中介将连接调节与消息级整形分开，结合发送端资源仲裁、接收端反馈和被动时延监测，以目标尾时延约束共享并支持公平或加权分配。",
    "limit": "不提供恶意租户无法绕过的完整安全边界，也未覆盖所有RNIC隐藏资源；后续Husky专门检验了这些缺口。"
  },
  {
    "id": "rd-paper-husky",
    "publisher": "USENIX NSDI 2023",
    "type": "paper",
    "date": "2023",
    "title": "Understanding RDMA Microarchitecture Resources for Performance Isolation",
    "url": "https://www.usenix.org/conference/nsdi23/presentation/kong",
    "supports": "建立动词到微架构资源的操作模型，生成系统性Husky测试，分别消耗处理单元、缓存和PCIe，并比较硬件TC、SR-IOV及Justitia等隔离方式。",
    "limit": "不能将当年固件中的反例写成所有后续RNIC永久存在的问题；SR-IOV地址隔离也不等于性能隔离。"
  },
  {
    "id": "rd-paper-harmonic",
    "publisher": "USENIX NSDI 2024",
    "type": "paper",
    "date": "2024",
    "title": "Harmonic: Hardware-assisted RDMA Performance Isolation for Public Clouds",
    "url": "https://www.usenix.org/conference/nsdi24/presentation/lou",
    "supports": "FPGA原型的可编程智能PCIe交换机监测每租户RDMA资源使用，配合RDMA友好的限速机制；控制路径也受调节，不只限制数据包。",
    "limit": "不是不用改硬件的纯软件方案，也不是证明任意商用RNIC已经具有完整微架构分区。"
  },
  {
    "id": "rd-paper-reverie",
    "publisher": "USENIX NSDI 2024",
    "type": "paper",
    "date": "2024",
    "title": "Reverie: Low Pass Filter-Based Switch Buffer Sharing for Datacenters with RDMA and TCP Traffic",
    "url": "https://www.usenix.org/conference/nsdi24/presentation/addanki-reverie",
    "supports": "统一入口/出口准入视图，用低通滤波后的队列统计做阈值决策，在总缓冲界限内吸收突发，同时隔离有损和无损类别。",
    "limit": "它改缓冲共享，不替代端侧拥塞控制与可靠重传，也不是声明所有RDMA必须或可以永远使用PFC。"
  },
  {
    "id": "rd-paper-bolt",
    "publisher": "USENIX NSDI 2023",
    "type": "paper",
    "date": "2023",
    "title": "Bolt: Sub-RTT Congestion Control for Ultra-Low Latency",
    "url": "https://www.usenix.org/conference/nsdi23/presentation/arslan",
    "supports": "交换机生成Sub-RTT Control，发送更及时的拥塞信号；Proactive Ramp-Up利用即将完成的流，Supply Matching补充突发空闲带宽，配合端点窗口控制。",
    "limit": "它是可编程网络协作算法，不是普通ECN阈值调整，也不表示任意RNIC或交换机可直接部署。"
  },
  {
    "id": "rd-paper-conweave",
    "publisher": "ACM SIGCOMM 2023",
    "type": "paper",
    "date": "2023",
    "title": "Network Load Balancing with In-network Reordering Support for RDMA",
    "url": "https://conferences.sigcomm.org/sigcomm/2023/program.html",
    "supports": "源ToR检测路径状态并将流分epoch，目的ToR用交换机队列及控制状态掩盖路径切换导致的乱序；避免把同一epoch任意喷洒成无限乱序。",
    "limit": "它不是NIC中的无限乱序重组，也不改变GPU可见性或应用完成语义。"
  },
  {
    "id": "rd-paper-eunomia",
    "publisher": "ACM APNet 2025; author preprint 2024",
    "type": "paper",
    "date": "2025",
    "title": "Orderly Management of Packets in RDMA by Eunomia",
    "url": "https://arxiv.org/abs/2412.08540",
    "supports": "接收侧增加ordering层，按需分配hybrid-dynamic bitmap并使用专门内存控制器；payload直接放置，bitmap跟踪缺口，完成条件仍受顺序与可靠性约束。",
    "limit": "不是现有标准RoCE网卡只升级应用就具备的能力，也不允许应用在数据尚未齐全时提前消费。"
  },
  {
    "id": "rd-paper-tagger",
    "publisher": "ACM CoNEXT 2017",
    "type": "paper",
    "date": "2017",
    "title": "Tagger: Practical PFC Deadlock Prevention in Data Center Networks",
    "url": "https://www.microsoft.com/en-us/research/?p=431784",
    "supports": "运营者给定预期无损路径集合，离线生成tag规则；在路径转折处调整tag并映射到有限无损优先级，从依赖结构上阻断环。",
    "limit": "预防PFC死锁不等于消除拥塞、队头阻塞或所有暂停；它也不是选择重传协议。"
  },
  {
    "id": "rd-paper-falcon",
    "publisher": "ACM SIGCOMM 2025",
    "type": "paper",
    "date": "2025",
    "title": "Falcon: A Reliable, Low Latency Hardware Transport",
    "url": "https://praveenk.io/pubs/falcon/",
    "supports": "作者公开记录给出的组合是延迟拥塞控制、多路径负载均衡、简单请求响应事务接口、硬件重传与错误处理，以及可编程引擎；Google分层说明列出RDMA与NVMe等ULP。",
    "limit": "Falcon不是标准RoCEv2的另一个名字；不能拿论文标题证明某GPU平台或云实例已经配套。"
  },
  {
    "id": "rd-paper-csig",
    "publisher": "ACM SIGCOMM 2026",
    "type": "paper",
    "date": "2026",
    "title": "CSIG: Congestion Signaling for Datacenter Transports",
    "url": "https://research.google/pubs/csig-congestion-signaling-for-datacenter-transports/",
    "supports": "固定长度二层tag沿途比较替换，汇总路径最严重的瓶颈指标和定位信息；接收方将信息反射给发送方，再由控制算法使用，而不是把信号本身当完整拥塞控制。",
    "limit": "论文、早期Internet-Draft和IEEE/UEC工作是不同版本；草案不是已批准标准，CSIG也不等于RoCE或可靠传输。"
  },
  {
    "id": "rd-paper-burst",
    "publisher": "USENIX NSDI 2026",
    "type": "paper",
    "date": "2026",
    "title": "BURST: Seeking High-performance, Interoperability and Scalability in Soft-RDMA",
    "url": "https://www.usenix.org/conference/nsdi26/presentation/shen",
    "supports": "独立用户态进程提供verbs兼容入口，采用无锁DPDK数据路径、增强共享队列和用户态连接管理；DSA卸载不可避免的接收复制，另提供受支持的软件GPU直达路径。",
    "limit": "它是软件协议栈，不是新RNIC芯片；Guo Chen与gcx不是同一作者，不能因ByteDance署名就误归人物路线。"
  },
  {
    "id": "rd-paper-megascale2024",
    "publisher": "USENIX NSDI 2024",
    "type": "paper",
    "date": "2024",
    "title": "MegaScale: Scaling Large Language Model Training to More Than 10,000 GPUs",
    "url": "https://www.usenix.org/conference/nsdi24/presentation/jiang-ziheng",
    "supports": "跨模型块、优化器、算子与网络协同设计，细化TP/SP通信重叠；用全栈诊断识别异常与straggler，再配合恢复机制。",
    "limit": "不是RNIC微架构论文，也不是MegaScale-MoE；MFU是指定模型/并行配置下的系统结果。"
  },
  {
    "id": "rd-paper-hpn2024",
    "publisher": "ACM SIGCOMM 2024",
    "type": "paper",
    "date": "2024",
    "title": "Alibaba HPN: A Data Center Network for Large Language Model Training",
    "url": "https://doi.org/10.1145/3651890.3672265",
    "supports": "后端采用rail-optimized、双ToR和双平面组织，减少ECMP选择阶段；前端网络与训练后端分开设计。",
    "limit": "HPN是系统/网络架构，不是新的RDMA opcode或阿里GPU内部结构；跨Pod另有收敛假设。"
  },
  {
    "id": "rd-paper-rail_only",
    "publisher": "arXiv 2307.12169 · v5修订于2024-09-15",
    "type": "report",
    "date": "2023",
    "title": "Rail-only: A Low-Cost High-Performance Network for Training LLMs with Trillion Parameters",
    "url": "https://arxiv.org/abs/2307.12169v5",
    "supports": "根据并行划分与稀疏通信组织高带宽域和rail连接，移除跨rail全互联需求；MoE all-to-all可通过转发实现。",
    "limit": "不是所有LLM/MoE负载都天然适合；成本/功耗数字来自其架构与分析条件，不是通用采购报价。"
  },
  {
    "id": "rd-paper-switchml",
    "publisher": "USENIX NSDI 2021",
    "type": "paper",
    "date": "2021",
    "title": "Scaling Distributed Machine Learning with In-Network Aggregation",
    "url": "https://www.usenix.org/conference/nsdi21/presentation/sapio",
    "supports": "将模型更新分块放入可编程交换机的聚合槽，由主机与交换数据面协同处理，并为有限算术能力设计定点表示与恢复协议。",
    "limit": "不是普通以太网交换机默认支持的AllReduce；不适用于任意算子，也不等于GPU的Tensor Core计算。"
  },
  {
    "id": "rd-paper-sccl",
    "publisher": "ACM PPoPP 2021",
    "type": "paper",
    "date": "2021",
    "title": "Synthesizing Optimal Collective Algorithms",
    "url": "https://ppopp21.sigplan.org/details/PPoPP-2021-main-conference/43/Synthesizing-Optimal-Collective-Algorithms",
    "supports": "将数据块移动、连接带宽与步骤约束编码为SMT，搜索延迟与带宽的Pareto前沿，再生成可执行实现。",
    "limit": "“optimal”不是任意GPU集群/任意大小消息的现实性能保证，也不是RDMA可靠传输证明。"
  },
  {
    "id": "rd-paper-mscclang",
    "publisher": "ACM ASPLOS 2023",
    "type": "paper",
    "date": "2023",
    "title": "MSCCLang: Microsoft Collective Communication Language",
    "url": "https://doi.org/10.1145/3575693.3575724",
    "supports": "用chunk-oriented DSL描述路由与规约，编译为chunk/instruction DAG及MSCCL-IR，进行聚合、融合、并行化与线程块调度，由runtime执行。",
    "limit": "不是通用Python自动变成最优网络程序；论文中的IB路径仍可使用CPU helper发起RDMA，不能误称全部GPU自治。"
  },
  {
    "id": "rd-paper-taccl",
    "publisher": "USENIX NSDI 2023",
    "type": "paper",
    "date": "2023",
    "title": "TACCL: Guiding Collective Algorithm Synthesis using Communication Sketches",
    "url": "https://www.usenix.org/conference/nsdi23/presentation/shah",
    "supports": "用sketch约束拓扑、路由与交换机连接策略，引导优化编码搜索并生成可由MSCCL执行的collective。",
    "limit": "不是无条件自动找到真实硬件最优解；up-to数字不能推广到任意NCCL版本。"
  },
  {
    "id": "rd-paper-mscclpp_paper",
    "publisher": "ACM ASPLOS 2026",
    "type": "paper",
    "date": "2026",
    "title": "MSCCL++: Rethinking GPU Communication Abstractions for AI Inference",
    "url": "https://www.microsoft.com/en-us/research/publication/msccl-rethinking-gpu-communication-abstractions-for-ai-inference/",
    "supports": "提供GPU kernel可调用的低层primitives，再构建DSL和兼容collective API；CPU bootstrap与GPU执行职责分开。",
    "limit": "原始预印本始于2025，正式论文为ASPLOS26；不是把所有GPU/厂商设备自动变成统一缓存一致内存。"
  },
  {
    "id": "rd-paper-flux",
    "publisher": "arXiv 2406.06858 · v5/2024-10",
    "type": "report",
    "date": "2024",
    "title": "FLUX: Fast Software-based Communication Overlap On GPUs Through Kernel Fusion",
    "url": "https://arxiv.org/abs/2406.06858v5",
    "supports": "将计算和通信进一步分解为tile级操作，结合数据依赖signal和kernel融合，让可用tile尽早计算或传出。",
    "limit": "固定为v5预印本；不是所有网络链路都可完全隐藏，也不能把ReduceScatter中的本地reduce画到任意交换机。"
  },
  {
    "id": "rd-paper-comet",
    "publisher": "arXiv 2502.19811 · v3/2025-03-04",
    "type": "report",
    "date": "2025",
    "title": "Comet: Fine-grained Computation-communication Overlapping for Mixture-of-Experts",
    "url": "https://arxiv.org/abs/2502.19811v3",
    "supports": "分析细粒度任务依赖、重排调度，并自适应分配计算/通信工作，结合低层GPU通信接口实现重叠。",
    "limit": "原文生产采用声明与实验规模不同：主要评估是单台8-H800 NVLink服务器，不能当成万卡RDMA实测。"
  },
  {
    "id": "rd-paper-heteccl",
    "publisher": "USENIX NSDI 2026",
    "type": "paper",
    "date": "2026",
    "title": "HeteCCL: Synthesizing Near-Optimal Collective Communication Schedules for Heterogeneous GPU Clusters",
    "url": "https://www.usenix.org/conference/nsdi26/presentation/hei",
    "supports": "精细建模拓扑/带宽，按调度步骤量化chunk，将最大并行传输问题编码为SMT，并通过CEGIS迭代细化约束和剪枝。",
    "limit": "near-optimal依赖问题模型；不是证明所有混合厂商GPU训练软件都兼容。"
  },
  {
    "id": "rd-paper-syccl",
    "publisher": "ACM SIGCOMM 2025",
    "type": "paper",
    "date": "2025",
    "title": "SyCCL: Exploiting Symmetry for Efficient Collective Communication Scheduling",
    "url": "https://doi.org/10.1145/3718958.3750499",
    "supports": "利用collective和拓扑的对称性分解子需求，合成子调度再组合；用事件级模拟预测结果，并交由MSCCL executor运行。",
    "limit": "不能把生产规模模拟当成同规模实体集群实测，也不应把旧NCCL基线的算法限制概括成所有当前版本。"
  },
  {
    "id": "rd-paper-distserve",
    "publisher": "USENIX OSDI 2024",
    "type": "paper",
    "date": "2024",
    "title": "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving",
    "url": "https://www.usenix.org/conference/osdi24/presentation/zhong-yinmin",
    "supports": "将阶段放到不同GPU，分别优化资源/并行方案，并根据集群带宽选择部署位置以控制KV cache转移。",
    "limit": "不是免费消除干扰；分离有流量与排队代价，也不意味着每个decode token都重新迁移整份KV。"
  },
  {
    "id": "rd-paper-mooncake",
    "publisher": "USENIX FAST 2025",
    "type": "paper",
    "date": "2025",
    "title": "Mooncake: Trading More Storage for Less Computation — A KVCache-centric Architecture for Serving LLM Chatbot",
    "url": "https://www.usenix.org/conference/fast25/presentation/qin",
    "supports": "围绕分布式KVCache组织prefill/decoding资源池，以Transfer Engine搬运数据，由Conductor依据缓存位置和SLO调度；利用CPU DRAM/SSD/NIC资源。",
    "limit": "这里固定FAST25正式论文，不能把后续项目/ToS扩展的特性倒写为该版本已有。"
  },
  {
    "id": "rd-paper-splitwise",
    "publisher": "ACM/IEEE ISCA 2024",
    "type": "paper",
    "date": "2024",
    "title": "Splitwise: Efficient Generative LLM Inference Using Phase Splitting",
    "url": "https://www.microsoft.com/en-us/research/publication/splitwise-efficient-generative-llm-inference-using-phase-splitting/",
    "supports": "拆分两个阶段，按阶段选择同构/异构机器池；使用集群高速后端网络与优化通信库转移请求状态。",
    "limit": "不是“decode永远不需要算力”的定律；也别与同名2025边云Splitwise论文混淆。"
  },
  {
    "id": "rd-paper-flashmoe",
    "publisher": "NeurIPS 2025",
    "type": "paper",
    "date": "2025",
    "title": "FlashMoE: Fast Distributed MoE in a Single Kernel",
    "url": "https://papers.nips.cc/paper_files/paper/2025/file/918d938bd209e5b56072777366f8a211-Paper-Conference.pdf",
    "supports": "把MoE计算和设备发起的单边(R)DMA结合在persistent kernel中，细粒度流水化路由、计算与返回，避免不必要payload。",
    "limit": "面向推理，训练的后向融合属未来工作；主要是单节点多GPU算子研究，不能把distributed当成万卡RDMA扩展实测。"
  },
  {
    "id": "rd-paper-rails",
    "publisher": "arXiv 2510.19262 · v2/2025-10-23",
    "type": "report",
    "date": "2025",
    "title": "RailS: Load Balancing for All-to-All Communication in Distributed Mixture-of-Experts Training",
    "url": "https://arxiv.org/abs/2510.19262v2",
    "supports": "利用拓扑对称性分析发送/接收负载关系，由各节点用LPT策略为流量分配并行rails，实现细粒度的本地调度。",
    "limit": "当前按固定arXiv预印本收录；PDF的ToN模板页眉不是已确认正式期刊卷期。"
  },
  {
    "id": "rd-paper-moe_resource2026",
    "publisher": "arXiv 2609.07536 · v1；作者注明已获SC26 AI on HPC Workshop接收",
    "type": "report",
    "date": "2026",
    "title": "Analytical Resource Management for Fine-grained MoE Computation-Communication Overlap",
    "url": "https://arxiv.org/abs/2609.07536v1",
    "supports": "建立wave量化的分析模型，根据tile数、occupancy、驻留限制与依赖，在launch时选择通信CTA数量和资源划分。",
    "limit": "是2026预印本/已接受workshop的作者版本，不标成SC26主会；也不是跨机RDMA资源管理实验。"
  },
  {
    "id": "rd-paper-demystifying_nccl",
    "publisher": "arXiv 2507.04786 · v3修订于2026-03-02",
    "type": "report",
    "date": "2025",
    "title": "Demystifying NCCL: An In-depth Analysis of GPU Communication Protocols and Algorithms",
    "url": "https://arxiv.org/abs/2507.04786v3",
    "supports": "系统分析NCCL内部协议、节点内/节点间数据移动与ring/tree实现，并用于构造trace驱动的ATLAHS仿真通信模式。",
    "limit": "该v3发表于2026修订，但原文明确分析NCCL 2.19.1；不能把它当当前2.32等版本所有算法/设备API的完整描述。"
  },
  {
    "id": "rd-paper-crux",
    "publisher": "ACM SIGCOMM 2024",
    "type": "paper",
    "date": "2024",
    "title": "Crux: GPU-Efficient Communication Scheduling for Deep Learning Training",
    "url": "https://doi.org/10.1145/3651890.3672239",
    "supports": "用GPU intensity衡量通信延后对计算利用率的影响，并据此选择路径、安排优先级及压缩有限优先级。",
    "limit": "不是更换RDMA重传算法，也不是优化单个GEMM；收益与多租户作业组合相关。"
  },
  {
    "id": "rd-lit-ue_spec10",
    "publisher": "Ultra Ethernet Consortium",
    "type": "official",
    "date": "1.0, historical baseline; superseded by later releases",
    "title": "Ultra Ethernet Specification v1.0",
    "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2025/06/UE-Specification-6.11.25.pdf",
    "supports": "按层和profile描述软件映射、SES/PDS/CMS职责及接口。",
    "limit": "不等于既有RoCE设备可直接无改动互通全部UET功能。"
  },
  {
    "id": "rd-lit-ue_spec11",
    "publisher": "Ultra Ethernet Consortium",
    "type": "official",
    "date": "1.1; current on official history page at review",
    "title": "Ultra Ethernet Specification v1.1",
    "url": "https://ultraethernet.org/wp-content/uploads/sites/20/2026/10/UE-Specification-1.1.pdf",
    "supports": "新增/扩展Unified Local、INC、CSIG和PCM等分层机制。",
    "limit": "不能把公开规范直接当成某厂商量产芯片功能表。"
  },
  {
    "id": "rd-lit-uec10_whitepaper",
    "publisher": "Intersect360 Research（Ultra Ethernet Consortium赞助）",
    "type": "report",
    "date": "UEC 1.0 sponsored white paper",
    "title": "UEC 1.0: New High-Performance Standard for Scaling HPC-AI",
    "url": "https://ultraethernet.org/uec-1-0-whitepaper",
    "supports": "用工作负载与标准生态解释UET、拥塞管理和软件层目标。",
    "limit": "不能用白皮书替代正式协议或客观性能对比。"
  },
  {
    "id": "rd-lit-nvswitch2018_overview",
    "publisher": "NVIDIA",
    "type": "report",
    "date": "First-generation NVSwitch / DGX-2 era",
    "title": "NVIDIA NVSwitch: The World’s Highest-Bandwidth On-Node Switch",
    "url": "https://images.nvidia.com/content/pdf/nvswitch-technical-overview.pdf",
    "supports": "多个18端口crossbar交换芯片并行组成基板及跨基板fabric。",
    "limit": "初代架构不能冒充NVLink6微架构。"
  },
  {
    "id": "rd-lit-nvshmem_memory_model",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "Official latest documentation, reviewed 2026-10-30; page has no explicit release number",
    "title": "NVSHMEM Memory Model, Data Consistency and API Ordering",
    "url": "https://docs.nvidia.com/nvshmem/api/latest/gen/mem-model.html",
    "supports": "对称heap、RMA/atomic及fence/quiet/等待同步组合。",
    "limit": "不是CPU式全局硬件缓存一致性，也不自动保证任意混合访问合法。"
  },
  {
    "id": "rd-lit-nccl_topology_acs",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "NCCL 2.32.3",
    "title": "NCCL GPU Troubleshooting — P2P, GPU-to-NIC, ACS and Topology Detection",
    "url": "https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/troubleshooting/gpu_troubleshooting.html",
    "supports": "联查CUDA peer能力、驱动、PCIe重定向与系统拓扑。",
    "limit": "不是建议在所有机器统一关闭ACS或IOMMU。"
  },
  {
    "id": "rd-lit-gpunetio_arch_design",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "DOCA 3.5.0",
    "title": "DOCA GPUNetIO — Architecture and Design",
    "url": "https://networking-docs.nvidia.com/doca/archive/3-5-0/gpunetio-architecture-and-design",
    "supports": "CPU创建并导出对象，GPUkernel通过专用接口控制网络或DMA。",
    "limit": "GDR可用不等于所有GDAKI接口都可用。"
  },
  {
    "id": "rd-lit-sharp315_collectives",
    "publisher": "NVIDIA",
    "type": "official",
    "date": "3.15.0",
    "title": "NVIDIA SHARP 3.15.0 — Collective Library and Platform Requirements",
    "url": "https://networking-docs.nvidia.com/sharpum/3150/nvidia-sharp-collective-library",
    "supports": "受支持collective经聚合树与网络内规约资源卸载。",
    "limit": "不支持把任意模型算子当交换机程序。"
  },
  {
    "id": "rd-lit-ibta_release21_public",
    "publisher": "InfiniBand Trade Association",
    "type": "official",
    "date": "Vol1/Vol2 Release 2.1 public overview",
    "title": "What’s New — InfiniBand Architecture Release 2.1, Volumes 1 and 2",
    "url": "https://infinibandta.org/wp-content/uploads/2026/08/Whats-New-in-Vol.-1-and-2-Release-2.1-2026-07-31.pdf",
    "supports": "Release2.1公开概览说明MRC、管理扩展与物理层变化。",
    "limit": "公开导读不能冒充完整Vol1/2规范审读。"
  }
];
for(const src of extraSources){if(!D.sources.some(s=>s.id===src.id))D.sources.push(src);if(!window.OBS_DATA.sources.some(s=>s.id===src.id))window.OBS_DATA.sources.push(src);}
D.catalog={
  "version": "0.6.0",
  "reviewed": "2026-10-30",
  "baseCount": 22,
  "addedCount": 68,
  "expectedTotal": 90,
  "sourceCount": 161,
  "topicNames": {
    "fundamentals": "语义与协议",
    "transport": "可靠传输与多路径",
    "congestion": "拥塞与流控",
    "nic": "RNIC / DPU 架构",
    "scale-up": "域内互连",
    "scale-out": "拓扑与扩展",
    "gpu": "GPU 内存与通信",
    "collectives": "Collective / 网络计算",
    "moe": "MoE 通信",
    "training": "训练系统",
    "serving": "推理 / KV 搬运",
    "operations": "隔离、诊断与故障",
    "security": "保护与安全"
  },
  "kinds": {
    "paper": "会议 / 期刊论文",
    "report": "技术报告 / 预印本",
    "standard": "规范 / 协议RFC",
    "overview": "标准公开概览",
    "docs": "官方技术文档",
    "code": "代码 / 工程说明"
  },
  "tracks": [
    {
      "id": "basics",
      "title": "从协议语义开始",
      "description": "分清工作、直接放置、完成和GPU可见性。",
      "ids": [
        "rfc5040",
        "rfc5041",
        "rfc5044",
        "guidelines",
        "gpudirect_rdma_ordering",
        "nccl_device_gin"
      ]
    },
    {
      "id": "congestion",
      "title": "从信号到发送控制",
      "description": "比较ECN、PFC、RTT与遥测反馈。",
      "ids": [
        "rfc3168",
        "dctcp",
        "dcqcn",
        "timely",
        "hpcc",
        "swift",
        "csig"
      ]
    },
    {
      "id": "reliable",
      "title": "有损、乱序与多路径",
      "description": "观察恢复状态、直接放置与端点代价。",
      "ids": [
        "irn",
        "srnic",
        "eunomia",
        "dcp2025",
        "conweave",
        "falcon"
      ]
    },
    {
      "id": "fabrics",
      "title": "从协作域到大网络",
      "description": "规范、端点和拓扑分别阅读。",
      "ids": [
        "ualink_200g_overview",
        "nvlink6_domain",
        "uec10_whitepaper",
        "ue_spec11",
        "ibta_release21_public",
        "rail_only"
      ]
    },
    {
      "id": "gpu",
      "title": "GPU怎样使用互连",
      "description": "先读内存顺序，再读软件接口与collective。",
      "ids": [
        "gpudirect_rdma_ordering",
        "nccl_device_gin",
        "nvshmem_memory_model",
        "sccl",
        "taccl",
        "mscclpp_paper"
      ]
    },
    {
      "id": "moe",
      "title": "MoE通信与重叠",
      "description": "从路由专家到GPU内的通信计算协同。",
      "ids": [
        "deepseek_v3",
        "megascale_moe",
        "deepep25_code",
        "flux",
        "comet",
        "flashmoe"
      ]
    },
    {
      "id": "serving",
      "title": "推理与KV搬运",
      "description": "区分RPC、P/D拆分、缓存池和不同负载。",
      "ids": [
        "erpc",
        "distserve",
        "splitwise",
        "mooncake",
        "byteexpress"
      ]
    },
    {
      "id": "operations",
      "title": "隔离、诊断与故障",
      "description": "关注共享RNIC和系统尾延迟。",
      "ids": [
        "pingmesh",
        "gray_failure",
        "collie",
        "justitia",
        "husky",
        "reverie",
        "rfc5042"
      ]
    }
  ],
  "addedIds": [
    "rfc5040",
    "rfc5041",
    "rfc5042",
    "rfc5044",
    "rfc7306",
    "rfc8166",
    "rfc8797",
    "rfc3168",
    "rfc8257",
    "rfc9293",
    "dctcp",
    "pfabric",
    "expresspass",
    "ndp",
    "homa",
    "swift",
    "eqds",
    "justitia",
    "husky",
    "harmonic",
    "reverie",
    "bolt",
    "conweave",
    "eunomia",
    "tagger",
    "falcon",
    "csig",
    "burst",
    "megascale2024",
    "hpn2024",
    "rail_only",
    "switchml",
    "sccl",
    "mscclang",
    "taccl",
    "mscclpp_paper",
    "flux",
    "comet",
    "heteccl",
    "syccl",
    "distserve",
    "mooncake",
    "splitwise",
    "flashmoe",
    "rails",
    "moe_resource2026",
    "demystifying_nccl",
    "crux",
    "ualink_200g_overview",
    "ualink_common20_public",
    "ue_spec10",
    "ue_spec11",
    "uec10_whitepaper",
    "nvswitch2018_overview",
    "nvlink6_domain",
    "nvlink6_resilience",
    "connectx9_manual",
    "bluefield3_dpa_arch",
    "gpudirect_rdma_ordering",
    "nccl_device_gin",
    "nvshmem_memory_model",
    "nccl_topology_acs",
    "gpunetio_arch_design",
    "sharp315_collectives",
    "ibta_release21_public",
    "roce_official_modes",
    "deepep25_code",
    "deepinfer_code"
  ],
  "counts": {
    "paper": 51,
    "report": 12,
    "standard": 11,
    "overview": 3,
    "docs": 11,
    "code": 2
  },
  "coverage": "按问题精选原始文献；关键内容/公开范围核对，不宣称穷尽所有研究或全文逐句审读。"
};
/* Release version is defined once in data.js. */
})();

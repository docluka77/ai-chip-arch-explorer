/* © 2026 DOCLUKA77. RDMA learning notebook; public sources and explicit assumptions. */
'use strict';
(() => {
  const sources=[
    {id:'rd-article',publisher:'芯东西 / 陈骏达',type:'report',date:'2026-10-30',title:'前字节大牛做AI网络芯片，融资数亿元',url:'https://mp.weixin.qq.com/s/Lp5iOQAm0XHGGXHz_XPAoQ',supports:'用户指定的研究入口：郭传雄、比特智路、400GE FPGA网卡与在研800GE TCU。',limit:'融资/客户/性能为报道披露，未获得产品白皮书、公开微架构及可复现实测；不将其等同于SRNIC。'},
    {id:'rd-founder',publisher:'Chuanxiong Guo',type:'official',date:'reviewed 2026-10-30',title:'郭传雄个人主页与研究方向',url:'https://sysnetome.com/',supports:'曾在微软与ByteDance从事数据中心网络、ML系统与硬件加速研究。',limit:'个人研究经历不是任何新产品实现的证据；新闻和主页的任职起始年不同，本页不补定年份。'},
    {id:'rd-bibliography',publisher:'Chuanxiong Guo',type:'official',date:'reviewed 2026-10-30',title:'郭传雄 Selected Publications',url:'https://sysnetome.com/publication.html',supports:'追踪本人参与的数据中心网络与RDMA论文。',limit:'作者与年份仍逐篇对照会议原文，不把领域其他人的成果归给他。'},
    {id:'rd-company',publisher:'比特智路',type:'official',date:'reviewed 2026-10-30',title:'比特智路官方网站',url:'https://bitintelligence.net/',supports:'公司官方身份入口。',limit:'已查阅公开首页与about路由；未核实到400GE/800GE产品规格、内部框图或测试报告。'},
    {id:'rd-srnic',publisher:'USENIX / NSDI',type:'paper',date:'2023',title:'SRNIC: A Scalable Architecture for RDMA NICs',url:'https://www.usenix.org/conference/nsdi23/presentation/wang-zilong',supports:'公开FPGA研究原型：无WQE cache调度、in-place placement、host bitmap与选择重传。郭传雄为共同作者。',limit:'100GE/PCIe Gen3×16研究条件；大网络为ns-3模拟，不能推断比特智路400GE/800GE产品。'},
    {id:'rd-post',publisher:'linux-rdma / rdma-core',type:'code',date:'reviewed 2026-10-30',title:'ibv_post_send：提交work request、opcode与signaled completion',url:'https://github.com/linux-rdma/rdma-core/blob/master/libibverbs/man/ibv_post_send.3',supports:'WR提交、RDMA READ/WRITE/SEND、local buffer与completion约定。',limit:'本页使用RC WRITE教学路径，provider/WQE/doorbell实现细节不是通用API保证。'},
    {id:'rd-mr',publisher:'linux-rdma / rdma-core',type:'code',date:'reviewed 2026-10-30',title:'ibv_reg_mr：注册内存与访问权限',url:'https://github.com/linux-rdma/rdma-core/blob/master/libibverbs/man/ibv_reg_mr.3',supports:'MR、lkey/rkey和访问权限，数据放置的受保护边界。',limit:'rkey不是加密，也不是允许绕过任意内存权限。GPU内存注册还需要对应驱动与拓扑。'},
    {id:'rd-cq',publisher:'linux-rdma / rdma-core',type:'code',date:'reviewed 2026-10-30',title:'ibv_poll_cq：完成队列与work completion',url:'https://github.com/linux-rdma/rdma-core/blob/master/libibverbs/man/ibv_poll_cq.3',supports:'CQ轮询、完成状态与错误信息。',limit:'local CQE不等于remote应用已处理数据，更不等于remote GPU kernel执行完。'},
    {id:'rd-guide',publisher:'NVIDIA Networking',type:'official',date:'DOCA 3.5.0 archive / 2026',title:'RDMA Aware Networks Programming Guide',url:'https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-aware-networks-programming-guide',supports:'QP/SQ/RQ、MR、保护域、work requests与completions。',limit:'通用编程语义不公开每款RNIC的物理流水线或片上存储容量。'},
    {id:'rd-iwarp',publisher:'IETF / RFC Editor',type:'official',date:'RFC 5040 / 2007',title:'A Remote Direct Memory Access Protocol Specification',url:'https://www.rfc-editor.org/rfc/rfc5040.html',supports:'RDMAP在DDP之上提供远端读写/消息语义，可实现直接放置和kernel bypass。',limit:'iWARP协议族不是RoCEv2，也不能用RoCE字段解释所有RDMA。'},
    {id:'rd-mpa',publisher:'IETF / RFC Editor',type:'official',date:'RFC 5044 / 2007',title:'Marker PDU Aligned Framing for TCP Specification',url:'https://www.rfc-editor.org/rfc/rfc5044.html',supports:'iWARP的MPA/TCP分层：RDMA能力与TCP/IP并不互斥。',limit:'标准协议分层不是某款产品的兼容性测试。'}
  ];
  const steps=[
    {name:'建立可访问的内存',short:'MR / QP',node:'mr',path:'setup',text:'先配置保护域、QP和MR，按授权交换远端地址与rkey。内存注册与连接通常被复用；不是每次WRITE都重新注册一遍。',code:0,refs:['rd-mr','rd-guide']},
    {name:'Python提出通信任务',short:'框架',node:'host',path:'host',text:'训练/推理框架提出要交换的tensor分片。NCCL/DeepEP等库决定后端；Python collective名称本身不证明已经选择RDMA或GPUDirect。下方verbs片段只解释底层语义。',code:1,refs:['op-torch','op-nccl-overview']},
    {name:'提交WR / 形成WQE',short:'WR / SQ',node:'queue',path:'queue',text:'选择RC RDMA WRITE：本地SGE描述源地址、长度和lkey，远端字段给出已授权地址和rkey。provider提交到发送队列；一个请求可以拆成多个包。',code:2,refs:['rd-post']},
    {name:'Doorbell唤醒设备',short:'Doorbell',node:'scheduler',path:'doorbell',text:'驱动/provider用设备约定通知RNIC有新工作。RNIC调度可运行的发送队列，读取上下文、credit与WQE；具体doorbell格式取决于实现。',code:2,refs:['rd-srnic','rd-guide']},
    {name:'DMA读取payload',short:'DMA',node:'dma',path:'dma',text:'NIC通过支持的DMA路径读取源buffer。本例选择满足条件的GPU内存直接访问，payload不绕host DRAM；CPU初始化、页映射和同步仍然存在。',code:3,refs:['op-gdr','rd-mr']},
    {name:'传输引擎与分包',short:'传输 / PSN',node:'transport',path:'transport',text:'传输层组织请求、序列、确认与重传状态；RoCEv2选择UDP/IP封装。可靠性由RDMA传输实现，不能把它当成普通UDP应用的丢包语义。',code:3,refs:['op-roce','rd-guide']},
    {name:'经过交换机与队列',short:'网络',node:'switch',path:'wire',text:'线上仍消耗链路时间、传播和交换资源。拥塞会排队；ECN用于显式反馈，PFC按优先级暂停链路流量，二者不等价。每跳都要花费的开销不会因CPU旁路而消失。',code:3,refs:['rd-srnic']},
    {name:'接收端校验与定位',short:'保护 / 放置',node:'placement',path:'receive',text:'远端RNIC检查请求类型、内存授权和目标范围，将payload定位到目的buffer。普通WRITE不需要remote应用为每次写入预贴一个RECV；SEND的接收语义不同。',code:3,refs:['rd-mr','rd-post']},
    {name:'有缺口时，恢复与重排',short:'丢包 / 乱序',node:'recovery',path:'recover',text:'包乱序和包丢失是不同事件。必须知道哪些已收到、哪些尚缺、怎样重传，以及何时可以完成。下一节用论文机制展开，不能只画一个“支持有损”方块。',code:3,refs:['rd-srnic']},
    {name:'DMA写入目标内存',short:'目标 DMA',node:'gpu',path:'write',text:'数据通过目标设备的有效DMA路径写入GPU/应用buffer。直接放置减少中间拷贝；仍需要内存带宽、PCIe/平台资源和正确的buffer生命周期。',code:3,refs:['op-gdr','rd-guide']},
    {name:'处理完成，不混淆两端语义',short:'ACK / CQE',node:'cq',path:'ack',text:'在对应signaled请求成功完成时，发送端可以获得local CQE。普通WRITE不会因此自动给remote应用一个RECV CQE；需要通知时另设协议。local完成也不表示remote GPU已经计算。',code:4,refs:['rd-post','rd-cq']},
    {name:'建立GPU消费依赖，再进入算子',short:'GPU 消费',node:'gpu',path:'consume',text:'通信库按其约定建立stream、signal、flush或同步依赖，之后才消费接收buffer。这里接回02的本地专家GEMM：先把数据送到，再讨论SM怎样计算。',code:5,refs:['op-gdr','op-mlp']}
  ];
  const modules={
    host:{title:'软件控制 / CPU与框架',body:'选择参与者、buffer和通信语义，建立连接及内存授权。payload走直接DMA不表示CPU从系统中消失。',detail:['torch.distributed描述collective；NCCL/DeepEP是软件实现，不是线缆或单一协议。','批处理、排队和算子融合影响应用端到端延迟，不能仅看网卡带宽。'],refs:['rd-guide','op-nccl-overview']},
    mr:{title:'MR / 地址转换与保护',body:'把允许设备访问的内存区域和权限与键关联。',detail:['lkey用于本地SGE校验，rkey用于远端访问授权；有效地址/长度必须在允许范围内。','内存注册和映射可摊销；host DRAM与GPU memory需要各自受支持的注册路径。','不同RNIC可能有MTT/MPT/TLB等实现，名称、容量与缓存层次不可凭通用图推断。'],refs:['rd-mr','op-gdr']},
    queue:{title:'QP / SQ / RQ / WQE',body:'软件提交工作；设备依据队列和上下文执行。',detail:['QP通常包含send/receive队列，SQ中WQE不是payload本身。SEND需要匹配receive语义，普通单边WRITE不同。','本图选择非inline buffer。小payload还可能用inline/push机制，长度与支持条件依provider和设备，不能把所有WR都画成同一套DMA。','QP多时，片上上下文和WQE缓存可能成为瓶颈；队列数量不是唯一可扩展性指标。','SRNIC改变了SQ取数/调度设计，但仍保留其他片上状态。'],refs:['rd-post','rd-guide','rd-srnic']},
    scheduler:{title:'SRNIC：cache-free SQ scheduler',body:'去掉的是WQE cache，不是所有片上cache。',detail:['EMUX依据doorbell、credit、dequeue事件维护active / credit / ready；round-robin选择可运行SQ。','论文设计可批量取最多8个WQE与受credit限制的payload；暂未使用的WQE可能丢弃后重新DMA读取。','换来片上资源扩展性，也增加重取与调度权衡；QPC和MTT cache仍存在。'],refs:['rd-srnic']},
    dma:{title:'DMA / PCIe / 平台路径',body:'搬运数据而非执行模型矩阵乘加。',detail:['GPUDirect RDMA需要支持的GPU、NIC、驱动和平台拓扑；没有保证任意GPU-NIC组合都能直达。','有效速率受整个路径最窄资源约束。两端DMA与网络可流水，不能把所有峰值带宽直接相加。'],refs:['op-gdr','rd-guide']},
    transport:{title:'可靠传输 / 拥塞 / 分包',body:'“送到正确内存”和“什么时候允许发包”是不同职责。',detail:['可靠传输处理序号、ACK和重传；拥塞控制决定发送速率或窗口。','ECN是反馈信号，DCQCN是利用反馈的控制方案；PFC是链路反压，不等于拥塞控制。','RoCEv2使用UDP/IP；iWARP可运行在TCP之上；原生InfiniBand又是另一套分层。'],refs:['rd-guide','rd-iwarp','rd-mpa','op-roce']},
    switch:{title:'交换机 / 缓冲 / ECN与PFC',body:'拥塞发生在共享资源处，端侧卸载不会自动移除它。',detail:['PFC按优先级暂停，可传播反压并影响无关流；不提供整网永不丢包的数学保证。','ECN标记与端侧调速共同作用；若链路、buffer、ECN阈值和拥塞控制不匹配，尾延迟仍会恶化。','交换机做collective reduction需要具体能力与软件支持，不是所有以太网交换机都有。'],refs:['rd-srnic','rd-guide']},
    placement:{title:'SRNIC：in-place乱序放置',body:'让已到的payload进入最终用户buffer，用元数据记录缺口。',detail:['论文扩展包头，带目标位置/消息偏移等信息，并让响应回显请求信息，以减少片上outstanding-request状态。','这是论文协议设计的前提，不能说标准RoCEv2网卡只换软件就获得相同能力。','可乱序放置不等于应用可以乱序看到完成；内存授权、缺口恢复和完成依赖依然需要保证。'],refs:['rd-srnic','rd-mr']},
    recovery:{title:'SRNIC：host bitmap / CtrlQ / RetryQ',body:'快路径尽量留在硬件，乱序恢复的元数据慢路径交给host。',detail:['通过CtrlQ把乱序元数据交给host-resident bitmap；软件识别缺口，再向RetryQ提交重传工作。','memory-free指减少NIC片上恢复状态，不是没有内存，也不是恢复完全不占CPU。','软件expected PSN还需追上硬件记录的连续范围，才能安全退出恢复。低丢包/多数顺序流量是其性能前提。'],refs:['rd-srnic']},
    cq:{title:'完成队列 / 应用可消费状态',body:'区分请求成功、buffer可复用、远端可见与算子完成。',detail:['signaled work请求可产生local work completion；错误状态也需检查。','普通RDMA WRITE不自动通知remote应用。WRITE with immediate、SEND或额外signal等具有各自条件。','到GPU memory的网络完成不能代替通信库规定的CUDA消费依赖。'],refs:['rd-post','rd-cq','op-gdr']},
    gpu:{title:'目标GPU buffer / CUDA消费',body:'网络只完成一次交付链中的一段，模型还要继续计算。',detail:['GPU接收buffer、NIC DMA和CUDA kernel之间的可见性/顺序依赖必须由受支持API建立。','Expert Parallel接收token后进入本地专家算子，计算结束再返回；combine不是AllReduce的别名。'],refs:['op-gdr','op-mlp','op-deepep']},
    fabric:{title:'Scale-up fabric / 语义与实现',body:'域内互连不等于某一条固定协议栈。',detail:['NVLink、UALink与Ethernet-based scale-up规范有各自接口与内存/collective语义，不应套用一个通用RoCEv2 NIC解释全部机制。','支持load/store/atomic还要核对ordering与coherency；不能仅凭动词相同就宣称CPU式硬件缓存一致。','UE 1.1与UALink Common 2.0是版本化标准；产品是否实现、支持哪些profile要分别查验。'],refs:['rd-scale-nvlink','rd-scale-ualink-2','rd-scale-uec-1.1']}
  };
  function lossTrace(algorithm,step,scenario='loss'){
    step=Math.max(0,Math.min(10,Math.trunc(step)));
    const initialSent=Math.min(8,step),received=Array(8).fill(false);
    const order=scenario==='reorder'?[0,1,3,4,2,5,6,7]:[0,1,2,3,4,5,6,7];
    let expected=0;
    for(let i=0;i<initialSent;i++){const p=order[i];if(scenario==='loss'&&p===2)continue;if(algorithm==='gbn'&&p!==expected)continue;received[p]=true;while(expected<8&&received[expected])expected++;}
    const replay=step>=9?received.flatMap((ok,i)=>ok?[]:[i]):[];
    if(step>=9)replay.forEach(p=>received[p]=true);
    let next=0;while(next<8&&received[next])next++;
    return {received,next,initialSent,replay,wirePackets:initialSent+replay.length,complete:step>=10&&received.every(Boolean),payloadBytes:1024,order,scenario};
  }
  function calculate(c){
    const size=Number(c.size),gbps=Number(c.gbps),eff=Number(c.eff),pcie=Number(c.pcie),host=Number(c.host),endpoint=Number(c.endpoint),hops=Number(c.hops),hop=Number(c.hop),queue=Number(c.queue),reg=Number(c.reg),reuse=Number(c.reuse);
    if([size,gbps,eff,pcie,host,reuse].some(v=>!Number.isFinite(v)||v<=0)||eff>1||[endpoint,hops,hop,queue,reg].some(v=>!Number.isFinite(v)||v<0))return null;
    if(!Number.isInteger(size)||!Number.isInteger(hops)||!Number.isInteger(reuse))return null;
    const network=size*8/(gbps*1000*eff),pcieOne=size/(pcie*1000),hostOne=c.path==='host'?2*size/(host*1000):0;
    const fixed=endpoint+hops*hop+queue,bottleneck=Math.max(network,pcieOne,hostOne),pipeline=fixed+bottleneck,serial=fixed+network+2*pcieOne+2*hostOne;
    const label=bottleneck===network?'网络payload速率':bottleneck===pcieOne?'GPU–NIC路径上限':'host staging内存流量';
    return {network,pcieOne,hostOne,fixed,bottleneck,pipeline,serial,first:pipeline+reg,average:pipeline+reg/reuse,registrationShare:reg/reuse,label,lineGBs:gbps/8,effectiveGBs:gbps/8*eff,payloadBytes:size};
  }
  window.OBS_RDMA_DATA={reviewed:'2026-10-30',sources,steps,modules,lossTrace,calculate,papers:[],scaleSources:[],srnicPdf:'https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf'};
  for(const s of sources)if(!window.OBS_DATA.sources.some(v=>v.id===s.id))window.OBS_DATA.sources.push(s);
})();

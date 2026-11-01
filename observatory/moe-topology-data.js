/* © 2026 DOCLUKA77. Selected-token model; synthetic values, source-backed roles. */
'use strict';
(() => {
  const ep='https://github.com/deepseek-ai/DeepEP/blob/f6aa38fe06cd4a0489e7730365d4e0114970a2f3/';
  const v3='https://github.com/deepseek-ai/DeepSeek-V3/blob/9b4e9788e4a3a731f7567338ed15d3ec549ce03b/';
  const sources={
    paper:{title:'V3 技术报告 · §3.2.2 / 跨节点 all-to-all',url:'https://arxiv.org/html/2412.19437v2#S3.SS2.SSS2',scope:'相同节点内序号的GPU中转、IB→NVLink分发，以及反向分层累加。历史训练系统，不能作为V2.5逐行实现说明。'},
    config:{title:'V3 固定配置 · dim / top-8 / route_scale',url:v3+'inference/configs/config_671B.json',scope:'7168维、256 routed experts、top-8、1 shared expert、route_scale=2.5。'},
    gate:{title:'V3 reference model · Gate / MoE',url:v3+'inference/model.py#L560-L693',scope:'sigmoid分数归一化后再乘route_scale。此reference实现不能冒称直接调用DeepEP。'},
    dispatch:{title:'DeepEP V2.5 · 跨域去重 L390–451',url:ep+'deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L390-L451',scope:'按目标scale-out rank去重后提交gin.put；同域可bypass。'},
    forward:{title:'DeepEP V2.5 · 域内转发 L551–625',url:ep+'deep_ep/include/deep_ep/impls/ep/hybrid_dispatch.cuh#L551-L625',scope:'按scale-up rank去重、通过LSA/TMA转发，保留source与目标slots用于回程。'},
    combine:{title:'DeepEP V2.5 · 分层归约 L454–565',url:ep+'deep_ep/include/deep_ep/impls/ep/hybrid_combine.cuh#L454-L565',scope:'选择allow_multiple_reduction=True的层次预归约路径；不代表每一种combine策略。'},
    api:{title:'DeepEP V2.5 · EPBuffer 配置 L210–279',url:ep+'deep_ep/buffers/ep.py#L210-L279',scope:'hybrid / direct与allow_multiple_reduction配置，必须区分不同模式。'},
    wait:{title:'DeepEP V2.5 · dispatch / 事件 L562–637',url:ep+'deep_ep/buffers/ep.py#L562-L637',scope:'输入布局、handle与异步消费契约；combine接口另见同文件L770–811。'},
    example:{title:'DeepEP V2.5 · expanded layout 示例',url:ep+'README.md#example-use-in-model-training-and-inference',scope:'expanded专家计算先应用路由权重；combine纯求和。不能在combine再次乘权。'},
    ordering:{title:'GPUDirect RDMA · 同步与可见性',url:'https://docs.nvidia.com/cuda/gpudirect-rdma/#synchronization-and-memory-ordering',scope:'源端completion、远端放置与GPU消费不是同一事件。'}
  };
  const profiles={
    v4:{id:'v4',name:'DeepSeek-V4.1 Flash',hidden:5120,intermediate:2304,experts:384,topK:6,scale:1.5,epRanks:16,perGPU:24,nodes:2,boundary:'基于V4.1公开配置与DeepInfer/DeepEP hybrid分解源码；本图的两节点EP16（每卡静态24专家）是显式教学假设，不是作者跨域实测。V4.1公开推理性能曲线均在单个scale-up域内测得。'},
    v3:{id:'v3',name:'DeepSeek-V3 对照',hidden:7168,intermediate:2048,experts:256,topK:8,scale:2.5,epRanks:64,perGPU:4,nodes:8,boundary:'V3技术报告采用EP64（8节点×8卡，每卡4个routed专家）；本图仅展开本次命中的A/B两个节点，其余6节点未选中、未展开。专家编号与路由权重为教学映射。'}
  };
  const di='https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/';
  Object.assign(sources,{
    v4paper:{title:'V4.1技术报告 · 模型与系统背景',url:'https://arxiv.org/html/2609.19969v1',scope:'模型和推理系统背景；不提供本页EP16跨域教学拓扑的单层实测。精确维度以固定配置、通信行为以固定源码为据。'},
    v4config:{title:'V4.1固定配置 · 5120 / 384 / top-6',url:'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/314113f8a7dadb388215396ba5fbee2c610a04d6/config.json#L22-L58',scope:'已核对固定配置：I=2304、shared=1、routing scale=1.5、clamp=10；没有沿用V3最多4组限制。'},
    v4route:{title:'V4路由 / 专家计算 · 固定DeepInfer',url:di+'deepinfer/model_executor/models/v4_modules/mlp.py#L347-L459',scope:'人为负载偏斜profile开关、真实路由返回idx/weights、grouped GEMM及权重/clamp/cast。'},
    v4fallback:{title:'V4分解路径与MegaMoE边界',url:di+'deepinfer/model_executor/models/v4_modules/mlp.py#L565-L616',scope:'公开分解路径与异步dispatch/combine；MegaMoE另须处在NVLink domain，不能把跨域教学估算称为实测。'},
    v4sm:{title:'V4 EPBuffer hybrid与SM预算',url:di+'deepinfer/model_executor/parallel_utils/userbuffer.py#L63-L91',scope:'允许hybrid，通信占SM；本实验用显式算力预留假设近似竞争，没有复现动态调度。'},
    v4bench:{title:'V4作者推理曲线 · scale-up域内',url:di+'README.md#performance-benchmarks',scope:'prefill 4×SM100、decode 64×SM100，各自处在一个scale-up域；不是跨节点单层MoE延迟测量。'}
  });
  const presets={
    mixed:{label:'本地 + 远端',experts:[0,8,20,28,36,44,52,60],note:'4个本地专家、4个远端专家；远端B0只做本次转发，没有选中专家。'},
    local:{label:'全部域内',experts:[0,4,8,12,16,20,24,28],note:'8个专家都在A节点，仍可能有NVLink通信；本token无需RDMA。'},
    remote:{label:'全部在远端',experts:[32,36,40,44,48,52,56,60],note:'8个专家在B节点，dispatch跨RDMA仍只需1份逻辑向量，再在B域分发。'},
    packed:{label:'同卡多个专家',experts:[0,1,8,9,44,45,46,47],note:'B3接收一份向量供4个专家使用；专家条目数、GPU数、RDMA份数不同。'}
  };
  const v4presets={
    mixed:{label:'本地 + 远端',experts:[0,48,120,216,264,360],note:'3个本地与3个远端专家；B0无本次目标专家，但承担跨域中转。'},
    local:{label:'全部域内',experts:[0,24,48,96,144,168],note:'6个目标均在A域，无需本token的RDMA分支。'},
    remote:{label:'全部在远端',experts:[192,216,240,288,336,360],note:'6个目标在B域，先到B0再按目标GPU去重分发。'},
    packed:{label:'同卡多个专家',experts:[0,1,264,265,266,267],note:'A0有2个目标专家，B3有4个；多个专家共用送到该GPU的一份输入。'}
  };
  const presetsFor=profile=>profile==='v3'?presets:v4presets;
  const unique=a=>[...new Set(a)];
  function fromExperts(experts,dtype='fp8',profile='v4',scenario='mixed'){
    const p=profiles[profile]||profiles.v4,props=profile==='v3'?[.20,.16,.14,.12,.11,.10,.09,.08]:[.26,.22,.18,.14,.11,.09];
    const weights=props.map(x=>x*p.scale),rows=experts.map((e,i)=>({expert:e,rank:Math.floor(e/p.perGPU),node:Math.floor(e/p.perGPU)<8?'a':'b',localRank:Math.floor(e/p.perGPU)%8,weight:weights[i],value:[e%7+1,e%5-2],weighted:[(e%7+1)*weights[i],(e%5-2)*weights[i]]}));
    const local=rows.filter(r=>r.node==='a'),remote=rows.filter(r=>r.node==='b'),localRanks=unique(local.map(r=>r.localRank)),remoteRanks=unique(remote.map(r=>r.localRank));
    const sum=a=>a.reduce((out,r)=>out.map((v,k)=>v+r.weighted[k]),[0,0]),localSum=sum(local),remoteSum=sum(remote),routed=sum(rows),shared=[.5,-.5];
    return {profile:p.id,profileData:p,scenario,dtype:dtype==='bf16'?'bf16':'fp8',rows,local,remote,localRanks,remoteRanks,localSum,remoteSum,routed,shared,total:routed.map((v,k)=>v+shared[k]),dispatchBytes:p.hidden*(dtype==='bf16'?2:1),combineBytes:p.hidden*2,rdmaCopies:remote.length?1:0,naiveExpertCopies:remote.length,nvCopies:localRanks.filter(i=>i!==0).length+remoteRanks.filter(i=>i!==0).length,weightSum:weights.reduce((a,b)=>a+b,0)};
  }
  function model(scenario='mixed',dtype='fp8',profile='v4'){const choices=presetsFor(profile),name=choices[scenario]?scenario:'mixed';return fromExperts(choices[name].experts,dtype,profile,name);}
  const steps=[
    {short:'路由',phase:'ROUTE',title:'一个 token，选择八个 routed experts。',body:'V3的门控网络为当前token选出目标routed专家与对应权重。这里固定一组代表性选择，观察它如何映射到各GPU与节点；shared expert作为独立的本地常驻分支在最后合并。',state:'激活仍在源端A0。选中8个专家只产生8条指派关系，不等于立即向网络发出8份向量副本。',refs:['config','gate'],code:'weights, topk_idx = gate(x)\n# 示例权重 = 人为归一化比例 × 2.5'},
    {short:'布局 / 去重',phase:'DISPATCH',title:'先按通信目的地去重，再在目标端展开专家行。',body:'同一token发往同一个远端节点（scale-out域）只需传输1份逻辑向量；到达远端后再按目标GPU（scale-up rank）去重分发。同一张GPU上若命中多个专家，可共同读取这一份收到的激活。',state:'节点、GPU rank与expert是三层不同粒度。路由元数据、FP8 scale、对齐与padding开销另计。',refs:['dispatch','api'],code:'dispatch(x, topk_idx, topk_weights, ...)\n# scale-out 节点去重 → scale-up GPU去重'},
    {short:'域内分发',phase:'NVLINK',title:'本节点的命中专家，先沿域内 NVLink 获得输入。',body:'A0直接保留自己命中专家所需的激活；A域内其他命中GPU通过NVLink协作域接收各自的一份去重向量。该域内分支与跨节点RDMA分支相互独立，在流水线中可以并行重叠。',state:'图中仅高亮本次被t0命中的本地目标GPU；未命中的同域GPU不消耗本次t0的有效载荷带宽。',refs:['forward','paper'],code:'A0 → NVLink domain A → local target GPUs'},
    {short:'RDMA 发出',phase:'SCALE-OUT',title:'跨节点只需发送一份激活，先抵达远端同序号中转卡 B0。',body:'源GPU A0经GPU–NIC直通路径提交RDMA发送，网络把去重后的单份激活送到目标节点相同local-index的中转卡B0。跨节点RDMA直达B0，不需要先绕行源端NVLink交换结构。',state:'本例只有B节点一个远端目标域，因此跨RDMA仅发1份逻辑向量。连线代表因果数据流，非底层物理包序。',refs:['paper','dispatch','ordering'],code:'A0 → RNIC A0 → RDMA / IB fabric\n                  → RNIC B0 → B0'},
    {short:'远端扇出',phase:'NVLINK',title:'B0 接收一次跨域数据，再经域内 NVLink 扇出给目标 GPU。',body:'B0承担远端节点的跨域入口中转：即便B0自身没有被t0选中任何专家，跨域激活也先落地B0，再通过B域NVLink按目标GPU去重转发。同卡命中多个专家时，在目标GPU本地展开为多条专家输入行。',state:'“已抵达远端入口B0”与“已扇出至远端各专家GPU”是两个先后阶段，受B域NVLink带宽与启动开销约束。',refs:['forward','paper'],code:'B0 → NVLink domain B → remote expert GPUs'},
    {short:'消费依赖',phase:'DEPENDENCY',title:'等待通信完成与显存可见性契约成立，计算流再开始消费。',body:'异步dispatch必须把远端数据落地、通信事件通知与GPU计算流等待正确衔接。源端网卡收到local CQE仅代表发送侧完成，不证明远端专家kernel已能安全读取数据；必须通过stream wait建立跨流因果依赖。',state:'本步强调异步通信与计算流之间的内存序边界，不模拟特定网卡型号的底层ACK或PCIe刷新状态机。',refs:['wait','ordering'],code:'dispatch_event.current_stream_wait()\n# 具体事件API见固定版本示例'},
    {short:'专家计算',phase:'EXPERT',title:'输入就绪后，各命中 GPU 并行执行本地专家的矩阵乘。',body:'每个被命中的专家在所属GPU上执行gate、up与down三个投影矩阵乘（SwiGLU MLP）。本页右侧用人为二维向量做可手算的数值切面；真实隐藏维是7168，切勿把二维教学向量当成硬件PE阵列尺寸。',state:'专家权重参数常驻各GPU显存（HBM）；MoE通信搬运的是token激活与输出，绝不是每次推理搬运专家权重。',refs:['config','example'],code:'expert_out = grouped_expert_mlp(recv_x, ...)\n# 本页二维数值是假设输出，未运行模型'},
    {short:'应用权重',phase:'WEIGHT',title:'在专家输出侧一次性乘上路由权重，后续 combine 仅做纯求和。',body:'对应expanded布局约定：每个专家输出在进入combine前已乘好门控权重w_e，后续跨卡与跨节点归约只做加法，严禁在combine阶段二次乘权。V3门控含route_scale因子，有效权重之和不必等于1。',state:'单专家加权贡献 Z_e = w_e × F_e(x)。本例有效权重和为2.5；人为示例系数用于验证线性可加性，非模型实测输出。',refs:['example','gate','combine'],code:'weighted_expert_out = weights * expert_out\n# combine 输入已经加权'},
    {short:'远端预归约',phase:'COMBINE / NVLINK',title:'跨节点返回前，先在 B 域内把各卡贡献预归约到中转卡 B0。',body:'启用allow_multiple_reduction=True的层次化hybrid路径：B域各命中GPU的加权专家输出先经域内NVLink汇总到B0，由GPU通信内核累加为该token在B节点的单一节点部分和z_B，从而把跨节点回传压缩为1份向量。',state:'节点内预归约大幅减少了跨节点RDMA返回份数；累加由GPU通信kernel执行，并非NVLink交换机自动完成任意浮点加法。',refs:['combine','api','paper'],code:'z_B = Σ weighted_expert_out_on_B\n# allow_multiple_reduction=True'},
    {short:'RDMA 返回',phase:'COMBINE / SCALE-OUT',title:'将 B 节点预归约后的单份部分和 z_B，经 RDMA 传回源端 A0。',body:'反向RDMA把B节点合成的部分和z_B从B0传回源节点A0。注意dispatch与combine的逻辑精度可以不同：即使dispatch采用FP8（1B/元素），combine为保持累加精度通常采用BF16（2B/元素），单份返回载荷翻倍。',state:'只要t0在B域命中至少1个专家，开启预归约后跨RDMA就只返回1份BF16节点部分和，而非按远端专家数逐个回传。',refs:['combine','paper'],code:'B0 → RNIC B0 → RDMA / IB fabric\n                  → RNIC A0 → A0'},
    {short:'汇总本地',phase:'COMBINE / NVLINK',title:'A 域本地专家贡献与远端部分和 z_B，在源端 A0 汇合相加。',body:'A域内其他命中GPU将各自的加权专家输出经NVLink传回A0，与A0本地专家输出及远端传回的z_B一同累加，得到完整的routed专家分支输出。combine依靠dispatch生成的handle精确还原各token槽位。',state:'数学恒等关系：routed = z_A + z_B。真实流水线中多个chunk可交错执行，此处按单token因果顺序展开以便逐项核对。',refs:['combine','api','example'],code:'routed_out = combine(weighted_expert_out, handle, ...)\n# 本地与远端贡献各算一次'},
    {short:'输出',phase:'OUTPUT',title:'合并 shared expert 与 routed 分支，完成当前 MoE 层数据路径。',body:'将常驻本地的shared expert输出与跨卡归约得到的routed输出相加，形成当前MoE层的分支结果，随后交由残差连接与下一层继续处理。本页将shared分支画在A0仅为单token公式切面对齐。',state:'至此走完t0在单层MoE中的完整因果闭环（12步教学数据路径），所有载荷份数与二维加权和均可与下方台账逐项验算。',refs:['gate','config','example'],code:'moe_branch = shared_out + routed_out\n# 下一步遵守消费依赖；残差等另行处理'}
  ];
  function stepsFor(profile='v4'){
    if(profile==='v3')return steps;
    const a=steps.map(t=>({...t,refs:t.refs.filter(x=>x!=='paper').map(x=>x==='config'?'v4config':x==='gate'?'v4route':x),body:t.body.replaceAll('V3','V4.1').replaceAll('八个','六个').replaceAll('7168','5120'),state:t.state.replaceAll('8个','6个').replaceAll('2.5','1.5')}));
    a[0]={...a[0],title:'一个token，选择六个routed experts。',state:'激活仍在源端A0。选中6个专家只产生6条指派关系，不等于立即向网络发送6份向量副本。',code:'# V4 wrapper得到expert_ids与weights；不在浏览器执行gate\n# 人为系数归一化后乘1.5',refs:['v4config','v4route']};
    a[3]={...a[3],body:'用DeepEP hybrid分解路径解释V4.1跨域教学假设：源端A0经GPU–NIC直通路径，把去重后的单份激活送到远端同序号中转卡B0，再由B0在域内转发。切勿将此两域EP16教学假设冒充为公开的V4生产实测。',refs:['v4fallback','dispatch','ordering']};
    a[7]={...a[7],body:'V4.1固定分解路径在SwiGLU/clamp/cast阶段已一次性乘上有效路由权重，后续combine仅做纯求和，不再二次乘权。V4.1配置routing scale为1.5；本页人为系数用于手算核对，非真实router输出。',refs:['v4route','example']};
    a[11]={...a[11],refs:['v4route','v4config','v4fallback']};return a;
  }
  window.OBS_MOE_DATA={sources,profiles,presets,presetsFor,steps,stepsFor,fromExperts,model,hidden:7168,expertCount:256,topK:8,epRanks:64,reviewed:'2026-10-31'};
})();

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
  const presets={
    mixed:{label:'本地 + 远端',experts:[0,8,20,28,36,44,52,60],note:'4个本地专家、4个远端专家；远端B0只做本次转发，没有选中专家。'},
    local:{label:'全部域内',experts:[0,4,8,12,16,20,24,28],note:'8个专家都在A节点，仍可能有NVLink通信；本token无需RDMA。'},
    remote:{label:'全部在远端',experts:[32,36,40,44,48,52,56,60],note:'8个专家在B节点，dispatch跨RDMA仍只需1份逻辑向量，再在B域分发。'},
    packed:{label:'同卡多个专家',experts:[0,1,8,9,44,45,46,47],note:'B3接收一份向量供4个专家使用；专家条目数、GPU数、RDMA份数不同。'}
  };
  const proportions=[.20,.16,.14,.12,.11,.10,.09,.08],weights=proportions.map(x=>x*2.5);
  const unique=a=>[...new Set(a)];
  function model(scenario='mixed',dtype='fp8'){
    const p=presets[scenario]||presets.mixed;
    const rows=p.experts.map((e,i)=>({expert:e,rank:Math.floor(e/4),node:e<32?'a':'b',localRank:Math.floor(e/4)%8,weight:weights[i],value:[e%7+1,e%5-2],weighted:[(e%7+1)*weights[i],(e%5-2)*weights[i]]}));
    const local=rows.filter(r=>r.node==='a'),remote=rows.filter(r=>r.node==='b'),localRanks=unique(local.map(r=>r.localRank)),remoteRanks=unique(remote.map(r=>r.localRank));
    const sum=a=>a.reduce((out,r)=>out.map((v,k)=>v+r.weighted[k]),[0,0]),localSum=sum(local),remoteSum=sum(remote),routed=sum(rows),shared=[.5,-.5];
    return {scenario:p===presets[scenario]?scenario:'mixed',dtype:dtype==='bf16'?'bf16':'fp8',rows,local,remote,localRanks,remoteRanks,localSum,remoteSum,routed,shared,total:routed.map((v,k)=>v+shared[k]),dispatchBytes:7168*(dtype==='bf16'?2:1),combineBytes:7168*2,rdmaCopies:remote.length?1:0,naiveExpertCopies:remote.length,nvCopies:localRanks.filter(i=>i!==0).length+remoteRanks.filter(i=>i!==0).length,weightSum:weights.reduce((a,b)=>a+b,0)};
  }
  const steps=[
    {short:'路由',phase:'ROUTE',title:'一个 token，选择八个 routed experts。',body:'V3的门控决定目标专家。这里固定一组人为选择，观察它映射到哪些GPU与节点；shared expert作为独立的本地教学分支展示。',state:'激活仍在A0。选中8个专家，不等于向网络发送8份。',refs:['config','gate'],code:'weights, topk_idx = gate(x)\n# 示例权重 = 人为归一化比例 × 2.5'},
    {short:'布局 / 去重',phase:'DISPATCH',title:'先按通信目的地去重，再展开专家行。',body:'同一token在一个目标scale-out rank只需要一份逻辑载荷；远端再按目标GPU分发。一个GPU上选多个专家，仍可复用同一份收到的向量。',state:'rank与expert是不同索引。路由元数据、padding和对齐另有开销。',refs:['dispatch','api'],code:'dispatch(x, topk_idx, topk_weights, ...)\n# scale-out rank去重 → scale-up rank去重'},
    {short:'域内分发',phase:'NVLINK',title:'本节点的专家，先沿域内路径得到输入。',body:'A0保留自己需要的输入；其他本地目标GPU经NVLink域获得数据。这个分支与跨域分支可以重叠，分镜顺序不表示真实全局屏障。',state:'这里只高亮本地目标GPU；不把所有GPU都当作一次请求的消费者。',refs:['forward','paper'],code:'A0 → NVLink domain A → local target GPUs'},
    {short:'RDMA 发出',phase:'SCALE-OUT',title:'跨节点的一份，先送到B0中转。',body:'源GPU A0通过支持的GPU–NIC路径访问RNIC；网络把数据送到目标节点相同local-index的B0。RDMA路径没有被强制串在NVLink交换结构之后。',state:'这次只有一个远端目标节点。线条表示逻辑依赖，不表示真实包数或传输时间。',refs:['paper','dispatch','ordering'],code:'A0 → RNIC A0 → RDMA / IB fabric\n                  → RNIC B0 → B0'},
    {short:'远端扇出',phase:'NVLINK',title:'B0收到一次，再经NVLink分给专家GPU。',body:'B0承担跨域中转。目标专家不在B0时仍要经过这一步；同一目标GPU上的多个专家由收到的向量展开为多条专家计算行。',state:'先到中转GPU，和已经送到全部专家，是不同状态。',refs:['forward','paper'],code:'B0 → NVLink domain B → remote expert GPUs'},
    {short:'消费依赖',phase:'DEPENDENCY',title:'等待通信库规定的完成与可见性，再消费。',body:'远端放置、通信事件和GPU执行依赖需要正确交接。源端local CQE不能证明远端专家kernel已读到数据；实际遵守库与平台约定。',state:'本步只解释依赖，不实现某型号RNIC的ACK或CUDA可见性状态机。',refs:['wait','ordering'],code:'dispatch_event.current_stream_wait()\n# 具体事件API见固定版本示例'},
    {short:'专家计算',phase:'EXPERT',title:'输入到达后，GPU批量执行自己的专家。',body:'grouped GEMM与激活/投影在专家所在GPU上计算。本页用人为二维输出做可手算切面；真实hidden维度是7168，绝不把二维格子画成物理PE阵列。',state:'权重模型参数常驻专家侧；这里传的是激活，不是每次搬完整专家权重。',refs:['config','example'],code:'expert_out = grouped_expert_mlp(recv_x, ...)\n# 本页二维数值是假设输出，未运行模型'},
    {short:'应用权重',phase:'WEIGHT',title:'专家侧应用一次路由权重，combine只求和。',body:'本演示对应expanded布局：专家输出已含最终路由系数，后续通信归约不再乘一次权重。V3的有效门控系数还含route_scale，不能假定它们始终和为1。',state:'Z_e = w_e × F_e(x)。本例有效权重和为2.5；人为系数不是模型真实router输出。',refs:['example','gate','combine'],code:'weighted_expert_out = weights * expert_out\n# combine 输入已经加权'},
    {short:'远端预归约',phase:'COMBINE / NVLINK',title:'返回前，先把B节点的贡献聚到B0。',body:'选择allow_multiple_reduction=True的hybrid路径：远端专家结果经NVLink汇入中转侧，归约为这个token的节点贡献。累加由GPU通信内核承担，不能画成NVLink交换机自动执行任意加法。',state:'同节点预归约改变传输份数，也可能改变浮点求和次序。二维示例忽略舍入。',refs:['combine','api','paper'],code:'z_B = Σ weighted_expert_out_on_B\n# allow_multiple_reduction=True'},
    {short:'RDMA 返回',phase:'COMBINE / SCALE-OUT',title:'把B节点的一个部分和，送回源节点。',body:'反向RDMA把节点贡献送回A0对应的接收路径。dispatch输入与combine输出的dtype可以不同；本页combine固定为BF16逻辑载荷。',state:'有远端专家时，这个模型返回一份节点部分和；不把它当作每个专家分别回传。',refs:['combine','paper'],code:'B0 → RNIC B0 → RDMA / IB fabric\n                  → RNIC A0 → A0'},
    {short:'汇总本地',phase:'COMBINE / NVLINK',title:'本地贡献与远端部分和，在源端汇合。',body:'本地专家结果经对应域内路径返回A0，与远端部分和相加。通信库的combine handle保存布局与还原关系，不是用expert编号直接写一个任意远端地址。',state:'routed = z_A + z_B。真实系统可以流水和重叠；这里顺序展开便于核对。',refs:['combine','api','example'],code:'routed_out = combine(weighted_expert_out, handle, ...)\n# 本地与远端贡献各算一次'},
    {short:'输出',phase:'OUTPUT',title:'MoE分支得到输出，继续下一段模型。',body:'本页把shared贡献与routed贡献合并为MoE分支结果；残差、attention及完整模型层未展开。shared放在A0只是本次公式切面的安排，不是所有部署的固定位置。',state:'已完成的是这一token的教学数据路径，不是实际模型推理trace。',refs:['gate','config','example'],code:'moe_branch = shared_out + routed_out\n# 下一步遵守消费依赖；残差等另行处理'}
  ];
  window.OBS_MOE_DATA={sources,presets,steps,model,hidden:7168,expertCount:256,topK:8,epRanks:64,reviewed:'2026-10-31'};
})();

/* © 2026 DOCLUKA77. A dependency walkthrough, not a device trace. */
'use strict';
(() => {
  const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sources={
    verbs:['https://github.com/linux-rdma/rdma-core/blob/master/libibverbs/man/ibv_post_send.3','rdma-core · post_send / completion'],
    gpu:['https://docs.nvidia.com/cuda/gpudirect-rdma/#synchronization-and-memory-ordering','GPUDirect RDMA · 同步与内存顺序'],
    nccl:['https://docs.pytorch.org/docs/stable/distributed.html#torch.distributed.Work.wait','PyTorch · collective / CUDA 等待语义'],
    roce:['https://networking-docs.nvidia.com/doca/archive/3-5-0/rdma-over-converged-ethernet','NVIDIA · RoCE 协议分层'],
    cuda:['https://docs.nvidia.com/cuda/parallel-thread-execution/#tcgen05-instructions','PTX · 异步矩阵与同步语义']
  };
  const steps=[
    {short:'准备张量',title:'先有张量，再决定把它送给谁。',where:'GPU A · 全局内存',nodes:[0],kind:'compute',
      body:'用 MoE dispatch 作场景：路由决定 token 去哪个专家；GPU 上的 pack / 重排工作把要发送的数据整理成 buffer。本演示从已生成的发送 buffer 开始。',
      control:'Python 提交的是张量工作与通信意图。真实库决定采用哪些 kernel、通信原语和后端，不能从 all-to-all 这一名字推断一定使用某条 RDMA WRITE。',
      buffer:'发送 buffer 已准备；远端尚未获得数据。',dependency:'源端生产数据的 GPU 工作，必须先于依赖它的发送。',refs:['nccl','gpu'],
      code:'# 上层意图，省略张量分配和进程组初始化\nwork = dist.all_to_all_single(recv, send, async_op=True)',boundary:'这是选定支持条件下的一段逻辑切面；不复现 DeepEP 或 NCCL 的全部内部算法。'},
    {short:'提交工作',title:'地址、授权和队列，让设备知道该做什么。',where:'通信库 / 已初始化的端点',nodes:[1],kind:'control',
      body:'选择 RC WRITE 解释下层语义：WQE 描述源地址、长度、lkey，以及已授权的远端地址和 rkey。doorbell 通知设备处理提交的工作。',
      control:'MR、QP 和交换过的远端地址/key 是前提。初始化通常会复用；不是每发一块数据，都重新注册一次内存。CPU 或 GPU 谁提交，由具体库、后端与平台决定。',
      buffer:'提交描述符；还不能据此断言 payload 已经发送。',dependency:'提交顺序、源 buffer 生命周期与对应 API 的规则同时成立。',refs:['verbs','gpu'],
      code:'# 语义示意，不是 NCCL 源码或可运行 verbs 程序\nWR = {src: (addr, length, lkey), remote: (addr, rkey)}\npost_send(qp, WR)',boundary:'WQE / doorbell 是控制信息；它们不是待传输张量本身。'},
    {short:'源端 DMA',title:'RNIC 读取 GPU buffer，payload 才开始移动。',where:'GPU A → 支持的 GPU–NIC 路径',nodes:[0,1],kind:'payload',
      body:'在 GPUDirect RDMA 支持条件满足时，RNIC 通过平台提供的路径访问 GPU 内存，减少 host staging。数据仍会占用 GPU–NIC 路径和内存子系统资源。',
      control:'需要正确的内存注册、拓扑、驱动和顺序约定。direct DMA 不表示零开销，也不表示网络设备能够忽略生产者的同步依赖。',
      buffer:'读取源 payload；此时仍有数据在传输中。',dependency:'不能在库允许之前复用或改写非 inline 的源 buffer。',refs:['gpu','verbs'],
      code:'# 已准备的 send buffer\nGPU_memory → supported_DMA_path → RNIC',boundary:'这里省略缓存、PCIe 事务与具体桥接层次，不假设任意 GPU / RNIC 组合均支持。'},
    {short:'经过网络',title:'包穿过交换网络，也可能排队、乱序或重传。',where:'RNIC A → 网络 → RNIC B',nodes:[1,2,3],kind:'payload',
      body:'本例选择 RoCEv2 / RC：RDMA 传输承载在 UDP/IP 与 Ethernet 上，可靠性由所选 RDMA transport 负责。交换路径与端点处理共同影响时延。',
      control:'ECN / 拥塞控制调节负载；PFC 提供链路流控；ACK / 重传处理传输可靠性。三者职责不同，不能画成同一个“保证不丢包”的开关。',
      buffer:'payload 仍在网络中；发送提交不等于接收完成。',dependency:'拥塞与丢包处理可能改变进度；图中不按固定时间模拟它们。',refs:['roce','verbs'],
      code:'RDMA transport / RC\n        ↓\nUDP / IP → Ethernet fabric',boundary:'移动标记仅表示阅读焦点，不代表逐包仿真、真实速率或特定芯片内部流水线。'},
    {short:'远端放置',title:'远端 RNIC，把数据放到获授权的目标内存。',where:'RNIC B → GPU B buffer',nodes:[3,4],kind:'payload',
      body:'受支持的 direct 路径把 payload 放入远端 GPU buffer。普通 RDMA WRITE 不要求为每次写预贴 RECV，也不自动给远端应用生成 RECV CQE。',
      control:'目标地址和 rkey 约束可写区域。需要通知远端应用时，要采用所选库的通知 / 同步协议；不能凭“WRITE 已提交”宣布远端程序可用。',
      buffer:'目标 payload 正在 / 已按传输规则放置；GPU 消费条件另行建立。',dependency:'payload 放置、远端应用通知和 GPU 可见性，是需要分别处理的条件。',refs:['verbs','gpu'],
      code:'remote_addr + offset ← payload\n# 普通 WRITE ≠ 远端自动产生 RECV CQE',boundary:'这里不把原论文 SRNIC 的 host buffer 原型冒充为已经验证的 GPU direct 实现。'},
    {short:'交接依赖',title:'收到数据，与 GPU 能安全读取，是两件事。',where:'通信库 · 通知 / CUDA 依赖',nodes:[3,4],kind:'control',
      body:'完成通知、内存可见性和 GPU 消费依赖需要按库与平台的规定建立。源端 local CQE 不是远端 GPU kernel 已经读到新数据的证明。',
      control:'上层 work.wait() 的语义取决于通信库与 CUDA stream 约定；不能泛化为 CPU 等待了全部 GPU 计算。部分平台还需要对应的可见性操作。',
      buffer:'库规定的通知、可见性与 stream 依赖均满足后，交给消费者。',dependency:'只有所选 API 的消费条件满足，才能调度依赖接收数据的工作。',refs:['gpu','nccl','verbs'],
      code:'work.wait()  # 按库约定建立后续使用依赖\n# local CQE ≠ remote GPU consumption',boundary:'ACK、local CQE、remote 通知和 CUDA 同步没有被合并成一个完成事件。'},
    {short:'本地计算',title:'网络把数据送达；SM 接手后续算子。',where:'GPU B · SM / Tensor Core',nodes:[4],kind:'compute',
      body:'接收数据就绪后，专家 GEMM kernel 才能使用它。全局内存、共享内存、矩阵指令、累加与 epilogue 各有职责；网络不会直接把一个 token 变成 Tensor Core 的完整计算。',
      control:'SM 内部还要遵守 kernel 的搬运、异步完成和数据依赖规则。SM100 的 TMEM 路径与消费级 RTX Blackwell 的 SM120 路径分别解释。',
      buffer:'接收 buffer 可供本地消费者使用；计算输出还需继续执行模型。',dependency:'下一步进入算子显微镜，检查 global → SM → Tensor Core。',refs:['gpu','cuda'],
      code:'recv buffer → expert GEMM\n             → activation / down → combine',boundary:'仅示意一个远端专家的依赖关系；不宣称每次 dispatch 都使用同一个协议或 kernel。'}
  ];
  const nodes=[['gpu','GPU A','发送 buffer','gpu'],['transport','RNIC A','源端 DMA / 传输','nic'],['switch','网络','交换 / 排队 / 路由','network'],['transport','RNIC B','接收 / 目标 DMA','nic'],['gpu','GPU B','接收 buffer → SM','gpu']];
  let playing=false,timer=0,active=null,notify=()=>{};
  const $=q=>document.querySelector(q);
  function select(n){pause();active.story=Math.max(0,Math.min(steps.length-1,n));update(active);notify();}
  function pause(){clearTimeout(timer);playing=false;$('#rs-play')?.setAttribute('aria-pressed','false');if($('#rs-play'))$('#rs-play').textContent='▶ 播放讲解';$('#rd-story')?.classList.remove('is-playing');}
  function schedule(){timer=setTimeout(()=>{if(document.hidden||!$('#rd-story')||$('#view-rdma')?.hidden){pause();return;}if(active.story>=steps.length-1){pause();return;}active.story++;update(active);notify();schedule();},4400);}
  function play(){if(playing){pause();return;}if(active.story===steps.length-1)active.story=0;playing=true;update(active);notify();schedule();}
  function icon(kind){return kind==='gpu'?'<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="8" width="24" height="24" rx="4"/><path d="M14 14h12v12H14zM2 13h6M2 20h6M2 27h6M32 13h6M32 20h6M32 27h6M13 2v6M20 2v6M27 2v6M13 32v6M20 32v6M27 32v6"/></svg>':kind==='nic'?'<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="5" y="9" width="30" height="22" rx="3"/><path d="M12 31v5M18 31v5M24 31v5M30 31v5M12 16h16v8H12z"/></svg>':'<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="12" width="32" height="16" rx="4"/><path d="M10 18v4M16 18v4M22 18v4M28 18v4M20 4v8M20 28v8"/></svg>';}
  function render(S){active=S;S.story=Math.max(0,Math.min(6,Number(S.story)||0));S.lens=S.lens==='control'?'control':'payload';return `<section class="rs-experience" id="rd-story" aria-label="一块张量的跨域旅程"><header class="rs-heading"><div><span class="rs-eyebrow">INTERACTIVE FIELD GUIDE / 01</span><h2>跟着一块张量，<br><em>穿过整个通信路径。</em></h2><p>以远端专家为场景，拆开数据搬运与控制依赖。</p></div><span class="rs-model-label">逻辑依赖演示<br>非设备 trace / 非性能仿真</span></header><div class="rs-toolbar"><div><button id="rs-play" aria-pressed="false">▶ 播放讲解</button><button data-rs-prev aria-label="旅程上一步">←</button><button data-rs-next aria-label="旅程下一步">→</button><span id="rs-count"></span></div><div class="rs-lenses" role="group" aria-label="观察路径"><button data-rs-lens="payload">实数据</button><button data-rs-lens="control">控制与依赖</button></div></div><div class="rs-route" aria-label="GPU A 到 GPU B 的逻辑路径">${nodes.map(([id,title,sub,kind],i)=>`${i?`<div class="rs-link" data-rs-link="${i-1}" aria-hidden="true"><i></i><span>→</span></div>`:''}<button class="rs-device" data-rd-node="${id}" data-rs-device="${i}" aria-label="展开${E(title)}模块">${icon(kind)}<b>${title}</b><small>${sub}</small><span>查看模块 ↗</span></button>`).join('')}</div><div class="rs-dependency-rail"><span>完成依赖</span><p>源端完成 ≠ 远端通知 ≠ GPU 可消费</p><button data-rd-tab="path">拆开看 →</button></div><div class="rs-chapters" role="group" aria-label="张量旅程步骤">${steps.map((s,i)=>`<button data-rs-step="${i}"><small>${String(i+1).padStart(2,'0')}</small><span>${s.short}</span></button>`).join('')}</div><div id="rs-explanation" class="rs-explanation" aria-live="polite"></div><div class="rs-bottom"><span>可暂停、单步与点开模块；动画节奏不表示硬件耗时。</span><button data-rd-tab="path">深入 RC WRITE 的 12 步 →</button></div></section>`;}
  function update(S){active=S;const s=steps[S.story],root=$('#rd-story');if(!root)return;root.dataset.lens=S.lens;root.dataset.kind=s.kind;root.classList.toggle('is-playing',playing);$('#rs-count').textContent=`${String(S.story+1).padStart(2,'0')} / 07`;$('#rs-play').textContent=playing?'Ⅱ 暂停':'▶ 播放讲解';$('#rs-play').setAttribute('aria-pressed',String(playing));$('[data-rs-prev]').disabled=S.story===0;$('[data-rs-next]').disabled=S.story===6;
    root.querySelectorAll('[data-rs-device]').forEach(n=>n.classList.toggle('in-focus',s.nodes.includes(Number(n.dataset.rsDevice))));
    root.querySelectorAll('[data-rs-link]').forEach(n=>{const i=Number(n.dataset.rsLink);n.classList.toggle('in-focus',S.lens==='payload'&&s.kind==='payload'&&s.nodes.includes(i)&&s.nodes.includes(i+1));});
    root.querySelectorAll('[data-rs-lens]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rsLens===S.lens)));
    root.querySelectorAll('[data-rs-step]').forEach(b=>{const on=Number(b.dataset.rsStep)===S.story;b.setAttribute('aria-pressed',String(on));if(on)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('#rs-explanation').innerHTML=`<div class="rs-narrative"><span class="rs-location">${E(s.where)}</span><h3>${E(s.title)}</h3><p>${E(S.lens==='control'?s.control:s.body)}</p><div class="rs-buffer-state"><b>${S.lens==='control'?'本步依赖':'数据状态'}</b><span>${E(S.lens==='control'?s.dependency:s.buffer)}</span></div></div><aside class="rs-insight"><span class="rs-eyebrow">${S.lens==='control'?'CONTROL / ORDERING':'CODE / LOGICAL SLICE'}</span><pre><code>${E(s.code)}</code></pre><details><summary>本步依据与简化边界</summary><p>${E(s.boundary)}</p>${s.refs.map(id=>`<a href="${E(sources[id][0])}" target="_blank" rel="noopener noreferrer">${E(sources[id][1])} ↗</a>`).join('')}</details>${S.story===6?'<a class="rs-continue" href="#operator">进入 SM / Tensor Core 显微镜 ↗</a>':''}</aside>`;
  }
  function click(t,S,emit){notify=emit;active=S;if(t.id==='rs-play'){play();return true;}if(t.hasAttribute('data-rs-next')){select(S.story+1);return true;}if(t.hasAttribute('data-rs-prev')){select(S.story-1);return true;}if(t.dataset.rsStep!==undefined){select(Number(t.dataset.rsStep));return true;}if(t.dataset.rsLens){S.lens=t.dataset.rsLens;update(S);emit();return true;}return false;}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  window.OBS_RDMA_STORY={render,update,pause,click,steps,sources};
})();

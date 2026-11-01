/* Copyright (c) 2026 DOCLUKA77. All rights reserved. */
'use strict';
(() => {
  const {chips,sources,reviewed} = window.OBS_DATA;
  const $ = (selector,root=document) => root.querySelector(selector);
  const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sourceById = id => sources.find(s=>s.id===id);
  let state = {view:'explore',chip:'rtx5090',phase:'decode',stage:0,node:'memory',layer:'chip',playing:false,speed:1000};
  let timer=null,toastTimer=null,noteTimer=null;
  let sourceFilter='all';
  const savedKey = 'docluka77-observatory-notes-v1';
  let notes={},storageAvailable=true;
  try { const stored=JSON.parse(localStorage.getItem(savedKey)||'{}'); if(stored && typeof stored==='object'&&!Array.isArray(stored)) for(const c of chips) if(typeof stored[c.id]==='string') notes[c.id]=stored[c.id]; }
  catch { storageAvailable=false; }
  const current = () => chips.find(c=>c.id===state.chip)||chips[0];
  const unknown = () => current().family==='unknown';
  const stageNodes = () => state.layer!=='overview'?Array.from({length:5},(_,i)=>window.OBS_DETAIL.stageNode(current(),state.layer,i)):['memory','cache','compute','network','output'];
  const stageNames = () => state.layer!=='overview'?['阅读入口','资源组织','计算资源','共享与协作','结果与边界']:unknown()?['产品定位','存储证据','计算证据','互连证据','研究结论']:['读取输入','就近存储','矩阵计算','协作归约','生成 token'];
  const external = (url,label,cls='') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600); }
  function download(name,content,type) {const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function hashFor(view=state.view) {const cs=window.OBS_CASE.location(),os=window.OBS_OPERATOR.location(),rs=window.OBS_RDMA.location(),ms=window.OBS_MOE.location(),mc=window.OBS_MOE_COST.location();return `#${view}?chip=${encodeURIComponent(state.chip)}&phase=${state.phase}&step=${state.stage}&layer=${state.layer}`+(view==='case'?`&caseTab=${cs.tab}&modelLayer=${cs.layer}&caseStep=${cs.step}`:view==='operator'?'&'+new URLSearchParams({opTab:os.tab,opStep:os.step,opDepth:os.depth,opFocus:os.focus,opCell:os.cell,opAt:os.progress,opFollow:os.follow?'1':'0',opSpeed:os.speed,opNet:os.net,opNstep:os.netStep,opReuse:os.reuse,opReuseFocus:os.reuseFocus}):view==='rdma'?'&'+new URLSearchParams({rdTab:rs.tab,mtModel:ms.profile,...Object.fromEntries(Object.entries(mc).map(([k,v])=>['mc_'+k,typeof v==='boolean'?(v?1:0):v])),mtStep:ms.step,mtScenario:ms.scenario,mtDtype:ms.dtype,mtAt:ms.progress,mtFocus:ms.focus,mtFit:ms.fit?1:0,rdStory:rs.story,rdLens:rs.lens,rdStep:rs.step,rdNode:rs.node,rdAt:rs.progress,rdAlgo:rs.algorithm,rdScenario:rs.scenario,rdPacket:rs.packetStep,rdScale:rs.scale,rdPaper:rs.paper,rdFilter:rs.filter,rdQuery:rs.query,rdL_topic:rs.topic,rdL_kind:rs.kind,rdL_level:rs.level,rdL_year:rs.year,rdL_sort:rs.sort,rdL_track:rs.track,rdL_fresh:rs.fresh?1:0,rdPath:rs.path,...Object.fromEntries(['size','gbps','eff','pcie','host','endpoint','hops','hop','queue','reg','reuse'].map(k=>['rdC_'+k,rs[k]]))}):'');}
  function updateHash() {history.replaceState(null,'',hashFor());}
  function parseHash() {const [view,query='']=location.hash.slice(1).split('?');const p=new URLSearchParams(query);state.view=['explore','case','operator','compare','lab','sources','notes','rdma'].includes(view)?view:'explore';if(chips.some(c=>c.id===p.get('chip'))) state.chip=p.get('chip');state.phase=p.get('phase')==='prefill'?'prefill':'decode';state.stage=Math.max(0,Math.min(4,Math.trunc(Number(p.get('step'))||0))); const allowed=window.OBS_DETAIL.levels(current()).map(l=>l[0]);state.layer=p.get('layer')==='overview'?'overview':allowed.includes(p.get('layer'))?p.get('layer'):window.OBS_DETAIL.defaultLayer(current());state.node=stageNodes()[state.stage];window.OBS_CASE.restore(p);window.OBS_OPERATOR.restore(p);window.OBS_RDMA.restore(p);}
  function pause() {state.playing=false;clearInterval(timer);timer=null;$('#play').textContent='▶';$('#play').setAttribute('aria-label','播放数据流');$('#architecture').classList.remove('running');}
  function play() {if(unknown()) return;state.playing=true;$('#play').textContent='Ⅱ';$('#play').setAttribute('aria-label','暂停数据流');$('#architecture').classList.add('running');clearInterval(timer);timer=setInterval(advance,state.speed);}
  function advance() {state.stage=(state.stage+1)%5;state.node=stageNodes()[state.stage];renderDiagram();renderInspector();renderStages();updateHash();}
  function selectChip(id) {pause();state.chip=id;state.layer=window.OBS_DETAIL.defaultLayer(current());state.stage=0;state.node=stageNodes()[0];renderExplore();updateHash();}
  const orderedChips = () => [...chips].sort((a,b)=>(a.id==='rtx5090'?-1:b.id==='rtx5090'?1:0));
  function renderSelector() {const ordered=orderedChips();$('#chip-selector').innerHTML=ordered.map(c=>`<button class="chip-option ${state.chip===c.id?'active':''} ${c.id==='rtx5090'?'recommended':''}" data-chip="${c.id}" aria-pressed="${state.chip===c.id}"><span class="chip-vendor">${c.vendor}</span><span class="chip-name">${c.short}</span><span class="chip-kind">${c.kind}</span></button>`).join('');}
  function nodeDetails(c,id) {
    const detailed=state.layer!=='overview'?window.OBS_DETAIL.info(id,state.phase):null;if(detailed)return detailed;
    const isConsumer=['rtx5090','rx9070'].includes(c.id);
    const isGroq=c.family==='groq', isTpu=c.family==='tpu',isHard=c.family==='hardwired',isUnknown=c.family==='unknown';
    const details={
      memory:{title:isUnknown?'公开资料与产品定位':isHard?'输入进入专用路径':isGroq?'片上 SRAM':isConsumer?(c.id==='rtx5090'?'GDDR7 显存':'GDDR6 显存'):'高带宽存储 HBM',tag:isUnknown?c.statusLabel:c.memory+' · '+c.memoryType,body:isUnknown?c.summary:isHard?'图中输入代表 token 与上下文进入模型专用硬件，不表示已经公开其接口与缓存电路。':isGroq?'模型权重分布在多个 LPU 的片上存储中。低延迟的代价是有限本地容量与跨芯片协作。':'权重与 KV Cache 等数据需要足够的容量。每轮推理消耗的时间，也与数据抵达核心的速度有关。',insight:isUnknown?c.notes:state.phase==='decode'?c.decode:c.prefill},
      cache:{title:isUnknown?'存储：仍有证据缺口':isHard?'模型专用的执行路径':isGroq?'预先安排的数据流':isTpu?'Vmem 片上存储':'缓存与局部存储',tag:isUnknown?'未知不等于零':isGroq?'编译器计划':isHard?'概念分组 · 非已知电路':isTpu?(c.id==='tpu8i'?'384 MB Vmem':'128 MB Vmem'):'数据复用 / 局部性',body:isUnknown?c.storage:isHard?'这里的 Stage A 是解释性分镜。它只表达模型定制，不声称对应某个未披露模块。':isGroq?'不同于 GPU 的动态线程调度，编译器预先计划计算与数据移动的时刻。':isTpu?'把计算即将用到的数据放在片上，减少访问外部存储。容量和布局仍限制可复用的数据规模。':'将矩阵分块放进靠近计算单元的存储，减少从显存重复获取相同数据。',insight:isUnknown?'需要可核验的存储规格与层次说明；不跨代拼接参数。':state.phase==='prefill'?'多个 token 共用一组权重，增加复用机会。':'小 batch 复用机会较少，搬运时间更容易暴露。'},
      compute:{title:isUnknown?'计算阵列：尚未确认':isHard?'为模型定制的计算':isGroq?'按计划执行的计算':isTpu?'MXU + VPU':c.family==='amd'?(isConsumer?'RDNA 4 CU':'CDNA 5 计算资源'):'SM / Tensor Core',tag:isUnknown?'不推断阵列尺寸':isTpu?'矩阵 × 向量分工':isHard?'Stage A / B 仅为概念':'可编程计算 / 矩阵加速',body:isUnknown?c.compute:isHard?'固定模型的结构参与硬件设计。不能据此补画真实 attention、权重编码或数据通路细节。':isTpu?'矩阵运算交给 MXU，向量工作交给 VPU。方格表示矩阵计算概念，不表示本代真实阵列尺寸。':c.compute+'。图中数量仅用于解释层次，不与物理单元数一一对应。',insight:state.phase==='prefill'?c.prefill:c.decode},
      network:{title:isUnknown?'互连与同步：尚未确认':isHard?'内部协作：细节待披露':isGroq?'跨 LPU 确定性传输':isTpu?(c.id==='tpu8i'?'CAE / Boardfly':'SparseCore / ICI'):'片间协作与通信',tag:isUnknown?'片内 ≠ 片间 ≠ 集群':isHard?'不虚构专用互连':isTpu?'片上职责与系统网络分层':'系统边界',body:isUnknown?c.network:isHard?'公开演示不足以重建片内通信或多芯片协作方式。动画只表达一个概念阶段。':c.network+'。本步骤合并展示协作成本，并非每层每次都一定执行一次通信。',insight:isTpu&&c.id==='tpu8t'?'SparseCore 用于稀疏与嵌入相关工作；不要把它当作所有 dense LLM 的必经路径。':'模型一旦分布到多个器件，数据交换与同步也会进入关键路径。'},
      output:{title:isUnknown?'结论需要匹配证据':state.phase==='prefill'?'完成提示词处理':'得到下一个 token',tag:isUnknown?'可追溯 / 可修订':state.phase==='prefill'?'建立上下文 / 进入解码':'自回归：继续下一轮',body:isUnknown?c.tradeoff:state.phase==='prefill'?'Prefill 同时处理提示词中的多个位置并建立 KV Cache，随后进入逐 token 生成。':'经过必要的投影、归约与采样得到新 token。下一轮依赖这一轮的结果，因此延迟会逐次累积。',insight:isUnknown?c.notes:c.tradeoff}
    };
    return details[id]||details.memory;
  }
  function renderInspector() {const c=current(),d=nodeDetails(c,state.node),phaseTag=state.phase==='decode'?'Decode 逐 token 视角':'Prefill 读提示词 视角';$('#inspector').innerHTML=`<span class="eyebrow">INSIDE THE ARCHITECTURE</span><h3>${esc(d.title)}</h3><span class="detail-tag">${esc(d.tag)}</span><p>${esc(d.body)}</p><div class="insight"><span>为什么重要 · ${esc(d.phaseLabel||phaseTag)}</span>${esc(d.insight)}</div><button class="source-link" data-evidence="${c.id}">查看证据与原始资料 ↗</button>${d.drill?`<button class="drill-button" data-layer="${d.drill}">继续进入 ${esc(d.drillText||d.drill)} ↗</button>`:d.operatorLink?`<a class="drill-button" href="#operator">对比 SM100 算子显微镜 ↗</a>`:''}`;}
  function renderDiagram() {
    $('#layer-footnotes').hidden=true;$('#matrix-lab').hidden=true;
    if(window.OBS_DETAIL.render($('#architecture'),current(),state))return;
    $('#architecture').setAttribute('viewBox','0 0 850 385');
    const c=current(),gpu=c.family==='gpu',amd=c.family==='amd',tpu=c.family==='tpu',groq=c.family==='groq',hard=c.family==='hardwired',un=c.family==='unknown',consumer=['rtx5090','rx9070'].includes(c.id);
    const active=stageNodes()[state.stage],color='#bce9a5';
    let svg=`<title id="svg-title">${esc(c.name)} · ${un?'证据地图':'概念数据流'}</title><desc id="svg-desc">${esc(c.summary)}。按 Tab 可选择模块，按 Enter 阅读解释。${un?'不展示尚未公开的内部架构。':'这不是物理布局，也不是周期精确仿真。'}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#6b8a67"/></marker><marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${color}"/></marker></defs>`;
    const text=(x,y,label,size=11,fill='#8ca987',extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${esc(label)}</text>`;
    const block=(id,x,y,w,h,title,sub,extra='',dashed=false)=>{const selected=state.node===id,on=active===id;return `<g class="node ${selected?'selected':''} ${on?'active-node':''}" data-node="${id}" role="button" tabindex="0" aria-label="${esc(title)}：点击查看解释" aria-pressed="${selected}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${on?'#324c36':'#1c3328'}" stroke="${dashed?'#8d805b':'#4a6248'}" ${dashed?'stroke-dasharray="5 5"':''}/>${text(x+15,y+25,title,12,'#d1e3c4')}${sub?text(x+15,y+44,sub,9,'#7f9b77','class="sv-mono"'):''}${extra}</g>`;};
    const path=(points,target,amber=false)=>`<polyline points="${points}" fill="none" stroke="${amber?'#c0a575':active===target?color:'#4b654a'}" stroke-width="${active===target?1.8:1.2}" opacity="${active===target?1:.75}" class="flow ${active===target?'active-flow':''}" marker-end="url(#${active===target?'arrow-active':'arrow'})"/>`;
    const batchTiles=(x,y)=>{let s='';const count=state.phase==='prefill'?12:1;for(let i=0;i<count;i++) s+=`<rect x="${x+i%6*16}" y="${y+Math.floor(i/6)*17}" width="11" height="11" rx="2" fill="${i===0?'#bce9a5':'#76976a'}" opacity="${state.stage===0?1:.5}"/>`;return s;};
    const cells=(x,y,cols=6,rows=3,size=12)=>{let s='';for(let r=0;r<rows;r++)for(let col=0;col<cols;col++){const on=state.stage===2 && (state.phase==='prefill'?(r+col)%3!==2:r===col%rows);s+=`<rect class="matrix-cell ${on?'on':''}" x="${x+col*(size+5)}" y="${y+r*(size+5)}" width="${size}" height="${size}" rx="1" fill="${on?color:'#486342'}"/>`;}return s;};
    if(un){
      svg+=text(40,54,'EVIDENCE MAP / 证据地图',10,'#b5a67c','class="sv-mono"');
      svg+=block('memory',35,95,185,68,'公开来源',c.id==='zhenwu'?'OFFICIAL PRODUCT INFO':'REPORTED / NOT CONFIRMED');
      svg+=block('cache',35,205,185,75,'存储层次：尚未确认','DO NOT GUESS SRAM / HBM');
      svg+=block('compute',266,76,334,227,'尚不能绘制真实微架构','PUBLIC DETAILS ARE INCOMPLETE',`<text x="433" y="195" text-anchor="middle" font-family="${esc('Consolas,monospace')}" font-size="51" fill="#b6aa7d">?</text>${text(310,241,'计算阵列 · 缓存层次 · 片内互连',11,'#a39b80')}${text(322,267,'均不以行业常见结构代填',10,'#7b8b73')}`,true);
      svg+=block('network',645,95,171,75,'下一份关键证据','WHITEPAPER / ISA',text(660,151,'技术白皮书与编程资料',10,'#8da17d'),true);
      svg+=block('output',645,219,171,75,'当前结论','KEEP THE UNKNOWNS',text(660,275,'保留未知，持续更新',10,'#8da17d'),true);
      svg+=text(43,345,'本图表示信息的充分程度，不表示该公司的芯片内部结构。',11,'#a79b7a');
    } else if(hard){
      svg+=text(42,57,'CONCEPT ONLY / 不代表已披露电路',10,'#a99268','class="sv-mono"');
      svg+=`<rect x="225" y="89" width="415" height="193" rx="10" fill="none" stroke="#7d7351" stroke-dasharray="5 5"/>`+text(246,112,'模型专用硬件 · 抽象分组',10,'#cab481');
      svg+=path('179,206 251,206','cache')+path('419,206 461,206','compute')+path('627,206 683,206','output');
      svg+=block('memory',35,160,145,92,'输入 / 上下文','TOKEN INPUT',batchTiles(50,216));
      svg+=block('cache',251,158,166,92,'模型专用 Stage A','MODEL-SPECIFIC',text(266,226,'计算 / 存储联合定制',10,'#9ab78a'),true);
      svg+=block('compute',461,158,166,92,'模型专用 Stage B','ABSTRACT STAGE',text(476,226,'并非可核实的模块名称',9,'#9ab78a'),true);
      svg+=block('output',685,160,135,92,'输出 token','OUTPUT',text(701,226,'自回归下一步',10,'#9ab78a'));
      svg+=block('network',251,304,376,51,'内部协作与模型更新方式：细节未完整公开','', '',true);
      svg+=text(47,129,'Llama 3.1 8B · HC1 技术演示',11,'#9aaf8b');
    } else if(groq){
      svg+=block('cache',235,33,385,63,'编译器计划 · 静态执行与通信排程','SCHEDULE FIRST / MOVE DATA ON TIME');
      svg+=block('memory',32,151,160,136,'SRAM · 权重分布','ON-CHIP / MULTI-LPU',cells(49,210,6,3,12));
      svg+=path('192,219 254,219','compute',true)+path('620,219 670,219','network')+path('748,257 748,309 430,309','output');
      svg+=`<path d="M280 96V133M426 96V133M572 96V133" stroke="#7e9573" stroke-dasharray="3 5"/>`;
      svg+=block('compute',254,146,366,142,'LPU · 按预定计划执行','MATRIX / VECTOR STREAM',Array.from({length:3},(_,i)=>`<rect x="${274+i*110}" y="210" width="91" height="48" rx="3" fill="#294531" stroke="#5d7851"/>${text(287+i*110,231,i===1?'向量处理':'矩阵处理',10,'#bfd8ad')}${text(287+i*110,248,'SCHEDULED',7,'#8da67d','class="sv-mono"')}`).join(''));
      svg+=block('network',670,146,153,112,'跨 LPU 传输','DETERMINISTIC',text(686,231,'模型跨芯片映射',10,'#9bb48c'));
      svg+=block('output',254,309,366,51,state.phase==='decode'?'得到 token → 进入下一轮':'提示词处理 → 建立上下文','','');
      svg+=text(35,342,'本地容量有限',10,'#a69270')+text(35,359,'需结合跨芯片分布理解',9,'#6f8b68');
    } else {
      const memoryName=consumer?(c.id==='rtx5090'?'GDDR7':'GDDR6'):'HBM'+(['rubin','amd'].includes(c.id)?'4':'');
      const memoryContent=Array.from({length:4},(_,i)=>`<rect x="56" y="${191+i*13}" width="111" height="6" rx="1" fill="${i<2?'#a9956e':'#637f58'}" opacity=".85"/>`).join('');
      svg+=path('190,209 226,209 226,139 250,139','cache',true)+path('425,164 425,207','compute')+path('609,252 631,252 631,160 659,160','network')+path('735,200 735,278','output');
      svg+=block('memory',35,129,155,134,memoryName+' · 存储',c.memory,memoryContent);
      svg+=text(49,289,state.phase==='prefill'?'多个 token 并行映射':'每轮一个新 token',10,'#9fb58c')+batchTiles(51,305);
      svg+=block('cache',250,113,359,53,tpu?'Vmem · 片上数据存储':amd?'L2 / 局部数据存储':'L2 Cache → Shared Memory','');
      svg+=block('output',659,278,159,61,state.phase==='prefill'?'上下文就绪':'生成下一个 token','ITERATE / NEXT STEP');
      if(tpu){
        svg+=block('control',250,30,359,55,'XLA 编译 · 计算映射','');
        svg+=block('compute',250,207,211,132,'MXU · 矩阵计算','MATRIX MULTIPLY',cells(268,263,8,3,13));
        svg+=block('vector',480,207,129,132,'VPU','VECTOR OPS',text(494,279,'norm / softmax',9,'#a4bc96')+text(494,302,'与 MXU 配合',10,'#78966a'));
        svg+=block('network',659,113,159,88,c.id==='tpu8i'?'CAE / ICI':'SparseCore / ICI',c.id==='tpu8i'?'COLLECTIVES':'SPARSE / EMBEDDING',text(673,181,c.id==='tpu8i'?'系统网络：Boardfly':'系统网络：3D torus',9,'#abc29c'));
        svg+=text(263,366,'方格仅解释矩阵计算，不对应真实阵列尺寸。',9,'#6c8b64');
      } else {
        svg+=block('control',250,30,359,55,amd?(consumer?'RDNA 工作调度':'CDNA 5 · Wave32 工作调度'):'工作分发 / 线程调度','');
        const unitName=amd?(consumer?'CU + AI':'CU 阵列'):'SM + TC';
        let units='';for(let i=0;i<4;i++){const x=265+i*84;units+=`<rect x="${x}" y="259" width="71" height="58" rx="3" fill="#294531" stroke="#5d7851"/>${text(x+9,277,unitName,8,'#bfd8ad','class="sv-mono" data-sub="1"')}`+cells(x+9,290,4,1,8);}
        svg+=block('compute',250,207,359,132,amd?(consumer?'RDNA 4 · 计算单元组':'CDNA 5 · 计算资源组'):'SM 组 · 可编程执行 + 矩阵加速','LOGICAL GROUPS / NOT TO SCALE',units);
        svg+=block('network',659,113,159,88,consumer?'主机 / PCIe':amd?'UALink / UALoE':'NVLink 6',consumer?'HOST SYSTEM':'SCALE-UP FABRIC',text(674,181,consumer?'消费级系统边界':'多 GPU 协作 / 同步',9,'#abc29c'));
        svg+=text(263,366,'单元数量为示意；不代表物理 SM / CU 数量。',9,'#6c8b64');
      }
      svg+=`<path d="M425 85V111" stroke="#607c56" stroke-dasharray="3 4" marker-end="url(#arrow)"/>`;
    }
    $('#architecture').innerHTML=svg;$('#architecture').setAttribute('role','group');$('#architecture').classList.toggle('running',state.playing);
    $('#diagram-label').textContent=un?'PUBLIC EVIDENCE / INFORMATION BOUNDARY':hard?'MODEL-SPECIFIC / CONCEPTUAL PATH':'DATAFLOW / '+(state.phase==='decode'?'AUTOREGRESSIVE DECODE':'PROMPT PREFILL');
    $('#diagram-caption').textContent=un?'点击方块查看已知与未知':hard?'抽象原理，不代表已披露的电路 · 点击模块查看解释':'模块可点击 · 连线为概念依赖，长度与速度不代表真实性能';
    window.OBS_DETAIL.recolor($('#architecture'));
  }
  function renderStages() {
    const c=current(),names=stageNames();
    $('#stages').innerHTML=names.map((s,i)=>`<button data-stage="${i}" class="${state.stage===i?'active':state.stage>i?'complete':''}" aria-pressed="${state.stage===i}">${String(i+1).padStart(2,'0')} ${s}</button>`).join('');
    $('#stage-count').textContent=`0${state.stage+1} / 05`;
    if(state.layer!=='overview'){const d=nodeDetails(c,stageNodes()[state.stage]);$('#stage-explainer').innerHTML=`<strong>导览 0${state.stage+1} / ${esc(d.title)}（${state.phase==='decode'?'Decode 逐 token':'Prefill 读提示词'}）</strong><span class="stage-text">${esc(d.body)} <b>当前阶段重点：</b>${esc(d.insight)}（注：此为逐项阅读导览，不表示这些并行硬件资源按 1→5 串行启动。）</span>`;$('#play').disabled=false;$('#play').title='按阅读顺序高亮模块，不表示硬件执行周期';return;}
    const explanations=unknown()?[c.summary,c.storage,c.compute,c.network,c.tradeoff]:[
      state.phase==='prefill'?'输入提示词形成一批 token；下面观察的是一次前向计算的概念依赖。':'每轮输入上一个 token，并使用此前建立的上下文；整个生成过程反复执行。',
      c.family==='hardwired'?'进入模型专用路径。此处是解释分组，不把未披露的存储实现画成已知电路。':c.family==='groq'?'权重分布在片上 SRAM，编译器预先安排数据到达计算单元的时刻。':c.storage+'。靠近核心的数据复用减少重复搬运。',
      state.phase==='prefill'?c.prefill:c.decode,
      c.family==='hardwired'?'内部协作与多芯片设计细节有限，不能据演示外推真实互连拓扑。':c.id==='tpu8t'?'SparseCore 是稀疏任务的专门资源；dense LLM 不一定经过它。跨芯片同步另由 ICI 与系统网络参与。':c.network+'。是否发生通信取决于模型分片与算子，并非每一步都固定经过同一路径。',
      state.phase==='prefill'?'提示词处理建立上下文与 KV Cache；接下来切换到逐 token 的 Decode。':'必要的投影、归约与采样产生下一个 token，然后重复下一轮。这里省略了完整模型层展开。'
    ];
    $('#stage-explainer').innerHTML=`<strong>${unknown()?'证据':'分镜'} 0${state.stage+1} / ${names[state.stage]}</strong><span class="stage-text">${esc(explanations[state.stage])}</span>`;
    $('#play').disabled=unknown();$('#play').title=unknown()?'资料不足，不播放推测的数据流':'概念分镜播放，不表示硬件时钟';
  }
  function renderExplore() {const c=current(),ordered=orderedChips();renderSelector();window.OBS_DETAIL.renderNav(c,state);window.OBS_DETAIL.renderGallery(c,state.layer);$('#chip-number').textContent=`${String(ordered.indexOf(c)+1).padStart(2,'0')} / ${chips.length}`;$('#chip-title').textContent=c.name;$('#chip-badge').textContent=c.statusLabel;$('#chip-badge').className='badge '+c.status;$$('[data-phase]').forEach(b=>{b.classList.toggle('active',b.dataset.phase===state.phase);b.setAttribute('aria-pressed',b.dataset.phase===state.phase);});renderDiagram();renderInspector();renderStages();$('#analysis-cards').innerHTML=c.cards.map((card,i)=>`<article class="analysis-card"><div class="card-label">0${i+1} <span>${esc(card[0])}</span></div><h3>${esc(card[1])}</h3><p>${esc(card[2])}</p></article>`).join('');$('#chip-evidence').innerHTML=`<strong>${c.status==='rumor'?'△ 报道线索':'↗ 可追溯资料'}</strong><span>${esc(c.notes)}</span><button data-evidence="${c.id}">${c.sources.length} 份来源 / 查看边界 ↗</button>`;}
  function heading(kicker,title,desc){return `<div class="view-head"><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>`;}
  function chipOptions(selected){return chips.map(c=>`<option value="${c.id}" ${selected===c.id?'selected':''}>${esc(c.name)}</option>`).join('');}
  function showEvidence(id) {
    const c=chips.find(c=>c.id===id);if(!c)return;
    $('#dialog-content').innerHTML=`<div class="eyebrow">EVIDENCE / ${esc(c.vendor)}</div><h2>${esc(c.name)}</h2><p>${esc(c.notes)}</p><div class="callout">${esc(c.statusLabel)}。所有重绘均为逻辑解释；不表示实物布局或测量结果。</div>`+c.sources.map(sid=>{const s=sourceById(sid);return `<div class="dialog-source"><span class="source-meta">${esc(s.publisher)} · ${esc(s.date)}</span><h3>${esc(s.title)}</h3><p><b>支持什么：</b>${esc(s.supports)}<br><b>不能推出：</b>${esc(s.limit)}</p>${external(s.url,'阅读原始资料')}${s.images?`<p class="source-caption">官方原图保留在发布方网站，不复制进项目许可。</p>${s.images.map(im=>`<button class="filter-button" data-image="${esc(im.url)}" data-image-label="${esc(im.label)}">查看 ${esc(im.label)} ↗</button>`).join(' ')}<div class="original-image"></div>`:''}</div>`;}).join('');$('#source-dialog').showModal();
  }
  function renderCompare() {
    const leftId=$('#compare-left')?.value||state.chip,rightId=$('#compare-right')?.value||(leftId==='groq'?'rubin':'groq');
    $('#view-compare').innerHTML=heading('04 / THREE QUESTIONS, CLEARER CHOICES','先看三个问题，再看参数。','不用先记住一整张术语表。先比较“模型放在哪、谁安排计算、规模变大后靠什么协作”，最后再打开完整技术对照。')+`<div class="compare-controls"><select id="compare-left" class="field-select" aria-label="左侧芯片">${chipOptions(leftId)}</select><span class="mono muted">↔</span><select id="compare-right" class="field-select" aria-label="右侧芯片">${chipOptions(rightId)}</select></div><div id="comparison-content"></div>`;
    updateComparison();
  }
  function updateComparison() {const a=chips.find(c=>c.id===$('#compare-left').value),b=chips.find(c=>c.id===$('#compare-right').value);
    const profile=c=>`<article class="compare-profile"><div class="eyebrow">${c.vendor} / ${c.status==='rumor'?'REPORTED':'PUBLIC MATERIAL'}</div><h2>${esc(c.name)}</h2><p>${esc(c.summary)}</p><div class="metric-row"><span><b>${esc(c.memory)}</b>${esc(c.memoryType)}</span><span><b>${esc(c.bandwidth)}</b>${esc(c.bandwidthType)}</span></div><p class="consumer-note">${esc(c.statusLabel)} · 不代表同条件性能对照</p></article>`;
    const rows=[['调度方式','control'],['存储路径','storage'],['计算资源','compute'],['互连与系统','network'],['软件与映射','software'],['可编程范围','flexibility'],['Prefill 关注点','prefill'],['Decode 关注点','decode'],['代价与约束','tradeoff']];
    const plainStorage=c=>c.family==='groq'?'权重分散在多个LPU的片上SRAM中。离计算近、访问快，本地容量却有限。':c.family==='hardwired'?'模型参与专用硬件设计，不能简单套用“换一份显存权重就换模型”的GPU思路。':c.family==='unknown'?'尚无足够公开资料，不能判断真实存储组织。':c.family==='zhenwu'?'数据经过全芯片LLC、CE共享L2和CU局部存储；AIU可把张量异步送入TSM。':'大容量显存放下权重与上下文，缓存和局部存储帮助重复使用已经搬近的数据。';
    const plainControl=c=>c.family==='groq'?'编译器先安排计算与数据移动的时刻；硬件沿预定计划执行。':c.family==='tpu'?'编译器把张量工作映射到矩阵和向量资源，不同单元分担不同任务。':c.family==='hardwired'?'先为模型定制执行路径；公开资料还不足以展开内部调度。':c.family==='unknown'?'未得到厂商确认，不把“类Groq”当作已经披露的调度器。':'软件把模型拆成kernel，GPU调度并行线程；局部单元执行普通或矩阵运算。';
    const qs=[['01','模型放在哪？',plainStorage],['02','谁安排计算？',plainControl],['03','扩大后要付什么代价？',c=>c.tradeoff]];
    $('#comparison-content').innerHTML=`<div class="compare-grid">${profile(a)}${profile(b)}</div><div class="plain-comparison">${qs.map(([n,title,fn])=>`<article><span class="question-number">QUESTION ${n}</span><h3>${title}</h3><div class="answer"><strong>${esc(a.short)}</strong>${esc(fn(a))}</div><div class="answer"><strong>${esc(b.short)}</strong>${esc(fn(b))}</div></article>`).join('')}</div><div class="callout"><strong>最重要的一点：</strong>设计在交换通用性、容量、吞吐和延迟，没有一个峰值数字能替代实际任务。先看能否装下、如何运行，再看同条件实测。</div><details class="paper advanced-table"><summary>想继续核对？展开完整技术对照</summary><p>HBM是高带宽显存；SRAM是片上静态存储；kernel是一个GPU计算任务；互连负责器件间交换数据。</p><table class="comparison-table"><thead><tr><th>观察维度</th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead><tbody>${rows.map(([title,key])=>`<tr><td>${title}</td><td>${esc(a[key])}</td><td>${esc(b[key])}</td></tr>`).join('')}<tr><td>证据与原图</td><td><button class="table-link" data-evidence="${a.id}">查看 ${a.sources.length} 份来源 ↗</button></td><td><button class="table-link" data-evidence="${b.id}">查看 ${b.sources.length} 份来源 ↗</button></td></tr></tbody></table></details>`;
  }
  function renderLab() {
    $('#view-lab').innerHTML=heading('03 / A SMALL EXPERIMENT','核心在算，还是在等？','用一个可检查的简化 Decode 模型，观察 batch、权重精度和显存带宽如何移动瓶颈。结果是理想下界，用来理解因果，不预测真实芯片跑分。')+`<div class="lab-layout"><div class="lab-control"><h2>只改变你关心的变量</h2>
      <div class="lab-field"><label for="lab-p">Dense 模型参数量 <output id="out-p">8 B</output></label><input id="lab-p" type="range" min="1" max="120" value="8" step="1"></div>
      <div class="lab-field"><label for="lab-b">并发 batch <output id="out-b">1</output></label><input id="lab-b" type="range" min="1" max="128" value="1" step="1"></div>
      <div class="lab-field"><label for="lab-q">权重存储位宽</label><select id="lab-q" class="field-select"><option value="16">16 bit / 2 bytes</option><option value="8">8 bit / 1 byte</option><option value="4" selected>4 bit / 0.5 bytes</option></select></div>
      <div class="lab-field"><label for="lab-s">上下文长度 <output id="out-s">4,096</output></label><input id="lab-s" type="range" min="512" max="32768" value="4096" step="512"></div>
      <div class="lab-field"><label for="lab-preset">带宽 / 容量参照</label><select id="lab-preset" class="field-select"><option value="rubin">Rubin · 22 TB/s / 288 GB</option><option value="amd">MI455X · 23.3 TB/s / 432 GB</option><option value="tpu8i">TPU 8i · 8.601 TB/s / 288 GB</option><option value="tpu8t">TPU 8t · 6.528 TB/s / 216 GB</option><option value="custom">自定义假设</option></select></div>
      <div class="lab-field"><label for="lab-bw">显存带宽 / TB/s</label><input id="lab-bw" type="number" value="22" min="0.1" max="1000" step="0.1"></div>
      <div class="lab-field"><label for="lab-cap">可用容量 / GB</label><input id="lab-cap" type="number" value="288" min="1" max="100000" step="1"></div>
      <div class="lab-field"><label for="lab-peak">有效计算上限 / TFLOP/s</label><input id="lab-peak" type="number" value="1000" min="1" max="100000" step="10"></div>
      <p class="lab-small">参照只填官方 HBM 带宽与容量。计算上限保持可编辑的同一假设，不混用不同芯片精度峰值。SRAM 与模型专用产品不套入该模型。</p></div>
      <div><div class="lab-chart"><div class="eyebrow">ROOFLINE / IDEALIZED DENSE DECODE</div><h2 id="lab-verdict"></h2><p>亮点表示当前工作负载 · 横轴为对数刻度</p><svg id="roofline" viewBox="0 0 650 345" role="img" aria-label="Roofline 性能模型"></svg><div id="capacity-message" class="lab-small"></div></div><div class="lab-results" id="lab-results"></div><div class="callout" id="lab-insight"></div></div></div>
      <div class="paper methodology"><h2>这个模型如何计算？</h2><div class="formula">F = 2 × P × B<br>KV bytes = 2 × L × Hkv × Dhead × S × B × 2<br>Bytes = P × (q / 8) + KV bytes<br>t ≥ max(F / C, Bytes / BW)<br>模型内存 ≈ 权重 + KV（不含临时空间）</div><p>P：总参数量；B：batch；q：权重存储位宽；S：上下文长度。固定示例假设：32 层、8 个 KV heads、head dimension 128、KV 为 BF16。所有 GB / TB 使用十进制。</p><p>模型假设每轮权重只从 HBM 读取一次、batch 内理想复用，并完整读取历史 KV。2PB 是 dense 权重矩阵工作的近似，省略 attention 计算、量化开销、kernel 调度、网络、缓存命中、运行时和中间张量。参数量变化不会自动改变层数，示例只用于隔离变量。因此延迟偏乐观，容量显示只是必要条件，不保证能部署；不适合 MoE、训练、Groq 或 Taalas。</p><p>带宽参照来源：${external(sourceById('rubin').url,'NVIDIA')} · ${external(sourceById('amdspec').url,'AMD')} · ${external(sourceById('tpu').url,'Google Cloud')}。这里将厂商带宽作为理想边界，没有进行实机测量。</p></div>`;
    updateLab();
  }
  function calculateLab(p,b,q,s,bw,cap,peak) {const weights=p*1e9*q/8,kv=2*32*8*128*s*b*2,bytes=weights+kv,flops=2*p*1e9*b,computeMs=flops/(peak*1e12)*1000,memoryMs=bytes/(bw*1e12)*1000,ms=Math.max(computeMs,memoryMs);return {weights,kv,bytes,flops,computeMs,memoryMs,ms,ai:flops/bytes,attainable:Math.min(peak,bw*flops/bytes),fits:bytes<=cap*1e9,requiredGB:bytes/1e9};}
  function updateLab() {
    const values=['p','b','q','s','bw','cap','peak'].map(id=>Number($('#lab-'+id).value));
    if(values.some(v=>!Number.isFinite(v)||v<=0)){toast('请输入大于零的有效参数');return;}
    const [p,b,q,s,bw,cap,peak]=values,r=calculateLab(...values);
    $('#out-p').textContent=p+' B';$('#out-b').textContent=b;$('#out-s').textContent=s.toLocaleString('en-US');
    const memoryBound=r.memoryMs>r.computeMs;
    $('#lab-verdict').textContent=!r.fits?'先遇到容量边界':memoryBound?'此时，主要在等数据。':'此时，主要受计算限制。';
    $('#capacity-message').textContent=`权重 ${ (r.weights/1e9).toFixed(2)} GB + KV ${(r.kv/1e9).toFixed(2)} GB = ${r.requiredGB.toFixed(2)} GB / 容量 ${cap} GB。${r.fits?'仍需为临时张量和运行时预留空间。':'超出单器件容量，下方时间只是假设能装下时的理论量。'}`;
    $('#lab-results').innerHTML=`<div class="result"><b>${r.ms.toFixed(2)} <small>ms</small></b><span>每轮理想延迟下界</span><small>${!r.fits?'容量不满足，无法据此部署':'不等于实测 token 延迟'}</small></div><div class="result"><b>${r.ai.toFixed(2)}</b><span>FLOP / byte · 运算强度</span><small>batch 影响权重的摊销程度</small></div><div class="result"><b>${r.requiredGB.toFixed(1)} <small>GB</small></b><span>权重 + 历史 KV</span><small>未包含额外内存占用</small></div>`;
    $('#lab-insight').textContent=`计算时间下界 ${r.computeMs.toFixed(3)} ms；访存时间下界 ${r.memoryMs.toFixed(3)} ms。${memoryBound?'增加有效计算上限对当前理想下界没有帮助；可以观察增大 batch 如何摊销权重流量，但 KV 需求也会随并发增长。':'此时继续增加带宽收益有限；增加计算能力才会移动计算边界。'}${!r.fits?'当前模型不能单器件容纳，需减小规模 / 并发 / 上下文或考虑分片，分片通信不在模型内。':''}`;
    const width=650,height=345,left=62,right=25,top=34,bottom=52,plotW=width-left-right,plotH=height-top-bottom,minX=.1,maxX=Math.max(10000,Math.pow(10,Math.ceil(Math.log10(peak/bw*10)))),maxY=peak*1.27;
    const x=v=>left+(Math.log10(Math.max(minX,v))-Math.log10(minX))/(Math.log10(maxX)-Math.log10(minX))*plotW,y=v=>top+plotH-(v/maxY)*plotH;
    let svg=`<title>Roofline：运算强度与理想计算吞吐上界</title><desc>当前运算强度 ${r.ai.toFixed(2)} FLOP 每 byte，${memoryBound?'访存':'计算'}限制；容量${r.fits?'满足最低模型假设':'不满足'}。</desc>`;
    for(let i=0;i<=4;i++){const val=peak*i/4;svg+=`<path d="M${left} ${y(val)}H${width-right}" stroke="#4a65422b"/><text x="${left-10}" y="${y(val)+4}" text-anchor="end" fill="#7e9b71" font-family="Consolas,monospace" font-size="10">${Math.round(val)}</text>`;}
    for(let val=minX;val<=maxX;val*=10){svg+=`<path d="M${x(val)} ${top}V${height-bottom}" stroke="#4a65422b"/><text x="${x(val)}" y="${height-bottom+22}" text-anchor="middle" fill="#7e9b71" font-family="Consolas,monospace" font-size="10">${val}</text>`;}
    const ridge=peak/bw,px=x(r.ai),py=y(r.attainable);
    svg+=`<path d="M${x(minX)} ${y(Math.min(peak,bw*minX))}L${x(Math.min(maxX,ridge))} ${y(Math.min(peak,bw*maxX))}L${x(maxX)} ${y(peak)}" fill="none" stroke="#a8c895" stroke-width="2"/><path d="M${px} ${height-bottom}V${py}" stroke="#bce9a5" stroke-dasharray="3 5"/><circle cx="${px}" cy="${py}" r="12" fill="#bce9a51c"/><circle cx="${px}" cy="${py}" r="5" fill="${r.fits?'#bce9a5':'#d8b37d'}"/><text x="${Math.min(width-120,Math.max(left+10,px+14))}" y="${Math.max(top+10,py-15)}" fill="#d6ebc7" font-family="Consolas,monospace" font-size="11">${r.attainable.toFixed(1)} TFLOP/s</text><text x="${left}" y="17" fill="#88a67a" font-size="10">理想上界 / TFLOP/s</text><text x="${width-right}" y="${height-5}" text-anchor="end" fill="#88a67a" font-size="10">运算强度 / FLOP per byte（log₁₀）</text><text x="${Math.min(width-150,x(ridge)+15)}" y="${y(peak)-11}" fill="#96b385" font-size="10">假设计算上限 ${peak}</text>`;
    $('#roofline').innerHTML=svg;
    window.OBS_DETAIL.recolor($('#roofline'));
  }
  function renderSources() {$('#view-sources').innerHTML=heading('05 / TRACE EVERY CLAIM','让每一张图，都有来处。','来源分级不等于结论正确与否。官方资料可以确认“厂商公开了什么”；媒体报道只用于保留线索。架构原理、厂商性能宣称与独立实测始终分开。')+`<div class="source-toolbar"><input id="source-search" class="search-input" placeholder="搜索厂商、芯片、资料或证据缺口…" aria-label="搜索来源"><button data-filter="all" class="filter-button active">全部 ${sources.length}</button><button data-filter="official" class="filter-button">官方资料</button><button data-filter="paper" class="filter-button">论文</button><button data-filter="code" class="filter-button">源码</button><button data-filter="report" class="filter-button">报道线索</button><button data-filter="policy" class="filter-button">许可与平台</button></div><div id="source-results"></div><div class="callout">审阅日期 ${reviewed}。本页为一次人工核对的资料快照，未连接自动更新服务。“未公开”表示本次查阅的资料不足以支持具体结构，不代表厂商没有相关设计。</div>`;sourceFilter='all';updateSources();}
  function updateSources() {const q=($('#source-search').value||'').toLowerCase(),matches=sources.filter(s=>(sourceFilter==='all'||s.type===sourceFilter)&&[s.title,s.publisher,s.supports,s.limit].join(' ').toLowerCase().includes(q));$('#source-results').innerHTML=matches.length?matches.map(s=>`<article class="source-row"><span class="source-no">${String(sources.indexOf(s)+1).padStart(2,'0')}</span><div><h3>${esc(s.title)}</h3><div class="source-meta"><span class="source-type">${({official:'官方',paper:'论文',code:'源码',report:'报道',policy:'平台规则'})[s.type]||'资料'}</span>${esc(s.publisher)} / ${esc(s.date)}</div><p><b>支持：</b>${esc(s.supports)}<br><b>边界：</b>${esc(s.limit)}</p>${s.images?s.images.map(im=>external(im.url,esc(im.label),'source-caption')).join(' · '):''}</div>${external(s.url,'原始资料')}</article>`).join(''):'<p class="empty">没有匹配资料。试试厂商英文名、芯片名或“互连”。</p>';}
  function persistNotes() {if(!storageAvailable)return false;try{localStorage.setItem(savedKey,JSON.stringify(notes));return true;}catch{storageAvailable=false;return false;}}
  function saveNote(){const sel=$('#note-chip'),editor=$('#note-text');if(!sel||!editor)return;notes[sel.value]=editor.value;const saved=persistNotes();$('#note-status').textContent=saved?'已保存在此浏览器':'未能保存到浏览器，请导出备份';}
  function renderNotes() {$('#view-notes').innerHTML=heading('06 / THINK IN YOUR OWN WORDS','留一个问题，下次接着想。','每颗芯片有独立笔记。内容保存在当前浏览器，不会上传到网站或 GitHub；导出后可作为后续迭代的研究素材。')+`${storageAvailable?'':'<div class="storage-warning">浏览器本地存储不可用。仍可编辑，但离开前请导出备份。</div>'}<div class="notes-layout"><aside class="notes-sidebar"><label for="note-chip">当前研究对象</label><select id="note-chip" class="field-select">${chipOptions(state.chip)}</select><p>建议记录：<br>① 哪个设计选择最关键？<br>② 还缺哪份证据？<br>③ 下一次想比较什么？</p><p>笔记只存在此浏览器。清理站点数据或更换设备后不会自动迁移。</p></aside><div><textarea id="note-text" class="note-editor" aria-label="研究笔记" placeholder="例如：Groq 的 SRAM 换来了低延迟，但模型跨 LPU 分布后，通信会在什么规模成为新的瓶颈？"></textarea><div class="note-toolbar"><button id="export-notes">导出全部笔记 .json ↓</button><button class="notes-import">导入备份 ↑<input id="import-notes" type="file" accept=".json,application/json" aria-label="导入笔记备份"></button><span id="note-status" class="note-status">${storageAvailable?'保存在当前浏览器':'请导出备份'}</span></div></div></div><div class="paper"><h2>持续修订这份观察室</h2><p class="lab-small">资料与芯片条目集中在 data.js，交互逻辑在 app.js，视觉样式在 styles.css。修改来源时保留审阅日期与证据等级；新增架构优先补足数据路径、代价、来源与未知项，再扩展动画。</p><p class="lab-small">这里的笔记不是网站在线编辑器。要公开笔记或修改站点内容，需要主动更新项目源码并发布。</p></div>`;$('#note-text').value=notes[state.chip]||'';}
  function renderView() {const labels={explore:'从原图拆芯片',case:'DeepSeek 怎么跑',operator:'算子执行显微镜',compare:'看懂设计差异',lab:'瓶颈实验',sources:'原始资料',notes:'我的笔记',rdma:'RDMA与集群互连'};$$('.view').forEach(el=>el.hidden=el.id!=='view-'+state.view);$$('nav [data-view]').forEach(el=>{const on=el.dataset.view===state.view;el.classList.toggle('active',on);if(on)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});$('#breadcrumb').textContent=labels[state.view];if(state.view==='explore')renderExplore();if(state.view==='case')window.OBS_CASE.render();if(state.view==='operator')window.OBS_OPERATOR.render();if(state.view==='rdma')window.OBS_RDMA.render();if(state.view==='compare')renderCompare();if(state.view==='lab')renderLab();if(state.view==='sources')renderSources();if(state.view==='notes')renderNotes();window.OBS_REVIEW.mount(state.view);}
  document.addEventListener('click',event=>{
    const target=event.target.closest('button,a,[data-node],[data-open-figure],[data-matrix-cell],[data-op-module],[data-rd-node],[data-mt-module],[data-mc-task]');if(!target)return;
    if(window.OBS_RDMA.click(target)){if(state.view==='rdma')updateHash();return;}
    if(window.OBS_OPERATOR.click(target)){if(state.view==='operator')updateHash();return;}
    if(window.OBS_DETAIL.figureClick(target,current(),state)){if(state.layer==='matrix'){renderInspector();renderStages();}return;}
    if(window.OBS_CASE.click(target)){if(state.view==='case')updateHash();return;}
    const nextLayer=target.dataset.layer||target.dataset.enterLayer;if(nextLayer){pause();state.layer=nextLayer;state.stage=0;state.node=stageNodes()[0];renderExplore();updateHash();if(target.dataset.enterLayer)$('#layer-nav').scrollIntoView({block:'start',behavior:'instant'});return;}
    if(target.dataset.chip){selectChip(target.dataset.chip);return;}
    if(target.dataset.phase){pause();state.phase=target.dataset.phase;renderExplore();updateHash();return;}
    if(target.dataset.stage!==undefined){pause();state.stage=Number(target.dataset.stage);state.node=stageNodes()[state.stage];renderDiagram();renderInspector();renderStages();updateHash();return;}
    if(target.dataset.node){state.node=state.layer==='overview'&&['control','vector'].includes(target.dataset.node)?(target.dataset.node==='control'?'cache':'compute'):target.dataset.node;pause();renderDiagram();renderInspector();return;}
    if(target.dataset.evidence){showEvidence(target.dataset.evidence);return;}
    if(target.dataset.filter){sourceFilter=target.dataset.filter;$$('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===sourceFilter));updateSources();return;}
    if(target.dataset.image){const host=target.closest('.dialog-source').querySelector('.original-image');host.innerHTML=`<img src="${esc(target.dataset.image)}" alt="${esc(target.dataset.imageLabel)}" loading="lazy"><p class="source-caption">来源：Google Cloud。原图版权归发布方；点击下方链接可查看原图。</p>${external(target.dataset.image,'在原站打开原图')}`;host.querySelector('img').addEventListener('error',()=>{host.querySelector('img').remove();toast('原图未能加载，可在发布方网站查看');});return;}
    if(target.matches('a[href^="#"]')){event.preventDefault();const v=target.getAttribute('href').slice(1);if(['explore','case','operator','compare','lab','sources','notes','rdma'].includes(v)){if(state.view==='notes')saveNote();pause();window.OBS_CASE.pause();window.OBS_OPERATOR.pause(false);window.OBS_RDMA.pause(false);state.view=v;updateHash();renderView();window.scrollTo({top:0,behavior:'instant'});}return;}
    if(target.id==='play'){state.playing?pause():play();return;}if(target.id==='step'){pause();advance();return;}
    if(target.id==='close-dialog'){$('#source-dialog').close();return;}
    if(target.id==='share'){const url=location.href;const fallback=()=>{toast('自动复制不可用，当前地址已包含芯片和步骤');};if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url).then(()=>toast('当前架构与步骤的链接已复制')).catch(fallback);else fallback();return;}
    if(target.id==='export-svg'){const c=current(),svg=$('#architecture').cloneNode(true),box=svg.getAttribute('viewBox').split(/\s+/).map(Number),w=box[2],h=box[3]+45;svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width',String(w));svg.setAttribute('height',String(h));svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.insertAdjacentHTML('afterbegin',`<rect width="${w}" height="${h}" fill="#f7f9fb"/>`);svg.insertAdjacentHTML('beforeend',`<text x="35" y="${h-17}" fill="#87a1b6" font-size="12" font-family="sans-serif">${esc(c.name)} · ${esc(state.layer)} · 功能重绘 / 非物理布局 · ${reviewed} · © DOCLUKA77</text>`);download(c.id+'-'+state.layer+'.svg',new XMLSerializer().serializeToString(svg),'image/svg+xml');toast('已导出当前层级图（含版本说明与署名）');return;}
    if(target.id==='export-notes'){saveNote();download('chip-observatory-notes.json',JSON.stringify({schema:1,exported:new Date().toISOString(),notes},null,2),'application/json');toast('全部笔记已导出');return;}
  });
  document.addEventListener('keydown',event=>{const node=event.target.closest('[data-node],[data-matrix-cell],svg [data-op-module],svg [data-rd-node],[data-mt-module],[data-mc-task]');if(node&&(event.key==='Enter'||event.key===' ')){event.preventDefault();node.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
  document.addEventListener('input',event=>{if(window.OBS_RDMA.input(event.target)){updateHash();return;}if(window.OBS_OPERATOR.input(event.target)){updateHash();return;}if(window.OBS_CASE.input(event.target)){updateHash();return;}if(event.target.id==='source-search')updateSources();if(event.target.id.startsWith('lab-')){if(['lab-bw','lab-cap'].includes(event.target.id))$('#lab-preset').value='custom';updateLab();}if(event.target.id==='note-text'){const id=$('#note-chip').value;notes[id]=event.target.value;clearTimeout(noteTimer);$('#note-status').textContent='保存中…';noteTimer=setTimeout(saveNote,350);}});
  document.addEventListener('change',event=>{
    if(event.target.id==='speed'){state.speed=Number(event.target.value);if(state.playing)play();}
    if(['compare-left','compare-right'].includes(event.target.id))updateComparison();
    if(event.target.id==='lab-q')updateLab();
    if(event.target.id==='lab-preset'){const presets={rubin:[22,288],amd:[23.3,432],tpu8i:[8.601,288],tpu8t:[6.528,216]},p=presets[event.target.value];if(p){$('#lab-bw').value=p[0];$('#lab-cap').value=p[1];}updateLab();}
    if(event.target.id==='note-chip'){clearTimeout(noteTimer);persistNotes();$('#note-text').value=notes[event.target.value]||'';$('#note-status').textContent=storageAvailable?'保存在当前浏览器':'请导出备份';}
    if(event.target.id==='import-notes'){const file=event.target.files?.[0];if(!file)return;if(file.size>2*1024*1024){toast('备份文件过大，限制为 2 MB');return;}file.text().then(raw=>{const payload=JSON.parse(raw);if(payload.schema!==1||!payload.notes||typeof payload.notes!=='object'||Array.isArray(payload.notes))throw new Error('format');let count=0;for(const c of chips){if(typeof payload.notes[c.id]==='string'){const imported=payload.notes[c.id].slice(0,200000);notes[c.id]=notes[c.id]&&notes[c.id]!==imported?notes[c.id]+'\n\n—— 导入笔记 ——\n'+imported:imported;count++;}}persistNotes();$('#note-text').value=notes[$('#note-chip').value]||'';$('#note-status').textContent=storageAvailable?'已导入并保存在此浏览器':'已导入，请导出备份';toast(`已合并 ${count} 份笔记，现有内容已保留`);}).catch(()=>toast('无法读取备份：需要本观察室导出的 JSON 文件'));}
  });
  $('#source-dialog').addEventListener('click',event=>{if(event.target===$('#source-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
  window.addEventListener('hashchange',()=>{if(state.view==='notes')saveNote();pause();window.OBS_CASE.pause();window.OBS_OPERATOR.pause(false);window.OBS_RDMA.pause(false);parseHash();renderView();});
  window.addEventListener('pagehide',()=>{if(state.view==='notes')saveNote();pause();window.OBS_CASE.pause();window.OBS_OPERATOR.pause(false);window.OBS_RDMA.pause(false);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();window.OBS_CASE.pause();window.OBS_OPERATOR.pause(false);window.OBS_RDMA.pause(false);}});
  document.addEventListener('observatory:operator-location',()=>{if(state.view==='operator')updateHash();});
  document.addEventListener('observatory:rdma-location',()=>{if(state.view==='rdma')updateHash();});
  parseHash();renderView();
})();

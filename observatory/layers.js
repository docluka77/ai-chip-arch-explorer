/* Original interactive redraws. Counts and boundaries are linked to vendor sources. */
'use strict';
(() => {
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=s=>document.querySelector(s);
  const figures=window.OBS_FIGURES;
  const selectedFigures={};
  let infoMap={},matrixK=0,matrixFocus=0;
  const levelSets={
    rtx5090:[['chip','整颗 GPU'],['gpc','GPC'],['tpc','TPC'],['sm','SM'],['partition','SM 子分区'],['matrix','矩阵运算']],
    zhenwu:[['chip','CE / CU 层级'],['cu','CU 内部'],['matrix','矩阵运算']],
    tpu8i:[['overview','芯片概览'],['matrix','矩阵运算']],tpu8t:[['overview','芯片概览'],['matrix','矩阵运算']],
    rx9070:[['cu','CU 功能分工'],['matrix','矩阵运算']],groq:[['core','LPU 内部'],['overview','快速概览']]
  };
  const levels=c=>levelSets[c.id]||[['overview','快速概览']];
  function renderGallery(c,preferredLayer) {
    const d=figures[c.id];
    $('#chip-takeaway').innerHTML=`<div><h2 class="takeaway-heading">${esc(c.headline)}</h2><p>${esc(c.summary)}</p></div><div class="takeaway-stats"><span><b>${esc(c.memory)}</b>${esc(c.memoryType)}</span><span><b>${esc(c.bandwidth)}</b>${esc(c.bandwidthType)}</span></div>`;
    if(!d?.figures?.length){$('#official-gallery').innerHTML=`<div class="official-header"><div><span class="chapter-tag">先看证据 / ORIGINAL MATERIAL</span><h2>暂无核实到的官方内部架构图</h2></div><span class="official-kind">保留证据缺口</span></div><div class="official-source-only"><span>?</span><div><h3>这里不借用别家图代替</h3><p>本次只找到字节芯片研发的媒体报道，尚未核实到可公开引用的官方微架构图。后续拿到白皮书或厂商资料，可直接补入原图档案。</p><a href="${esc(window.OBS_DATA.sources.find(s=>s.id==='bytedance').url)}" target="_blank" rel="noopener noreferrer">查看目前的报道线索 ↗</a></div></div>`;return;}
    if(preferredLayer){const match=d.figures.findIndex(f=>f.layer===preferredLayer);if(match>=0)selectedFigures[c.id]=match;}
    const i=Math.min(d.figures.length-1,selectedFigures[c.id]||0),f=d.figures[i];
    $('#official-gallery').innerHTML=`<div class="official-header"><div><span class="chapter-tag">第一步 / READ THE OFFICIAL FIGURE</span><h2>${esc(f.title)}</h2></div><span class="official-kind">${esc(f.kind)}</span></div><div class="figure-tabs">${d.figures.map((fig,j)=>`<button data-figure-index="${j}" class="${i===j?'active':''}" aria-pressed="${i===j}">${esc(fig.title)}</button>`).join('')}</div><div class="official-body"><figure class="official-figure"><div class="official-image-frame"><img data-open-figure="${c.id}" src="${esc(f.image)}" alt="${esc(f.title)}，${esc(f.copyright)}${f.page?'，PDF第'+f.page+'页':''}" loading="eager" decoding="async"></div><figcaption>${esc(f.copyright)} · ${esc(d.version)}${f.figure?' · Figure '+esc(f.figure):''}${f.page?' · PDF 第 '+f.page+' 页':''}。原图未改结构，权利属于原作者。<br><a href="${esc(f.source||f.original)}${f.page?'#page='+f.page:''}" target="_blank" rel="noopener noreferrer">打开官方原始文档 ↗</a></figcaption></figure><aside class="official-guide"><span class="guide-no">01 /</span><h3>${esc(d.guide?.[0]||'先确认原图的版本与范围')}</h3><p>${esc(d.guide?.[1]||'原图与交互重绘分开呈现，避免把教学结构当作厂商披露。')}</p><p class="limit-note">${esc(c.id==='rtx5090'?'零售卡启用配置与完整芯片模板分开。底下的交互图会再次提醒。':c.id==='zhenwu'?'原文写10 CE×4 CU，又称总39 CU。这里保留这处差异，不自行解释。':f.kind.includes('非')?'这类原图并没有披露芯片内部，下面的解释不会冒充官方框图。':'原图版本与资料日期可在“原始资料”中追溯；连线不表示实测延迟。')}</p></aside></div>`;
    const img=$('#official-gallery img');img.addEventListener('error',()=>{img.closest('.official-image-frame').innerHTML=`<div class="fig-loading">原站图片暂未加载。<br><a href="${esc(f.original)}" target="_blank" rel="noopener noreferrer">直接打开官方图或原文 ↗</a></div>`;},{once:true});
  }
  function openFigure(c) {const d=figures[c.id],f=d?.figures[selectedFigures[c.id]||0];if(!f)return;$('#figure-dialog-content').innerHTML=`<h2>${esc(f.title)}</h2><div class="figure-tools"><span>${esc(f.copyright)}${f.page?' · PDF 第 '+f.page+' 页':''}</span><button data-toggle-zoom>切换原尺寸 / 适应窗口</button><a href="${esc(f.original)}" target="_blank" rel="noopener noreferrer">官方原图 / PDF ↗</a></div><div class="figure-scroll"><img src="${esc(f.image)}" alt="${esc(f.title)}"></div>`;$('#figure-dialog').showModal();}
  function renderNav(c,state){const ls=levels(c);if(!ls.some(([id])=>id===state.layer)&&state.layer!=='overview')state.layer=ls[0][0];$('#layer-nav').innerHTML=ls.map(([id,label],i)=>`<button data-layer="${id}" class="${state.layer===id?'active':''}" aria-pressed="${state.layer===id}"><span class="layer-depth">L${i}</span>${label}</button>`).join('')+(!ls.some(([id])=>id==='overview')?`<button data-layer="overview" class="overview-layer ${state.layer==='overview'?'active':''}" aria-pressed="${state.layer==='overview'}">保留的简化概览</button>`:'');}
  function stageNode(c,layer,step){const maps={gpc:['input','raster','tpc0','rop','output'],tpc:['input','polymorph','sm0','texture','output'],sm:['sub0','sub1','sub2','shared','graphics'],partition:['scheduler','register','alu','tensor','lsu'],cu:['scheduler','register','tfu','tsm','lsu'],core:['control','sram','matrix','vector','c2c'],matrix:['input','register','tensor','accumulator','output']};return (maps[layer]||['memory','cache','compute','network','output'])[step];}
  function render(svg,c,state){
    if(state.layer==='overview'&&c.id!=='zhenwu')return false;
    infoMap={};const layer=state.layer==='overview'?'chip':state.layer;let nodes=[],edges=[],extras=[];
    const active=stageNode(c,layer,state.stage),W=1100,H=620;
    const source=c.id==='rtx5090'?'detail-rtx5090':c.id==='zhenwu'?'detail-zhenwu':c.id==='rx9070'?'detail-rx9070':c.id==='groq'?'detail-groq':'tpu';
    const text=(x,y,t,size=17,color='#6889a2',attrs='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${attrs}>${esc(t)}</text>`;
    const add=(id,x,y,w,h,title,sub,body,drill=null,kind='compute',extra='')=>{nodes.push({id,x,y,w,h,title,sub,body,drill,kind,extra});infoMap[id]={title,tag:sub,body,insight:drill?'点击该模块可进入下一层；下方层级按钮也可直接跳转。':'图中是公开功能组织的重绘，位置与线长不表示实际布局或周期。',source,drill};};
    const line=(points,target='')=>edges.push(`<polyline points="${points}" fill="none" stroke="${target===active?'#5d8daf':'#b8cbd9'}" stroke-width="${target===active?'2.4':'1.5'}" marker-end="url(#detail-arrow)" class="flow ${target===active?'active-flow':''}"/>`);
    const littleGrid=(x,y,cols,rows,w=12,gap=5)=>Array.from({length:cols*rows},(_,i)=>`<rect x="${x+i%cols*(w+gap)}" y="${y+Math.floor(i/cols)*(w+gap)}" width="${w}" height="${w}" rx="2" fill="${state.stage===2&&i%3===0?'#719fbe':'#cfdee9'}" stroke="#afc6d7"/>`).join('');
    let title='',subtitle='',foot='',page=null;
    if(c.id==='rtx5090'&&layer==='chip'){
      title='完整 GB202 组织 · RTX Blackwell 架构样本';subtitle='12 GPC × 8 TPC × 2 SM = 192 SM（完整设计模板）';page=8;
      add('memory',35,110,180,350,'GDDR7 控制器','512-bit 接口','完整芯片有16个32-bit显存控制器。零售RTX5090为32GB GDDR7；容量是板卡配置，不能从结构框图猜测。',null,'memory',text(54,205,'权重 / KV Cache',15)+littleGrid(56,235,6,5,16,6));
      add('cache',255,110,580,70,'L2 Cache · 完整设计 128 MB','RTX 5090 成品为 96 MB','完整GB202与零售RTX5090的L2容量不同。L2在片上为SM提供共享的数据存取层。',null,'memory');
      for(let i=0;i<12;i++){const x=255+i%6*98,y=212+Math.floor(i/6)*119;add('gpc'+i,x,y,90,94,'GPC '+(i+1),'8 TPC','每个完整GPC包含8个TPC，每个TPC有2个SM。这里只展开完整设计模板；不知道零售卡屏蔽的具体位置。','gpc','compute',text(x+13,y+73,'进入 ↗',12,'#648fae'));}
      add('compute',255,463,580,62,'192 SM 是完整设计；170 SM 是 RTX 5090','点击任意 GPC 继续展开','不能将完整GB202的192 SM标成零售RTX5090的实际启用数量。RTX5090启用170SM、680TensorCore、21760 CUDA cores。','gpc','note');
      add('network',875,110,190,145,'PCIe 5.0 ×16','主机连接','主机通过PCIe与显卡交互。这里没有将数据中心NVLink或Rubin资源移植到消费卡。',null,'network');
      add('output',875,300,190,160,'工作分发 / 其他资源','GigaThread / NVENC 等','芯片还含多媒体、图形与系统资源。该深入路径重点是计算层次，完整模块可对照上方官方原图。',null,'control');
      line('215,282 235,282 235,145 255,145','cache');line('545,180 545,206','gpc0');line('835,145 875,145','network');
      foot='这里忠实区分完整芯片与零售启用配置；不猜测被屏蔽的 SM / TPC 位置。';
    }else if(c.id==='rtx5090'&&layer==='gpc'){
      title='一个完整 GPC · Graphics Processing Cluster';subtitle='8 个 TPC × 每 TPC 2 个 SM = 16 个 SM';page=9;
      add('input',35,100,190,370,'来自 L2 / 工作分发','逻辑入口','数据和工作分发是不同资源；本连线仅引导阅读，不表示所有访存都经过一个串行控制模块。',null,'memory',text(54,205,'访问缓存 / 提交工作',14));
      add('raster',270,100,570,65,'Raster Engine','图形光栅化资源','GPC内的图形光栅化资源。LLM矩阵运算不应被画成必须经过光栅化。',null,'control');
      for(let i=0;i<8;i++){const x=270+i%4*145,y=200+Math.floor(i/4)*133;add('tpc'+i,x,y,135,108,'TPC '+(i+1),'2 SM + PolyMorph','一个TPC包含两个SM及一个PolyMorph Engine；点开继续看SM与图形资源。','tpc','compute',text(x+15,y+85,'进入 TPC ↗',12,'#5f89a7'));}
      add('rop',880,100,185,160,'ROP 分区 ×2','每分区 8 ROP','这是官方GPC图里的图形输出资源，不是MoE token归约器。',null,'control');
      add('output',880,302,185,168,'继续拆解','TPC → SM','两个SM位于一个TPC中，进一步选择任意SM即可看四个子分区。','tpc','note');
      line('225,282 250,282 250,254 270,254','tpc0');line('840,132 880,132','rop');foot='连线表示阅读与职责关系；图形资源与 AI 计算路径没有强行串为一条流水线。';
    }else if(c.id==='rtx5090'&&layer==='tpc'){
      title='一个 TPC · 两个 SM 与 PolyMorph Engine';subtitle='Texture Processing Cluster 的官方资源分组';page=9;
      add('input',40,140,200,310,'来自 GPC / L2','工作与数据来源','每个SM执行可编程线程。缓存访问和调度控制并不是同一条物理总线。',null,'memory');
      add('polymorph',285,100,530,75,'PolyMorph Engine','图形几何处理','这是TPC内的图形相关资源，不直接代表LLM矩阵核心。',null,'control');
      add('sm0',285,215,250,260,'SM 0','4 个子分区','SM内含可编程执行资源、TensorCore、共享存储、纹理与光追资源。点击进入详细结构。','sm','compute',littleGrid(308,290,4,4,29,9)+text(307,450,'进入 SM ↗',14,'#5983a2'));
      add('sm1',565,215,250,260,'SM 1','4 个子分区','同一TPC中的另一个SM。图不表示零售卡具体屏蔽状态。','sm','compute',littleGrid(587,290,4,4,29,9)+text(587,450,'进入 SM ↗',14,'#5983a2'));
      add('texture',860,100,200,175,'纹理资源在 SM 内','每 SM 4 个 Tex','这里提前指出纹理单元的位置，下一层展示其与SM子分区共享的资源。',null,'control');
      add('output',860,315,200,160,'下一层看什么？','调度 / RF / ALU / Tensor','SM不是一个不透明方块；下一层分开看调度、寄存器、普通运算与矩阵运算。','sm','note');
      line('240,290 285,290','sm0');line('550,175 550,198 410,198 410,215','sm0');foot='TPC 与 SM 是具体的硬件层级；“PE”并不是这些文档中所有模块的统一名称。';
    }else if(c.id==='rtx5090'&&layer==='sm'){
      title='SM 内部 · 四个执行子分区与公共资源';subtitle='每 SM：128 FP32/INT32 · 4 Tensor Core · 256 KB RF · 128 KB L1/Shared';page=11;
      for(let i=0;i<4;i++){const x=35+i*266;add('sub'+i,x,105,250,290,'子分区 '+(i+1),'1 Scheduler / 64 KiB RF','每个子分区有L0指令缓存、warp scheduler、dispatch、寄存器、统一FP32/INT32单元、一个第五代TensorCore，以及LD/ST和SFU。','partition','compute',text(x+17,183,'32 FP32 / INT32',17)+text(x+17,215,'1 × 第五代 Tensor Core',15)+text(x+17,248,'LD/ST ×4（原图方块）',14)+text(x+17,281,'SFU ×1（原图方块）',14)+text(x+17,356,'进入子分区 ↗',14,'#5483a5'));}
      add('shared',35,422,650,70,'128 KB L1 Data Cache / Shared Memory','四个子分区共享的 SM 级资源','L1缓存和程序显式使用的共享内存是一组片上资源。实际分配、访问与同步依赖指令和kernel。',null,'memory');
      add('graphics',710,422,389,70,'4 × Tex + 1 × 第四代 RT Core','图形 / 光追资源','这些资源在官方SM图里保留，但不是把LLM attention和FFN都映射到光追单元。',null,'control');
      foot='RTX 文档没有披露数据中心 Blackwell 的 TMEM；本图不移植 TMEM，也不推断私有队列或仲裁细节。';
    }else if(c.id==='rtx5090'&&layer==='partition'){
      title='一个 SM 子分区 · 调度、寄存器与执行资源';subtitle='32 个统一 FP32 / INT32 单元；在给定周期作为其中一种工作';page=12;
      add('scheduler',35,95,1030,65,'L0 i-Cache → Warp Scheduler → Dispatch','原图标注：32 thread / clk','warp scheduler选择可发射的工作；dispatch不是把所有执行单元在每周期无条件一起启动。',null,'control');
      add('register',35,190,1030,65,'Register File · 16,384 × 32-bit registers = 64 KiB','操作数与中间值靠近执行资源','每子分区寄存器容量可由原图计数计算；四个子分区合计256KiB。寄存器不足会影响并发或导致spill。',null,'memory');
      add('alu',35,295,490,210,'32 × FP32 / INT32 unified lanes','同一组功能资源，不是两组各32','v1.1明确这些单元可作FP32或INT32；不要把它们重复计数成32FP32加32INT32。',null,'compute',littleGrid(58,363,8,4,25,11));
      add('tensor',555,295,255,210,'第五代 Tensor Core','矩阵乘累加 / 多种精度','矩阵指令表达tile级运算，物理PE数量与布线未公开。点击后看标注清楚的4×4数学教学例子。','matrix','tensor',text(574,390,'D = A × B + C',18,'#5f88a7')+text(574,471,'进入矩阵运算 ↗',13,'#5985a7'));
      add('lsu',840,295,225,91,'LD/ST ×4','原图功能块','Load/Store相关资源参与数据搬运；具体吞吐和调度依赖指令及数据布局。',null,'memory');
      add('sfu',840,411,225,94,'SFU ×1','原图功能块','特殊函数单元属于子分区功能组织；图不提供全部内部实现和每种操作的周期数。',null,'control');
      line('550,160 550,190','register');line('280,255 280,295','alu');line('680,255 680,295','tensor');line('950,255 950,295','lsu');
      foot='32 个 lane 方格用于表达公开功能数量；排布不是物理版图。Tensor Core 内部的物理 PE 维度仍未披露。';
    }else if(c.id==='zhenwu'&&layer==='chip'){
      title='真武 M890 · 公开的 CE / CU 与缓存组织';subtitle='版本：架构简介 v1.0 · 不套用于 V900';page=9;
      add('memory',35,115,190,355,'全局内存 / LLC','片外与共享存储','M890文档公开三级缓存：CU局部L1、CE内共享L2、全芯片共享LLC。',null,'memory',text(53,211,'LLC / L2 / L1',17));
      add('cache',270,105,560,70,'CE 内共享 L2','全芯片 CE 再共享 LLC','这里画两个CE作为层级示例；不是按比例列出所有计算引擎。',null,'memory');
      for(let ce=0;ce<2;ce++){const x=270+ce*291;extras.push(`<rect x="${x}" y="210" width="270" height="259" rx="8" fill="#edf3f8" stroke="#bdd0de"/>`+text(x+18,240,'CE 示例 '+(ce+1),18));for(let cu=0;cu<4;cu++){const xx=x+15+cu%2*126,yy=266+Math.floor(cu/2)*94;add('cu'+ce+cu,xx,yy,115,79,'CU '+(cu+1),'进入内部 ↗','一个CU内有L1、TSM、寄存器、线程调度与向量/张量/标量/特殊函数/访存资源。','cu');}}
      add('network',875,105,190,165,'GD / 调度与互连','公开功能组织','全局分发与CE/CU执行分层理解。更大的OAM/ICN系统拓扑可在官方原图中切换查看。',null,'control');
      add('output',875,315,190,155,'原文数量待解释','总39 CU vs 10×4','文档同时称总39CU和10CE×4CU。此处保留差异，不推断某个CU被屏蔽。',null,'note');
      line('225,280 249,280 249,140 270,140','cache');foot='只重绘公开的功能层次。原文计数差异已保留；框图位置不代表物理布局。';
    }else if(c.id==='zhenwu'&&layer==='cu'){
      title='M890 CU 内部 · 寄存器、计算与异步搬运';subtitle='公开职责图；不是 TFU 物理 PE 阵列';
      add('scheduler',35,92,1030,66,'线程调度器','向 VALU / TFU / SALU / SFU / LSU 分发','调度器面向不同执行单元安排工作。图中箭头表示职责与数据依赖，不表示私有发射规则。',null,'control');
      add('register',35,190,480,76,'SREG / VREG','标量 / 向量寄存器','标量与向量寄存器保存不同类别的操作数与中间结果；不臆造未明确的容量或分区数量。',null,'memory');
      add('tsm',550,190,515,76,'L1 / TSM','CU 本地缓存与共享存储','TSM用于片上线程共享数据；CE内的L2与全芯片LLC在更高层。',null,'memory');
      const units=[['valu','VALU','向量运算'],['tfu','TFU','张量计算'],['salu','SALU','标量运算'],['sfu','SFU','特殊函数'],['lsu','LSU ×4','一般访存']];
      units.forEach(([id,title,sub],i)=>add(id,35+i*210,315,190,106,title,sub,id==='tfu'?'TFU承担张量计算。公开文档未给出足以重建的物理PE阵列；下一层使用标注清楚的矩阵数学示例。':id==='lsu'?'官方文字描述每CU四个LSU，负责一般数据加载/存储。':sub+'的功能职责与其他执行单元区分。',id==='tfu'?'matrix':null,id==='lsu'?'memory':'compute'));
      add('aiu',35,461,1030,70,'AIU · Global Memory → TSM 的异步多维张量加载','区别于普通线程调度 / LSU 加载路径','AIU可异步处理多维张量加载，帮助数据搬运与计算重叠。不能据此推断所有任务都免去等待。',null,'memory');
      line('275,158 275,190','register');line('275,266 275,315','tfu');line('810,461 810,266','tsm');foot='依据 M890 官方架构简介与 SAIL 文档的职责重绘。V900、未披露容量和精确时序不代填。';
    }else if(c.id==='groq'&&layer==='core'){
      title='Groq 3 LPU · 官方图已经给出的内部功能块';subtitle='Memory / Matrix / Vector / Control / Chip-to-chip';
      add('control',35,93,1030,67,'控制 / 编译器排程','静态安排计算与数据移动','编译器预先安排执行和传输；当前图不重建私有编译器或每周期完整schedule。',null,'control');
      add('sram',35,205,255,290,'片上 SRAM','存储容量与低延迟取舍','官方框图把片上存储和计算资源明确区分；模型权重的分布与系统映射不能只看单芯片。',null,'memory',littleGrid(58,285,7,6,21,8));
      add('matrix',335,205,320,135,'Matrix 计算资源','官方功能块','矩阵运算与向量处理职责不同；厂商简图没有公开完整物理PE阵列。','matrix','tensor');
      add('vector',335,380,320,115,'Vector 计算资源','非矩阵工作','向量处理配合矩阵主路径。真正模型的算子安排由编译结果与系统分工决定。');
      add('c2c',700,205,365,290,'Chip-to-chip 连接','跨 LPU / 系统协作','芯片间连接与编译器安排的数据移动共同支撑模型跨LPU分布。上方官方Decode图另示GPU attention与LPU FFN的异构路径。',null,'network');
      line('290,273 335,273','matrix');line('290,436 335,436','vector');line('655,273 700,273','c2c');foot='依据官方简化框图表达已披露功能，不迁移早期GroqChip1的数量，也不臆造Groq3私有PE几何。';
    }else if(c.id==='rx9070'&&layer==='cu'){
      title='RDNA 4 CU · 先把主要职责分开';subtitle='CU 的官方原图在上方；此处为功能重绘，未披露计数不补写';page=8;
      add('scheduler',35,100,1030,70,'指令 / 工作调度','可编程 GPU 执行','以官方RDNA4新CU图为参照，功能分组不能被改称为CDNA5或M890。',null,'control');
      add('register',35,210,270,260,'寄存器与局部数据','保持操作数靠近计算','寄存器、缓存与局部共享数据对数据供给有不同作用；按具体ISA和kernel分析。',null,'memory');
      add('valu',350,210,300,118,'向量计算资源','常规 GPU 工作','AI能力与可编程向量资源共存；不能仅凭AI TOPS推导端到端模型速度。');
      add('tfu',350,365,300,105,'第二代 AI 加速器','矩阵 / 向量路径','公开WMMA tile描述指令操作范围，不等于内部物理PE几何。','matrix','tensor');
      add('lsu',695,210,370,118,'数据加载 / 存储','显存与片上数据供给','RX9070XT为16GB GDDR6消费卡。容量与软件支持需要先于峰值排名检查。',null,'memory');
      add('graphics',695,365,370,105,'图形 / 光追资源','与 AI 计算职责区分','保留图形资源存在，不把所有资源都画成LLM算子必经路径。',null,'control');
      line('305,269 350,269','valu');line('650,418 695,418','graphics');foot='这层只重绘公开功能分工；详细原图可放大。指令tile与物理PE阵列严格区分。';
    }else if(layer==='matrix'){
      title='矩阵乘累加 · 一个真正算得出结果的 4×4 教学 tile';subtitle='数学映射示例 ≠ NVIDIA / AMD / TPU 的物理 PE 阵列';
      add('input',35,130,220,345,'输入 A 与权重 B','4×4 教学矩阵','这里固定小矩阵用于逐步观察乘加。真实kernel的tile大小、寄存器映射与指令实现需按产品ISA与编译结果确定。',null,'memory',littleGrid(65,243,4,4,27,9));
      add('register',305,130,250,125,'操作数准备 / tile','数据如何参与一次运算','把输入与权重的对应行列配对。下面的沙盘每次只展开一个K维，不代表硬件仅每周期做一个K。',null,'memory');
      add('tensor',305,310,250,165,'矩阵计算','D = A × B + C','每个输出元素计算一行与一列的点积。数学操作由矩阵硬件加速，但物理单元数与精确周期不可据此推出。',null,'tensor',text(325,417,'乘法 + 累加',22,'#6b93af'));
      add('accumulator',610,130,245,345,'累加器 / 结果 tile','保留部分和','沿K维把多次乘法的部分和累加，得到一个输出矩阵。下面可以选择任意输出格检查算式。',null,'memory',littleGrid(641,243,4,4,27,9));
      add('output',905,130,160,345,'写回 / 复用','D tile','真实kernel会继续组合tile、处理同步并写回。此例没有模拟流水延迟或峰值性能。',null,'memory');
      line('255,215 305,215','register');line('430,255 430,310','tensor');line('555,390 610,390','accumulator');line('855,301 905,301','output');foot='矩阵例子用于解释计算本身。只有功能与数据依赖有教学对应，不声称精确复刻物理Tensor/TFU/MXU阵列。';
    }else{return false;}
    const rects=nodes.map(n=>{const on=n.id===active,selected=n.id===state.node;let fill=n.kind==='memory'?'#edf4fa':n.kind==='control'?'#eef1f8':n.kind==='tensor'?'#e7eff7':n.kind==='note'?'#f5f3ed':'#eef4f8';if(on)fill='#dfeef8';const y2=n.y+53;return `<g class="node ${on?'active-node':''} ${selected?'selected':''}" data-node="${n.id}" ${n.drill?`data-enter-layer="${n.drill}"`:''} role="button" tabindex="0" aria-label="${esc(n.title)}${n.drill?'，进入'+n.drill:'，查看解释'}" aria-pressed="${selected}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="7" fill="${fill}" stroke="${on?'#7da4c1':'#afc5d6'}"/>${text(n.x+17,n.y+29,n.title,n.w<140?16:18,'#3d617e')}${text(n.x+17,y2,n.sub,n.w<140?11:13,'#88a1b6')}${n.extra}</g>`;}).join('');
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.innerHTML=`<title id="svg-title">${esc(title)}</title><desc id="svg-desc">${esc(subtitle)}。${esc(foot)}</desc><defs><marker id="detail-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9cb9cf"/></marker></defs>${text(35,37,title,23,'#486d8a')}${text(35,66,subtitle,14,'#8ca4b7')}${extras.join('')}${edges.join('')}${rects}${text(35,584,'点击带“进入”的模块继续展开；其他模块显示详细解释。',13,'#8fa6b9')}`;
    svg.classList.toggle('running',state.playing);svg.setAttribute('role','group');$('#diagram-label').textContent='DETAIL ATLAS / '+layer.toUpperCase();$('#diagram-caption').textContent='功能层次重绘 · 数量与版本明确标注 · 可横向滚动查看';
    const src=window.OBS_DATA.sources.find(s=>s.id===source);$('#layer-footnotes').hidden=false;$('#layer-footnotes').innerHTML=`<p><strong>本层依据：</strong>${esc(title)}${page?' · 官方 PDF 第 '+page+' 页':''}。</p><p>${esc(foot)}</p><a href="${esc(src?.url||'')}${page?'#page='+page:''}" target="_blank" rel="noopener noreferrer">核对这一层的原始资料 ↗</a>`;
    $('#matrix-lab').hidden=layer!=='matrix';if(layer==='matrix')renderMatrix();
    return true;
  }
  const A=[[1,2,0,1],[0,1,2,0],[2,0,1,1],[1,1,1,1]],B=[[1,0,2,1],[0,1,1,2],[2,1,0,1],[1,2,1,0]];
  function matrixResult(k){return A.map((row,i)=>B[0].map((_,j)=>row.slice(0,k).reduce((s,a,t)=>s+a*B[t][j],0)));}
  function renderMatrix(){const C=matrixResult(matrixK),r=Math.floor(matrixFocus/4),c=matrixFocus%4;const grid=(arr,which)=>`<div class="matrix-grid">${arr.flat().map((n,i)=>`<span class="${which==='A'&&Math.floor(i/4)===r&&i%4< matrixK||which==='B'&&i%4===c&&Math.floor(i/4)<matrixK||which==='C'&&i===matrixFocus?'current':''}" ${which==='C'?`role="button" tabindex="0" data-matrix-cell="${i}" aria-label="查看结果第${Math.floor(i/4)+1}行第${i%4+1}列"`:''}>${n}</span>`).join('')}</div>`;$('#matrix-lab').innerHTML=`<span class="chapter-tag">TEACHING MODEL / 不是物理 PE 布局</span><h3>沿着 K 维，一步一步把结果算出来。</h3><p>固定的 4×4 整数矩阵。每次“累加一步”加入一项 A[i,k] × B[k,j]；选择结果中的某一格，检查它的完整计算。</p><div class="matrix-grids"><div class="matrix-item"><div class="matrix-title">输入 A</div>${grid(A,'A')}</div><span class="matrix-symbol">×</span><div class="matrix-item"><div class="matrix-title">权重 B</div>${grid(B,'B')}</div><span class="matrix-symbol">=</span><div class="matrix-item"><div class="matrix-title">部分和 C · 已累加 ${matrixK}/4 项</div>${grid(C,'C')}</div></div><div class="matrix-controls"><button data-matrix-step ${matrixK===4?'disabled':''}>累加一步 →</button><button data-matrix-reset>重新开始</button><span class="matrix-k">K = ${matrixK} / 4</span></div><div class="matrix-equation">C[${r+1},${c+1}] = ${matrixK?A[r].slice(0,matrixK).map((a,k)=>a+'×'+B[k][c]).join(' + '):'0'} = ${C[r][c]}</div>`;}
  function recolor(svg){const palette={'#142420':'#f7f9fb','#1c3328':'#eef4f8','#324c36':'#e0edf7','#d1e3c4':'#416681','#8ca987':'#8299ad','#7f9b77':'#91a8ba','#bce9a5':'#6f9fbe','#4a6248':'#afc5d6','#486342':'#ccdce8','#294531':'#e4eef6','#5d7851':'#b1c9db','#bfd8ad':'#6d90ab','#9bb48c':'#8da6b8','#9ab78a':'#90a9bb','#8da67d':'#a0b5c4','#a4bc96':'#8aa6bb','#abc29c':'#89a6bc','#607c56':'#b2cada','#78966a':'#9db2c2','#799485':'#95abba','#9fb58c':'#92aabd','#6c8b64':'#9caebe','#4b654a':'#b4cbdc','#6b8a67':'#a5bfd2','#a9956e':'#c9aa80','#637f58':'#b7cbdc','#9aaf8b':'#9ab1c3','#b5a67c':'#a28e6d','#7b8b73':'#90a4b3','#c4bb9f':'#a99b85','#a8c895':'#88aac4','#7e9b71':'#98adbd','#d6ebc7':'#648ba7','#88a67a':'#8fa7ba','#96b385':'#95acbd','#d8b37d':'#bc9d6f'};svg.querySelectorAll('[fill],[stroke]').forEach(e=>{for(const attr of ['fill','stroke']){const value=e.getAttribute(attr);if(palette[value])e.setAttribute(attr,palette[value]);}});if(svg.id==='architecture'){svg.querySelectorAll('text').forEach(t=>{const old=Number(t.getAttribute('font-size'))||12;t.setAttribute('font-size',Math.max(12,old*1.12));});}}
  window.OBS_DETAIL={levels,defaultLayer:c=>levels(c)[0][0],render,stageNode,info:id=>infoMap[id],renderNav,renderGallery,openFigure,recolor,
    figureClick:(target,c)=>{if(target.dataset.figureIndex!==undefined){selectedFigures[c.id]=Number(target.dataset.figureIndex);renderGallery(c);return true;}if(target.dataset.openFigure){openFigure(c);return true;}if(target.id==='close-figure'){$('#figure-dialog').close();return true;}if(target.hasAttribute('data-toggle-zoom')){$('#figure-dialog-content img').classList.toggle('zoomed');return true;}if(target.hasAttribute('data-matrix-step')){matrixK=Math.min(4,matrixK+1);renderMatrix();return true;}if(target.hasAttribute('data-matrix-reset')){matrixK=0;renderMatrix();return true;}if(target.dataset.matrixCell!==undefined){matrixFocus=Number(target.dataset.matrixCell);renderMatrix();return true;}return false;},matrixResult};
})();

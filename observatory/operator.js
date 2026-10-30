/* © 2026 DOCLUKA77. Interactive dependency traces, not GPU timing simulation. */
'use strict';
(() => {
  const D=window.OBS_OPERATOR_DATA;
  const $=s=>document.querySelector(s);
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const S={tab:'run',step:0,progress:0,depth:'gpu',focus:'python',cell:0,follow:true,speed:1,net:'roce',netStep:0,reuse:'eyeriss',reuseFocus:'activation'};
  let playing=false,raf=0,last=0;
  const emit=()=>document.dispatchEvent(new CustomEvent('observatory:operator-location'));
  const source=(id,label)=>{const s=D.sources.find(s=>s.id===id)||window.OBS_DATA.sources.find(s=>s.id===id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(label||s.title)} ↗</a>`:'';};
  const current=()=>D.steps[S.step];
  function pause(notify=true){playing=false;cancelAnimationFrame(raf);raf=0;last=0;updateTransport();if(notify)emit();}
  function play(){if(playing){pause();return;}const length=S.tab==='network'?window.OBS_CONTEXT.netSteps(S.net).length:D.steps.length;if((S.tab==='network'?S.netStep:S.step)===length-1&&S.progress>=1){if(S.tab==='network')S.netStep=0;else{S.step=0;S.focus=current().focus;if(S.follow)S.depth=current().level;}S.progress=0;renderScene();}playing=true;last=0;updateTransport();raf=requestAnimationFrame(tick);}
  function tick(now){if(!playing)return;if(last)S.progress+=Math.min(100,now-last)/2300*S.speed;last=now;if(S.progress>=1){const length=S.tab==='network'?window.OBS_CONTEXT.netSteps(S.net).length:D.steps.length;const n=S.tab==='network'?S.netStep:S.step;if(n>=length-1){S.progress=1;paintPacket();pause();return;}if(S.tab==='network')S.netStep++;else{S.step++;if(S.follow)S.depth=current().level;S.focus=current().focus;}S.progress=0;renderScene();emit();}paintPacket();raf=requestAnimationFrame(tick);}
  function setStep(n,progress=.5){pause(false);const length=S.tab==='network'?window.OBS_CONTEXT.netSteps(S.net).length:D.steps.length;n=Math.max(0,Math.min(length-1,Math.trunc(n)));if(S.tab==='network')S.netStep=n;else{S.step=n;S.focus=current().focus;if(S.follow)S.depth=current().level;}S.progress=progress;renderScene();emit();}
  const svgText=(x,y,t,size=19,attrs='')=>`<text x="${x}" y="${y}" font-size="${size}" ${attrs}>${esc(t)}</text>`;
  function box(x,y,w,h,id,title,lines=[],tone='blue'){
    const active=S.focus===id, currentNode=current().focus===id;
    return `<g class="op-node op-${tone} ${active?'selected':''} ${currentNode?'current':''}" data-op-module="${id}" tabindex="0" role="button" aria-label="展开${esc(title)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${svgText(x+16,y+30,title,20,'class="op-node-title"')}${lines.map((l,i)=>svgText(x+16,y+57+i*23,l,15)).join('')}${svgText(x+w-19,y+29,'＋',17,'text-anchor="end" class="op-plus"')}</g>`;
  }
  const edge=(d,label='',x=0,y=0)=>`<path d="${d}" class="op-edge" marker-end="url(#op-arrow)"/>${label?svgText(x,y,label,14,'class="op-edge-label"'):''}`;
  const defs=()=>`<defs><marker id="op-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9eb0bf"/></marker></defs>`;
  const routes={
    gpu:{issue:'M530 150V242',fetch:'M205 283H245M375 283H450M570 276H600',host:'M45 135H205',launch:'M225 88H245V170H530V190',read:'M205 283H245',tma:'M375 283H450',ready:'M570 276H600',scale:'M665 309V330',mma:'M665 310V320H520V330','mma-done':'M590 365H610',epilogue:'M685 395V440H535V395',store:'M535 440H895V375',activation:'M895 235V165H670'},
    sm:{issue:'M125 230V180H335V150',fetch:'M205 97H250M425 97H485',host:'M46 120H185',launch:'M125 140V230',read:'M205 97H250',tma:'M425 97H485',ready:'M585 170V198H335V230',scale:'M850 170V245',mma:'M585 170V240','mma-done':'M690 290H750',epilogue:'M855 345V395',store:'M485 452H425M250 452H205',activation:'M230 220H330M530 175H550M730 175H800V220'},
    tensor:{issue:'M420 45V90',fetch:'M265 95H320',host:'M46 95H245',launch:'M420 45V90',read:'M265 95H320',tma:'M265 260H320V180',ready:'M520 185H580',scale:'M450 335V275H665V250',mma:'M520 185H580','mma-done':'M760 185H815',epilogue:'M895 250V320',store:'M815 355H650',activation:'M650 355H580'}
  };
  function gpuSvg(){let s=defs();
    s+=`<rect x="430" y="190" width="330" height="235" rx="15" class="op-group-bg"/>`+svgText(450,218,'SM100 / 展开 CTA 0 的切面',18);
    s+=edge('M205 283H245')+edge('M375 283H450')+edge('M570 276H600')+edge('M665 310V320H520V330')+edge('M590 365H610')+edge('M685 395V440H895V375');
    s+=`<path d="M225 88H530V190M760 215H790V160" class="op-control-edge"/>`;
    s+=box(25,40,200,110,'python','Python / CUDA',['张量 / stream / JIT','CPU提交 / GPU执行']);
    s+=box(275,40,285,110,'scheduler','GPU kernel / CTA',['并行调度多个输出 tile','点击继续看线程角色']);
    s+=box(790,40,185,120,'scheduler','协作的 CTA 1',['位于另一个 SM','此配置可双 CTA 协作']);
    s+=box(25,210,180,150,'hbm','HBM',['A：FP8 激活','W：packed FP4','scale / group 元数据'],'amber');
    s+=box(245,235,130,110,'l2','L2',['缓存命中？','本帧选择 miss']);
    s+=box(450,242,120,68,'tma','TMA',[]);
    s+=box(600,242,140,68,'smem','SMEM',[]);
    s+=box(450,330,140,68,'tensor','Tensor Core',[]);
    s+=box(610,330,130,68,'tmem','TMEM',[],'purple');
    s+=box(815,235,160,140,'output','全局 C',['gate / up','BF16 输出','供下一 kernel 读取'],'purple');
    s+=svgText(28,404,'线条表示依赖；只展开一个工作切面，不表示整卡 SM 数量。',15);
    return s;
  }
  function smSvg(){let s=defs();
    s+=edge('M205 97H250')+edge('M425 97H485')+edge('M585 170V240')+edge('M690 290H750')+edge('M855 345V395')+edge('M750 452H685')+edge('M485 452H425')+edge('M250 452H205');
    s+=edge('M850 170V245')+`<path d="M125 230V180H335V150M425 282H480M585 170V198H335V230" class="op-control-edge"/>`;
    s+=box(25,50,180,90,'hbm','全局 A / W',['经 L2 服务请求'],'amber');
    s+=box(250,50,175,100,'tma','TMA producer',['warp 0 选中 lane','张量描述符']);
    s+=box(485,50,200,120,'smem','SMEM 输入 tile',['A / W 多阶段缓冲','布局、对齐、swizzle']);
    s+=box(750,50,210,120,'scales','Scale → TMEM',['warp 2 布局处理','UTCCP 复制缩放因子'],'amber');
    s+=box(25,230,180,130,'scheduler','8 个 warp / CTA',['0–3：non-epilogue','4–7：epilogue','角色来自此固定实现']);
    s+=box(250,230,175,105,'barrier','mbarrier',['读前等 full','覆盖前等 empty']);
    s+=box(480,240,210,100,'tensor','Tensor Core',['warp 1 选中线程发射','leader CTA 提交 MMA']);
    s+=box(750,245,210,100,'tmem','TMEM 累加',['FP32 C tile','与普通寄存器分开'],'purple');
    s+=box(750,395,210,95,'registers','Epilogue 寄存器',['读回 → BF16 → 重排'],'purple');
    s+=box(485,410,200,80,'smem','SMEM 输出缓冲',['等待 store 后复用'],'purple');
    s+=box(250,410,175,80,'output','TMA store',['shared → global'],'purple');
    s+=box(25,410,180,80,'output','全局 C',['后续 SwiGLU / down'],'purple');
    return s;
  }
  function tensorSvg(){let s=defs();
    s+=edge('M270 95H320V145')+edge('M270 260H320V220')+edge('M520 185H580')+edge('M450 335V275H665V250')+edge('M760 185H815')+edge('M895 250V320');
    s+=box(30,45,240,110,'smem','A tile / SMEM',['FP8 E4M3 激活','逻辑上 [M tile,K tile]']);
    s+=box(30,210,240,110,'smem','W tile / SMEM',['FP4 值在 SMEM 展开','packed GMEM byte数不同'],'amber');
    s+=box(320,90,200,200,'descriptor','共享内存描述符',['tile 起点 / stride','指令形状 / 数据类型','内部 swapAB','数学含义仍是 A × Wᵀ']);
    s+=box(580,100,180,150,'tensor','Tensor Core',['tcgen05.mma','block-scaled MMA','异步发射与执行']);
    s+=box(340,335,220,70,'scales','Scale / TMEM',[],'amber');
    s+=box(815,100,160,150,'tmem','FP32 / TMEM',['C ← A×Wᵀ+C','多次 K 累加','不是物理 PE 图'],'purple');
    s+=box(815,320,160,80,'registers','读回寄存器',['MMA 完成后'],'purple');
    return s;
  }
  function activationSvg(){return defs()+`<rect x="300" y="40" width="465" height="340" rx="14" class="op-group-bg"/>`+svgText(320,70,'后续激活 / 量化 kernel（另一次执行）',19)+edge('M230 220H330')+edge('M530 175H550')+edge('M730 175H800V220')+box(30,160,200,140,'output','全局 gate / up',['上一个 GEMM 的结果','BF16 · [Mₑ,4608]'],'purple')+box(330,120,200,110,'vector','读取与拆分',['gate / up 各宽2304'])+box(550,120,180,140,'vector','SwiGLU',['SiLU(gate) × up','逐元素计算'])+box(330,290,400,70,'vector','再量化 / cast，准备 down 输入',[])+box(800,160,175,140,'vector','下一次投影',['[Mₑ,2304]','量化激活 + scale'],'amber');}
  function packet(path){return `<path id="op-motion-path" d="${path}" fill="none" stroke="#427f9f" stroke-width="4" class="op-active-edge"/><g id="op-packet" aria-hidden="true"><rect x="-14" y="-10" width="28" height="20" rx="6"/><path d="M-5 0H5M0-5V5"/></g>`;}
  function diagram(){
    const names={gpu:'GPU / 显存到执行切面',sm:'SM / 搬运、同步与执行角色',tensor:'MMA / 软件可见的数据通路'};
    const activation=current().id==='swiglu',label=activation?'后续激活 kernel / 前一 GEMM 已完成':names[S.depth];
    const content=activation?activationSvg():S.depth==='gpu'?gpuSvg():S.depth==='sm'?smSvg():tensorSvg();
    const path=activation?routes.sm.activation:routes[S.depth][current().path]||routes[S.depth].mma;
    const height=activation?430:S.depth==='sm'?530:S.depth==='tensor'?440:480;
    return `<div class="op-diagram-top"><strong>${label}</strong><span>蓝＝激活 / 数据流　金＝权重与 scale　紫＝累加与输出</span></div><div class="op-svg-scroll"><svg id="op-diagram" viewBox="0 0 1000 ${height}" role="group" aria-label="${label}，模块可以按回车展开"><title>${esc(current().title)}</title><desc>功能切面。点击模块展开说明；矩阵格子是数学模型，所有时间为教学节奏。</desc>${content}${packet(path)}</svg></div>`;
  }
  function inspector(){
    const m=D.modules[S.focus]||D.modules.python,depth=['tensor','descriptor','tmem','scales'].includes(S.focus)?'tensor':'sm';
    return `<div class="op-detail-kicker"><span>模块细节 / ${esc(S.focus.toUpperCase())}</span><button data-op-depth="${depth}">${depth==='tensor'?'放大矩阵通路':'放大 SM 内部'} ↗</button></div><h3>${esc(m.name)}</h3><p class="op-location">${esc(m.where)}</p><p class="op-detail-summary">${esc(m.summary)}</p><ol>${m.details.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><div class="op-detail-footer">${m.refs.map(id=>source(id)).join('')}<button data-op-module="${m.next}">接着看：${esc(D.modules[m.next].name)} →</button></div>`;
  }
  function math(){const m=Math.floor(S.cell/4),n=S.cell%4,k=current().k,term=k>0?Math.min(3,k-1):-1;const matrix=(kind,values)=>`<div class="op-matrix-block"><h4>${kind==='a'?'A · 激活 [M,K]':kind==='w'?'W · 权重 [N,K]':'C=A×Wᵀ · [M,N]'}</h4><div class="op-matrix op-matrix-${kind}">${values.map((row,i)=>row.map((v,j)=>kind==='c'?`<button data-op-cell="${i*4+j}" class="${S.cell===i*4+j?'picked':''}" aria-pressed="${S.cell===i*4+j}" aria-label="查看 C[${i},${j}]">${v}</button>`:`<span class="${i===(kind==='a'?m:n)?'row-picked':''} ${i===(kind==='a'?m:n)&&j===term?'term-picked':''}">${v}</span>`).join('')).join('')}</div><small>${kind==='a'?`选中 token 行 M=${m}`:kind==='w'?`选中输出行 N=${n}；NT 取该行做点积`:'列：gate₀ / gate₁ / up₀ / up₁'}</small></div>`;
    const C=D.A.map((r,i)=>r.map((_,j)=>D.dot(i,j,k))),parts=D.A[m].map((a,i)=>`<span class="${i<k?'done-term':'future-term'}">${a}×${D.W[n][i]}</span>`).join(' + '),g0=D.dot(m,0),g1=D.dot(m,1),u0=D.dot(m,2),u1=D.dot(m,3),silu=x=>x/(1+Math.exp(-x));
    return `<div class="op-math-heading"><div><span class="chapter-tag">可手算的缩小例子 / SCALE = 1</span><h3>选一个输出，跟踪它的四次累加。</h3><p>显示本步完成后的数学状态。真实 K=5120；这里缩成 K=4、M=N=4，前两列是 gate，后两列是 up。</p></div><span class="op-k-count">K <b>${k}</b> / 4</span></div><div class="op-matrix-row">${matrix('a',D.A)}<span class="op-math-symbol">×</span>${matrix('w',D.W)}<span class="op-math-symbol">→</span>${matrix('c',C)}</div><div class="op-dot-formula"><b>C[${m},${n}]</b><span>${parts} = <strong>${D.dot(m,n,k)}</strong></span></div><p class="op-math-boundary">每个格子是数学元素，不是物理 PE。FP4/FP8 的打包、舍入、swizzle、线程 lane 分布及真实指令 tile 没有被缩成这 16 个格子。</p>${S.step===D.steps.length-1?`<div class="op-swiglu-result"><strong>此行的 SwiGLU：</strong> [SiLU(${g0}) × ${u0}, SiLU(${g1}) × ${u1}] ≈ [${(silu(g0)*u0).toFixed(4)}, ${(silu(g1)*u1).toFixed(4)}]</div>`:''}`;
  }
  function codePanel(){return `<div class="op-code-head"><div><span class="chapter-tag">PYTHON → CUDA → ISA</span><h3>一行 Python，展开成设备端的合作。</h3></div><span>下面是讲解伪代码，不可直接运行</span></div><div class="op-code-lines">${D.python.map((l,i)=>`<div class="op-code-line ${current().code===i?'active':''}"><span>${String(i+1).padStart(2,'0')}</span><code>${esc(l)}</code></div>`).join('')}</div><details class="op-api"><summary>展开真实 API、shape / scale 约定与调用链</summary><div class="op-api-content"><p>实际接口是 <code>deep_gemm.m_grouped_fp8_fp4_gemm_nt_contiguous</code>。A、W 必须已经量化、重排并变成指定布局；不能把任意 BF16 tensor 填进元组。</p><pre><code>${esc(D.apiCode||'')}</code></pre><p>Python MLP → pybind → C++ shape/layout 检查 → SM100 内核特化 / JIT cache → CUDA launch → TMA / tcgen05。首轮编译开销与后续执行开销不同。</p><div class="op-call-chain">${(D.callChain||[]).map(c=>`<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer"><small>${esc(c.stage)}</small><code>${esc(c.symbol)}</code> ↗</a>`).join('')}</div></div></details>`;}
  function transport(network=false){return `<div class="op-transport"><div class="op-main-buttons"><button id="op-play" class="op-primary" aria-label="播放算子动画">▶ 播放</button><button data-op-prev aria-label="上一步">← 上一步</button><button data-op-next aria-label="下一步">单步 →</button><button data-op-reset aria-label="从头开始">↺ 重置</button></div><div class="op-speed"><label for="op-speed">速度</label><select id="op-speed"><option value="0.5" ${S.speed===.5?'selected':''}>0.5×</option><option value="1" ${S.speed===1?'selected':''}>1×</option><option value="2" ${S.speed===2?'selected':''}>2×</option></select><span id="op-count"></span></div><div class="op-play-progress"><span id="op-progress-bar"></span></div></div><div class="op-timeline" aria-label="${network?'通信':'算子'}步骤">${(network?window.OBS_CONTEXT.netSteps(S.net):D.steps).map((s,i)=>`<button data-op-step="${i}" aria-pressed="${i===(network?S.netStep:S.step)}" class="${i===(network?S.netStep:S.step)?'active':''}"><small>${String(i+1).padStart(2,'0')}</small>${esc(s.short)}</button>`).join('')}</div>`;}
  function renderRun(){
    $('#op-content').innerHTML=`<section class="op-scope"><div><span class="op-hardware-badge">B200 / SM100</span><strong>DeepSeek V4.1 Flash · 一个 routed expert 的 gate/up GEMM</strong><p>选择公开的非 MegaMoE 分解路径。观察一个协作组内的切面；真实 kernel 可跨两个 CTA / SM 协作，并流水处理多个 tile。</p></div><div class="op-shapes"><span>A <b>Mₑ × 5120</b></span><span>Wᵀ <b>5120 × 4608</b></span><span>C <b>Mₑ × 4608</b></span></div></section><div class="op-player">${transport()}<div id="op-action" class="op-action" aria-live="polite"></div><div class="op-depth-bar"><div role="group" aria-label="动画放大层次">${['gpu','sm','tensor'].map((d,i)=>`<button data-op-depth="${d}" aria-pressed="${d===S.depth}" class="${d===S.depth?'active':''}">${['GPU 数据路径','SM 内部','Tensor Core / TMEM'][i]}</button>`).join('')}</div><label><input id="op-follow" type="checkbox" ${S.follow?'checked':''}> 随步骤放大</label></div><div id="op-visual"></div><p class="op-timing-note">教学节奏，可暂停、后退和逐步查看。箭头表达依赖；真实 GPU 会并行、预取和多缓冲，时间不代表周期或实测耗时。</p></div><div class="op-underboard"><section id="op-detail" class="op-detail"></section><section id="op-code" class="op-code"></section></div><section id="op-math" class="op-math"></section><section class="op-deep-spec"><div class="section-heading"><div><span class="chapter-tag">继续深入 / 从这份源码能确定什么</span><h2>把 tile、线程、存储与流水分开看。</h2></div></div><div id="op-spec-content"></div></section><div class="op-next-context"><strong>这些局部复用，和你熟悉的 PE 阵列有什么联系？</strong><button data-op-tab="reuse">对照 Eyeriss / ShiDianNao / NVDLA →</button><button data-op-tab="network">专家在远处 GPU 上时，会发生什么？ →</button></div>`;
    renderScene();$('#op-spec-content').innerHTML=window.OBS_CONTEXT.spec();
  }
  function renderAction(){const s=current();$('#op-action').innerHTML=`<div class="op-action-number">${String(S.step+1).padStart(2,'0')}</div><div><h2>${esc(s.title)}</h2><strong>${esc(s.verb)}</strong><p>${esc(s.body)}</p><div class="op-state-pills">${s.state.map(t=>`<span>${esc(t)}</span>`).join('')}</div><p class="op-why"><b>为什么要这样做：</b>${esc(s.why)}</p></div>`;}
  function renderScene(){if(S.tab==='run'){
    if(!$('#op-visual'))return;renderAction();$('#op-visual').innerHTML=diagram();$('#op-detail').innerHTML=inspector();$('#op-code').innerHTML=codePanel();$('#op-math').innerHTML=math();document.querySelectorAll('[data-op-depth]').forEach(b=>{const on=b.dataset.opDepth===S.depth;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  }else if(S.tab==='network')window.OBS_CONTEXT.renderNetwork(S,source,packet);
    updateTransport();paintPacket();
  }
  function updateTransport(){
    const b=$('#op-play');if(!b)return;
    const length=S.tab==='network'?window.OBS_CONTEXT.netSteps(S.net).length:D.steps.length;
    const n=S.tab==='network'?S.netStep:S.step;
    b.textContent=playing?'Ⅱ 暂停':'▶ 播放';b.setAttribute('aria-label',playing?'暂停算子动画':'播放算子动画');
    $('#op-count').textContent=`${String(n+1).padStart(2,'0')} / ${String(length).padStart(2,'0')}`;
    const prev=$('[data-op-prev]'),next=$('[data-op-next]');if(prev)prev.disabled=n===0;if(next)next.disabled=n===length-1;
    document.querySelectorAll('[data-op-step]').forEach(el=>{const on=Number(el.dataset.opStep)===n;el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on));});
    const timeline=$('.op-timeline'),active=$('.op-timeline .active');
    if(timeline&&active){const x=active.getBoundingClientRect().left-timeline.getBoundingClientRect().left+timeline.scrollLeft;if(x<timeline.scrollLeft||x+active.offsetWidth>timeline.scrollLeft+timeline.clientWidth)timeline.scrollLeft=x-timeline.clientWidth/2+active.offsetWidth/2;}
  }
  function paintPacket(){const path=$('#op-motion-path'),p=$('#op-packet');if(path&&p){const point=path.getPointAtLength(path.getTotalLength()*Math.max(0,Math.min(1,S.progress)));p.setAttribute('transform',`translate(${point.x} ${point.y})`);}const bar=$('#op-progress-bar');if(bar)bar.style.width=(S.progress*100)+'%';}
  function render(){pause(false);$('#view-operator').innerHTML=`<div class="view-head op-view-head"><div class="eyebrow">02 / OPERATOR MICROSCOPE</div><h1>从 Python 到 Tensor Core，<br><span>跟住一块数据。</span></h1><p>先沿一个真实 DeepSeek 算子走进 GPU，再用你熟悉的空间加速器理解数据复用，最后把尺度拉到集群。每段都有来源；动画是依赖讲解，浏览器不运行模型或 CUDA。</p></div><div class="op-tabs" role="group" aria-label="算子显微镜章节"><button data-op-tab="run" class="${S.tab==='run'?'active':''}" aria-pressed="${S.tab==='run'}"><small>01</small> 算子执行动画</button><button data-op-tab="reuse" class="${S.tab==='reuse'?'active':''}" aria-pressed="${S.tab==='reuse'}"><small>02</small> 从 PE 到 Tensor Core</button><button data-op-tab="network" class="${S.tab==='network'?'active':''}" aria-pressed="${S.tab==='network'}"><small>03</small> 集群 / TCP/IP / RDMA</button></div><div id="op-content"></div>`;if(S.tab==='run')renderRun();else if(S.tab==='reuse')window.OBS_CONTEXT.renderReuse(S,source);else{$('#op-content').innerHTML=window.OBS_CONTEXT.networkShell(S,transport(true));renderScene();}}
  function click(t){
    if(t.dataset.opTab){pause(false);S.tab=t.dataset.opTab;S.progress=0;render();emit();return true;}
    if(t.id==='op-module-close'){$('#op-module-dialog').close();return true;}
    if(t.dataset.opDepth){pause(false);const modal=$('#op-module-dialog'),fromDetail=modal.open||!!t.closest('#op-detail');if(modal.open)modal.close();S.depth=t.dataset.opDepth;S.follow=false;if($('#op-follow'))$('#op-follow').checked=false;renderScene();if(fromDetail)$('#op-visual').scrollIntoView({block:'start',behavior:'instant'});emit();return true;}
    if(t.dataset.opModule){pause(false);S.focus=t.dataset.opModule;const modal=$('#op-module-dialog'),open=modal.open||!!t.closest('svg');$('#op-detail').innerHTML=inspector();$('#op-visual').innerHTML=diagram();if(open){$('#op-module-content').innerHTML=inspector();if(!modal.open)modal.showModal();}paintPacket();emit();return true;}
    if(t.dataset.opCell!==undefined){pause(false);S.cell=Number(t.dataset.opCell);$('#op-math').innerHTML=math();emit();return true;}
    if(t.dataset.opStep!==undefined){setStep(Number(t.dataset.opStep));return true;}
    if(t.id==='op-play'){play();return true;}
    if(t.hasAttribute('data-op-prev')){setStep((S.tab==='network'?S.netStep:S.step)-1);return true;}
    if(t.hasAttribute('data-op-next')){setStep((S.tab==='network'?S.netStep:S.step)+1);return true;}
    if(t.hasAttribute('data-op-reset')){setStep(0,0);return true;}
    if(t.dataset.opNet){pause(false);S.net=t.dataset.opNet;S.netStep=0;S.progress=0;render();emit();return true;}
    if(t.dataset.opReuse){S.reuse=t.dataset.opReuse;window.OBS_CONTEXT.renderReuse(S,source);emit();return true;}
    if(t.dataset.opReuseFocus){S.reuseFocus=t.dataset.opReuseFocus;window.OBS_CONTEXT.renderReuse(S,source);emit();return true;}
    return false;
  }
  function input(t){if(t.id==='op-speed'){S.speed=Number(t.value);emit();return true;}if(t.id==='op-follow'){S.follow=t.checked;if(S.follow){S.depth=current().level;renderScene();}emit();return true;}return false;}
  function locationState(){return {...S,progress:Math.round(S.progress*1000)/1000,playing};}
  function restore(p){pause(false);const allow=(key,values,fallback)=>values.includes(p.get(key))?p.get(key):fallback;S.tab=allow('opTab',['run','reuse','network'],'run');S.depth=allow('opDepth',['gpu','sm','tensor'],'gpu');S.net=allow('opNet',['roce','ib','tcp','local'],'roce');S.reuse=allow('opReuse',['eyeriss','shidiannao','nvdla','gpu'],'eyeriss');S.reuseFocus=allow('opReuseFocus',['activation','weight','psum','control'],'activation');S.focus=allow('opFocus',Object.keys(D.modules),'python');S.step=Math.max(0,Math.min(D.steps.length-1,Math.trunc(Number(p.get('opStep'))||0)));S.netStep=Math.max(0,Math.min(window.OBS_CONTEXT.netSteps(S.net).length-1,Math.trunc(Number(p.get('opNstep'))||0)));S.cell=Math.max(0,Math.min(15,Math.trunc(Number(p.get('opCell'))||0)));S.progress=Math.max(0,Math.min(1,Number(p.get('opAt'))||0));S.follow=p.get('opFollow')!=='0';S.speed=[.5,1,2].includes(Number(p.get('opSpeed')))?Number(p.get('opSpeed')):1;}
  window.OBS_OPERATOR={render,pause,click,input,restore,location:locationState};
})();

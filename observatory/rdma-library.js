/* © 2026 DOCLUKA77. Curated reading directory; sources, versions and bounds stay visible. */
'use strict';
(() => {
  const D=window.OBS_RDMA_DATA,C=D.catalog;
  const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=q=>document.querySelector(q),ext=(url,label)=>`<a href="${E(url)}" target="_blank" rel="noopener noreferrer">${E(label)} ↗</a>`;
  const levels={foundation:'入门基础',core:'核心机制',deep:'进阶细节'};
  const defaults={topic:'all',kind:'all',level:'all',year:'all',sort:'recommended',track:'all',fresh:false};
  const classic=['dcqcn','roce_scale','irn','srnic','collie','byteexpress'];
  const featured=['rfc5040','guidelines','irn','srnic','dcqcn','gpudirect_rdma_ordering','nccl_device_gin','ue_spec11','hpn2024','deepep25_code','deepinfer_code'];
  const guides=p=>(p.reading_guide||[]).map(g=>typeof g==='string'?g:[g.label,g.read_for].filter(Boolean).join('：'));
  function query(input={}){
    const a={...defaults,filter:'all',query:'',...input},terms=a.query.toLocaleLowerCase().normalize('NFKC').trim().split(/[\s,，]+/).filter(Boolean),track=C.tracks.find(t=>t.id===a.track);
    const year=p=>Number.isInteger(p.year)?p.year:-Infinity;
    const accept=p=>{
      if(a.filter==='route'&&!classic.includes(p.id))return false;
      if(a.filter==='guo'&&!p.guo_coauthor)return false;
      if(a.filter==='core'&&(p.kind!=='paper'||p.topics.some(t=>['training','serving','moe'].includes(t))))return false;
      if(a.filter==='ai'&&!p.topics.some(t=>['training','serving','moe','collectives','gpu'].includes(t)))return false;
      if(track&&!track.ids.includes(p.id))return false;
      if(a.topic!=='all'&&!p.topics.includes(a.topic))return false;
      if(a.kind!=='all'&&p.kind!==a.kind)return false;
      if(a.level!=='all'&&p.reading_level!==a.level)return false;
      if(a.fresh&&p.added_in!=='0.6')return false;
      if(a.year==='recent'&&!(year(p)>=2024&&year(p)<=2026))return false;
      if(a.year==='undated'&&Number.isInteger(p.year))return false;
      if(!['all','recent','undated'].includes(a.year)&&String(p.year)!==a.year)return false;
      const text=[p.id,p.short,p.title,p.venue,p.publisher,p.doi,p.question,p.problem,p.mechanism,p.cost,p.not_for,p.why_read,p.overview,p.year,p.version,p.evidence_status,...p.authors,...p.topics.map(t=>C.topicNames[t]),...(p.original_topics||[]),...guides(p),p.guo_coauthor?'gcx':''].join(' ').toLocaleLowerCase().normalize('NFKC');
      return terms.every(t=>text.includes(t));
    };
    const rank=p=>{const n=featured.indexOf(p.id);return n>=0?n:100+(p.reading_level==='foundation'?0:p.reading_level==='core'?20:40);};
    const compareYear=(x,y,direction)=>Number.isInteger(x.year)?Number.isInteger(y.year)?direction*(x.year-y.year):-1:Number.isInteger(y.year)?1:0;
    return D.papers.filter(accept).sort((x,y)=>a.sort==='newest'?compareYear(x,y,-1)||x.short.localeCompare(y.short):a.sort==='oldest'?compareYear(x,y,1)||x.short.localeCompare(y.short):a.sort==='title'?x.short.localeCompare(y.short,'en'):track?track.ids.indexOf(x.id)-track.ids.indexOf(y.id):a.filter==='route'?classic.indexOf(x.id)-classic.indexOf(y.id):rank(x)-rank(y)||year(y)-year(x)||x.short.localeCompare(y.short));
  }
  const years=()=>[...new Set(D.papers.map(p=>p.year).filter(Number.isInteger))].sort((a,b)=>b-a).map(String);
  function restore(params,S){
    const allowed={topic:['all',...Object.keys(C.topicNames)],kind:['all',...Object.keys(C.kinds)],level:['all',...Object.keys(levels)],year:['all','recent','undated',...years()],sort:['recommended','newest','oldest','title'],track:['all',...C.tracks.map(t=>t.id)]};
    for(const [key,values]of Object.entries(allowed)){const value=params.get('rdL_'+key);S[key]=values.includes(value)?value:defaults[key];}S.fresh=params.get('rdL_fresh')==='1';
  }
  const opts=(values,current)=>values.map(([v,label])=>`<option value="${E(v)}"${v===current?' selected':''}>${E(label)}</option>`).join('');
  const select=(key,label,values,S)=>`<label class="rl-field"><span>${label}</span><select data-rd-library-field="${key}" aria-label="${label}">${opts(values,S[key])}</select></label>`;
  const chips=p=>p.topics.map(t=>`<span>${E(C.topicNames[t])}</span>`).join('');
  const yearLabel=p=>Number.isInteger(p.year)?String(p.year):'未标发表年';
  function render(S){
    for(const [k,v]of Object.entries(defaults))if(S[k]===undefined)S[k]=v;
    $('#rd-content').innerHTML=`<div class="rd-subhead rl-heading"><span class="rd-kicker">持续修订的文献目录 / ${C.reviewed}</span><h2>沿着一个问题，找到值得读的原始资料。</h2><p>从协议到RNIC，再到GPU与大集群。论文、预印本、正式规范、公开概览和工程文档分别标注；先看机制，再看实验条件与边界。</p></div><div class="rl-summary"><strong>${D.papers.length}<small> 条精选文献</small></strong>${Object.entries(C.kinds).filter(([k])=>C.counts[k]).map(([k,label])=>`<span>${E(label)} <b>${C.counts[k]}</b></span>`).join('')}<span class="rl-new-count">0.6 新增 / 扩展 <b>${C.addedCount}</b></span></div>
      <details class="rl-tracks"><summary>先选一条阅读路线 <span>${C.tracks.length}条 · 从基础到具体系统</span></summary><div>${C.tracks.map(t=>`<button data-rdl-track="${t.id}" aria-pressed="${S.track===t.id}"><strong>${E(t.title)}</strong><p>${E(t.description)}</p><small>${t.ids.map(id=>D.papers.find(p=>p.id===id)?.short).filter(Boolean).map(E).join(' → ')}</small></button>`).join('')}</div></details>
      <section class="rl-controls" aria-label="文献筛选"><input id="rd-paper-search" value="${E(S.query)}" placeholder="搜索机制、作者、论文名、章节或关键词，例如 incast、KV、GDAKI…" aria-label="搜索文献目录"><div class="rl-fields">${select('topic','专题',[['all','全部专题'],...Object.entries(C.topicNames)],S)}${select('kind','文献类型',[['all','全部类型'],...Object.entries(C.kinds).filter(([k])=>C.counts[k])],S)}${select('level','阅读深度',[['all','全部深度'],...Object.entries(levels)],S)}${select('year','发表 / 版本年',[['all','全部年份'],['recent','2024–2026'],['undated','未标发表年'],...years().map(y=>[y,y])],S)}${select('filter','阅读范围',[['all','全部资料'],['route','经典六站'],['guo','gcx参与'],['core','机制论文'],['ai','GPU / AI系统']],S)}${select('sort','排序',[['recommended','推荐阅读顺序'],['newest','年份：新到旧'],['oldest','年份：旧到新'],['title','名称：A–Z']],S)}</div><div class="rl-controls-bottom"><label><input type="checkbox" data-rd-library-field="fresh"${S.fresh?' checked':''}> 0.6 新增 / 扩展</label><span id="rl-track-label"></span><button data-rdl-reset>清空筛选</button></div></section>
      <div class="rl-results-heading"><strong id="rl-result-count" role="status" aria-live="polite"></strong><span>选左侧条目看机制、阅读位置与证据范围</span></div><div class="rd-paper-layout rl-layout"><aside id="rd-paper-list" class="rd-paper-list rl-list" aria-label="筛选结果"></aside><article id="rd-paper-detail" class="rd-paper-detail rl-detail"></article></div><p class="rl-catalog-note">gcx参与的条目单独标记，原始署名保留。无明确发表年的活文档按版本与核对日阅读；公开概览不能替代完整规范，仿真不能写成实网部署。代价/适用性包含教学判断，未将异构测试结果拼成统一性能排名。</p>`;
    update(S);
  }
  function update(S){
    const found=query(S);if(!found.some(p=>p.id===S.paper)&&found.length)S.paper=found[0].id;
    $('#rl-result-count').textContent=`${found.length} / ${D.papers.length} 条符合条件`;
    const track=C.tracks.find(t=>t.id===S.track);$('#rl-track-label').textContent=track?'当前路线：'+track.title:'';
    document.querySelectorAll('[data-rd-library-field]').forEach(el=>{const k=el.dataset.rdLibraryField;if(k==='fresh')el.checked=S.fresh;else el.value=S[k]??defaults[k];});
    const search=$('#rd-paper-search');if(search.value!==S.query)search.value=S.query;
    document.querySelectorAll('[data-rdl-track]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rdlTrack===S.track)));
    $('#rd-paper-list').innerHTML=found.length?found.map(p=>`<button data-rd-paper="${E(p.id)}" class="${p.id===S.paper?'active':''}" aria-pressed="${p.id===S.paper}"><span class="rl-list-meta">${yearLabel(p)}<i>${E(C.kinds[p.kind])}</i></span><strong>${E(p.short)}</strong><small>${E(p.question||p.problem)}</small><span class="rl-list-flags">${p.guo_coauthor?'<b>gcx参与</b>':''}${p.added_in==='0.6'?'<b>0.6 新增</b>':''}<b>${levels[p.reading_level]}</b></span></button>`).join(''):'<p class="rl-empty">没有匹配结果。可以清空关键词，或放宽专题、年份和文献类型。</p>';
    const p=found.find(p=>p.id===S.paper);$('#rd-paper-detail').innerHTML=p?detail(p):'<div class="rl-empty"><h3>换一组条件继续找。</h3><p>不同筛选条件会同时生效。</p><button data-rdl-reset>清空全部筛选</button></div>';
  }
  function guide(g){if(typeof g==='string')return `<li>${E(g)}</li>`;return `<li>${g.url?ext(g.url,g.label||'原文阅读位置'):E(g.label||'原文阅读位置')}${g.read_for?`<p>${E(g.read_for)}</p>`:''}</li>`;}
  function detail(p){
    const experiment=p.experiment||{},pdf=/\.pdf(?:[?#]|$)|arxiv\.org\/pdf\//.test(p.pdf_url),org=p.authorship==='organization',date=yearLabel(p),group=org?'发布机构':p.authors_complete?'作者完整署名':'已核对署名 · 完整信息见原文';
    const next=(p.next||[]).map(id=>D.papers.find(x=>x.id===id)).filter(Boolean).slice(0,4);
    return `<header><div class="rl-meta"><span class="rl-kind ${p.kind}">${E(C.kinds[p.kind])}</span><span>${date}</span><span>${levels[p.reading_level]}</span>${p.guo_coauthor?'<b>gcx共同作者</b>':''}${p.added_in==='0.6'?'<b class="rl-added">0.6 新增 / 扩展</b>':''}</div><h2>${E(p.title)}</h2><p class="rl-venue">${E(p.venue||p.publisher||'原始发布方')}</p><div class="rl-topic-chips">${chips(p)}</div><details class="rd-authors"><summary>${group} / ${E(p.authors.slice(0,3).join(' · '))}${p.authors.length>3?` 等${p.authors.length}位`:''}</summary><p>${E(p.authors.join(', ')||p.publisher||'见原始来源')}</p></details><div class="rd-source-links">${ext(p.pdf_url,pdf?'阅读原PDF':'阅读原文 / 工程文档')}${p.authors_url!==p.pdf_url?ext(p.authors_url,'原始发表 / 作者入口'):''}</div></header><section class="rl-why"><small>为什么值得读</small><h3>${E(p.why_read||p.question||p.problem)}</h3></section>
      ${(p.reading_guide||[]).length?`<section class="rl-guide"><h3>先看哪里</h3><ol>${p.reading_guide.map(guide).join('')}</ol></section>`:''}
      <div class="rl-explain">${p.overview?`<section><span>内容导读</span><p>${E(p.overview)}</p></section>`:''}<section><span>01 / 要解决什么</span><p>${E(p.problem)}</p></section><section><span>02 / 核心机制</span><p>${E(p.mechanism)}</p></section><section><span>03 / 代价</span><p>${E(p.cost)}</p></section><section class="rl-boundary"><span>适用边界</span><p>${E(p.not_for)}</p></section></div>
      ${p.key_figures?.length?`<section class="rd-paper-figures"><h3>原文关键图</h3>${p.key_figures.map(f=>{const page=f.pdf_page_one_based;return `<a href="${E(f.url||p.pdf_url+(page?'#page='+page:''))}" target="_blank" rel="noopener noreferrer"><b>${E(f.label||'关键图')}</b><span>${E(f.read_for||'对照原文')}</span><small>${page?'文件页'+page:'原文位置'} ↗</small></a>`;}).join('')}</section>`:''}
      <details class="rl-experiment" open><summary>实验 / 资料范围</summary><div><h4>环境或文档定位</h4><p>${E(experiment.environment||'以原文设计与评估范围为准。')}</p><h4>作者报告了什么</h4><p>${E(experiment.result||p.evidence_status)}</p><h4>不能外推到哪里</h4><p>${E(experiment.limit||p.not_for)}</p></div></details><details class="rl-evidence"><summary>版本、核对范围与引用信息</summary><div><p><b>证据状态：</b>${E(p.evidence_status)}</p><p><b>本次核对：</b>${E(p.verification_scope||'原始发表信息、指定设计与实验条件。')}</p>${p.version?`<p><b>版本：</b>${E(p.version)}</p>`:''}<p><b>资料核对日：</b>${E(p.reviewed||C.reviewed)}</p>${p.doi?`<p><b>DOI：</b>${E(p.doi)}</p>`:''}<p>摘要与阅读建议为本站整理；原文与图表权利归原作者或发布方。</p></div></details><footer>${next.length?`<div class="rl-next"><span>关联阅读</span>${next.map(n=>`<button data-rd-paper="${E(n.id)}">${E(n.short)} →</button>`).join('')}</div>`:''}${p.id==='srnic'?'<button data-rd-tab="loss">回到SRNIC模块与原图 →</button>':p.topics.includes('gpu')?'<a href="#operator">回到算子执行显微镜 →</a>':''}</footer>`;
  }
  function click(t,S){
    if(t.dataset.rdlTrack){Object.assign(S,defaults,{filter:'all',query:'',track:t.dataset.rdlTrack});const track=C.tracks.find(r=>r.id===S.track);if(track)S.paper=track.ids[0];update(S);return true;}
    if(t.hasAttribute('data-rdl-reset')){Object.assign(S,defaults,{filter:'all',query:''});update(S);return true;}return false;
  }
  function input(t,S){const k=t.dataset.rdLibraryField;if(!k)return false;S[k]=k==='fresh'?t.checked:t.value;update(S);return true;}
  window.OBS_RDMA_LIBRARY={render,update,query,restore,click,input,defaults,levels};
})();

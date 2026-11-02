/* Original interactive redraws. Counts and boundaries are linked to vendor sources. */
'use strict';
(() => {
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = s => document.querySelector(s);
  const figures = window.OBS_FIGURES;
  const selectedFigures = {};
  let infoMap = {}, matrixK = 0, matrixFocus = 0;

  const levelSets = {
    rtx5090: [
      ['chip', '整颗 GPU'],
      ['gpc', 'GPC'],
      ['tpc', 'TPC'],
      ['sm', 'SM'],
      ['partition', 'SM 子分区'],
      ['matrix', '矩阵运算']
    ],
    zhenwu: [
      ['chip', 'CE / CU 层级'],
      ['cu', 'CU 内部'],
      ['matrix', '矩阵运算']
    ],
    tpu8i: [
      ['overview', '芯片概览'],
      ['matrix', '矩阵运算']
    ],
    tpu8t: [
      ['overview', '芯片概览'],
      ['matrix', '矩阵运算']
    ],
    rx9070: [
      ['cu', 'CU 功能分工'],
      ['matrix', '矩阵运算']
    ],
    groq: [
      ['core', 'LPU 内部'],
      ['overview', '快速概览']
    ]
  };

  const scaleLabels = {
    rtx5090: {
      chip: 'L0 · 1× GB202 模板 (192 SM / 零售 170 SM)',
      gpc: 'L1 · 1/12 GPU (16 SM / 64 Tensor Core)',
      tpc: 'L2 · 1/96 GPU (2 SM / 8 Tensor Core)',
      sm: 'L3 · 1/192 GPU (4 子分区 / 256 KB RF)',
      partition: 'L4 · 1/768 GPU (1 Scheduler / 64 KiB RF)',
      matrix: 'L5 · 4×4×4 教学 Tile (非物理 PE 尺寸)'
    },
    zhenwu: {
      chip: 'L0 · 芯片级 CE / CU 拓扑 (10 CE / 39 CU)',
      cu: 'L1 · 单个 CU 内部 (VALU/TFU/SALU/SFU/LSU/AIU)',
      matrix: 'L2 · 4×4×4 教学 Tile (非物理 PE 尺寸)'
    },
    rx9070: {
      cu: 'L0 · RDNA 4 CU 功能分工 (向量 / 第二代 AI 加速)',
      matrix: 'L1 · 4×4×4 教学 Tile (非物理 PE 尺寸)'
    },
    groq: {
      core: 'L0 · LPU 内部功能块 (SRAM / Matrix / Vector / C2C)',
      overview: '快速概览'
    }
  };

  const levels = c => levelSets[c.id] || [['overview', '快速概览']];

  function renderGallery(c, preferredLayer) {
    const d = figures[c.id];
    $('#chip-takeaway').innerHTML = `<div><h2 class="takeaway-heading">${esc(c.headline)}</h2><p>${esc(c.summary)}</p></div><div class="takeaway-stats"><span><b>${esc(c.memory)}</b>${esc(c.memoryType)}</span><span><b>${esc(c.bandwidth)}</b>${esc(c.bandwidthType)}</span></div>`;
    if (!d?.figures?.length) {
      $('#official-gallery').innerHTML = `<div class="official-header"><div><span class="chapter-tag">先看证据 / ORIGINAL MATERIAL</span><h2>暂无核实到的官方内部架构图</h2></div><span class="official-kind">保留证据缺口</span></div><div class="official-source-only"><span>?</span><div><h3>这里不借用别家图代替</h3><p>本次只找到ByteDance芯片研发的公开报道线索，尚未核实到可公开发布的官方微架构技术文档。后续拿到白皮书或厂商技术资料，可直接补入原图档案。</p><a href="${esc(window.OBS_DATA.sources.find(s => s.id === 'bytedance')?.url || '#')}" target="_blank" rel="noopener noreferrer">查看目前的报道线索 ↗</a></div></div>`;
      return;
    }
    if (preferredLayer) {
      const match = d.figures.findIndex(f => f.layer === preferredLayer);
      if (match >= 0) selectedFigures[c.id] = match;
    }
    const i = Math.min(d.figures.length - 1, selectedFigures[c.id] || 0), f = d.figures[i];
    $('#official-gallery').innerHTML = `<div class="official-header"><div><span class="chapter-tag">第一步 / READ THE OFFICIAL FIGURE</span><h2>${esc(f.title)}</h2></div><span class="official-kind">${esc(f.kind)}</span></div><div class="figure-tabs">${d.figures.map((fig, j) => `<button data-figure-index="${j}" class="${i === j ? 'active' : ''}" aria-pressed="${i === j}">${esc(fig.title)}</button>`).join('')}</div><div class="official-body"><figure class="official-figure"><div class="official-image-frame"><img data-open-figure="${c.id}" src="${esc(f.image)}" alt="${esc(f.title)}，${esc(f.copyright)}${f.page ? '，PDF第' + f.page + '页' : ''}" loading="eager" decoding="async"></div><figcaption>${esc(f.copyright)} · ${esc(d.version)}${f.figure ? ' · Figure ' + esc(f.figure) : ''}${f.page ? ' · PDF 第 ' + f.page + ' 页' : ''}。原图未改结构，权利属于原作者。<br><a href="${esc(f.source || f.original)}${f.page ? '#page=' + f.page : ''}" target="_blank" rel="noopener noreferrer">打开官方原始文档 ↗</a></figcaption></figure><aside class="official-guide"><span class="guide-no">01 /</span><h3>${esc(d.guide?.[0] || '先确认原图的版本与范围')}</h3><p>${esc(d.guide?.[1] || '原图与交互重绘分开呈现，避免把教学结构当作厂商披露。')}</p><p class="limit-note">${esc(c.id === 'rtx5090' ? '零售卡启用配置与完整芯片模板分开。底下的交互图会再次提醒。' : c.id === 'zhenwu' ? '原文写10 CE×4 CU，又称总39 CU。这里保留这处差异，不自行解释。' : f.kind.includes('非') ? '这类原图并没有披露芯片内部，下面的解释不会冒充官方框图。' : '原图版本与资料日期可在“原始资料”中追溯；连线不表示实测延迟。')}</p></aside></div>`;
    const img = $('#official-gallery img');
    img.addEventListener('error', () => {
      img.closest('.official-image-frame').innerHTML = `<div class="fig-loading">原站图片暂未加载。<br><a href="${esc(f.original)}" target="_blank" rel="noopener noreferrer">直接打开官方图或原文 ↗</a></div>`;
    }, { once: true });
  }

  function openFigure(c) {
    const d = figures[c.id], f = d?.figures[selectedFigures[c.id] || 0];
    if (!f) return;
    $('#figure-dialog-content').innerHTML = `<h2>${esc(f.title)}</h2><div class="figure-tools"><span>${esc(f.copyright)}${f.page ? ' · PDF 第 ' + f.page + ' 页' : ''}</span><button data-toggle-zoom>切换原尺寸 / 适应窗口</button><a href="${esc(f.original)}" target="_blank" rel="noopener noreferrer">官方原图 / PDF ↗</a></div><div class="figure-scroll"><img src="${esc(f.image)}" alt="${esc(f.title)}"></div>`;
    $('#figure-dialog').showModal();
  }

  function renderNav(c, state) {
    const ls = levels(c);
    if (!ls.some(([id]) => id === state.layer) && state.layer !== 'overview') {
      state.layer = ls[0][0];
    }
    const breadcrumbs = ls.map(([id, label], i) => {
      const active = state.layer === id;
      return `<button data-layer="${id}" class="layer-pill ${active ? 'active' : ''}" aria-pressed="${active}"><span class="layer-depth">L${i}</span><span class="layer-name">${esc(label)}</span></button>`;
    }).join('<span class="layer-separator" aria-hidden="true">→</span>');

    const overviewBtn = !ls.some(([id]) => id === 'overview')
      ? `<span class="layer-divider" aria-hidden="true">|</span><button data-layer="overview" class="overview-layer ${state.layer === 'overview' ? 'active' : ''}" aria-pressed="${state.layer === 'overview'}">保留的简化概览</button>`
      : '';
    $('#layer-nav').innerHTML = breadcrumbs + overviewBtn;
  }

  function stageNode(c, layer, step) {
    const maps = {
      chip: ['memory', 'cache', 'compute', 'network', 'output'],
      gpc: ['input', 'raster', 'tpc0', 'rop', 'output'],
      tpc: ['input', 'polymorph', 'sm0', 'texture', 'output'],
      sm: ['sub0', 'sub1', 'sub2', 'shared', 'graphics'],
      partition: ['scheduler', 'register', 'alu', 'tensor', 'lsu'],
      cu: ['scheduler', 'register', 'tfu', 'tsm', 'lsu'],
      core: ['control', 'sram', 'matrix', 'vector', 'c2c'],
      matrix: ['input', 'register', 'tensor', 'accumulator', 'output']
    };
    return (maps[layer] || ['memory', 'cache', 'compute', 'network', 'output'])[step] || 'memory';
  }

  function render(svg, c, state) {
    if (state.layer === 'overview' && c.id !== 'zhenwu') return false;
    infoMap = {};
    const layer = state.layer === 'overview' ? 'chip' : state.layer;
    let nodes = [], edges = [], extras = [];
    const active = stageNode(c, layer, state.stage), W = 1100, H = 620;
    const source = c.id === 'rtx5090' ? 'detail-rtx5090' : c.id === 'zhenwu' ? 'detail-zhenwu' : c.id === 'rx9070' ? 'detail-rx9070' : c.id === 'groq' ? 'detail-groq' : 'tpu';
    const text = (x, y, t, size = 17, color = '#6889a2', attrs = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${attrs}>${esc(t)}</text>`;
    
    const add = (id, x, y, w, h, title, sub, body, drill = null, kind = 'compute', extra = '', phases = null, drillText = null, operatorLink = false) => {
      nodes.push({ id, x, y, w, h, title, sub, body, drill, kind, extra });
      infoMap[id] = {
        title,
        tag: sub,
        body,
        insight: drill ? '点击该模块可进入下一层；上方导航栏也可直接跳转。' : '图中是公开技术资料中功能组织的重绘，位置与线长不表示芯片物理版图或执行周期。',
        phases,
        drill,
        drillText,
        operatorLink,
        source
      };
    };

    const line = (points, target = '') => edges.push(`<polyline points="${points}" fill="none" stroke="${target === active ? '#5d8daf' : '#b8cbd9'}" stroke-width="${target === active ? '2.4' : '1.5'}" marker-end="url(#detail-arrow)" class="flow ${target === active ? 'active-flow' : ''}"/>`);
    const littleGrid = (x, y, cols, rows, w = 12, gap = 5) => Array.from({ length: cols * rows }, (_, i) => `<rect x="${x + i % cols * (w + gap)}" y="${y + Math.floor(i / cols) * (w + gap)}" width="${w}" height="${w}" rx="2" fill="${state.stage === 2 && i % 3 === 0 ? '#719fbe' : '#cfdee9'}" stroke="#afc6d7"/>`).join('');

    let title = '', subtitle = '', foot = '', page = null;
    const currentScale = scaleLabels[c.id]?.[layer] || `L · ${layer.toUpperCase()}`;

    if (c.id === 'rtx5090' && layer === 'chip') {
      title = '完整 GB202 组织 · RTX Blackwell 架构样本';
      subtitle = '12 GPC × 8 TPC × 2 SM = 192 SM（完整设计模板 · 零售启用 170 SM / 96 MB L2）';
      page = 8;
      add('memory', 35, 110, 180, 350, 'GDDR7 控制器', '512-bit 接口 · 16 通道', '完整GB202芯片拥有16个32-bit显存控制器，构成512-bit位宽。零售RTX 5090配置32 GB GDDR7，官方标称带宽1,792 GB/s。容量与带宽属于板卡配置，不能直接从未屏蔽的硅片拓扑推算。', null, 'memory', text(54, 205, '权重 / KV Cache', 15) + littleGrid(56, 235, 6, 5, 16, 6), {
        prefill: 'Prefill 阶段高并发读取输入权重，显存控制器以 1,792 GB/s 高速向片上 L2 搬运模型参数。',
        decode: 'Decode 每生成一个 token 都要读取全量模型权重，受限于 1,792 GB/s 带宽，显存访存成为核心时延瓶颈。'
      });
      add('cache', 255, 110, 580, 70, 'L2 Cache · 完整设计 128 MB', 'RTX 5090 零售成品为 96 MB', '完整GB202配备128 MB L2，零售RTX 5090启用96 MB。L2作为片上共享高速缓存，为全部12个GPC提供高带宽操作数缓冲，显著降低频繁回写片外GDDR7的功耗开销。', null, 'memory', '', {
        prefill: '大容量 L2 缓存可留存多个算子共享的中间激活值与广播权重块，有效降低外部显存总线争用。',
        decode: '96 MB L2 可以常驻当前推理步骤的注意力 KV Cache 片段与临时激活，避免逐 token 重复读写 GDDR7。'
      });
      for (let i = 0; i < 12; i++) {
        const x = 255 + i % 6 * 98, y = 212 + Math.floor(i / 6) * 119;
        add('gpc' + i, x, y, 90, 94, 'GPC ' + (i + 1), '8 TPC', '每个完整GPC包含8个TPC（16个SM）。此处重绘完整GB202设计模板；零售卡被禁用的22个SM的具体物理屏蔽位置未公开。', 'gpc', 'compute', text(x + 13, y + 73, '进入 GPC ↗', 12, '#648fae'), {
          prefill: '12 个 GPC 满负荷并发，海量 Prompt Token 被拆分成网格块由各个 GPC 共同吞吐。',
          decode: '即使单 token 推理，启用的各 GPC 仍协作分摊大尺寸矩阵乘运算的列分块任务。'
        }, 'L1 GPC 层级');
      }
      add('compute', 255, 463, 580, 62, '192 SM 是完整设计；170 SM 是 RTX 5090 零售启用', '点击任意 GPC 继续展开（12 GPC × 16 SM）', '不可将完整GB202的192 SM模板混同于零售RTX 5090的实际启用数量。零售卡启用170 SM、680 Tensor Core与21,760 CUDA核心。', 'gpc', 'note', '', {
        prefill: '170 SM 与 680 个 Tensor Core 全力进行高吞吐矩阵乘法，算力稼动率达到峰值。',
        decode: '单步计算量小（趋近矩阵-向量乘），SM 运算核心常需等待显存加载权重，算力利用率显著低于 Prefill。'
      }, 'L1 GPC 层级');
      add('network', 875, 110, 190, 145, 'PCIe 5.0 ×16', '主机接口 · 无数据中心 NVLink', '主机CPU通过PCIe 5.0 ×16接口与显卡交互。消费级RTX 5090未配备数据中心级NVLink或Rubin机架互连。', null, 'network', '', {
        prefill: '从主机接收 Prompt 提示词的输入数据与算子调度指令。',
        decode: '每步仅与主机交互极小控制与 token 数据，主要耗时在 GPU 片内与显存访存。'
      });
      add('output', 875, 300, 190, 160, '工作分发 / 系统资源', 'GigaThread / NVENC / NVDEC', '芯片同时集成GigaThread全局调度、视频编解码（NVENC/NVDEC）与显示控制引擎。本图深入聚焦计算与存储层级，完整系统拓扑可对照上方官方原图。', null, 'control', '', {
        prefill: 'GigaThread 引擎依据网格规模派发大量 CTA / Thread Block 到各个 GPC 的流水线中。',
        decode: '调度器循环激发单步轻量 Kernel，管理线程块快速下发。'
      });
      line('215,282 235,282 235,145 255,145', 'cache');
      line('545,180 545,206', 'gpc0');
      line('835,145 875,145', 'network');
      foot = '严格区分完整芯片模板（192 SM）与零售启用配置（170 SM）；不主观猜测被屏蔽的具体 SM/TPC 物理位置。';
    } else if (c.id === 'rtx5090' && layer === 'gpc') {
      title = '一个完整 GPC · Graphics Processing Cluster';
      subtitle = '8 个 TPC × 每 TPC 2 个 SM = 16 个 SM · 占完整芯片 1/12';
      page = 9;
      add('input', 35, 100, 190, 370, '来自 L2 / 工作分发', '逻辑入口与数据总线', '数据与工作调度分属不同硬件路径；连线仅引导阅读顺序，不表示所有访存都必须经过单一串行控制模块。', null, 'memory', text(54, 205, '访问缓存 / 提交工作', 14), {
        prefill: '海量 Block 流水涌入 GPC，TPC 保持高占有率（Occupancy）。',
        decode: '小批次工作快速到达，流水线启动与调度时延更为敏感。'
      });
      add('raster', 270, 100, 570, 65, 'Raster Engine', '图形光栅化硬件 · AI 旁路', 'GPC内部的光栅化资源属于图形专用单元。LLM矩阵乘法与注意力运算走通用计算管线，不经过光栅化引擎。', null, 'control', '', {
        prefill: '图形专用硬件在纯 LLM 算子执行时不参与运算，保持旁路闲置。',
        decode: '光栅资源不占用计算流水，证明 AI 推理与传统图形管线的硬件解耦。'
      });
      for (let i = 0; i < 8; i++) {
        const x = 270 + i % 4 * 145, y = 200 + Math.floor(i / 4) * 133;
        add('tpc' + i, x, y, 135, 108, 'TPC ' + (i + 1), '2 SM + PolyMorph', '每个TPC包含两个SM与一个PolyMorph Engine；点击展开查看SM与执行单元细节。', 'tpc', 'compute', text(x + 15, y + 85, '进入 TPC ↗', 12, '#5f89a7'), {
          prefill: '8 个 TPC 协同调度 16 个 SM，并行吞吐当前 GPC 分配的算子 Tile。',
          decode: '各 TPC 内的 2 个 SM 同步处理各自被分派的权重分块。'
        }, 'L2 TPC 层级');
      }
      add('rop', 880, 100, 185, 160, 'ROP 分区 ×2', '每分区 8 ROP · 图形专用', '官方GPC架构图中的渲染输出单元（ROP），负责像素混合，非LLM归约单元。', null, 'control', '', {
        prefill: '图形输出管线旁路，LLM 计算的中间激活向量不写入 ROP。',
        decode: '保持静默，不消耗通用显存总线带宽。'
      });
      add('output', 880, 302, 185, 168, '继续拆解到 TPC / SM', 'TPC (2 SM) → SM (4 子分区)', '两个SM成对组织在一个TPC中；点击任意TPC或SM即可观察调度器、寄存器堆与Tensor Core的微结构。', 'tpc', 'note', '', {
        prefill: '深入探究双 SM 如何共享 PolyMorph 与片上缓存互联。',
        decode: '查看 TPC 内部的 SM 级数据独立性。'
      }, 'L2 TPC 层级');
      line('225,282 250,282 250,254 270,254', 'tpc0');
      line('840,132 880,132', 'rop');
      foot = '连线展示功能与阅读递进；图形硬件资源与 AI 计算流水分属不同功能模块。';
    } else if (c.id === 'rtx5090' && layer === 'tpc') {
      title = '一个 TPC · 两个 SM 与 PolyMorph Engine';
      subtitle = 'Texture Processing Cluster 官方资源单元 · 占完整芯片 1/96';
      page = 9;
      add('input', 40, 140, 200, 310, '来自 GPC / L2', '工作指令与操作数', 'SM执行可编程线程与矩阵指令；缓存数据传输与调度指令通过内部交叉总线解耦交付。', null, 'memory', '', {
        prefill: '高吞吐传输大批提示词激活张量与权重矩阵切片。',
        decode: '低延迟拉取单个 token 对应的权重指针与 KV Cache 片段。'
      });
      add('polymorph', 285, 100, 530, 75, 'PolyMorph Engine', '图形几何与细分处理', 'TPC内的几何处理资源，专门处理图形顶点与曲面细分，不用于LLM矩阵核心运算。', null, 'control', '', {
        prefill: '顶点/曲面细分等图形单元，LLM 计算时不工作。',
        decode: '保持静默，不消耗 SM 算力。'
      });
      add('sm0', 285, 215, 250, 260, 'SM 0', '4 个执行子分区', 'SM内集成可编程执行单元、Tensor Core、共享内存、纹理单元与光追单元。点击进入详细架构。', 'sm', 'compute', littleGrid(308, 290, 4, 4, 29, 9) + text(307, 450, '进入 SM ↗', 14, '#5983a2'), {
        prefill: 'SM 0 满负荷运行 GEMM，四个子分区 Tensor Core 密集执行矩阵累加。',
        decode: 'SM 0 执行 GEMV，计算周期短，大部分时间等待显存搬运权重。'
      }, 'L3 SM 内部');
      add('sm1', 565, 215, 250, 260, 'SM 1', '4 个执行子分区', '同一TPC中的孪生SM，对称配置4个子分区与独立寄存器堆。', 'sm', 'compute', littleGrid(587, 290, 4, 4, 29, 9) + text(587, 450, '进入 SM ↗', 14, '#5983a2'), {
        prefill: '与 SM 0 镜像并行，处理相邻的数据块。',
        decode: '分摊当前算子的列切片计算。'
      }, 'L3 SM 内部');
      add('texture', 860, 100, 200, 175, '纹理单元（Tex）', '每 SM 4 个 Tex 单元', '纹理采样单元位于SM内部公共区，主要服务图形渲染与图形后处理。', null, 'control', '', {
        prefill: '采样器与纹理管线空闲，AI kernel 主要走 Tensor Core / ALU。',
        decode: '不参与矩阵运算，与计算核心共享片上布线。'
      });
      add('output', 860, 315, 200, 160, '下一层拆解目标', '调度器 / RF / 统一 ALU / Tensor Core', 'SM并非黑盒；进入下一层分别观察Warp调度、64 KiB寄存器堆、统一ALU与第5代Tensor Core。', 'sm', 'note', '', {
        prefill: '探究 4 个子分区的调度器与 Tensor Core 如何协作。',
        decode: '查看 256 KB 寄存器堆与 128 KB 共享内存的延迟特性。'
      }, 'L3 SM 内部');
      line('240,290 285,290', 'sm0');
      line('550,175 550,198 410,198 410,215', 'sm0');
      foot = 'TPC与SM是明确的物理与逻辑分组层级；避免用笼统的“PE”模糊不同层次的硬件差异。';
    } else if (c.id === 'rtx5090' && layer === 'sm') {
      title = 'SM 内部 · 四个执行子分区与公共资源';
      subtitle = '每 SM：128 统一 FP32/INT32 · 4 Tensor Core · 256 KB RF · 128 KB L1/SMEM · 占芯片 1/192';
      page = 11;
      for (let i = 0; i < 4; i++) {
        const x = 35 + i * 266;
        add('sub' + i, x, 105, 250, 290, '子分区 ' + (i + 1), '1 Scheduler / 64 KiB RF', '每个子分区包含L0指令缓存、Warp Scheduler、Dispatch、64 KiB寄存器堆、32个统一FP32/INT32单元、1个第5代Tensor Core、4个LD/ST和1个SFU。', 'partition', 'compute', text(x + 17, 183, '32 统一 FP32 / INT32', 17) + text(x + 17, 215, '1 × 第五代 Tensor Core', 15) + text(x + 17, 248, 'LD/ST ×4（加载存储）', 14) + text(x + 17, 281, 'SFU ×1（特殊函数）', 14) + text(x + 17, 356, '进入子分区 ↗', 14, '#5483a5'), {
          prefill: '每个子分区每周期发射指令全速推进矩阵计算，隐藏数据等待延迟。',
          decode: '由于单 token 访存等待，Warp 经常处于等待内存操作完成的挂起状态。'
        }, 'L4 SM 子分区');
      }
      add('shared', 35, 422, 650, 70, '128 KB L1 数据缓存 / 共享内存 (Shared Memory)', '四个子分区共享的 SM 级存储资源', 'L1缓存与程序显式声明的共享内存在同一物理存储区统一动态划分。支持低延迟操作数广播与线程块内通信。', null, 'memory', '', {
        prefill: 'Shared Memory 用于存放跨 Warp 共享的 Activation Tile，降低重复读取。',
        decode: '保存当前 token 的中间向量和 Softmax 局部归约结果，超低纳秒级时延。'
      });
      add('graphics', 710, 422, 389, 70, '4 × Tex 单元 + 1 × 第四代 RT Core', '图形采样与光线追踪硬件', '这些单元保留在官方SM架构图中，但纯LLM矩阵运算算子不调用RT Core或纹理单元。', null, 'control', '', {
        prefill: '保留在官方图中的图形硬件，在纯 LLM 算子中处于旁路闲置状态。',
        decode: 'RT Core 不参与自回归生成，验证了通用 GPU 的异构多用途特征。'
      });
      line('160,395 160,422', 'shared');
      line('426,395 426,422', 'shared');
      line('620,395 620,422', 'shared');
      foot = 'RTX Blackwell（SM120）白皮书未披露数据中心级 SM100 的 TMEM；本站不跨代移植 TMEM，亦不臆测私有队列。';
    } else if (c.id === 'rtx5090' && layer === 'partition') {
      title = '一个 SM 子分区 · 调度、寄存器与执行资源';
      subtitle = '32 个统一 FP32 / INT32 单元 · 1 个第 5 代 Tensor Core · 64 KiB RF · 占芯片 1/768';
      page = 12;
      add('scheduler', 35, 95, 1030, 65, 'L0 i-Cache → Warp Scheduler → Dispatch', '原图标注：32 thread / clk', 'Warp调度器负责挑选就绪线程束并发射指令；调度器并非每个时钟周期都能让所有运算单元同时点满。', null, 'control', '', {
        prefill: '每周期从就绪 Warp 发射指令，Prefill 高并发 Warp 能够有效隐藏访存延迟。',
        decode: '活跃 Warp 数量少，易出现发射空泡（Stall），需精细调节 Block 规模。'
      });
      add('register', 35, 190, 1030, 65, 'Register File · 16,384 × 32-bit registers = 64 KiB', '操作数与中间累加值靠近计算流水线', '每个子分区的寄存器容量可通过官方数量计算得出（16,384×4 byte = 64 KiB）；单SM的4个子分区合计256 KiB。寄存器分配过多会直接制约SM活跃Warp数量（Occupancy）。', null, 'memory', '', {
        prefill: '寄存器容纳大量局部 Tile 累加变量，高寄存器占用会限制并发 Warp 数。',
        decode: '单 token 运算局部变量少，寄存器堆充沛，通常不会发生 Spill 溢出到本地内存。'
      });
      add('alu', 35, 295, 490, 210, '32 × FP32 / INT32 统一计算单元', '同一组硬件资源，不可重复计数', 'Blackwell v1.1 白皮书明确这些核心是统一的FP32/INT32单元，在一个周期内执行其中一种计算，不能错误算作32个FP32再加32个INT32。', null, 'compute', littleGrid(58, 363, 8, 4, 25, 11), {
        prefill: '执行 LayerNorm、RMSNorm、RoPE 旋转位置编码和激活函数（如 SiLU/GELU）。',
        decode: '执行单 token 向量的点加、缩放与 Softmax 指数缩放操作。'
      });
      add('tensor', 555, 295, 255, 210, '第五代 Tensor Core', '矩阵乘累加 / FP8 · FP4 · FP16 · BF16', '硬件矩阵计算指令执行矩阵Tile乘加；其底层物理PE维度与布线未公开。点击查看4×4乘加数学演示沙盘。', 'matrix', 'tensor', text(574, 390, 'D = A × B + C', 18, '#5f88a7') + text(574, 471, '进入矩阵运算 ↗', 13, '#5985a7'), {
        prefill: '单子分区第五代 Tensor Core 按指令处理矩阵 Tile 乘累加（支持 FP4/FP8/FP16/BF16/TF32），全卡 680 个单元协同提供峰值吞吐。',
        decode: '处理小 batch 单向量乘大矩阵（GEMV 趋势），每次加载权重复用度低，算力利用率受显存带宽制约。'
      }, 'L5 矩阵运算', true);
      add('lsu', 840, 295, 225, 91, 'LD/ST ×4', '加载 / 存储单元', 'Load/Store单元负责在寄存器与L1/L2之间搬运数据，支持异步数据移动指令。', null, 'memory', '', {
        prefill: '批量加载权重与输入激活，配合异步加载指令搬运到 L1/SMEM。',
        decode: '持续向 L2/显存发出小粒度读请求，容易成为制约流水线的瓶颈。'
      });
      add('sfu', 840, 411, 225, 94, 'SFU ×1', '特殊函数单元', '负责计算超越函数（如 exp、sin、cos、sqrt），支持注意力机制中的Softmax与位置编码计算。', null, 'control', '', {
        prefill: '执行 sin/cos (RoPE)、exp (Softmax)、sqrt 等超越数学函数。',
        decode: '为单 token 计算注意力分数归一化时的 exp 与除法。'
      });
      line('550,160 550,190', 'register');
      line('280,255 280,295', 'alu');
      line('680,255 680,295', 'tensor');
      line('950,255 950,295', 'lsu');
      foot = '32 个小方格用于表达公开的功能单元数量，并非物理硅片排布。Tensor Core 内部的微观 PE 阵列尚未公开披露。';
    } else if (c.id === 'zhenwu' && layer === 'chip') {
      title = '真武 M890 · 公开的 CE / CU 与三级缓存组织';
      subtitle = '版本：架构简介 v1.0 · 不套用于 V900 · 10 CE / 39 CU';
      page = 9;
      add('memory', 35, 115, 190, 355, '全局内存 / 全芯片 LLC', '片外存储与全芯片共享缓存', 'M890公开三级缓存架构：CU本地L1/TSM、CE内部共享L2、以及全芯片所有CE共享的LLC。', null, 'memory', text(53, 211, 'LLC / L2 / TSM', 17), {
        prefill: 'LLC 与 HBM 协同供给大量矩阵参数。',
        decode: '自回归阶段频繁查询全局存储中的 KV Cache。'
      });
      add('cache', 270, 105, 560, 70, 'CE 内共享 L2', '全芯片各 CE 再共享末级缓存 LLC', 'CE内部的CU共享L2，全芯片CE进一步通过高速互连共享LLC。此处示意两个CE作为层级示例。', null, 'memory', '', {
        prefill: 'CE 内部 L2 降低多 CU 间广播权重的访存延迟。',
        decode: '存储当前计算批次的局部激活向量。'
      });
      for (let ce = 0; ce < 2; ce++) {
        const x = 270 + ce * 291;
        extras.push(`<rect x="${x}" y="210" width="270" height="259" rx="8" fill="#edf3f8" stroke="#bdd0de"/>` + text(x + 18, 240, 'CE 示例 ' + (ce + 1), 18));
        for (let cu = 0; cu < 4; cu++) {
          const xx = x + 15 + cu % 2 * 126, yy = 266 + Math.floor(cu / 2) * 94;
          add('cu' + ce + cu, xx, yy, 115, 79, 'CU ' + (cu + 1), '进入内部 ↗', '每个CU内部集成了L1、TSM、标量/向量寄存器堆、线程调度以及VALU、TFU、SALU、SFU、LSU等执行资源。', 'cu', 'compute', '', {
            prefill: 'CU 满载运行张量计算核心 TFU。',
            decode: 'CU 执行向量内积，等待显存数据加载。'
          }, 'L1 CU 内部');
        }
      }
      add('network', 875, 105, 190, 165, 'GD / 全局调度与互连', '公开功能组织', '全局调度器与CE/CU协同工作。关于OAM与全系统互连拓扑，可对照上方官方原图。', null, 'control', '', {
        prefill: '全局分发大量矩阵乘法任务至各 CE。',
        decode: '管理小粒度算子核函数调度。'
      });
      add('output', 875, 315, 190, 155, '原文数量待解释', '总 39 CU vs 10 CE × 4 CU', '官方文档同时提及“总 39 CU”与“10 CE × 4 CU”。本站忠实保留文字差异，不主观推测是否有1个CU被冗余屏蔽。', null, 'note', '', {
        prefill: '保持原始文献严谨性，不代填未确认信息。',
        decode: '保留技术证据缺口。'
      });
      line('225,280 249,280 249,140 270,140', 'cache');
      foot = '仅重绘公开的功能层次。原文计数差异已保留；框图位置不代表物理布局。';
    } else if (c.id === 'zhenwu' && layer === 'cu') {
      title = 'M890 CU 内部 · 寄存器、计算单元与异步搬运';
      subtitle = '公开职责图 · 包含 TFU、VALU 与专用 AIU 异步搬运引擎';
      add('scheduler', 35, 92, 1030, 66, '线程调度器', '向 VALU / TFU / SALU / SFU / LSU 分发指令', '调度器面向不同执行单元安排工作。箭头表示逻辑依赖，不代表私有发射微架构细节。', null, 'control', '', {
        prefill: '调度器发射密集 TFU 矩阵指令。',
        decode: '频繁发射 LSU 数据预取指令以缓解等待。'
      });
      add('register', 35, 190, 480, 76, 'SREG / VREG', '标量 / 向量寄存器堆', '标量与向量寄存器堆分别保存不同宽度的操作数与中间累加结果。', null, 'memory', '', {
        prefill: '暂存大尺寸向量累加项。',
        decode: '寄存器占用较少，并发瓶颈在访存。'
      });
      add('tsm', 550, 190, 515, 76, 'L1 缓存 / TSM 共享存储', 'CU 本地低时延数据复用层', 'TSM用于线程块内的数据高速共享；更高层为CE级L2和全芯片LLC。', null, 'memory', '', {
        prefill: '缓存复用注意力激活向量。',
        decode: '作为 KV Cache 读取的局部操作数缓冲。'
      });
      const units = [
        ['valu', 'VALU', '向量运算核心', '负责向量加减、激活函数与向量点乘。', null, 'compute'],
        ['tfu', 'TFU', '张量计算核心', 'TFU承担高吞吐矩阵乘法。点击进入4×4数学教学沙盘。', 'matrix', 'tensor'],
        ['salu', 'SALU', '标量运算核心', '负责标量地址计算与控制流逻辑。', null, 'compute'],
        ['sfu', 'SFU', '特殊函数单元', '负责计算超越函数（exp, sqrt, log）。', null, 'compute'],
        ['lsu', 'LSU ×4', '一般访存单元', '每CU拥有4个LSU负责常规内存加载与写回。', null, 'memory']
      ];
      units.forEach(([id, uTitle, sub, body, drill, kind], i) => {
        add(id, 35 + i * 210, 315, 190, 106, uTitle, sub, body, drill, kind, '', {
          prefill: id === 'tfu' ? 'TFU 高度饱满运行 GEMM 算子。' : '辅助单元支持张量预处理与后处理。',
          decode: id === 'tfu' ? 'TFU 处理低 Batch 向量矩阵乘法。' : 'LSU 成为关键路径。'
        }, drill ? 'L2 矩阵运算' : null);
      });
      add('aiu', 35, 461, 1030, 70, 'AIU · Global Memory → TSM 的异步多维张量搬运引擎', '区别于普通线程调度 / LSU 通用访存路径', 'AIU支持片外全局内存到TSM的异步直接搬运，使数据传输能够与计算重叠，减少计算核心空闲等待。', null, 'memory', '', {
        prefill: 'Prefill 阶段利用 AIU 预取后续层的权重参数，大幅实现搬运与计算重叠。',
        decode: '自回归生成时利用 AIU 异步流式加载当前 token 所需的模型层参数。'
      });
      line('275,158 275,190', 'register');
      line('275,266 275,315', 'tfu');
      line('810,461 810,266', 'tsm');
      foot = '依据 M890 官方架构简介与 SAIL 文档的技术重绘。V900 的未公开容量与时序不做臆测。';
    } else if (c.id === 'groq' && layer === 'core') {
      title = 'Groq 3 LPU · 官方原图给出的核心功能模块';
      subtitle = 'Memory / Matrix / Vector / Control / Chip-to-Chip 空间静态确定性组织';
      add('control', 35, 93, 1030, 67, '控制逻辑 / 编译器排程', '静态编译预定计算与数据移动时间', 'Groq采用静态确定性时钟流水，由编译器在离线阶段精确安排操作数到达每个计算单元的准确时刻。', null, 'control', '', {
        prefill: '编译器安排大张量在确定性管道中无冲突推移。',
        decode: '每 token 严格按照确定时钟拍数推进，无传统动态 Warp 调度开销。'
      });
      add('sram', 35, 205, 255, 290, '超大容量片上 SRAM', '极致低延迟与无外部 HBM 取舍', '模型权重常驻于海量片上SRAM中，摒弃传统外部DRAM/HBM，以获得纳秒级极低访存时延与确定性吞吐。', null, 'memory', littleGrid(58, 285, 7, 6, 21, 8), {
        prefill: '片上 SRAM 供给极高内部带宽。',
        decode: '逐 token 读取权重的延迟由微秒级骤降至纳秒级，自回归生成极快。'
      });
      add('matrix', 335, 205, 320, 135, 'Matrix 矩阵计算单元', '官方核心功能块', '专门执行点积与矩阵乘加；官方简图未披露详细物理微PE排布。', 'matrix', 'tensor', '', {
        prefill: '矩阵单元阵列全速推进。',
        decode: '轻量批次在矩阵流水中连续流动。'
      }, '矩阵运算');
      add('vector', 335, 380, 320, 115, 'Vector 向量处理单元', '非矩阵算子与激活处理', '负责非矩阵类的向量变换、归一化与逐元素运算。', null, 'compute', '', {
        prefill: '与矩阵单元协同流水。',
        decode: '执行激活函数与注意力投影向量变换。'
      });
      add('c2c', 700, 205, 365, 290, 'Chip-to-Chip (C2C) 直连网络', '无交换机全互连扩展', '芯片间采用确定性直连网络协同扩展，支撑将百亿/千亿参数模型切分并分布于大规模LPU集群中。', null, 'network', '', {
        prefill: '在多 LPU 间流水化分发张量并行切片。',
        decode: '每一步生成通过确定性 C2C 网络在节点间低延迟传递激活。'
      });
      line('290,273 335,273', 'matrix');
      line('290,436 335,436', 'vector');
      line('655,273 700,273', 'c2c');
      foot = '依据官方简化框图表达已公开功能；不移植早期芯片数量，不臆测私有物理 PE 几何拓扑。';
    } else if (c.id === 'rx9070' && layer === 'cu') {
      title = 'RDNA 4 CU · 架构功能分工与第二代 AI 加速器';
      subtitle = 'Dual Issue 向量资源 + 第二代 AI 加速矩阵指令单元 · 占芯片微架构核心';
      page = 8;
      add('scheduler', 35, 100, 1030, 70, '指令发射与工作调度', '可编程 GPU 计算流水线', '依据官方RDNA 4微架构图，调度器负责双发射指令分发。不将CDNA 5计算卡架构混称为RDNA 4。', null, 'control', '', {
        prefill: '发射大量并发计算指令。',
        decode: '协调小批量算子的指令流水。'
      });
      add('register', 35, 210, 270, 260, '通用寄存器堆与 LDS 本地数据共享', '近核心数据缓存', '寄存器堆与本地数据共享存储（LDS）为计算单元提供高速数据供给。', null, 'memory', '', {
        prefill: '高并发占用 LDS 空间。',
        decode: '为单 token 局部变量提供纳秒级读取。'
      });
      add('valu', 350, 210, 300, 118, 'VALU 向量计算单元', '常规浮点与图形计算', '执行常规单精度/半精度可编程着色与向量指令。', null, 'compute', '', {
        prefill: '承担算子中的规范化与激活运算。',
        decode: '处理逐元素轻量数学操作。'
      });
      add('tfu', 350, 365, 300, 105, '第二代 AI 加速器', 'WMMA 矩阵指令执行单元', '公开的WMMA矩阵指令提供硬件级矩阵乘加加速；指令Tile规格不等于底层物理PE阵列排布。', 'matrix', 'tensor', '', {
        prefill: '执行大规模 GEMM 算子矩阵乘加。',
        decode: '运行单 token 向量矩阵乘法。'
      }, '矩阵运算');
      add('lsu', 695, 210, 370, 118, 'LSU 数据加载与存储', '显存与各级缓存总线接口', 'RX 9070 XT 配置 16 GB GDDR6 显存；在评估 AI 推理时需先核对显存容量上限。', null, 'memory', '', {
        prefill: '高吞吐从显存加载权重。',
        decode: '逐 token 刷新 KV Cache，显存带宽成为主要时延制约。'
      });
      add('graphics', 695, 365, 370, 105, '图形 / 光线追踪硬件', '与 AI 计算管线解耦', '保留图形输出与光追单元，明确其在纯大模型计算中保持旁路闲置。', null, 'control', '', {
        prefill: '图形单元在 LLM 算子中不工作。',
        decode: '保持静默，不占用计算流水。'
      });
      line('305,269 350,269', 'valu');
      line('650,418 695,418', 'graphics');
      foot = '重绘公开的功能分工；指令 Tile 规格与内部物理 PE 阵列严格区分。';
    } else if (layer === 'matrix') {
      title = '矩阵乘累加 · 4×4 教学 Tile';
      subtitle = '数学映射示例 ≠ 物理微观 PE 阵列 · K 步逐步累加演示';
      add('input', 35, 130, 220, 345, '输入 A 与权重 B', '4×4 教学操作数矩阵', '固定的小规模 4×4 整数矩阵，便于清晰追踪乘加过程。真实算子中的 Tile 大小（如 16×16、64×64）依芯片指令集与编译器决定。', null, 'memory', littleGrid(65, 243, 4, 4, 27, 9), {
        prefill: 'Prefill 阶段输入 A 代表多个 Prompt Token 的激活向量矩阵，权重 B 为模型层参数。',
        decode: 'Decode 阶段输入 A 退化为 1×D 单向量或极小批次，权重 B 仍为全量参数矩阵。'
      });
      add('register', 305, 130, 250, 125, '操作数准备 / Tile 配对', '第 K 步操作数提取', '将输入矩阵第 i 行与权重矩阵第 j 列在维度 K 上的操作数提取并送入乘法器。', null, 'memory', text(325, 205, `提取 A[i,${matrixK}] 与 B[${matrixK},j]`, 15, '#5d8daf'), {
        prefill: '高吞吐连续发射并预取后续操作数。',
        decode: '由于输入向量小，权重数据量大，操作数重用率（Data Reuse）接近 1。'
      });
      add('tensor', 305, 310, 250, 165, '乘法运算单元', 'D = A × B + C', '执行单项操作数乘法 A[i,k] × B[k,j]。该数学概念由底层矩阵加速单元执行，但不等同于物理PE硬件排布。', null, 'tensor', text(325, 417, '乘法 + 累加', 22, '#6b93af'), {
        prefill: '大量乘法并发执行，算力单元保持满载。',
        decode: '单步乘法计算极快，耗时主要花费在等待下一批权重数据到位。'
      });
      add('accumulator', 610, 130, 245, 345, '累加器 / 结果 Tile', `累加进度：${matrixK} / 4`, '沿深度维度 K 累加每次乘积的部分和（Partial Sum），生成输出矩阵 C 的最终数值。', null, 'memory', littleGrid(641, 243, 4, 4, 27, 9), {
        prefill: '沿 K 维连续累加生成大批 Prompt Token 的输出激活。',
        decode: '沿 K 维累加单 token 输出，完成后即刻送往采样或下一层。'
      });
      add('output', 905, 130, 160, 345, '写回 / 后续复用', '输出张量 Tile', '计算完成后将结果张量 Tile 写入共享内存或显存。本模型为概念教学，不模拟芯片硬件发射时序。', null, 'memory', text(925, 230, 'C 矩阵就绪', 16, '#5b829e'), {
        prefill: '将输出张量批量送往后续 MLP 或 Attention 模块。',
        decode: '将输出向量送入采样生成逻辑，决定生成的下一个 Token ID。'
      });
      line('255,215 305,215', 'register');
      line('430,255 430,310', 'tensor');
      line('555,390 610,390', 'accumulator');
      line('855,301 905,301', 'output');
      foot = '矩阵教学模型用于解释计算逻辑与数据依赖，不宣称物理复刻 Tensor Core、TFU 或 MXU 内部阵列。';
    } else {
      return false;
    }

    const rects = nodes.map(n => {
      const on = n.id === active, selected = n.id === state.node;
      let fill = n.kind === 'memory' ? '#edf4fa' : n.kind === 'control' ? '#eef1f8' : n.kind === 'tensor' ? '#e7eff7' : n.kind === 'note' ? '#f5f3ed' : '#eef4f8';
      if (on) fill = '#dfeef8';
      const y2 = n.y + 53;
      return `<g class="node ${on ? 'active-node' : ''} ${selected ? 'selected' : ''}" data-node="${n.id}" ${n.drill ? `data-enter-layer="${n.drill}"` : ''} role="button" tabindex="0" aria-label="${esc(n.title)}${n.drill ? '，进入' + n.drill : '，查看解释'}" aria-pressed="${selected}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="7" fill="${fill}" stroke="${on ? '#7da4c1' : '#afc5d6'}" stroke-width="${on ? '2' : '1'}"/><text x="${n.x + 17}" y="${n.y + 29}" font-size="${n.w < 140 ? 16 : 18}" font-weight="600" fill="#3d617e">${esc(n.title)}</text><text x="${n.x + 17}" y="${y2}" font-size="${n.w < 140 ? 11 : 13}" fill="#88a1b6">${esc(n.sub)}</text>${n.extra}</g>`;
    }).join('');

    const phaseTagColor = state.phase === 'decode' ? '#7d5c34' : '#326b3a';
    const phaseTagBg = state.phase === 'decode' ? '#fbf6ee' : '#edf7ee';
    const phaseTagBorder = state.phase === 'decode' ? '#dfd0ba' : '#bddcbd';
    const phaseLabel = state.phase === 'decode' ? 'Decode 逐 token · 显存受限' : 'Prefill 读提示词 · 算力受限';

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `<title id="svg-title">${esc(title)}</title><desc id="svg-desc">${esc(subtitle)}。${esc(foot)}</desc><defs><marker id="detail-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#9cb9cf"/></marker></defs>${text(35, 37, title, 21, '#486d8a', 'font-weight="600"')}${text(35, 66, subtitle, 13, '#8ca4b7')}<g class="scale-badge"><rect x="760" y="20" width="305" height="26" rx="5" fill="#e7eff7" stroke="#b6cde0"/><text x="912" y="37" font-size="12" font-weight="600" fill="#325a7d" text-anchor="middle">${esc(currentScale)}</text></g><g class="phase-badge"><rect x="540" y="20" width="205" height="26" rx="5" fill="${phaseTagBg}" stroke="${phaseTagBorder}"/><text x="642" y="37" font-size="12" font-weight="600" fill="${phaseTagColor}" text-anchor="middle">${phaseLabel}</text></g>${extras.join('')}${edges.join('')}${rects}${text(35, 588, '点击带“进入”的模块可穿透下钻；其他模块显示两阶段解释与硬件参数。', 13, '#8fa6b9')}`;
    svg.classList.toggle('running', state.playing);
    svg.setAttribute('role', 'group');
    $('#diagram-label').textContent = 'DETAIL ATLAS / ' + layer.toUpperCase();
    $('#diagram-caption').textContent = '硬件功能层次重绘 · 严格依官方白皮书与白图对齐 · 可横向滚动查看';

    const src = window.OBS_DATA.sources.find(s => s.id === source);
    $('#layer-footnotes').hidden = false;
    $('#layer-footnotes').innerHTML = `<p><strong>本层依据：</strong>${esc(title)}${page ? ' · 官方技术文档第 ' + page + ' 页' : ''}。</p><p>${esc(foot)}</p><a href="${esc(src?.url || '')}${page ? '#page=' + page : ''}" target="_blank" rel="noopener noreferrer">核对这一层的原始资料 ↗</a>`;
    $('#matrix-lab').hidden = layer !== 'matrix';
    if (layer === 'matrix') renderMatrix();
    return true;
  }

  const A = [[1, 2, 0, 1], [0, 1, 2, 0], [2, 0, 1, 1], [1, 1, 1, 1]];
  const B = [[1, 0, 2, 1], [0, 1, 1, 2], [2, 1, 0, 1], [1, 2, 1, 0]];

  function matrixResult(k) {
    return A.map((row) => B[0].map((_, j) => row.slice(0, k).reduce((s, a, t) => s + a * B[t][j], 0)));
  }

  function renderMatrix() {
    const C = matrixResult(matrixK), r = Math.floor(matrixFocus / 4), c = matrixFocus % 4;
    const grid = (arr, which) => `<div class="matrix-grid">${arr.flat().map((n, i) => `<span class="${which === 'A' && Math.floor(i / 4) === r && i % 4 < matrixK || which === 'B' && i % 4 === c && Math.floor(i / 4) < matrixK || which === 'C' && i === matrixFocus ? 'current' : ''}" ${which === 'C' ? `role="button" tabindex="0" data-matrix-cell="${i}" aria-label="查看结果第${Math.floor(i / 4) + 1}行第${i % 4 + 1}列"` : ''}>${n}</span>`).join('')}</div>`;
    $('#matrix-lab').innerHTML = `<span class="chapter-tag">TEACHING MODEL / 不是物理 PE 布局</span><h3>沿着 K 维，一步一步把结果算出来。</h3><p>固定的 4×4 整数矩阵。每次“累加一步”加入一项 A[i,k] × B[k,j]；选择结果中的某一格，检查它的完整乘累加过程。</p><div class="matrix-grids"><div class="matrix-item"><div class="matrix-title">输入 A</div>${grid(A, 'A')}</div><span class="matrix-symbol">×</span><div class="matrix-item"><div class="matrix-title">权重 B</div>${grid(B, 'B')}</div><span class="matrix-symbol">=</span><div class="matrix-item"><div class="matrix-title">部分和 C · 已累加 ${matrixK}/4 项</div>${grid(C, 'C')}</div></div><div class="matrix-controls"><button data-matrix-step ${matrixK === 4 ? 'disabled' : ''}>累加一步 →</button><button data-matrix-reset>重新开始</button><span class="matrix-k">K = ${matrixK} / 4</span></div><div class="matrix-equation">C[${r + 1},${c + 1}] = ${matrixK ? A[r].slice(0, matrixK).map((a, k) => a + '×' + B[k][c]).join(' + ') : '0'} = ${C[r][c]}</div>`;
  }

  function recolor(svg) {
    const palette = {
      '#142420': '#f7f9fb', '#1c3328': '#eef4f8', '#324c36': '#e0edf7', '#d1e3c4': '#416681',
      '#8ca987': '#8299ad', '#7f9b77': '#91a8ba', '#bce9a5': '#6f9fbe', '#4a6248': '#afc5d6',
      '#486342': '#ccdce8', '#294531': '#e4eef6', '#5d7851': '#b1c9db', '#bfd8ad': '#6d90ab',
      '#9bb48c': '#8da6b8', '#9ab78a': '#90a9bb', '#8da67d': '#a0b5c4', '#a4bc96': '#8aa6bb',
      '#abc29c': '#89a6bc', '#607c56': '#b2cada', '#78966a': '#9db2c2', '#799485': '#95abba',
      '#9fb58c': '#92aabd', '#6c8b64': '#9caebe', '#4b654a': '#b4cbdc', '#6b8a67': '#a5bfd2',
      '#a9956e': '#c9aa80', '#637f58': '#b7cbdc', '#9aaf8b': '#9ab1c3', '#b5a67c': '#a28e6d',
      '#7b8b73': '#90a4b3', '#c4bb9f': '#a99b85', '#a8c895': '#88aac4', '#7e9b71': '#98adbd',
      '#d6ebc7': '#648ba7', '#88a67a': '#8fa7ba', '#96b385': '#95acbd', '#d8b37d': '#bc9d6f',
      '#29452f': '#e4eef6', '#517446': '#b1c9db', '#b1cd9f': '#416681'
    };
    svg.querySelectorAll('[fill],[stroke]').forEach(e => {
      for (const attr of ['fill', 'stroke']) {
        const value = e.getAttribute(attr);
        if (palette[value]) e.setAttribute(attr, palette[value]);
      }
    });
    if (svg.id === 'architecture') {
      svg.querySelectorAll('text:not([data-sub])').forEach(t => {
        const old = Number(t.getAttribute('font-size')) || 12;
        if (old >= 11) t.setAttribute('font-size', Math.round(old * 1.08));
      });
    }
  }

  window.OBS_DETAIL = {
    levels,
    defaultLayer: c => levels(c)[0][0],
    render,
    stageNode,
    info: (id, phase) => {
      const item = infoMap[id];
      if (!item) return null;
      const res = { ...item };
      if (phase && item.phases && item.phases[phase]) {
        res.insight = item.phases[phase];
        res.phaseLabel = phase === 'decode' ? 'Decode 逐 token 视角' : 'Prefill 读提示词 视角';
      }
      return res;
    },
    renderNav,
    renderGallery,
    openFigure,
    recolor,
    figureClick: (target, c, state) => {
      if (target.dataset.figureIndex !== undefined) {
        selectedFigures[c.id] = Number(target.dataset.figureIndex);
        renderGallery(c);
        return true;
      }
      if (target.dataset.openFigure) {
        openFigure(c);
        return true;
      }
      if (target.id === 'close-figure') {
        $('#figure-dialog').close();
        return true;
      }
      if (target.hasAttribute('data-toggle-zoom')) {
        $('#figure-dialog-content img').classList.toggle('zoomed');
        return true;
      }
      if (target.hasAttribute('data-matrix-step')) {
        matrixK = Math.min(4, matrixK + 1);
        renderMatrix();
        if (state && state.layer === 'matrix') {
          const accNode = $('#architecture [data-node="accumulator"] text:nth-of-type(2)');
          if (accNode) accNode.textContent = `累加进度：${matrixK} / 4`;
          const regText = $('#architecture [data-node="register"] text:nth-of-type(3)');
          if (regText) regText.textContent = `提取 A[i,${matrixK}] 与 B[${matrixK},j]`;
        }
        return true;
      }
      if (target.hasAttribute('data-matrix-reset')) {
        matrixK = 0;
        renderMatrix();
        if (state && state.layer === 'matrix') {
          const accNode = $('#architecture [data-node="accumulator"] text:nth-of-type(2)');
          if (accNode) accNode.textContent = `累加进度：0 / 4`;
          const regText = $('#architecture [data-node="register"] text:nth-of-type(3)');
          if (regText) regText.textContent = `提取 A[i,0] 与 B[0,j]`;
        }
        return true;
      }
      if (target.dataset.matrixCell !== undefined) {
        matrixFocus = Number(target.dataset.matrixCell);
        renderMatrix();
        return true;
      }
      return false;
    },
    matrixResult
  };
})();

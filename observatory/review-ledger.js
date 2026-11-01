/* Public, bounded correctness notes. No claim of exhaustive certification. */
'use strict';
(() => {
  const items=[
    {group:'rdma',title:'WRITE 完成，不等于远端 GPU 消费。',body:'普通 WRITE、源端 CQE、远端通知与 GPU 可见性分别核对；不画成同一完成事件。',url:'https://docs.nvidia.com/cuda/gpudirect-rdma/#synchronization-and-memory-ordering',label:'GPUDirect RDMA · 顺序规则'},
    {group:'rdma',title:'SRNIC 的快慢路径与资源归属。',body:'QPC 全量片上；MTT 大表在 host、片上保留 cache；恢复元数据走软件慢路径，不是全部 payload 绕 CPU。',url:'https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=7',label:'SRNIC · Figure 4 / §4.4–4.5'},
    {group:'rdma',title:'吞吐与时延，保留各自实验条件。',body:'单连接、两卡直连：97 Gb/s 对应超过4 KB消息；3.3 μs 对应64-byte消息。4096服务器的扩展结果来自 ns-3。',url:'https://www.usenix.org/system/files/nsdi23-wang-zilong.pdf#page=11',label:'SRNIC · §6 / 原型与模拟'},
    {group:'rdma',title:'通信域与协议名称，分层解释。',body:'scale-up 可以跨节点；Ethernet 也有 scale-up profile。规范能力与已经支持它的商用产品分别列证据。',url:'https://ultraethernet.org/ultra-ethernet-consortium-releases-specification-1-1-advancing-ai-and-hpc-networking/',label:'UE 1.1 · 官方发布与范围'},
    {group:'gpu',title:'完整 GB202 与零售 RTX 5090 配置分开。',body:'完整设计192 SM；RTX 5090启用170 SM。层级图不猜被屏蔽的位置，也不把完整芯片的 L2 容量套到零售配置。',url:'https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf',label:'NVIDIA · RTX Blackwell 白皮书'},
    {group:'gpu',title:'SM100 的 TMEM，不能照搬给 SM120。',body:'本算子选择 SM100 的 tcgen05 / TMEM 路径；RTX 5090 使用 SM120，需要核对独立的 MMA 与布局实现。',url:'https://github.com/NVIDIA/cutlass/tree/main/examples/79_blackwell_geforce_gemm',label:'NVIDIA CUTLASS · SM120 示例'},
    {group:'gpu',title:'专家 GEMM 形状与后续激活，回到源码。',body:'5120→4608=2×2304；基础 SwiGLU 式省略的 clamp(limit=10)、topk_weights 与 cast，已在真实调用说明中补全。',url:'https://github.com/deepseek-ai/DeepInfer/blob/553741557a57df44a46fb3ab72b6aafeaf945337/deepinfer/model_executor/models/v4_modules/mlp.py#L405-L449',label:'DeepInfer · 固定 commit 的 MLP'},
    {group:'gpu',title:'软件 tile 与早期加速器 PE，是职责类比。',body:'4×4矩阵沙盘用于手算，不能当成 Tensor Core 物理 PE 布局；NVDLA 的 CBUF / CACC 也不等于 GPU L2 / TMEM。',url:'https://nvdla.org/hw/v1/ias/unit_description.html',label:'NVDLA · 单元规格'}
  ];
  function render(group='all'){
    const list=group==='rdma'?items.filter(x=>x.group==='rdma'):group==='gpu'?items.filter(x=>x.group==='gpu'):items;
    return `<details class="quality-ledger"><summary>关键表述核查记录 <span>复核 2026.10.31 · ${list.length} 个重点 · 原始依据可追溯</span></summary><div><p>本轮重点检查技术语义、图中模块归属、实验条件和源码路径。资料快照仍为2026.10.30；复核日期不表示所有来源都在今天更新。</p><ol>${list.map(x=>`<li><b>${x.title}</b>${x.body}<br><a href="${x.url}" target="_blank" rel="noopener noreferrer">${x.label} ↗</a></li>`).join('')}</ol><p class="quality-boundary"><a href="REVIEW-v07.md" target="_blank" rel="noopener noreferrer">查看完整本轮核查说明 ↗</a><br>核查范围：重点原文与固定源码、数值模型和前端交互；未逐句审读90篇全文，未执行真实设备测试。动画是教学重绘，厂商报告、论文原型、仿真与产品能力各自保留范围。</p></div></details>`;
  }
  function mount(view){if(['notes','rdma','sources'].includes(view))return;const host=document.querySelector('#view-'+view);if(!host)return;host.querySelector('[data-review-mount]')?.remove();const el=document.createElement('div');el.dataset.reviewMount='';el.innerHTML=render(['explore','operator','case'].includes(view)?'gpu':'all');host.append(el);}
  window.OBS_REVIEW={render,mount,items};
})();

'use strict';
(() => {
  const rail=document.createElement('div');rail.className='reading-progress';rail.setAttribute('aria-hidden','true');rail.innerHTML='<i></i>';document.body.append(rail);
  const top=document.createElement('button');top.className='back-top';top.textContent='↑';top.setAttribute('aria-label','返回页面顶部');top.hidden=true;document.body.append(top);
  top.addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
  let pending=false;
  function update(){pending=false;const max=document.documentElement.scrollHeight-innerHeight,ratio=max>0?Math.max(0,Math.min(1,scrollY/max)):0;rail.firstElementChild.style.width=(ratio*100)+'%';top.hidden=scrollY<700;}
  function request(){if(!pending){pending=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});window.addEventListener('hashchange',request);
  new ResizeObserver(request).observe(document.querySelector('main'));request();
})();

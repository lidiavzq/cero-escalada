const toggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');

function closeMenu(){
  if(!navLinks || !toggle) return;
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Abrir menú');
}

if(toggle && navLinks){
  toggle.addEventListener('click',()=>{
    const open=!navLinks.classList.contains('open');
    navLinks.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });

  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMenu(); });
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window && !prefersReduced){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

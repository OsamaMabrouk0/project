/* Injects the shared header, bottom navigation and footer on every page. */
(()=>{const CG=window.CG,b=CG.base,page=document.body.dataset.page;
const pages=[['home','house','index.html'],['halls','door-open','pages/halls.html'],['map','map','pages/map.html'],['about','info','pages/about.html'],['team','users','pages/team.html']];
const link=(p,c)=>`<a href="${b}${p[2]}" class="${c}${p[0]===page?' is-active':''}"${p[0]===page?' aria-current="page"':''}><i data-lucide="${p[1]}"></i><span data-i18n="nav.${p[0]}"></span></a>`;
document.body.insertAdjacentHTML('afterbegin',`<header class="site-header surface"><a class="brand" href="${b}index.html"><span class="brand-logo"><img src="${b}assets/images/faculty-logo.png" alt=""></span><span class="brand-text"><strong data-i18n="site.title"></strong><small data-i18n="site.faculty"></small></span></a><nav class="top-nav" aria-label="Main">${pages.map(p=>link(p,'nav-link')).join('')}</nav><button class="lang-btn" id="langBtn" type="button" data-i18n-label="lang.aria"><i data-lucide="languages"></i><span id="langTxt"></span></button></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer class="site-footer" data-i18n="footer.txt"></footer><nav class="bottom-nav surface" aria-label="Main">${pages.map(p=>link(p,'bn-link')).join('')}</nav>`);

/* Splash: shown once per session, closes when the page has really finished loading
   (fonts + images + window load). Progress bar follows the real number of finished tasks. */
if(document.documentElement.classList.contains('has-splash')){
 const sp=document.createElement('div');sp.className='splash';
 sp.innerHTML=`<div class="splash-inner"><span class="splash-logo"><img src="${b}assets/images/faculty-logo.png" alt=""></span><h1 data-i18n="site.title"></h1><p data-i18n="site.faculty"></p><span class="splash-bar"><i></i></span></div>`;
 document.body.prepend(sp);
 const bar=sp.querySelector('i');let closed=false;
 const done=()=>{if(closed)return;closed=true;bar.style.setProperty('--p',1);
  setTimeout(()=>{sp.classList.add('is-out');document.documentElement.classList.remove('has-splash');try{sessionStorage.setItem('cg-splash','1')}catch{}setTimeout(()=>sp.remove(),600)},280)};
 const imgs=[...document.images].filter(i=>!i.closest('.splash')&&!i.complete).map(i=>new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true})}));
 const tasks=[document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>document.readyState==='complete'?r():addEventListener('load',r,{once:true})),...imgs];
 let n=0;tasks.forEach(t=>Promise.resolve(t).catch(()=>{}).then(()=>{n++;bar.style.setProperty('--p',Math.max(.1,n/tasks.length));if(n===tasks.length)done()}));
 setTimeout(done,10000); /* failsafe if a resource hangs (e.g. offline fonts) */
}
/* Page transitions: fade out before navigating to another page */
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank'||a.hasAttribute('download'))return;
 const u=new URL(a.href,location.href);if(u.protocol!==location.protocol||(u.pathname===location.pathname&&u.search===location.search)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 e.preventDefault();document.documentElement.classList.add('is-leaving');setTimeout(()=>{location.href=a.href},260)});
addEventListener('pageshow',e=>{if(e.persisted)document.documentElement.classList.remove('is-leaving')});
const txt=()=>document.getElementById('langTxt').textContent=CG.lang==='ar'?'EN':'عربي';
document.getElementById('langBtn').onclick=()=>CG.setLang(CG.lang==='ar'?'en':'ar');
CG.onLang(txt);txt();CG.apply();CG.icons();
addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('is-scrolled',scrollY>8),{passive:true});
})();

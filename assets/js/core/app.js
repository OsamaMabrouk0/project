/* Runtime: language, translation helpers, shared utilities. */
(()=>{const CG=window.CG=window.CG||{},KEY='cg-lang',subs=[];
let saved;try{saved=localStorage.getItem(KEY)}catch{}
CG.lang=saved==='en'?'en':'ar';
CG.base=document.body.dataset.base||'./';
CG.t=(k,v={})=>{const e=CG.dict[k];if(!e)return k;let s=e[CG.lang]??e.ar;for(const n in v)s=s.split('{'+n+'}').join(v[n]);return s};
CG.L=o=>o?(o[CG.lang]??o.ar):'';
CG.esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
CG.sk=(n,cls='')=>Array.from({length:n},()=>`<div class="sk ${cls}"></div>`).join('');
CG.delay=ms=>new Promise(r=>setTimeout(r,ms));
CG.icons=()=>{try{window.lucide&&lucide.createIcons()}catch{}};
CG.apply=()=>{const h=document.documentElement;h.lang=CG.lang;h.dir=CG.lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=CG.t(e.dataset.i18n));
 document.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=CG.t(e.dataset.i18nPh));
 document.querySelectorAll('[data-i18n-alt]').forEach(e=>e.alt=CG.t(e.dataset.i18nAlt));
 document.querySelectorAll('[data-i18n-label]').forEach(e=>e.setAttribute('aria-label',CG.t(e.dataset.i18nLabel)));
 document.title=CG.t('nav.'+document.body.dataset.page)+' | '+CG.t('site.title')};
CG.onLang=f=>subs.push(f);
CG.setLang=l=>{CG.lang=l;try{localStorage.setItem(KEY,l)}catch{}CG.apply();subs.forEach(f=>f(l));CG.icons()};
})();

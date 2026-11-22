(()=>{const CG=window.CG,$=s=>document.querySelector(s),e=CG.esc,L=CG.L;
const ticks=a=>`<ul class="ticks">${a.map(x=>`<li><i data-lucide="check"></i><span>${e(L(x))}</span></li>`).join('')}</ul>`;
const chips=a=>`<ul class="chips sm">${a.map(x=>`<li class="chip static">${e(L(x))}</li>`).join('')}</ul>`;
const roles=g=>`<div class="cgroup">${g.title?`<h5>${e(L(g.title))}</h5>`:''}<ul class="roles">${g.items.map(r=>`<li><strong>${e(L(r.n))}</strong><span>${e(L(r.d))}</span></li>`).join('')}</ul></div>`;
const courses=a=>`<ul class="courses">${a.map(c=>`<li>${e(L(c))}</li>`).join('')}</ul>`;
const term=(t,i)=>`<details class="term"${i===0?' open':''}><summary><span>${e(L(t.title))}</span>${t.hours?`<em class="badge">${CG.t('about.hours',{n:t.hours})}</em>`:''}<i data-lucide="chevron-down"></i></summary><div class="term-body"><h6>${CG.t('about.core')}</h6>${courses(t.core)}${t.other?.length?`<h6 class="muted">${CG.t('about.other')}</h6>${courses(t.other)}`:''}${t.note?`<p class="term-note"><i data-lucide="graduation-cap"></i>${e(L(t.note))}</p>`:''}</div></details>`;
const plan=p=>`<div class="plan"><h4 class="dept-sub"><i data-lucide="calendar-range"></i>${CG.t('about.plan')}</h4><p class="muted">${CG.t('about.planNote')}</p>${p.map(l=>`<div class="level"><h5>${e(L(l.level))}</h5><div class="terms">${l.terms.map(term).join('')}</div></div>`).join('')}</div>`;
const dept=(d,i)=>`<article class="dept surface" id="dept-${d.id}" style="--accent:${d.accent}"><header class="dept-head"><span class="dept-ico"><i data-lucide="${d.icon}"></i></span><div><span class="dept-no">${String(i+1).padStart(2,'0')}</span><h3>${e(L(d.name))}</h3><p class="dept-tag">${e(L(d.tag))}</p></div></header><p class="dept-about">${e(L(d.about))}</p><div class="dept-cols"><section><h4 class="dept-sub"><i data-lucide="book-open"></i>${CG.t('about.areas')}</h4>${chips(d.areas)}</section><section><h4 class="dept-sub"><i data-lucide="sparkles"></i>${CG.t('about.adv')}</h4>${ticks(d.benefits)}</section></div><h4 class="dept-sub"><i data-lucide="briefcase"></i>${CG.t('about.jobs')}</h4><div class="career-groups">${d.careers.map(roles).join('')}</div>${d.plan?plan(d.plan):''}</article>`;
const facts=()=>[[CG.departments.length,'about.f1'],['4','about.f2'],[CG.departments.reduce((a,d)=>a+d.careers.reduce((b,g)=>b+g.items.length,0),0),'about.f3'],['3','about.f4']].map(([n,k])=>`<li><strong>${n}</strong><span>${CG.t(k)}</span></li>`).join('');
const nav=()=>`<span class="dept-nav-l">${CG.t('about.jump')}</span>${CG.departments.map(d=>`<a class="chip" href="#dept-${d.id}" style="--accent:${d.accent}"><i data-lucide="${d.icon}"></i>${e(L(d.short))}</a>`).join('')}`;
let io;
function spy(){io?.disconnect();if(!('IntersectionObserver'in window))return;
 const links=[...document.querySelectorAll('.dept-nav a')];
 io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)links.forEach(a=>a.classList.toggle('is-on',a.getAttribute('href')==='#'+x.target.id))}),{rootMargin:'-30% 0px -60% 0px'});
 document.querySelectorAll('.dept').forEach(d=>io.observe(d))}
function render(){try{
 $('#facts').innerHTML=facts();$('#deptNav').innerHTML=nav();
 $('#depts').innerHTML=CG.departments.map(dept).join('');spy()}
 catch(err){$('#depts').innerHTML=`<div class="state surface"><i data-lucide="wifi-off"></i><h3>${CG.t('err.loadT')}</h3><p>${CG.t('err.load')}</p></div>`}CG.icons()}
$('#depts').innerHTML=CG.sk(3,'dept-sk');CG.delay(450).then(render);CG.onLang(()=>{if(!$('.dept-sk'))render()});
})();

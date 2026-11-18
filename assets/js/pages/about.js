(()=>{const CG=window.CG,$=s=>document.querySelector(s);
const ul=a=>`<ul class="ticks">${a.map(x=>`<li><i data-lucide="check"></i><span>${CG.esc(x)}</span></li>`).join('')}</ul>`;
function render(){try{
 $('#depts').innerHTML=CG.departments.map(d=>`<article class="dept surface"><header><span class="dept-ico"><i data-lucide="${d.icon}"></i></span><h3>${CG.esc(CG.L(d.name))}</h3></header><p>${CG.esc(CG.L(d.about))}</p><h4>${CG.t('about.adv')}</h4>${ul(d.benefits[CG.lang])}<h4>${CG.t('about.jobs')}</h4>${ul(d.careers[CG.lang])}</article>`).join('')}
 catch(e){$('#depts').innerHTML=`<div class="state surface"><i data-lucide="wifi-off"></i><h3>${CG.t('err.loadT')}</h3><p>${CG.t('err.load')}</p></div>`}CG.icons()}
$('#depts').innerHTML=CG.sk(2,'dept-sk');CG.delay(450).then(render);CG.onLang(()=>{if(!$('.dept-sk'))render()});
})();

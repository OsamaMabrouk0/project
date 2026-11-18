(()=>{const CG=window.CG,$=s=>document.querySelector(s);
const order=[...CG.team];for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
function render(){try{
 $('#team').innerHTML=order.map(m=>`<article class="member surface${m.todo?' is-todo':''}"><span class="avatar">${CG.esc(CG.L(m.name).slice(0,1))}</span><h3>${CG.esc(CG.L(m.name))}</h3>${m.role?`<p>${CG.esc(CG.L(m.role))}</p>`:''}<div class="links">${m.links.map(l=>`<a class="pill-link" href="${l.href}" target="_blank" rel="noopener"><i data-lucide="${l.ico}"></i>${l.label}</a>`).join('')}</div></article>`).join('')}
 catch(e){$('#team').innerHTML=`<div class="state surface"><i data-lucide="wifi-off"></i><h3>${CG.t('err.loadT')}</h3><p>${CG.t('err.load')}</p></div>`}CG.icons()}
$('#team').innerHTML=CG.sk(6,'team-sk');CG.delay(450).then(render);CG.onLang(()=>{if(!$('.team-sk'))render()});
})();

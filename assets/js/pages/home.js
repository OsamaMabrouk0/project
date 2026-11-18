(()=>{const CG=window.CG,$=s=>document.querySelector(s),img=$('#heroImg');
const ready=()=>{$('#heroSk')?.remove();img.classList.add('ready')};
img.complete&&img.naturalWidth?ready():img.addEventListener('load',ready,{once:true});
$('#heroSearch').addEventListener('submit',e=>{e.preventDefault();const q=e.target.q.value.trim();location.href=CG.base+'pages/halls.html'+(q?'?q='+encodeURIComponent(q):'')});
const tiles=[['halls','door-open'],['map','map'],['about','graduation-cap'],['team','users']];
function render(){
 $('#tiles').innerHTML=tiles.map(([k,i])=>`<a class="tile surface" href="${CG.base}pages/${k}.html"><i data-lucide="${i}"></i><h3>${CG.t('nav.'+k)}</h3><p>${CG.t('tile.'+k)}</p></a>`).join('');
 $('#stats').innerHTML=[[CG.buildings.length,'stat.b'],[CG.spaces.length,'stat.s'],[CG.departments.length,'stat.d']].map(([n,k])=>`<li><strong>${n}</strong> ${CG.t(k)}</li>`).join('');CG.icons()}
$('#tiles').innerHTML=CG.sk(4,'tile-sk');CG.delay(380).then(render);CG.onLang(()=>{if(!$('.tile-sk'))render()});
})();

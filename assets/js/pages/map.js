(()=>{const CG=window.CG,W=1280,H=720,$=s=>document.querySelector(s);
const stage=$('#stage'),pins=$('#pins'),card=$('#card'),img=$('#mapImg'),mq=matchMedia('(max-width:768px)');
let cur=null,sticky=false;
const nm=b=>CG.L(b);
function build(){
 const vis=CG.buildings.filter(b=>!b.hidden);
 pins.innerHTML=vis.map(b=>`<button type="button" class="pin${b.approx?' approx':''}" data-id="${b.id}" style="left:${b.x/W*100}%;top:${b.y/H*100}%" aria-label="${CG.esc(nm(b))}"></button>`).join('');
 $('#list').innerHTML=vis.map(b=>`<button type="button" class="chip" data-id="${b.id}"><i data-lucide="${b.icon}"></i>${CG.esc(nm(b))}</button>`).join('');CG.icons()}
function show(id,keep){
 const b=CG.buildings.find(x=>x.id===id);if(!b)return;cur=id;sticky=!!keep;
 const sp=CG.spaces.filter(s=>s.b===id),fl=new Set(sp.map(s=>s.l)).size,ty=CG.types.map(t=>[t,sp.filter(s=>s.t===t.id).length]).filter(x=>x[1]);
 card.innerHTML=`<button type="button" class="card-x" aria-label="${CG.t('card.close')}"><i data-lucide="x"></i></button><span class="badge"><i data-lucide="${b.icon}"></i>${CG.t('kind.'+b.kind)}</span><h3>${CG.esc(nm(b))}</h3><p>${CG.esc(CG.L(b.d))}</p>`
 +(b.approx?`<p class="note"><i data-lucide="triangle-alert"></i>${CG.t('map.approx')}</p>`:'')
 +(sp.length?`<ul class="facts"><li><strong>${fl}</strong> ${CG.t('map.floors')}</li><li><strong>${sp.length}</strong> ${CG.t('map.spaces')}</li></ul><div class="chips sm">${ty.map(([t,n])=>`<span class="chip static"><i data-lucide="${t.ico}"></i>${n} ${CG.L(t)}</span>`).join('')}</div><a class="btn btn-primary" href="halls.html?q=${encodeURIComponent(nm(b))}"><i data-lucide="door-open"></i>${CG.t('map.view')}</a>`:'');
 if(!mq.matches){const px=b.x/W*100,py=b.y/H*100;card.style.left=px+'%';card.style.top=py+'%';
  card.style.setProperty('--tx',px>55?'calc(-100% - 30px)':'30px');card.style.setProperty('--ty',py>50?'calc(-100% + 26px)':'-26px')}
 card.classList.toggle('is-sticky',sticky);card.hidden=false;
 pins.querySelectorAll('.pin').forEach(p=>p.classList.toggle('is-on',p.dataset.id===id));CG.icons()}
function hide(){cur=null;sticky=false;card.hidden=true;pins.querySelectorAll('.pin').forEach(p=>p.classList.remove('is-on'))}
const pinOf=e=>e.target.closest&&e.target.closest('.pin');
pins.addEventListener('pointerover',e=>{const p=pinOf(e);if(p&&e.pointerType==='mouse'&&!sticky)show(p.dataset.id,false)});
pins.addEventListener('pointerout',e=>{if(pinOf(e)&&e.pointerType==='mouse'&&!sticky)hide()});
pins.addEventListener('click',e=>{const p=pinOf(e);if(!p)return;cur===p.dataset.id&&sticky?hide():show(p.dataset.id,true)});
$('#list').addEventListener('click',e=>{const c=e.target.closest('[data-id]');if(!c)return;show(c.dataset.id,true);
 pins.querySelector(`[data-id="${c.dataset.id}"]`)?.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})});
card.addEventListener('click',e=>{if(e.target.closest('.card-x'))hide()});
document.addEventListener('click',e=>{if(sticky&&!e.target.closest('.pin,#card,#list'))hide()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
function ready(){$('#mapSk')?.remove();$('#mapErr').hidden=true;stage.classList.add('ready');img.classList.add('ready');const h=location.hash.slice(1);if(h){show(h,true);pins.querySelector(`[data-id="${h}"]`)?.scrollIntoView({block:'nearest',inline:'center'})}}
function fail(){$('#mapSk')?.remove();$('#mapErr').hidden=false;CG.icons()}
function load(){img.addEventListener('load',ready,{once:true});img.addEventListener('error',fail,{once:true})}
try{build();img.complete&&img.naturalWidth?ready():load()}catch(e){fail()}
$('#mapRetry').onclick=()=>{$('#mapErr').hidden=true;load();img.src=img.getAttribute('src').split('?')[0]+'?r='+Date.now()};
CG.onLang(()=>{build();cur&&show(cur,sticky)});
})();

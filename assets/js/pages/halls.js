(()=>{const CG=window.CG,$=s=>document.querySelector(s);
const st={q:new URLSearchParams(location.search).get('q')||'',type:'all',b:'all'};let eng=null,timer;
const bOf=id=>CG.buildings.find(b=>b.id===id),tOf=id=>CG.types.find(t=>t.id===id);
const card=(ico,title,text,extra='')=>`<div class="state surface"><i data-lucide="${ico}"></i><h3>${title}</h3><p>${text}</p>${extra}</div>`;
function chips(){
 $('#typeChips').innerHTML=[{id:'all',ico:'layers'},...CG.types].map(t=>`<button type="button" class="chip" aria-pressed="${st.type===t.id}" data-t="${t.id}"><i data-lucide="${t.ico}"></i>${t.id==='all'?CG.t('halls.all'):CG.L(t)}</button>`).join('');
 $('#bSel').innerHTML=`<option value="all">${CG.t('halls.allB')}</option>`+CG.buildings.filter(b=>CG.spaces.some(s=>s.b===b.id)).map(b=>`<option value="${b.id}"${st.b===b.id?' selected':''}>${CG.esc(CG.L(b))}</option>`).join('');CG.icons()}
const item=s=>{const b=bOf(s.b),t=tOf(s.t);
 return`<article class="hall-card surface"><span class="hall-ico"><i data-lucide="${t.ico}"></i></span><h3>${CG.esc(CG.L({ar:s.ar,en:s.en}))}</h3><p class="where">${CG.esc(CG.t('halls.in',{b:CG.L(b),f:CG.L(CG.floors[s.l])}))}</p>${b.hidden?'':`<a class="pill-link" href="${CG.base}pages/map.html#${b.id}"><i data-lucide="map-pin"></i>${CG.t('halls.onMap')}</a>`}</article>`};
function run(){
 const r=eng.search(st.q,st),el=$('#results'),s=$('#status');s.innerHTML='';
 $('#clear').hidden=!st.q;
 if(r.status==='short'){el.innerHTML=card('keyboard',CG.t('halls.shortT'),CG.t('halls.short'));return CG.icons()}
 const sug=r.suggestion?`<button type="button" class="sug" data-sug="${CG.esc(r.suggestion)}">${CG.t('halls.did')}: <b>${CG.esc(r.suggestion)}</b>؟</button>`:'';
 if(r.status==='none'){
  el.innerHTML=card('search-x',CG.t('halls.noneT'),CG.t(r.missingNum?'halls.noNum':'halls.none',{q:CG.esc(st.q),n:r.missingNum}),sug);return CG.icons()}
 let msg=CG.t('halls.count',{n:r.results.length});
 if(r.status==='approx')msg=CG.t(r.missingNum?'halls.noNum':'halls.approx',{n:r.missingNum})+' '+sug;
 if(r.converted)msg=CG.t('halls.conv',{q:CG.esc(r.converted)})+' '+msg;
 s.innerHTML=msg;el.innerHTML=r.results.map(item).join('');CG.icons()}
async function init(){
 $('#results').innerHTML=CG.sk(6,'sk-card');$('#status').textContent='';
 try{await CG.delay(420);if(!CG.spaces||!CG.SearchEngine)throw new Error('data');
  eng=new CG.SearchEngine(CG);chips();$('#q').value=st.q;run()}
 catch(e){$('#results').innerHTML=card('wifi-off',CG.t('err.loadT'),CG.t('err.load'),`<button class="btn btn-primary" id="retry" type="button">${CG.t('err.retry')}</button>`);CG.icons();$('#retry').onclick=init}}
$('#q').addEventListener('input',e=>{st.q=e.target.value;clearTimeout(timer);if(eng)timer=setTimeout(run,120)});
$('#clear').onclick=()=>{st.q='';$('#q').value='';$('#q').focus();eng&&run()};
$('#typeChips').addEventListener('click',e=>{const c=e.target.closest('[data-t]');if(!c)return;st.type=c.dataset.t;chips();run()});
$('#bSel').addEventListener('change',e=>{st.b=e.target.value;run()});
document.addEventListener('click',e=>{const s=e.target.closest('[data-sug]');if(!s)return;st.q=s.dataset.sug;$('#q').value=st.q;run()});
CG.onLang(()=>{if(eng){chips();run()}});init();
})();

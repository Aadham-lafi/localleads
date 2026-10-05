(function(){
const $=id=>document.getElementById(id);
function render(){
 const L=Store.leads(),won=L.filter(l=>l.status==='Won').length,top={};L.forEach(l=>top[l.source]=(top[l.source]||0)+1);
 const best=Object.entries(top).sort((a,b)=>b[1]-a[1])[0];
 $('stats').innerHTML=`<div class="stat"><b>${L.length}</b><span>Total leads</span></div><div class="stat"><b>${L.filter(l=>l.status==='New').length}</b><span>Waiting for a call</span></div><div class="stat"><b>${won}</b><span>Won</span></div><div class="stat"><b style="font-size:1.1rem">${best?esc(best[0]):'None yet'}</b><span>Top keyword source</span></div>`;
 $('empty').classList.toggle('hidden',L.length>0);$('tw').classList.toggle('hidden',!L.length);
 $('rows').innerHTML=L.map(l=>`<tr><td>${new Date(l.at).toLocaleString()}</td><td>${esc(l.name)}</td><td><a href="tel:${esc(l.phone)}">${esc(l.phone)}</a></td><td>${esc(l.service)}</td><td>${esc(l.source)}</td><td><select data-id="${l.id}" aria-label="Status for ${esc(l.name)}">${['New','Contacted','Won','Lost'].map(s=>`<option${s===l.status?' selected':''}>${s}</option>`).join('')}</select></td></tr>`).join('');
}
$('rows').addEventListener('change',e=>{if(e.target.dataset.id){Store.setStatus(+e.target.dataset.id,e.target.value);render()}});
$('clear').addEventListener('click',()=>{if(confirm('Delete all leads from this browser?')){Store.clear();render()}});
$('csv').addEventListener('click',()=>{const L=Store.leads();if(!L.length)return;
 const q=v=>'"'+String(v).replace(/"/g,'""')+'"',r=[['Time','Name','Phone','Service','Source','Status'],...L.map(l=>[l.at,l.name,l.phone,l.service,l.source,l.status])].map(a=>a.map(q).join(',')).join('\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([r],{type:'text/csv'}));a.download='leads.csv';a.click()});
render();
})();

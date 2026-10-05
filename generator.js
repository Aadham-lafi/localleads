(function(){
const $=id=>document.getElementById(id),list=v=>v.split(',').map(x=>x.trim()).filter(Boolean);
let D=null;
function keywords(d){const k=[];d.svs.forEach(s=>{const l=s.toLowerCase(),c=d.city.toLowerCase();
k.push([`${l} near me`,'High','Hero heading']);k.push([`${l} in ${c}`,'High','Title and H1']);
d.areas.forEach(a=>k.push([`${l} ${a.toLowerCase()}`,'High','Area section']));
k.push([`best ${l} in ${c}`,'High','Intro text']);k.push([`emergency ${l} ${c}`,'High','Call-to-action strip']);k.push([`${l} cost in ${c}`,'Medium','FAQ'])});return k}
function faqs(d){const s=d.svs[0].toLowerCase();return[[`How much does ${s} cost in ${d.city}?`,`Cost depends on the problem and brand. Call or WhatsApp ${d.name} for a clear quote before work starts.`],[`Do you serve ${d.areas.slice(0,3).join(', ')}?`,`Yes. We serve ${d.areas.join(', ')} and nearby areas in ${d.city}.`],['Can I book a same-day visit?','Yes, same-day visits are available in most areas. Message us on WhatsApp to book.']]}
function schema(d){const o=[{"@context":"https://schema.org","@type":"LocalBusiness",name:d.name,telephone:'+'+d.phone,address:{"@type":"PostalAddress",addressLocality:d.city,addressRegion:"Tamil Nadu",addressCountry:"IN"},areaServed:d.areas,makesOffer:d.svs.map(x=>({"@type":"Offer",itemOffered:{"@type":"Service",name:x}}))},
{"@context":"https://schema.org","@type":"FAQPage",mainEntity:d.faqs.map(f=>({"@type":"Question",name:f[0],acceptedAnswer:{"@type":"Answer",text:f[1]}}))}];
return o.map(x=>`<script type="application/ld+json">\n${JSON.stringify(x,null,2)}\n<\/script>`).join('\n\n')}
function gbp(d){return `Need ${d.svs[0].toLowerCase()} in ${d.areas[0]}? ${d.name} offers ${d.svs.join(', ').toLowerCase()} across ${d.areas.join(', ')}.\n\nSame-day visits available. Call or WhatsApp +${d.phone} to book.\n\n#${d.city} #${d.svs[0].replace(/\s+/g,'')}`}
function page(d){const wa=`https://wa.me/${d.phone}?text=${encodeURIComponent(`Hi ${d.name}, I need ${d.svs[0]} in ${d.areas[0]}`)}`;
return `<div class="preview"><div class="ph"><h2>${esc(d.svs[0])} in ${esc(d.areas[0])}, ${esc(d.city)}</h2><p style="margin:10px 0 18px;color:#cfe5df">${esc(d.name)}. Fast, trusted local service.</p><a class="btn btn-p btn-s" href="tel:+${esc(d.phone)}">Call now</a> <a class="btn btn-g btn-s" href="${esc(wa)}" target="_blank" rel="noopener">WhatsApp</a></div>
<div class="pb"><h3>Services</h3><ul style="padding-left:18px">${d.svs.map(s=>`<li>${esc(s)} in ${esc(d.city)}</li>`).join('')}</ul></div>
<div class="pb"><h3>Areas we serve</h3><p>${d.areas.map(esc).join(', ')}</p></div>
<div class="pb"><h3>Request a callback</h3><div class="form"><div><label for="pn">Name</label><input id="pn"></div><div><label for="pp">Mobile</label><input id="pp" type="tel"></div><div class="full"><label for="ps">Service</label><select id="ps">${d.svs.map(s=>`<option>${esc(s)}</option>`).join('')}</select></div></div><p class="err" id="pe"></p><button class="btn btn-p" id="pgo">Request callback</button></div>
<div class="pb"><h3>Questions</h3>${d.faqs.map(f=>`<details style="padding:8px 0;border-bottom:1px solid var(--ln)"><summary><b>${esc(f[0])}</b></summary><p>${esc(f[1])}</p></details>`).join('')}</div></div>`}
function render(){
 $('kw').innerHTML=`<div class="tw"><table><thead><tr><th>Keyword</th><th>Intent</th><th>Use it in</th></tr></thead><tbody>${D.kws.map(k=>`<tr><td>${esc(k[0])}</td><td><span class="tag ${k[1]==='High'?'':'m'}">${k[1]}</span></td><td>${k[2]}</td></tr>`).join('')}</tbody></table></div>
 <p class="note">Keywords come from rule-based patterns. Connect Search Console or Keyword Planner for real search volume.</p>`;
 const hi=D.kws.filter(k=>k[1]==='High');
 $('pg').innerHTML=`<div class="card" style="margin-bottom:16px"><label for="src">Test a visitor who searched for</label><select id="src"><option>direct visit</option>${hi.map(k=>`<option>${esc(k[0])}</option>`).join('')}</select></div>`+page(D);
 $('sc').innerHTML=`<pre id="sct">${esc(D.schema)}</pre><button class="btn btn-o btn-s" data-copy="sct">Copy schema</button>`;
 $('gb').innerHTML=`<pre id="gbt">${esc(D.gbp)}</pre><button class="btn btn-o btn-s" data-copy="gbt">Copy post</button>`;
 $('pgo').onclick=()=>{const n=$('pn').value.trim(),p=$('pp').value.replace(/\D/g,'');
  if(!n||p.length<10){$('pe').textContent='Enter your name and a 10-digit mobile number.';return}
  Store.addLead({business:D.name,name:n,phone:p,service:$('ps').value,source:$('src').value});
  $('pe').innerHTML='<span class="ok">Callback requested. See it in the Leads dashboard.</span>';$('pn').value='';$('pp').value=''};
}
$('gen').addEventListener('submit',e=>{e.preventDefault();
 const d={name:$('bn').value.trim(),phone:$('ph').value.replace(/\D/g,''),city:$('ct').value.trim(),svs:list($('sv').value),areas:list($('ar').value)};
 if(!d.name||d.phone.length<10||!d.svs.length||!d.areas.length){$('ge').textContent='Fill every field. Phone needs country code, like 919876543210.';return}
 $('ge').textContent='';d.kws=keywords(d);d.faqs=faqs(d);d.schema=schema(d);d.gbp=gbp(d);D=d;render();$('out').classList.remove('hidden');$('out').scrollIntoView({behavior:'smooth'})});
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.tp').forEach(p=>p.classList.toggle('hidden',p.id!==b.dataset.t))}));
document.addEventListener('click',e=>{const c=e.target.dataset.copy;if(c)navigator.clipboard?.writeText($(c).textContent).then(()=>{e.target.textContent='Copied'})});
})();

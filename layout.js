(function(){
const pages=[['index.html','Home'],['generator.html','Generator'],['leads.html','Leads'],['pricing.html','Pricing'],['contact.html','Contact']];
const cur=location.pathname.split('/').pop()||'index.html';
document.getElementById('site-header').outerHTML=`<header class="site-header"><div class="wrap nav"><a class="brand" href="index.html">Local<i>Lead</i></a>
<button class="menu" aria-expanded="false" aria-controls="nl">Menu</button>
<ul id="nl">${pages.map(([h,t])=>`<li><a href="${h}" class="${h===cur?'on':''}">${t}</a></li>`).join('')}<li><button class="tt-btn" id="tt" aria-label="Toggle dark mode">◐</button></li><li><a class="btn btn-p btn-s" href="generator.html">Start free</a></li></ul></div></header>`;
document.getElementById('site-footer').outerHTML=`<footer><div class="wrap"><div class="cols"><div><div class="brand" style="color:#fff;margin-bottom:8px">Local<i>Lead</i></div><p>SEO landing pages and lead tracking for local businesses in Erode and across Tamil Nadu.</p></div>
<div><h4>Product</h4><a href="generator.html">Page generator</a><a href="leads.html">Lead dashboard</a><a href="pricing.html">Pricing</a></div>
<div><h4>Company</h4><a href="contact.html">Contact</a><a href="index.html#how">How it works</a><a href="mailto:aadamsafiuallah@gmail.com">aadamsafiuallah@gmail.com</a></div></div><p>© ${new Date().getFullYear()} LocalLead. Built in Erode.</p></div></footer>`;
const m=document.querySelector('.menu'),n=document.getElementById('nl');
m.addEventListener('click',()=>{const o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});
})();
document.getElementById('tt').addEventListener('click',()=>{
 const r=document.documentElement,dark=(r.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))==='dark',n=dark?'light':'dark';
 r.dataset.theme=n;try{localStorage.setItem('ll_theme',n)}catch{}});

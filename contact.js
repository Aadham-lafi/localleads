document.getElementById('cf').addEventListener('submit',e=>{e.preventDefault();
 const g=id=>document.getElementById(id),v={n:g('cn').value.trim(),e:g('ce').value.trim(),m:g('cm').value.trim()};
 g('cne').textContent=v.n?'':'Enter your name.';g('cee').textContent=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.e)?'':'Enter a valid email, like you@example.com.';g('cme').textContent=v.m?'':'Write a short message.';
 if(!v.n||g('cee').textContent||!v.m)return;
 location.href=`mailto:aadamsafiuallah@gmail.com?subject=${encodeURIComponent('LocalLead enquiry from '+v.n)}&body=${encodeURIComponent(v.m+'\n\n'+v.e)}`;
 g('cs').innerHTML='<span class="ok">Your email app is opening with the message ready to send.</span>'});

const Store={
  read(k,d){try{return JSON.parse(localStorage.getItem('ll_'+k))??d}catch{return d}},
  write(k,v){try{localStorage.setItem('ll_'+k,JSON.stringify(v));return true}catch{return false}},
  leads(){return this.read('leads',[])},
  addLead(l){const a=this.leads();a.unshift({id:Date.now(),at:new Date().toISOString(),status:'New',...l});return this.write('leads',a)},
  setStatus(id,s){this.write('leads',this.leads().map(l=>l.id===id?{...l,status:s}:l))},
  clear(){this.write('leads',[])}
};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

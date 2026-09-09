
(function(){
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -10% 0px'}) : null;
  document.querySelectorAll('.fade-in').forEach(function(el){ if(io) io.observe(el); else el.classList.add('is-visible'); });
  var t=document.querySelector('[data-nav-toggle]'), l=document.getElementById('nav-links');
  if(t&&l){ t.addEventListener('click',function(){ var o=l.classList.toggle('open'); t.setAttribute('aria-expanded',o?'true':'false'); t.textContent=o?'CLOSE':'MENU'; }); }
  document.querySelectorAll('form[data-mailto]').forEach(function(f){
    var seg=f.querySelector('.form-segmented'); var roleInput=f.querySelector('input[name=role]');
    function setRole(r){ if(roleInput) roleInput.value=r; f.querySelectorAll('[data-role]').forEach(function(g){ g.style.display = g.getAttribute('data-role')===r?'':'none'; g.querySelectorAll('input,select,textarea').forEach(function(i){ i.disabled = g.getAttribute('data-role')!==r; }); }); if(seg) seg.querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-set-role')===r); }); }
    if(seg){ seg.querySelectorAll('button').forEach(function(b){ b.addEventListener('click',function(){ setRole(b.getAttribute('data-set-role')); }); }); }
    var q=new URLSearchParams(location.search).get('role'); setRole(q||(roleInput?roleInput.value:'landowner'));
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[]; var name='';
      f.querySelectorAll('input:not([disabled]),select:not([disabled]),textarea:not([disabled])').forEach(function(i){ if(i.type==='hidden'&&i.name!=='role') return; var v=(i.value||'').trim(); if(!v) return; var lab=i.getAttribute('data-label')||i.name; if(i.name==='name') name=v; lines.push(lab+': '+v); });
      var subj=encodeURIComponent((f.getAttribute('data-subject')||'Website inquiry')+(name?' — '+name:''));
      var body=encodeURIComponent(lines.join('\n')+'\n\nSent from '+location.href);
      window.location.href='mailto:info@maverickenergypartners.com?subject='+subj+'&body='+body;
      var s=f.querySelector('.form-status'); if(s){ s.style.display='block'; }
    });
  });
})();

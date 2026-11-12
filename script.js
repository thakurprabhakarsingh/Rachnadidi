(function(){
'use strict';
/* ====== EDIT HERE ====== */
var CONFIG={
  mapsUrl:'https://maps.app.goo.gl/zsRLLRPmAaG88Wzp7',
  phone:'919277166862',
  siteUrl:'', // hosted ke baad yahan apni website ka URL daalein (optional; hosted page par apne aap URL le liya jata hai)
  weddingDate:'2026-11-30T00:00:00+05:30', // countdown sirf tithi tak; samay milne par badlein
  times:{haldi:'',wedding:'',vidai:''}, // jaise: '10:00 AM' — khali rehne par placeholder dikhega
  placeholder:'समय शीघ्र सूचित किया जाएगा'
};
var $=function(s,r){return(r||document).querySelector(s)};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Garlands */
function garland(el){
  var cols=el.getAttribute('data-c').split(','),n=14,w=400,s='<svg viewBox="0 0 '+w+' 56" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8Q100 30 200 8T400 8" fill="none" stroke="#6f8a5a" stroke-width="2"/>';
  for(var i=0;i<n;i++){var x=i*(w/(n-1)),y=8+Math.sin(i/(n-1)*Math.PI*2)*-0+ (i%2?16:10),sz=i%2?22:30;
    s+='<use href="#flower" x="'+(x-sz/2).toFixed(1)+'" y="'+(y).toFixed(1)+'" width="'+sz+'" height="'+sz+'" color="'+cols[i%cols.length]+'"/>';}
  el.innerHTML=s+'</svg>';
}
document.querySelectorAll('.garland').forEach(garland);

/* Timings (placeholders until provided) */
document.querySelectorAll('.time').forEach(function(el){
  var t=CONFIG.times[el.getAttribute('data-ev')];el.textContent=t?('समय: '+t):CONFIG.placeholder;
});

/* Petals */
(function(){
  if(reduce)return;var box=$('#petals'),cols=['#f1c9c4','#f6dfa0','#e8b4a8','#f8ecd2'],n=window.innerWidth<600?9:16;
  for(var i=0;i<n;i++){var p=document.createElement('i');p.className='petal';
    p.style.cssText='left:'+Math.random()*100+'%;background:'+cols[i%4]+';animation-duration:'+(10+Math.random()*9)+'s;animation-delay:'+(-Math.random()*14)+'s;--dx:'+(Math.random()*120-60)+'px;transform:scale('+(.6+Math.random()*.8)+')';
    box.appendChild(p);}
})();

/* Opening */
var opened=false;
function openInvite(){
  if(opened)return;opened=true;
  document.body.classList.add('open');
  setTimeout(function(){document.body.classList.add('revealed')},reduce?0:900);
  setTimeout(function(){var g=$('#gate');g.classList.add('gone');document.body.classList.remove('locked');window.scrollTo(0,0)},reduce?50:1900);
}
$('#openBtn').addEventListener('click',openInvite);

/* Reveal on scroll */
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
}else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});

/* Countdown */
var target=new Date(CONFIG.weddingDate).getTime();
function tick(){
  var d=target-Date.now(),ids=['cd','ch','cm','cs'];
  if(d<=0){$('#countdown').innerHTML='<p class="hindi-msg sm" style="grid-column:1/-1">शुभ विवाह का पावन अवसर आ गया है 🌼</p>';clearInterval(timer);return}
  var v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
  ids.forEach(function(id,i){var e=$('#'+id);if(e)e.textContent=String(v[i]).padStart(2,'0')});
}
var timer=setInterval(tick,1000);tick();

/* Hint helper */
function hint(t){var h=$('#hint');h.textContent=t;setTimeout(function(){h.textContent=''},4500)}

/* WhatsApp contact (pre-filled enquiry) */
var enquiry='Namaste, mujhe Rachna aur Satyam Shivam Singh ke wedding invitation aur ceremony ki jankari chahiye.';
$('#waBtn').href='https://wa.me/'+CONFIG.phone+'?text='+encodeURIComponent(enquiry);

/* WhatsApp invitation share */
function siteLink(){
  if(CONFIG.siteUrl)return CONFIG.siteUrl;
  return /^https?:$/.test(location.protocol)?location.href.split('#')[0]:'';
}
$('#shareBtn').addEventListener('click',function(){
  var site=siteLink();
  var msg='सादर आमंत्रण!\n\nरचना एवं सत्यम शिवम सिंह के शुभ विवाह समारोह में आप सपरिवार आमंत्रित हैं।\n\n'+
  '🌼 हल्दी एवं मेहंदी: 28 नवंबर 2026\n💍 शुभ विवाह: 30 नवंबर 2026\n🌸 विदाई: 1 दिसंबर 2026\n\n'+
  'आपकी उपस्थिति एवं आशीर्वाद हमारे लिए अनमोल होंगे।\n\nस्थान एवं रास्ता:\n'+CONFIG.mapsUrl+'\n\n'+
  (site?'निमंत्रण पत्र देखें:\n'+site+'\n\n':'')+'सादर आमंत्रित।';
  var w=window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank','noopener');
  if(!w)hint('Pop-up रुक गया है — कृपया अनुमति दें और दोबारा दबाएँ।');
});

/* PDF: print dialog -> Save as PDF */
$('#pdfBtn').addEventListener('click',function(){
  document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')});
  hint('खुलने वाली विंडो में “Save as PDF” चुनें।');
  var go=function(){window.print()};
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){setTimeout(go,150)});
});

/* Gate keyboard focus */
$('#openBtn').focus({preventScroll:true});
})();

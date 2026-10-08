window.TA_BUILD="1008-4c5ea769";try{console.info("Task Assigner build 1008-4c5ea769")}catch(x){}
(function(){
var $=function(i){return document.getElementById(i)},T=$("toast"),W=document.querySelector(".wipe"),RM=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches,tm;
function toast(t){T.textContent=t;T.classList.add("on");clearTimeout(tm);tm=setTimeout(function(){T.classList.remove("on")},2000)}
/* copy: legacy copy inside the click, then Clipboard API, then tell the user */
function legacy(t){var ok=false,a=document.createElement("textarea");a.value=t;a.setAttribute("readonly","");a.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;opacity:0;font-size:16px";document.body.appendChild(a);a.focus({preventScroll:true});a.select();try{a.setSelectionRange(0,t.length)}catch(x){}try{ok=document.execCommand("copy")}catch(x){}a.remove();return ok}
function copy(t,cb){var d=false;function fin(v){if(d)return;d=true;cb(v)}if(legacy(t)){fin(true);return}
if(navigator.clipboard&&navigator.clipboard.writeText&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){fin(true)},function(){fin(false)});setTimeout(function(){fin(false)},1500)}else fin(false)}
document.addEventListener("click",function(e){var c=e.target.closest("[data-copy]");if(c){var v=c.getAttribute("data-copy");copy(v,function(ok){toast(ok?"Copied: "+v:"Copy blocked by your browser. Select and copy it manually.");if(ok&&c.classList.contains("btn")){var o=c.getAttribute("data-t")||c.textContent;c.setAttribute("data-t",o);c.textContent="Copied \u2713";c.classList.add("ok");setTimeout(function(){c.textContent=o;c.classList.remove("ok")},1600)}});return}
if(e.target.closest(".nl a")){var n=$("nt");if(n)n.checked=false}});
/* page transitions */
document.addEventListener("click",function(e){if(!W||RM||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;var a=e.target.closest("a[href]");if(!a||(a.target&&a.target!=="_self")||a.hasAttribute("download"))return;var u;try{u=new URL(a.href,location.href)}catch(x){return}
if(u.origin!==location.origin||!/^(https?|file):$/.test(u.protocol))return;if(u.pathname===location.pathname&&u.search===location.search)return;
e.preventDefault();W.classList.add("go");setTimeout(function(){location.href=a.href},650)});
addEventListener("pageshow",function(e){if(e.persisted&&W)W.classList.remove("go")});
/* spotlight on glass cards */
document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(".glass");if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")},{passive:true});
/* interactive demo */
var D=$("demo");if(D){var st=0,pc=0,B=$("d-btns"),S=$("d-st"),F=$("d-bar"),P=$("d-pct"),L=$("d-log");
function log(t){var li=document.createElement("li");li.textContent=t;L.insertBefore(li,L.firstChild);while(L.children.length>4)L.removeChild(L.lastChild)}
function btn(a,t,c){return'<button type="button" class="dbn '+c+'" data-a="'+a+'">'+t+'</button>'}
function boom(){if(RM)return;for(var i=0;i<22;i++){var s=document.createElement("i");s.className="cf";var an=Math.random()*6.283,d=70+Math.random()*120;s.style.cssText="--dx:"+Math.cos(an)*d+"px;--dy:"+(Math.sin(an)*d-30)+"px;background:"+(i%3?"#ffd700":"#fff0a0");D.querySelector(".dm").appendChild(s);setTimeout(function(x){x.remove()}.bind(null,s),950)}}
function draw(){var m={0:["Pending","",btn("accept","Accept","ok")+btn("reject","Reject","no")],1:["Accepted","acc",btn("prog","Update progress","gd")+btn("snooze","Snooze 1h","")+btn("done","Complete","ok")],2:["In progress","acc",btn("prog","Update progress","gd")+btn("snooze","Snooze 1h","")+btn("done","Complete","ok")],3:["Completed","acc",btn("reset","Assign again","gd")],4:["Rejected","rej",btn("reset","Assign again","gd")]}[st];S.textContent=m[0];S.className="stt "+m[1];B.innerHTML=m[2];F.style.width=pc+"%";P.textContent=pc+"% done"}
D.addEventListener("click",function(e){var b=e.target.closest("[data-a]");if(!b)return;var a=b.getAttribute("data-a");
if(a==="accept"){st=1;log("Mia accepted the task")}else if(a==="reject"){st=4;pc=0;log("Mia rejected: not enough time")}
else if(a==="prog"){pc=Math.min(75,pc+25);st=2;log("Progress updated to "+pc+"%")}else if(a==="snooze"){log("Reminder snoozed for 1h")}
else if(a==="done"){pc=100;st=3;log("Task completed, assigner notified");boom()}else if(a==="reset"){st=0;pc=0;log("Task assigned to Mia")}draw()});
log("Task assigned to Mia");draw()}
/* command filter */
var q=$("cmdq");if(q){var cs=[].slice.call(document.querySelectorAll(".cmdc")),ch=[].slice.call(document.querySelectorAll(".fchip")),cat="all";
function filt(){var s=q.value.trim().toLowerCase(),n=0;cs.forEach(function(c){var ok=(cat==="all"||c.getAttribute("data-cat")===cat)&&(!s||c.getAttribute("data-q").indexOf(s)>-1);c.hidden=!ok;if(ok)n++});$("cmdn").hidden=n>0}
q.addEventListener("input",filt);ch.forEach(function(b){b.addEventListener("click",function(){cat=b.getAttribute("data-f");ch.forEach(function(x){x.setAttribute("aria-pressed",x===b)});filt()})})}
/* legal: progress bar + toc spy */
var rp=$("rp");if(rp){var tk=0;addEventListener("scroll",function(){if(tk)return;tk=1;requestAnimationFrame(function(){tk=0;var m=document.documentElement.scrollHeight-innerHeight;rp.style.transform="scaleX("+(m>0?Math.min(1,scrollY/m):0)+")"})},{passive:true});
var hs=[].slice.call(document.querySelectorAll(".doc h2[id]")),ls=[].slice.call(document.querySelectorAll(".toc a"));if("IntersectionObserver"in window&&hs.length){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){ls.forEach(function(a){if(a.getAttribute("href")==="#"+x.target.id)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")})}})},{rootMargin:"-20% 0px -70% 0px"});hs.forEach(function(h){io.observe(h)})}}
})();

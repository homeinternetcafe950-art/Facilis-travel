
(function(){
var b=document.querySelector(".burger"),n=document.getElementById("nav");
if(b&&n){b.addEventListener("click",function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o)});}
var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();
var forms=document.querySelectorAll(".wa-form");
forms.forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();
var lines=["*New "+f.getAttribute("data-title")+" - Facilis Travel*"];
f.querySelectorAll("input,select,textarea").forEach(function(el){
 if(!el.name||el.type==="checkbox"||!el.value)return;
 var l=el.closest("label"),t=l?l.childNodes[0].textContent.trim():el.name;
 lines.push(t+": "+el.value);});
window.open("https://wa.me/"+f.getAttribute("data-wa")+"?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener");});});
})();

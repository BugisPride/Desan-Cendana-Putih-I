// NAVBAR TOGGLE
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

// HERO SLIDER
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
function changeSlide(){
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}
setInterval(changeSlide, 5000);

// ===== LINK CSV DARI GOOGLE SHEETS =====
const linkBerita = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShGDbOF5ywiCMpMbWyOlcLcgxD6kQfLbpLBCjBnPu4SbXMwISN3dxz11kig5799jTtqnyhrsKW-_y6/pub?gid=0&single=true&output=csv";

const linkPengumuman = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShGDbOF5ywiCMpMbWyOlcLcgxD6kQfLbpLBCjBnPu4SbXMwISN3dxz11kig5799jTtqnyhrsKW-_y6/pub?gid=401555542&single=true&output=csv";

const linkPerangkat = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShGDbOF5ywiCMpMbWyOlcLcgxD6kQfLbpLBCjBnPu4SbXMwISN3dxz11kig5799jTtqnyhrsKW-_y6/pub?gid=657853708&single=true&output=csv";

const linkStatistik = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShGDbOF5ywiCMpMbWyOlcLcgxD6kQfLbpLBCjBnPu4SbXMwISN3dxz11kig5799jTtqnyhrsKW-_y6/pub?gid=1605019873&single=true&output=csv";


async function fetchCSV(url){
  const res = await fetch(url);
  const text = await res.text();
  return text.trim().split("\n").slice(1);
}
function clean(t){return t?t.replace(/"/g,"").trim():"";}

async function loadBerita(){
  const rows = await fetchCSV(linkBerita);
  beritaList.innerHTML = rows.map(r=>{
    let c=r.split(",");
    return `<div class="news-card">
      ${c[3]?`<img src="${clean(c[3])}">`:""}
      <div class="news-card-content">
        <h3>${clean(c[0])}</h3>
        <small>${clean(c[1])}</small>
        <p>${clean(c[2])}</p>
      </div>
    </div>`;
  }).join("");
}

async function loadPengumuman(){
  const rows = await fetchCSV(linkPengumuman);
  pengumumanList.innerHTML = rows.map(r=>{
    let c=r.split(",");
    return `<div class="news-card">
      <div class="news-card-content">
        <h3>${clean(c[0])}</h3>
        <small>${clean(c[1])}</small>
        <p>${clean(c[2])}</p>
      </div>
    </div>`;
  }).join("");
}

async function loadPerangkat(){
  const rows = await fetchCSV(linkPerangkat);
  perangkatList.innerHTML = rows.map(r=>{
    let c=r.split(",");
    return `<div class="perangkat-card">
      <img src="${clean(c[2])}">
      <h3>${clean(c[0])}</h3>
      <p>${clean(c[1])}</p>
    </div>`;
  }).join("");
}

async function loadStatistik(){
  const rows = await fetchCSV(linkStatistik);
  statistikList.innerHTML = rows.map(r=>{
    let c=r.split(",");
    return `<div class="stat-card">
      <p>${clean(c[0])}</p>
      <h3>${clean(c[1])}</h3>
    </div>`;
  }).join("");
}

loadBerita();
loadPengumuman();
loadPerangkat();
loadStatistik();

// NAVBAR SHRINK ON SCROLL
window.addEventListener("scroll", () => {
  document.querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});


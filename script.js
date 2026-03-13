// ══════════════════════════════════════
// MENU HAMBURGUESA
// ══════════════════════════════════════
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => menu.classList.remove("active"));
});

// ══════════════════════════════════════
// HEADER SCROLL (cambia de color)
// ══════════════════════════════════════
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 60);
});

// ══════════════════════════════════════
// ANIMACIONES SCROLL
// ══════════════════════════════════════
const elementos = document.querySelectorAll(".animar");

function mostrarElementos() {
  const alturaPantalla = window.innerHeight;
  elementos.forEach(el => {
    if (el.getBoundingClientRect().top < alturaPantalla - 80) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", mostrarElementos);
mostrarElementos();

// ══════════════════════════════════════
// CONTADOR ANIMADO DE STATS
// ══════════════════════════════════════
function animarContador(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsSection = document.getElementById("stats");
let contadorActivado = false;

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !contadorActivado) {
      contadorActivado = true;
      document.querySelectorAll(".stat-number").forEach(animarContador);
    }
  });
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);

// ══════════════════════════════════════
// CARRUSEL DE TESTIMONIOS
// ══════════════════════════════════════
let currentTestimonio = 0;
const totalTestimonios = 4;
const testimoniosTrack = document.getElementById("testimoniosTrack");
const tdots = document.querySelectorAll(".tdot");

function goTestimonio(n) {
  currentTestimonio = (n + totalTestimonios) % totalTestimonios;
  testimoniosTrack.style.transform = `translateX(-${currentTestimonio * 100}%)`;
  tdots.forEach((d, i) => d.classList.toggle("active", i === currentTestimonio));
}

// Auto-avance cada 5 segundos
setInterval(() => goTestimonio(currentTestimonio + 1), 5000);

// Swipe en mobile
let tStartX = 0;
if (testimoniosTrack) {
  testimoniosTrack.addEventListener("touchstart", e => { tStartX = e.touches[0].clientX; }, { passive: true });
  testimoniosTrack.addEventListener("touchend", e => {
    const diff = tStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTestimonio(diff > 0 ? currentTestimonio + 1 : currentTestimonio - 1);
  });
}

// ══════════════════════════════════════
// FAQ ACORDEÓN
// ══════════════════════════════════════
function toggleFaq(btn) {
  const respuesta = btn.nextElementSibling;
  const estaAbierto = btn.classList.contains("open");

  // Cerrar todos
  document.querySelectorAll(".faq-pregunta.open").forEach(b => {
    b.classList.remove("open");
    b.nextElementSibling.classList.remove("open");
  });

  // Abrir el clickeado (si estaba cerrado)
  if (!estaAbierto) {
    btn.classList.add("open");
    respuesta.classList.add("open");
  }
}

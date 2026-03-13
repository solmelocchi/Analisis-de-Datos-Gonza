// MENU HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Cerrar menú al hacer click en un link
document.querySelectorAll("#menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// ANIMACIONES SCROLL
const elementos = document.querySelectorAll(".animar");

function mostrarElementos() {
  const alturaPantalla = window.innerHeight;
  elementos.forEach(el => {
    const distancia = el.getBoundingClientRect().top;
    if (distancia < alturaPantalla - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", mostrarElementos);
mostrarElementos();
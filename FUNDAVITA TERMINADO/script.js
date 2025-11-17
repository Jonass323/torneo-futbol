// --- FUNDAVITA JS ---
// Carrusel de Novedades

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const dotsContainer = document.querySelector(".dots");

  if (!slides.length || !dotsContainer) return; // Si no hay carrusel, salir

  let currentIndex = 0;

  // Crear puntos
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("button");

  function showSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  nextBtn?.addEventListener("click", () => showSlide(currentIndex + 1));
  prevBtn?.addEventListener("click", () => showSlide(currentIndex - 1));

  // Cambio automático
  setInterval(() => showSlide(currentIndex + 1), 5000);
});
// --- POPUP DE CAMPAÑA ---
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");

  if (popup && closeBtn) {
    // Mostrar popup 1.5 segundos después de cargar
    setTimeout(() => popup.classList.add("active"), 1500);

    // Cerrar al hacer clic en la X o fuera del cuadro
    closeBtn.addEventListener("click", () => popup.classList.remove("active"));
    popup.addEventListener("click", e => {
      if (e.target === popup) popup.classList.remove("active");
    });
  }
});
// ============= CONTADORES DE MÉTRICAS =============
document.addEventListener("DOMContentLoaded", () => {

  const counters = document.querySelectorAll('.numero');
  let started = false;

  function startCounting() {
    counters.forEach(counter => {
      const target = Number(counter.getAttribute('data-target'));
      const speed = 30;

      const update = () => {
        const current = Number(counter.innerText);
        const increment = Math.ceil(target / 100);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(update, speed);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      update();
    });
  }

  // Detecta cuando la sección entra en pantalla
  function handleScroll() {
    const section = document.querySelector('.metricas');
    if (!section) return;

    const position = section.getBoundingClientRect().top;

    if (position < window.innerHeight && !started) {
      started = true;
      startCounting();
    }
  }

  window.addEventListener('scroll', handleScroll);

});
document.querySelectorAll(".numero").forEach((num) => {
  const target = +num.getAttribute("data-target");

  const update = () => {
    const current = +num.innerText;
    const increment = target / 80;

    if (current < target) {
      num.innerText = Math.ceil(current + increment);
      requestAnimationFrame(update);
    } else {
      num.innerText = target + "";
    }
  };

  update();
});
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});
// ===== Contadores animados para .numero (soporta data-target con +) =====
(function(){
  const counters = document.querySelectorAll('.numero');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target;
      // prevenimos ejecutar dos veces
      if (numEl.dataset.animated === "true") {
        obs.unobserve(numEl);
        return;
      }
      numEl.dataset.animated = "true";

      // leer target, permitir + signo
      const raw = (numEl.getAttribute('data-target') || "").toString().trim();
      const hasPlus = raw.startsWith('+');
      const target = parseInt(raw.replace(/[^\d]/g,''), 10) || 0;

      let current = 0;
      const duration = 1400; // ms
      const fps = 60;
      const steps = Math.max(20, Math.round((duration/1000) * fps));
      const increment = Math.ceil(target / steps);

      function tick(){
        current += increment;
        if (current < target) {
          numEl.textContent = (hasPlus ? '+' : '') + current.toLocaleString();
          requestAnimationFrame(tick);
        } else {
          numEl.textContent = (hasPlus ? '+' : '') + target.toLocaleString();
        }
      }
      // arranca la animación
      requestAnimationFrame(tick);
      obs.unobserve(numEl);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => io.observe(c));
})();

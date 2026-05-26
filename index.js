document.addEventListener("DOMContentLoaded", () => {
  splitWords();
  startHero();
  initServiceReveal();
  initMobileNav();
});

function splitWords() {
  const elements = document.querySelectorAll(".word-reveal");

  elements.forEach((element) => {
    const text = element.dataset.text || element.textContent;
    const words = text.trim().split(" ");

    element.innerHTML = words
      .map((word, index) => {
        return `<span class="word" style="--i:${index}">${word}</span>`;
      })
      .join(" ");
  });
}

function startHero() {
  window.requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
}

function initServiceReveal() {
  const elements = document.querySelectorAll(".service-reveal");

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");
  const links = document.querySelectorAll("#primary-nav a");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}
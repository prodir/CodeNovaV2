document.addEventListener("DOMContentLoaded", () => {
  splitWords();
  startHero();
  initServiceReveal();
  initMobileNav();
  initHeroMockupsReveal();
  initPortfolioReveal();
  initClientsReveal();
  initPortfolioStats();
  initPricingReveal();
  initFooterReveal();
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

function initHeroMockupsReveal() {
  const heroVisual = document.querySelector(".hero-visual");
  const trigger = document.querySelector(".mockup-secondary");

  if (!heroVisual || !trigger) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVisual.classList.add("mockups-extra-visible");
          observer.unobserve(trigger);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -12% 0px",
    }
  );

  observer.observe(trigger);
}

function initPortfolioReveal() {
  const elements = document.querySelectorAll(".portfolio-reveal");

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

function initClientsReveal() {
  const elements = document.querySelectorAll(".clients-reveal");

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

function initPortfolioStats() {
  const cards = document.querySelectorAll(".stats-reveal");
  const counters = document.querySelectorAll(".count-up");

  if (!cards.length) return;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target) || 0;
    const prefix = counter.dataset.prefix || "";
    const suffix = counter.dataset.suffix || "";
    const duration = 1100;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      counter.textContent = `${prefix}${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        const counter = entry.target.querySelector(".count-up");
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  cards.forEach((card) => observer.observe(card));
}

function initPricingReveal() {
  const items = document.querySelectorAll(".pricing-reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });

  items.forEach((item) => observer.observe(item));
}

function initFooterReveal() {
  const elements = document.querySelectorAll(".footer-reveal");

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}
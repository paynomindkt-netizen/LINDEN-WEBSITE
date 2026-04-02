const today = new Date().getDay();
const todayRow = document.querySelector(`.hours-list li[data-day="${today}"]`);
const menuLightbox = document.querySelector(".menu-lightbox");
const menuLightboxClose = document.querySelector(".menu-lightbox-close");
const menuLightboxBackdrop = document.querySelector(".menu-lightbox-backdrop");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (todayRow) {
  todayRow.classList.add("is-today");
}

const parallaxTargets = document.querySelectorAll("[data-parallax-speed]");
const menuPopupLinks = document.querySelectorAll(".menu-popup-link");

const updateParallax = () => {
  const viewportHeight = window.innerHeight;

  parallaxTargets.forEach((element) => {
    const speed = Number(element.dataset.parallaxSpeed || 0);
    const scale = Number(element.dataset.parallaxScale || 1);
    const rect = element.getBoundingClientRect();
    const offset = (rect.top - viewportHeight / 2) * speed;

    element.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
  });
};

updateParallax();
window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", updateParallax);

menuPopupLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    siteNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuLightbox) {
      menuLightbox.hidden = false;
      document.body.style.overflow = "hidden";
    }
  });
});

menuToggle?.addEventListener("click", () => {
  if (!siteNav) {
    return;
  }

  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const closeMenuLightbox = () => {
  if (menuLightbox) {
    menuLightbox.hidden = true;
    document.body.style.overflow = "";
  }
};

menuLightboxClose?.addEventListener("click", closeMenuLightbox);
menuLightboxBackdrop?.addEventListener("click", closeMenuLightbox);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenuLightbox();
  }
});
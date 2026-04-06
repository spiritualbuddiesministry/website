const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-dot]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentSlide = 0;
let sliderTimer = null;

function setSlide(nextIndex) {
  if (!slides.length) return;

  currentSlide = (nextIndex + slides.length) % slides.length;

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
    dot.setAttribute("aria-selected", String(index === currentSlide));
  });
}

function startSlider() {
  if (!slides.length || prefersReducedMotion) return;

  sliderTimer = window.setInterval(() => {
    setSlide(currentSlide + 1);
  }, 6000);
}

function stopSlider() {
  if (sliderTimer) {
    window.clearInterval(sliderTimer);
    sliderTimer = null;
  }
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setSlide(index);
    stopSlider();
    startSlider();
  });
});

if (slides.length) {
  setSlide(0);
  startSlider();
}

const contactForm = document.querySelector("[data-contact-form]");
const feedback = document.querySelector("[data-form-feedback]");

if (contactForm && feedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    feedback.textContent = "Thank you. Your message has been noted and this form is ready to connect to your ministry email service.";
  });
}

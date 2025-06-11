document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-open");
  const closeButton = document.querySelector(".menu-close");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      menu.classList.toggle("open");
      body.classList.toggle("lock");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      menu.classList.remove("open");
      body.classList.remove("lock");
    });
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // если надо только 1 раз
      }
    });
  },
  {
    threshold: 0.2, // % блока в viewport
  }
);

document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".main__title")?.classList.add("animate");
  }, 500);

  setTimeout(() => {
    document.querySelector(".main__btns")?.classList.add("animate");
  }, 1000);
});

const promotionWrapper = document.querySelector(
  ".promotionSwiper .swiper-wrapper"
);
const originalHTML = promotionWrapper.innerHTML;

let expanded = false;
let service = false;
let repairSwiper = initRepairSwiper();
let promotionSwiper;

// Слайдеры
function initRepairSwiper() {
  return new Swiper(".repair-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: { el: ".swiper-pagination" },
  });
}

function initPromotionSwiper() {
  if (promotionSwiper) promotionSwiper.destroy(true, true);
  promotionSwiper = new Swiper(".promotionSwiper", {
    slidesPerView: 2,
    spaceBetween: 16,
    centeredSlides: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      991: { slidesPerView: "auto", spaceBetween: 30 },
      768: { slidesPerView: 2, spaceBetween: 16 },
      375: { slidesPerView: 1, spaceBetween: 16 },
    },
  });
}

function restructureSlidesForMobile() {
  const items = Array.from(
    promotionWrapper.querySelectorAll(".promotion__item")
  );
  promotionWrapper.innerHTML = "";
  items.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(item.cloneNode(true));
    promotionWrapper.appendChild(slide);
  });
}

function restoreOriginalSlides() {
  promotionWrapper.innerHTML = originalHTML;
}

function handleResize() {
  if (window.innerWidth <= 991) {
    restructureSlidesForMobile();
    initPromotionSwiper();
  } else {
    restoreOriginalSlides();
    initPromotionSwiper();
  }
}

// Resize
window.addEventListener("resize", handleResize);
handleResize();

const modal = document.querySelector(".feedback-modal");
const modalTitle = document.querySelector("#modal-title"); // добавь id к заголовку
const body = document.querySelector("body");

document.addEventListener("click", (e) => {
  const button = e.target.closest(".open-form-btn");

  // Открытие модалки
  if (button) {
    const title = button.dataset.title || "Оставить заявку";
    modal?.classList.add("active");
    body.classList.add("lock");
    if (modalTitle) modalTitle.textContent = title;
  }

  // Закрытие по клику вне контента
  if (modal && e.target === modal) {
    modal.classList.remove("active");
    body.classList.remove("lock");
  }
});

new Swiper(".aboutSwiper", {
  // autoplay: true,
  slidesPerView: 3,
  spaceBetween: 16,
  // loop: true,
  breakpoints: {
    1400: { slidesPerView: 3, spaceBetween: 16 },
    991: { slidesPerView: 2, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    375: { slidesPerView: 1, spaceBetween: 16 },
    320: { slidesPerView: 1, spaceBetween: 16 },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion__item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion__header");
    header.addEventListener("click", () => {
      items.forEach((i) => {
        if (i !== item) i.classList.remove("accordion__item--active");
      });
      item.classList.toggle("accordion__item--active");
    });
  });
});

new Swiper(".sertSwiper", {
  slidesPerView: 3,
  spaceBetween: 16,
  pagination: { el: ".swiper-pagination" },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    991: { slidesPerView: 3, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    576: { slidesPerView: 2, spaceBetween: 10 },
    400: { slidesPerView: 2, spaceBetween: 10 },
    375: { slidesPerView: 1, spaceBetween: 10 },
  },
});

if (window.jQuery) {
  $(".phone").mask("+7(999) 999-99-99");
}

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 0);
});

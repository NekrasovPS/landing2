// === МОДАЛКА, МЕНЮ, АККОРДЕОН, АНИМАЦИИ ===
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modal = document.querySelector(".feedback-modal");
  const modalTitle = document.querySelector("#modal-title");
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-open");
  const closeButton = document.querySelector(".menu-close");
  const menu = document.querySelector(".menu");

  menuButton?.addEventListener("click", () => {
    menu?.classList.toggle("open");
    body.classList.toggle("lock");
  });

  closeButton?.addEventListener("click", () => {
    menu?.classList.remove("open");
    body.classList.remove("lock");
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-form-btn");
    if (btn) {
      const title = btn.dataset.title || "Оставить заявку";
      modal?.classList.add("active");
      body.classList.add("lock");
      if (modalTitle) modalTitle.textContent = title;
    }
    if (modal && e.target === modal) {
      modal.classList.remove("active");
      body.classList.remove("lock");
    }
  });

  document.querySelectorAll(".accordion__item").forEach((item) => {
    const header = item.querySelector(".accordion__header");
    header?.addEventListener("click", () => {
      document.querySelectorAll(".accordion__item").forEach((i) => {
        if (i !== item) i.classList.remove("accordion__item--active");
      });
      item.classList.toggle("accordion__item--active");
    });
  });

  setTimeout(() => {
    document.querySelector(".main__title")?.classList.add("animate");
  }, 500);

  setTimeout(() => {
    document.querySelector(".main__btns")?.classList.add("animate");
  }, 1000);

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".fade-in-up")
    .forEach((el) => observer.observe(el));

  if (window.jQuery) $(".phone").mask("+7(999) 999-99-99");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 0);
  });
});

// === СЛАЙДЕРЫ Swiper ===
let promotionSwiper;
let repairSwiper;

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
  promotionSwiper?.destroy(true, true);
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

function lazySwiperInit(selector, callback) {
  const target = document.querySelector(selector);
  if (!target) return;
  const obs = new IntersectionObserver(([entry], o) => {
    if (entry.isIntersecting) {
      callback();
      o.unobserve(entry.target);
    }
  });
  obs.observe(target);
}

function restructureSlidesForMobile(wrapper, originalHTML) {
  const items = Array.from(wrapper.querySelectorAll(".promotion__item"));
  wrapper.innerHTML = "";
  items.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(item.cloneNode(true));
    wrapper.appendChild(slide);
  });
}

function restoreOriginalSlides(wrapper, originalHTML) {
  wrapper.innerHTML = originalHTML;
}

window.addEventListener("DOMContentLoaded", () => {
  const promotionWrapper = document.querySelector(
    ".promotionSwiper .swiper-wrapper"
  );
  const originalHTML = promotionWrapper?.innerHTML;

  repairSwiper = initRepairSwiper();

  function handleResize() {
    if (!promotionWrapper) return;
    if (window.innerWidth <= 991) {
      restructureSlidesForMobile(promotionWrapper, originalHTML);
    } else {
      restoreOriginalSlides(promotionWrapper, originalHTML);
    }
    initPromotionSwiper();
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 200);
  });

  handleResize();

  lazySwiperInit(".aboutSwiper", () => {
    new Swiper(".aboutSwiper", {
      slidesPerView: 3,
      spaceBetween: 16,
      breakpoints: {
        1400: { slidesPerView: 3, spaceBetween: 16 },
        991: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 16 },
        375: { slidesPerView: 1, spaceBetween: 16 },
        320: { slidesPerView: 1, spaceBetween: 16 },
      },
    });
  });

  lazySwiperInit(".sertSwiper", () => {
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
  });
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in-up, .fade-in-left").forEach(el => {
  observer.observe(el);
});


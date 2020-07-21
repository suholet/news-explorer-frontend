import "../pages/news.css";

function showMobileMenu() {
  document
    .querySelector(".header__logo-navicon")
    .classList.toggle("header__logo-navicon_mop");
  document.querySelector(".header").classList.toggle("header_mop");
  document.querySelector(".header__logo").classList.toggle("header__logo_mop");
  document
    .querySelector(".header__logo-txt")
    .classList.toggle("header__logo-txt_mop");
  document.querySelector(".header__menu").classList.toggle("header__menu_mop");
  // All
  let links = document.querySelectorAll(".header__menu-item");
  links.forEach((linkElement) => {
    linkElement.classList.toggle("header__menu-item_mop");
  });

  // news.html
  document
    .querySelector(".statistics__title")
    .classList.toggle("statistics__title_mop");
}

// IIFE
(function () {
  // Обработчик для меню
  const burgerElement = document.querySelector(".header__logo-navicon");
  burgerElement.addEventListener("click", showMobileMenu);
})();

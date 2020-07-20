import "../pages/index.css";

function showMobileMenu() {
  document.querySelector(".header__logo-navicon").classList.toggle("header__logo-navicon_mop");
  document.querySelector(".header").classList.toggle("header_mop");
  document.querySelector(".header__logo").classList.toggle("header__logo_mop");
  document.querySelector(".header__logo-txt").classList.toggle("header__logo-txt_mop");
  document.querySelector(".header__menu").classList.toggle("header__menu_mop");
  // All
  let links = document.querySelectorAll(".header__menu-item");
  links.forEach(linkElement => {
    linkElement.classList.toggle("header__menu-item_mop")
  });

  // index.html
  document.querySelector(".search__title").classList.toggle("search__title_mop");
  // news.html
  document.querySelector(".statistics__title").classList.toggle("statistics__title_mop");
}

function showMSigninPopup() {
  document.querySelector(".popup__signin").classList.add("popup_is-opened");
}

function closeSigninPopup() {
  document.querySelector(".popup__signin").classList.remove("popup_is-opened");
}

function showSignupPopup() {
  closeSigninPopup();
  document.querySelector(".popup__signup").classList.add("popup_is-opened");
}

function closeSignupPopup() {
  document.querySelector(".popup__signup").classList.remove("popup_is-opened");
}

// IIFE
(function () {
  // Обработчик для меню
  const burgerElement = document.querySelector(".header__logo-navicon");
  burgerElement.addEventListener("click", showMobileMenu);

  // Обрботчик для попапа авторизации
  const signinButtonElement = document.querySelector(".header__menu-link_button");
  signinButtonElement.addEventListener("click", showMSigninPopup);

  // Обрботчик для кнопки закрытия попапа авторизации
  const closeSigninPopupElement = document.querySelector(".popup__signin .popup__close");
  closeSigninPopupElement.addEventListener("click", closeSigninPopup);

  // Обрботчик для попапа регистрации
  const signupButtonElement = document.querySelector(".popup__signin .popup__action-link-button");
  signupButtonElement.addEventListener("click", showSignupPopup);

  // Обрботчик для кнопки закрытия попапа регистрации
  const closeSignupPopupElement = document.querySelector(".popup__signup .popup__close");
  closeSignupPopupElement.addEventListener("click", closeSignupPopup);


})();
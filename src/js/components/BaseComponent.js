class BaseComponent {
  constructor() {
    this._burgerElement = document.querySelector(".header__logo-navicon");

    this._setHandlers();
  }

  _setHandlers() {
    this._burgerElement.addEventListener("click", this._showMobileMenu.bind(this));
  }

  _showMobileMenu() {
    document.querySelector(".header__logo-navicon").classList.toggle("header__logo-navicon_mop");
    document.querySelector(".header").classList.toggle("header_mop");
    document.querySelector(".header__logo").classList.toggle("header__logo_mop");
    document.querySelector(".header__logo-txt").classList.toggle("header__logo-txt_mop");
    document.querySelector(".header__menu").classList.toggle("header__menu_mop");

    const links = document.querySelectorAll(".header__menu-item");
    links.forEach((linkElement) => linkElement.classList.toggle("header__menu-item_mop"));

    const indexTitle = document.querySelector(".search__title");
    const newsTitle = document.querySelector(".statistics__title");
    if (indexTitle) {
      indexTitle.classList.toggle("search__title_mop");
    } else if (newsTitle) {
      newsTitle.classList.toggle("statistics__title_mop");
    }
  }
}



export default BaseComponent;

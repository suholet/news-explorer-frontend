import Popup from "./Popup";

class Header {
  constructor(isMain, props) {
    this._props = props;
    this._isMain = isMain;
    this._mainBtn = document.getElementById("nav-main");
    this._newsBtn = document.getElementById("nav-news");
    this._authBtn = document.getElementById("nav-auth");
    this.render(props);

    this._setHandlers();
  }

  _setHandlers() {
    // Обрботчик для попапа авторизации
    this._authBtn.addEventListener("click", this._auth.bind(this));
  }

  _auth() {
    // Если уже авторизован, то надо разлогинить и отправить на главную
    if (this._props) {
      if (this._props.isLoggedIn) {
        localStorage.removeItem("props");
        location.href="index.html";
      }
    } else {
      const popup = new Popup();
      popup.open();
    }
  }

  // перерисовывает шапку в зависимости от переданного аргумента
  // props.isLoggedIn - залогинен ли пользователь
  // props.userName - имя, которое отображается в шапке залогиненного пользователя
  render(props) {
    if (this._isMain) {
      this._mainBtn.classList.add("header__menu-link_selected");
      this._newsBtn.classList.remove("header__menu-link_selected");
    }
    else
    {
      this._mainBtn.classList.remove("header__menu-link_selected");
      this._newsBtn.classList.add("header__menu-link_selected");
    }

    if (props) {
      if (props.isLoggedIn) {
        this._newsBtn.parentElement.classList.remove("header__menu-item_hidden");
        this._authBtn.textContent = props.userName;
        this._authBtn.classList.add("header__menu-link_button_logout");
      }
      else {
        this._newsBtn.parentElement.classList.add("header__menu-item_hidden");
        this._authBtn.classList.remove("header__menu-link_button_logout");
      }
    }

  }
}

export default Header;

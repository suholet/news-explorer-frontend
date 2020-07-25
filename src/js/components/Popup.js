import Form from "./Form";
import { popupTitle, orButtonLabel, popupState } from "../constants/popupHelper";

class Popup {
  constructor() {
    this._element = document.querySelector(".popup");
    this._state = popupState.SIGNIN;

    this._setHandlers();
  }

  _setHandlers() {
    // Обработчики закрытия окна
    this._element.querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));

    // Закрыть окно по Esc
    document.addEventListener("keydown", function (event) {
      if (event.key == "Escape") {
        this.close();
      }
    }.bind(this));

    // Обработчик вспомогательной кнопки
    document.querySelector(".popup__action-link-button")
      .addEventListener("click", this._switchFormState.bind(this));

    // Обработчик для входа под новым пользователем
    document.getElementById("signed")
    .addEventListener("click", this._switchFormState.bind(this));
  }

  // по умолчанию всегда открывается попап авторизации и только через него можно попасть на регистрацию
  open() {
    this._form = new Form(true, document.forms.signin, this);
    this.setContent(this._state);

    this._element.classList.add("popup_is-opened");
  }

  close() {
    this._element.classList.remove("popup_is-opened");
    location.reload();
  }

  // Переключаем состояние попапа
  _switchFormState() {
    if (this._state === popupState.SIGNIN) {
      this._state = popupState.SIGNUP;
      this._form = new Form(false, document.forms.signup, this);
    } else {
      this._state = popupState.SIGNIN;
      this._form = new Form(true, document.forms.signin, this);
    }
    this.setContent(this._state);
  }

  // вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации
  setContent(block) {
    this._form.clear();
    switch (block) {
      case popupState.SIGNUP:
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "inline";
        document.getElementById("signed").style.display = "none";
        document.getElementById("or-button").style.display = "block";
        document.querySelector(".popup__title").textContent = popupTitle.SIGNUP;
        document.querySelector(".popup__action-link-button").textContent = orButtonLabel.SIGNUP;
        break;
      case popupState.SIGNED:
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "none";
        document.getElementById("signed").style.display = "inline";
        document.getElementById("or-button").style.display = "none";
        document.querySelector(".popup__title").textContent = popupTitle.SIGNED;
        break;
      default:
        document.getElementById("signin").style.display = "inline";
        document.getElementById("signup").style.display = "none";
        document.getElementById("signed").style.display = "none";
        document.getElementById("or-button").style.display = "block";
        document.querySelector(".popup__title").textContent = popupTitle.SIGNIN;
        document.querySelector(".popup__action-link-button").textContent = orButtonLabel.SIGNIN;
        break;
    }
  }
}

export default Popup;

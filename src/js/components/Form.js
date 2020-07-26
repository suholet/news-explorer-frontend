import MainApi from "../api/MainApi";
import { errMsg } from "../constants/errHelper";
import { popupState } from "../constants/popupHelper";


class Form {
  constructor(isSignin, form, popup) {
    this._popup = popup;
    this.isSignin = isSignin;
    this._form = form;
    this._submitButton = this._form.querySelector(".popup__action-button");

    this._setHandlers();
  }

  _setFormInputHanlers(form) {
    const elements = Array.from(form.elements);
    elements.forEach(function (element) {
      if (element.nodeName === "INPUT") {
        element.addEventListener("input", this._handleValidate.bind(this));
      }
    }, this);
  }

  _setHandlers() {
    // Обработчки на поля ввода для валидации
    this._setFormInputHanlers(this._form);
    if (this.isSignin) {
      this._form.addEventListener("submit", this._login.bind(this));
    } else {
      this._form.addEventListener("submit", this._register.bind(this));
    }
  }

  _handleValidate(event) {
    this._resetPopupError();
    this._resetInputError(event.target);
    this._validateInputElement(event.target);
  }

  _resetInputError(element) {
    element.parentNode.classList.remove("popup__input-container_invalid");
    element.textContent = "";
  }

  _resetPopupError() {
    const errSigninElement = document.getElementById("error-signin-popup");
    errSigninElement.textContent = "";
    errSigninElement.style.display = "none";

    const errSignupElement = document.getElementById("error-signup-popup");
    errSignupElement.textContent = "";
    errSignupElement.style.display = "none";
  }

  // валидирует переданный в качестве аргумента инпут
  _validateInputElement(element) {
    // Выбираем поле для вывода сообщения об ошибки для нашего элемента
    const errorElement = document.querySelector(`#error-${element.id}`);

    if (element.validity.valueMissing) {
      errorElement.textContent = errMsg.REQUIRED;
      this._activateError(element);
      this._setSubmitButtonState(true);
      return false;
    }
    if (element.validity.tooShort || element.validity.tooLong) {
      if (element.type === 'password') {
        errorElement.textContent = errMsg.LENGTH_PASSWORD;
      } else {
        errorElement.textContent = errMsg.LENGTH;
      }
      this._activateError(element);
      this._setSubmitButtonState(true);
      return false;
    }
    if (element.validity.patternMismatch) {
      errorElement.textContent = errMsg.EMAIL_WRONG_FORMAT;
      this._activateError(element);
      this._setSubmitButtonState(true);
      return false;
    }
    if (!this._allInputsValid()) {
      this._setSubmitButtonState(true);
      return false;
    }
    // Все поля валидные
    this._setSubmitButtonState(false);
    return true;
  }

  _allInputsValid() {
    const elements = Array.from(this._form.elements);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].nodeName === "INPUT" && !elements[i].validity.valid) {
        return false;
      }
    }
    return true;
  }

  _setSubmitButtonState(disabled) {
    this._submitButton = this.isSignin
      ? document.forms.signin.querySelector(".popup__action-button")
      : document.forms.signup.querySelector(".popup__action-button");
    this._submitButton.disabled = disabled;
  }

  _activateError(element) {
    element.parentNode.classList.add("popup__input-container_invalid");
  }

  // Записываем данные авторизованного пользователя в LocalStaorage
  _setAuthUserData(api) {
    Promise.resolve(api.getUserData())
      .then(data => {
        const props = {
          isLoggedIn: true,
          userName: data[0].name,
        };

        localStorage.setItem('props', JSON.stringify(props));
      })
      .catch((err => {
        this._setSubmitButtonState(true);
        this._setServerError(err);
      }));
  }

  _login(event) {
    event.preventDefault();

    const api = new MainApi();
    const email = this._form.elements.email.value;
    const password = this._form.elements.password.value;

    api.signin(email, password)
        .then((res) => {
          // Успешно вошли, надо обновить шапку
          api.getUserData()
            .then((data) => {
              const props = {
                isLoggedIn: true,
                userName: data[0].name,
              };
              localStorage.setItem('props', JSON.stringify(props));
              this._popup.close();
            });
          //location.reload();
        })
        .catch((err) => {
          this._setSubmitButtonState(true);
          this._setServerError(err);
        });
  }

  _register(event) {
    event.preventDefault();

    const api = new MainApi();
    const email = this._form.elements.email.value;
    const password = this._form.elements.password.value;
    const name = this._form.elements.name.value;

    api.signup(email, password, name)
      .then((res) => {
        // Успешно зарегистрировали пользователя, надо сказать об этом в попапе
        this._popup.setContent(popupState.SIGNED);
      })
      .catch((err) => {
        this._setSubmitButtonState(true);
        this._setServerError(err);
      });
  }

  // добавляет форме ошибку, пришедшую с сервера
  _setServerError(err) {
    Promise.resolve(err).then(error => {
      const errElement = this.isSignin ? document.getElementById("error-signin-popup") : document.getElementById("error-signup-popup");
      //console.log("error: ", error);
      const errorTxt = errMsg[error.message] === undefined ? errMsg.DEFAULT : errMsg[error.message];
      //console.log("Err txt", errorTxt);
      errElement.textContent = errorTxt;
      errElement.style.display = "block";
    });
  }

  // вспомогательный метод, очищает поля формы
  clear() {
    this._form = this.isSignin ? document.forms.signin : document.forms.signup;
    this._form.reset();
    this._setSubmitButtonState(false);
    this._resetPopupError();

    // Теперь очищаем поля ошибок
    const elements = Array.from(this._form.elements);
    elements.forEach(element => {
      if (element.nodeName === "INPUT") {
        element.parentNode.classList.remove("popup__input-container_invalid");
      }
    });
  }
}

export default Form;

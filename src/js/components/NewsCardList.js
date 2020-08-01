import { newsErrTitle, newsErrMsg, errorType } from "../constants/errHelper";

class NewsCardList {
  constructor () {
    this._searchProgress = document.querySelector(".search__results-request-progress");
    this._searchNotFound = document.querySelector(".search__results-request-notfound");
    this._searchResults = document.querySelector(".search__results-list");
    this._showMoreButton = document.querySelector(".search__results-list-button");
    this._cardsContainer = document.querySelector(".search__results-list-cards-portion");
    this._cards = [];
    this._portion = 3;

    this._setHandlers();
  }

  _setHandlers() {
    // Обрботчик для кнопки поиска
    this._showMoreButton.addEventListener("click", this._showMoreResults.bind(this));
  }

  // принимает массив экземпляров карточек и отрисовывает их
  renderResults(isVisible, cards = [1]) {
    this._cards = cards;
    this._clearResults();
    if (isVisible && this._cards.length !== 0) {
      this._showMoreResults();
      this._searchResults.style.display = "block";
    } else {
      if (this._cards.length === 0) {
        this.renderError(true, errorType.NOT_FOUND);
      }
      this._searchResults.style.display = "none";
    }
  }

  // отвечает за отрисовку лоудера
  renderLoader(isVisible) {
    if (isVisible) {
      this._searchProgress.style.display = "block";
    } else {
      this._searchProgress.style.display = "none";
    }
  }

  // принимает объект ошибки и показывает ошибку в интерфейсе
  renderError(isVisible, errType = errorType.DEFAULT) {
    if (isVisible) {
      const title = document.querySelector(".search__results-request-notfound-title");
      const errText = document.querySelector(".search__results-request-notfound-txt");
      switch (errType) {
        case errorType.NOT_FOUND:
          title.textContent = newsErrTitle.NOT_FOUND;
          errText.textContent = newsErrMsg.NOT_FOUND;
          break;

        case errorType.EMPTY:
          title.textContent = newsErrTitle.EMPTY;
          errText.textContent = newsErrMsg.EMPTY;
          break;

        default:
          title.textContent = newsErrTitle.DEFAULT;
          errText.textContent = newsErrMsg.DEFAULT;
          break;
      }
      this._searchNotFound.style.display = "block";
    } else {
      this._searchNotFound.style.display = "none";
    }
  }

  // отвечает за функциональность кнопки «Показать ещё»
  showMore(isVisible) {
    if (isVisible) {
      this._showMoreButton.style.display = "block";
    } else {
      this._showMoreButton.style.display = "none";
    }
  }

  // принимает экземпляр карточки и добавляет её в список
  addCard(card) {
    this._cardsContainer.appendChild(card.getCardElement());
  }

  _showMoreResults() {
    // сколько уже показали
    const from = this._cardsContainer.querySelectorAll(".news-card").length;
    // сколько еще можно показать
    const rest = this._cards.length - from;

    // показываем еще одну порцию
    if (rest < this._portion) {
      this._renderPortion(from, from + rest);
      this.showMore(false);
    } else {
      this._renderPortion(from, from + this._portion);
      this.showMore(true);
    }
  }

  _renderPortion(from, to) {
    for (let index = from; index < to; index++) {
      this.addCard(this._cards[index]);
    }
  }

  _clearResults() {
    while (this._cardsContainer.lastElementChild) {
      this._cardsContainer.removeChild(this._cardsContainer.lastElementChild);
    }
  }
}

export default NewsCardList;

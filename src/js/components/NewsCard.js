import {formatDateRu} from "../utils/dateFormatter";
import {isLoggedIn} from "../utils/utils";
import MainApi from "../api/MainApi";
import Popup from "./Popup";

class NewsCard {
  constructor(sourceName, title, description, url, urlToImage, publishedAt, keyword, cardId = "") {
    this._sourceName = sourceName;
    this._title = title;
    this._description = description;
    this._url = url;
    this._urlToImage = urlToImage;
    this._publishedAt = publishedAt;
    this._keyword = keyword;
    this._cardId = cardId;
  }

  getCardElement() {
    const template = document.querySelector('[data-component="card"]');

    const clone = template.content.cloneNode(true);
    const container = clone.querySelector(".news-card");

    const title = container.querySelector(".news-card__title");
    const description = container.querySelector(".news-card__txt");
    const img = container.querySelector(".news-card__image");
    const date = container.querySelector(".news-card__date");
    const source = container.querySelector(".news-card__media");
    const url = container.querySelector(".news-card__url");

    title.textContent = this._title.substring(0, 30) + "...";
    description.textContent = this._description.substring(0, 200) + "...";
    img.style.backgroundImage = `url(${this._urlToImage})`;
    date.textContent = formatDateRu(this._publishedAt);
    source.textContent = this._sourceName;
    url.href = this._url;

    let saveButton = container.querySelector(".news-card__save-icon");

    if (saveButton) {
      // если это карточка на главной
      saveButton.dataset.cardId = this._cardId;

      if (this._cardId !== "") {
        saveButton.classList.add("news-card__save-icon_saved");
      }

      if (isLoggedIn()) {
        saveButton.addEventListener("click", this._markCard.bind(this));
      } else {
        saveButton.addEventListener("click", () => {
          const popup = new Popup();
          popup.open();
        });
        saveButton.classList.remove("news-card__save-icon_saved");
      }
      saveButton.addEventListener("mouseover", this._renderIcon.bind(this));
      saveButton.addEventListener("mouseout", this._clearTooltip.bind(this));
    } else {
      const tag = container.querySelector(".news-card__tag");
      tag.textContent = this._keyword;
      this._parentContainer = container;
      saveButton = container.querySelector(".news-card__delete-icon");
      saveButton.dataset.cardId = this._cardId;
      saveButton.addEventListener("click", this._deleteCard.bind(this));
    }

    return clone;
  }

  // _isLoggedIn() {
  //   const props = localStorage.getItem('props');
  //   return props == null ? false: JSON.parse(localStorage.getItem('props')).isLoggedIn;
  // }

  // отрисовывает иконку карточки (незалогиновый пользователь, активная залогиновый, неактивная залогиновый)
  _renderIcon(event) {
    //const button = event.target;
    const tooltip = event.target.parentElement.querySelector(".news-card__tooltip-text");

    if (isLoggedIn()) {
      tooltip.style.display = "none";
    } else {
      tooltip.style.display = "inline";
    }
  }

  _deleteCard() {
    const saveButton = event.target;
    const api = new MainApi();

    if (saveButton.dataset.cardId !== "") {
      api.removeArticle(saveButton.dataset.cardId)
        .then(() => {
          saveButton.dataset.cardId = "";
          document.querySelector(".search__results-list-cards-portion").removeChild(this._parentContainer);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _clearTooltip(event) {
    const tooltip = event.target.parentElement.querySelector(".news-card__tooltip-text");
    tooltip.style.display = "none";
  }

  _markCard(event) {
    const saveButton = event.target;
    const api = new MainApi();

    if (saveButton.dataset.cardId !== "") {
      api.removeArticle(saveButton.dataset.cardId)
        .then(() => {
          saveButton.dataset.cardId = "";
          saveButton.classList.remove("news-card__save-icon_saved");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.createArticle(
        this._keyword,
        this._title,
        this._description,
        this._publishedAt,
        this._sourceName,
        this._url,
        this._urlToImage)
        .then((data) => {
          saveButton.dataset.cardId = data.data._id;
          saveButton.classList.add("news-card__save-icon_saved");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export default NewsCard;

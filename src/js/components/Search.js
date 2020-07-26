import NewsApi from "../api/NewsApi";
import MainApi from "../api/MainApi";
import NewsCardList from "./NewsCardList";
import NewsCard from "./NewsCard";
import { errorType } from "../constants/errHelper";

class Search {
  constructor() {
    this._searchInput = document.querySelector(".search__input");

    this._setHandlers();
  }

  _setHandlers() {
    // Обрботчик для кнопки поиска
    document.querySelector(".search__button")
    .addEventListener("click", this._showSearchResults.bind(this));
  }

  _showSearchResults() {
    const cardList = new NewsCardList();
    const api = new NewsApi();
    cardList.renderError(false);
    cardList.renderResults(false);
    cardList.showMore(false);

    if (this._searchInput.value === "") {
      cardList.renderError(true, errorType.EMPTY);
      return ;
    }

    // показываем прогресс
    cardList.renderLoader(true);

    api.getNews(this._searchInput.value)
      .then((foundArticles) => {
        // заполняем карточками DOM
        // получим то что уже сохранил пользователь
        new MainApi().getArticles()
          .then((savedArticles) => {
            // смержим результат и покажем карточки
            const cards = this._createCardsArray(foundArticles, savedArticles);
            // скрываем прогресс
            cardList.renderLoader(false);
            cardList.renderResults(true, cards);
          });
      })
      .catch((err) => {
        cardList.renderLoader(false);
        // показываем ошибку
        cardList.renderError(true, errorType.DEFAULT);
        //console.log(err);
      });
  }

  _createCardsArray(found, saved) {
    if (found.totalResults === 0) {
      return [];
    }
    const arr = [];
    found.articles.forEach(article => {
      const card = saved.find((card) => card.link === article.url);
      const id = card ? card._id : "";

      arr.push(new NewsCard(
        article.source.name,
        article.title,
        article.description,
        article.url,
        article.urlToImage,
        article.publishedAt,
        this._searchInput.value,
        id))
    });
    return arr;
  }
}

export default Search;
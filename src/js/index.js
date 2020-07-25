import "../pages/index.css";
import BaseComponent from "./components/BaseComponent";
import Header from "./components/Header";
import NewsApi from "./api/NewsApi"

function setHeaderProps() {
  const props = JSON.parse(localStorage.getItem("props"));
  return props;
}

function showSearchResults() {
  const searchInput = document.querySelector(".search__input");
  const api = new NewsApi();
  api.getNews(searchInput.textContent)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("PAWWWW");
}

(function () {
  new Header(true, setHeaderProps());

  // Обработчик для меню, кнопки показать еще
  const burgerElement = document.querySelector(".header__logo-navicon");
  const showMoreButtonElement = document.querySelector(".search__results-list-button");
  new BaseComponent({ burgerElement, showMoreButtonElement });

  const searchButton = document.querySelector(".search__button");
  searchButton.addEventListener("click", showSearchResults.bind(this));
})();

import MainApi from "../api/MainApi";
import SavedCardList from "./SavedCardList";
import NewsCard from "./NewsCard";

class SearchResults {
  constructor() {
    this._render();
  }

  _render() {
    const api = new MainApi();
    api.getArticles()
      .then((savedArticles) => {
        // console.log(savedArticles);
        const cards = this._createCardsArray(savedArticles);
        const cardList = new SavedCardList();
        cardList.renderResults(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _createCardsArray(saved) {
    // console.log(saved.length);
    if (saved.length === 0) {
      return [];
    }
    const arr = [];
    saved.forEach(article => {
      arr.push(new NewsCard(
        article.source,
        article.title,
        article.text,
        article.link,
        article.image,
        article.date,
        article.keyword,
        article._id))
    });
    return arr;
  }
}

export default SearchResults;
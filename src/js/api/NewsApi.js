import { api } from "../constants/apiHelper";


class NewsApi {
  constructor() {}

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  // возвращает список новостей на основе запроса
  getNews(query) {
    return fetch(`${api.NEWS_URL}${query}`)
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
}

export default NewsApi;

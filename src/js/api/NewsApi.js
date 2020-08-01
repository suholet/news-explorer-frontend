import { api } from "../constants/apiHelper";
import {getTodayDate, getWeekAgoDate} from "../utils/dateFormatter";


class NewsApi {
  constructor() {
    this._urlString = `${api.NEWS_URL}everything?from=${getWeekAgoDate()}&to=${getTodayDate()}&pageSize=${api.PAGE_SIZE}&apiKey=${api.NEWS_API_KEY}&q=`;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  // возвращает список новостей на основе запроса
  getNews(query) {
    return fetch(`${this._urlString}${query}`)
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
}

export default NewsApi;

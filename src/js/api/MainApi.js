import { api } from "../constants/apiHelper";

class MainApi {

  _parseResponse(res) {
    if (res.ok) {
      return res.text()
        .then((text) => {
          return text ? JSON.parse(text) : {};
      });
      // return res.json();
    }
    return Promise.reject(res.json());
  }

  signin(email, password) {
    return fetch(`${api.MAIN_URL}/signin`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  signup(email, password, name) {
    return fetch(`${api.MAIN_URL}/signup`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  getUserData() {
    return fetch(`${api.MAIN_URL}/users/me`, {
      credentials: 'include',
      method: "GET",
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }

  getArticles() {
    return fetch(`${api.MAIN_URL}/articles`, {
      credentials: 'include',
      method: "GET",
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
  createArticle(keyword, title, text, source, link, image) {
    const date = "2012-04-23T18:25:43.511Z";
    return fetch(`${api.MAIN_URL}/articles`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        source: source,
        link: link,
        image: image,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
  removeArticle(cardId) {
    return fetch(`${api.MAIN_URL}/articles/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
    })
      .then((res) => this.parseResponse(res))
      .catch((err) => {
        throw err;
      });
  }
}

export default MainApi;

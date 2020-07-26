import MainApi from "../api/MainApi";

class Statistics {
  constructor(userName) {
    this._userName = userName;

    this._render();
  }

  _render() {
    const welcomeTitle = document.querySelector('.statistics__greetings');
    const tagsTitle = document.querySelector('.statistics__label');

    const api = new MainApi();
    api.getArticles()
      .then((savedArticles) => {
        const savedNumber = savedArticles.length;
        welcomeTitle.textContent = `${this._userName}, у вас ${savedNumber} сохраненных статей`;

        const sortedTags = this._getSortedKeywords(savedArticles);
        const tagsNumber = this._formatTags(sortedTags);
        const tagsString = `По ключевым словам: ${tagsNumber}`;
        tagsTitle.innerHTML = tagsString;
      })
      .catch((err) => {
        console.log(err);
      });


    //const tagsString = `По ключевым словам: ${tagsNumber}`;
  }

  _formatTags(tags) {
    if (tags.length === 0) {
      return "";
    }

    if (tags.length > 3) {
      const tag1 = tags[0][0];
      const tag2 = tags[1][0];
      const tagsNum = tags.length - 2;
      return `<span class="bold">${tag1}</span>, <span class="bold">${tag2}</span>, и <span class="bold">${tagsNum}</span> другим`;
    } else {
      let str = "";
      for (let index = 0; index < tags.length; index++) {
        str += `<span class="bold">${tags[index][0]}</span> `;

      }
      return str;
      // const tag1 = tags[0][0];
      // const tag2 = tags[1][0];
      // const tag3 = tags[2][0];
      // return `<span class="bold">${tag1}</span>, <span class="bold">${tag2}</span>, и <span class="bold">${tag3}</span>`;
    }

  }

  _getSortedKeywords(saved){
    const arr = {};
    saved.forEach((article) => {
      if (arr[article.keyword] !== undefined) {
        arr[article.keyword] += 1;
      } else {
        arr[article.keyword] = 1;
      }
    })
    // создаем массив элементов
    let items = Object.keys(arr).map(function(key) {
      return [key, arr[key]];
    });

    // сортируем
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    return items;
  }
}

export default Statistics;
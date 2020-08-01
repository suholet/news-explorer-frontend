class SavedCardList {
  constructor () {
    this._searchResults = document.querySelector(".search__results-list");
    this._cardsContainer = document.querySelector(".search__results-list-cards-portion");
    this._cards = [];
  }

  // принимает массив экземпляров карточек и отрисовывает их
  renderResults(cards = []) {
    this._cards = cards;
    this._clearResults();
    if (this._cards.length !== 0) {
      for (let index = 0; index < this._cards.length; index++) {
        this.addCard(this._cards[index]);
      }
      this._searchResults.style.display = "block";
    } else {
      this._searchResults.style.display = "none";
    }
  }

  // принимает экземпляр карточки и добавляет её в список
  addCard(card) {
    this._cardsContainer.appendChild(card.getCardElement());
  }

  _clearResults() {
    while (this._cardsContainer.lastElementChild) {
      this._cardsContainer.removeChild(this._cardsContainer.lastElementChild);
    }
  }
}

export default SavedCardList;

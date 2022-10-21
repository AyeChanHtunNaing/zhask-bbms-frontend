import { Card } from "./Card";
export class CardStore {
  cards: any= {};
  lastid = -1;
  _addCard(card: Card) {
    card.id = String(++this.lastid);

    this.cards[card.id] = card;
    return card.id;
  }
  getCard(cardId: string) {

    return this.cards[cardId];
  }
  newCard(description: string): string {
    const card = new Card();
    card.description = description;
    return this._addCard(card);
  }
}

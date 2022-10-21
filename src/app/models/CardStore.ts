import { Task } from "./Task";
export class CardStore {
  cards: any= {};
  lastid = -1;
  _addCard(card: Task) {
    card.id = String(++this.lastid);

    this.cards[card.id] = card;
    return card.id;
  }
  getCard(cardId: string) {

    return this.cards[cardId];
  }
  newCard(description: string): string {
    const card = new Task();
    card.description = description;
    return this._addCard(card);
  }
}

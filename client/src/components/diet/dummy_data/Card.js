class Card {
  constructor(id, title, order, dietitem = []) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.dietitem = dietitem;
  }
}

export default Card;

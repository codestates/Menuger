class Column {
  constructor(id, title, order, dietcard = []) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.dietcard = dietcard;
  }
}

export default Column;

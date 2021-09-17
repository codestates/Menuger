import Item from './Item';
import Card from './Card';
import Column from './Column';

//item
const item1 = new Item(1, '김치찌개');
const item2 = new Item(2, '콩나물무침');
const item3 = new Item(3, '잡곡밥');

const item4 = new Item(4, '쌀밥');
const item5 = new Item(5, '된장찌개');

const item6 = new Item(6, '미역국');
const item7 = new Item(7, '콩밥');

const item8 = new Item(8, '콩나물국');
const item9 = new Item(9, '김치');
const item10 = new Item(10, '쌀밥');
const item11 = new Item(11, '콩자반');

//card
const card1 = new Card(1, '아침', 0, [item1, item2, item3]);
const card2 = new Card(2, '점심', 1, [item4, item5]);

const card3 = new Card(3, '저녁', 0, [item6, item7]);
const card4 = new Card(4, '저녁', 1, [item8, item9, item10, item11]);

//column
const column1 = new Column(1, '월요일', 0, [card1, card2]);
const column2 = new Column(2, '화요일', 1, [card3, card4]);

const dietcolumn = [column1, column2];

export default dietcolumn;

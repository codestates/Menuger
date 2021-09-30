import Item from './Item';
import Card from './Card';
import Column from './Column';

//item
const item1 = new Item('김치찌개');
const item2 = new Item('콩나물무침');
const item3 = new Item('잡곡밥');

const item4 = new Item('쌀밥');
const item5 = new Item('된장찌개');

const item6 = new Item('미역국');
const item7 = new Item('콩밥');

const item8 = new Item('콩나물국');
const item9 = new Item('김치');
const item10 = new Item('쌀밥');
const item11 = new Item('콩자반');

//card
const card1 = new Card('아침', [item1, item2, item3]);
const card2 = new Card('점심', [item4, item5]);

const card3 = new Card('저녁', [item6, item7]);
const card4 = new Card('저녁', [item8, item9, item10, item11]);

//column
const column1 = new Column('월요일', [card1, card2]);
const column2 = new Column('화요일', [card3, card4]);

const dietColumnList = [column1, column2];

export default dietColumnList;

// const sequelize = require('./models').sequelize;
const express = require('express');
const app = express();
const port = 80;

// 모든 테이블 삭제할 때 => drop 메소드, 테이블 생성할 때 => sync 메소드
// 현재 테이블 생성할 때 love 테이블의 post_id가 postID로 표기되는 오류있어서 수동으로 바꿔줘야함.
// ALTER TABLE love CHANGE postID post_id int
// sequelize.drop();
// sequelize.sync();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

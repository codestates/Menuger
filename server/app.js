require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const {
  userRouter,
  recipeRouter,
  dietRouter,
  commentRouter,
  likeRouter,
  bookmarkRouter,
  searchRouter,
} = require('./routes');

const server = async () => {
  try {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) throw new Error('MONGO_URL이 필요합니다.');
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // mongoose.set('debug', true); // mongodb 쿼리문 디버깅 확인용 코드
    console.log('mongodb connected');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
      cors({
        // CORS 설정
        origin: ['http://localhost', 'https://menuger.shop'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
      }),
    );

    app.get('/', (req, res) => {
      res.send('Hello Server!');
    });

    app.use('/users', userRouter);
    app.use('/recipes', recipeRouter);
    app.use('/diets', dietRouter);
    app.use('/:postType/:postId/comments', commentRouter);
    app.use('/:postType/:postId/likes', likeRouter);
    app.use('/:postType/:postId/bookmarks', bookmarkRouter);
    app.use('/search', searchRouter);

    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

server();

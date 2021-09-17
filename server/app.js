require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const { userRouter } = require('./routes');

const server = async () => {
  try {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) throw new Error('MONGO_URL이 필요합니다.');
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongodb connected');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.get('/', (req, res) => {
      res.send('Hello Server!');
    });

    app.use('/user', userRouter);

    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

server();

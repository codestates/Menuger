require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const { User } = require('./models/user');

const MONGO_URI = process.env.MONGO_URL;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('mongodb connected');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.post('/user', async (req, res) => {
      const user = new User(req.body);
      await user.save();
      res.send({ success: true });
    });

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
};

server();

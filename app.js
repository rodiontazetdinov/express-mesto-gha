/* eslint-disable linebreak-style */
require('dotenv').config();

const {
  PORT = 3000,
  URI = 'mongodb://localhost:27017/mestodb',
} = process.env;

// временный id

const userId = {
  _id: '637a5f3d892d9203975b47ea',
};

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');

const app = express();

mongoose.connect(URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: userId._id,
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/:404', (req, res, next) => {
  res.status(404).send({ message: 'страница не найдена' });
  next();
});

app.listen(PORT, () => {
  console.log(`
  Wake up, Neo...
  The Matrix has you...
  Follow the white rabbit.
  Knock, knock, Neo.`);
});

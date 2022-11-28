const { PORT = 3000 } = process.env;
const URI = 'mongodb://localhost:27017/mestodb';

//временный id
const userId = {
  _id: "637a5f3d892d9203975b47ea"
};

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();

mongoose.connect(URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: userId._id
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
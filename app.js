const { PORT = 3000 } = process.env;
const URI = 'mongodb://localhost:27017/mestodb';

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const usersRouter = require('./routes/users.js');


const app = express();

mongoose.connect(URI);

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(usersRouter);
});
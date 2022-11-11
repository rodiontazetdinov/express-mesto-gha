const { PORT = 3000 } = process.env;
const URI = 'mongodb://localhost:27017/mestodb';

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(URI);

app.listen(PORT);
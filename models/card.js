const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    required: true,
    default: []
  },
  likes: {
    type: [ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
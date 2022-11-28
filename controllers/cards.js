const Card = require('../models/Card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({name: name, link: link, owner: id})
  .then(card => res.send({ data: card }))
  .catch((err) => res.status(400).send('Переданы некорректные данные'));
};

const getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(404).send({ message: 'Карточка не найдена' }));
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },)
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));;
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike
}
const Card = require('../models/card');
const WrongDataError = require('../errors/WrongDataError');
const NotFoundError = require('../errors/NotFoundError');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
};

const addLike = (req, res) => {
  const id = req.params.cardId;
  try {
    if (id.length !== 24) {
      throw new WrongDataError('WrongDataError');
    }
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('NotFoundError');
        }
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else if (err.name === 'NotFoundError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'WrongDataError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: `Произошла ошибка ${err.name}` });
        }
      });
  } catch (err) {
    if (err.name === 'WrongDataError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    }
  }
};

const deleteLike = (req, res) => {
  const id = req.params.cardId;
  try {
    if (id.length !== 24) {
      throw new WrongDataError('WrongDataError');
    }
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('NotFoundError');
        }
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else if (err.name === 'NotFoundError') {
          res.status(404).send({ message: 'Карточка не найдена' });
        } else if (err.name === 'WrongDataError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      });
  } catch (err) {
    if (err.name === 'WrongDataError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};

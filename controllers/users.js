/* eslint-disable linebreak-style */
const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');
const User = require('../models/user');
const updateUserInfo = require('../helpers/updateUserInfo');

const getUser = (req, res) => {
  const id = req.params.userId;
  try {
    // будущая проверка авторизации
    if (id) {
      User.findById({ _id: id })
        .then((user) => {
          if (!user && id.length !== 24) {
            throw new WrongDataError('WrongDataError');
          }
          if (!user) {
            throw new NotFoundError('NotFoundError');
          }
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else if (err.name === 'ValidationError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else if (err.name === 'WrongDataError') {
            res.status(400).send({ message: 'Переданы некорректные данные' });
          } else if (err.name === 'NotFoundError') {
            res.status(404).send({ message: 'Пользователь не найден' });
          } else {
            res.status(500).send({ message: 'На сервере произошла ошибка' });
          }
        });
    } else {
      throw new Error('ValidationError');
    }
  } catch (err) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  updateUserInfo(req, res, User, 'updateUser');
};

const updateAvatar = (req, res) => {
  updateUserInfo(req, res, User, 'updateAvatar');
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};

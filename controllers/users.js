const NotFoundError = require('../errors/NotFoundError');
const WrongDataError = require('../errors/WrongDataError');
const User = require('../models/user');

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
            res.status(500).send({ message: `Произошла ошибка ${err.name}` });
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
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  if (id === req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь не найден' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      });
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  console.log(id);
  if (id === req.user._id) {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь не найден' });
        } else if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные' });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      });
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};

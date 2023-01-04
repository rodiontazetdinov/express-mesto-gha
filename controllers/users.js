const User = require('../models/user');

const getUser = (req, res) => {
  const id = req.params.userId;
  if (id === req.user._id) {
    User.findById({ _id: id })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь не найден' });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      });
  } else {
    throw new Error('Пользователь не авторизован');
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
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

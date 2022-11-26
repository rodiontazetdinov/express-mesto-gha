const User = require('../models/User');

const getUser = (req, res) => {
  res.send(req.params.userId);
};

const getUsers = (req, res) => {
  res.send('getUsers');
};

const createUser = (req, res) => {
  // res.send('postUser');
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  // next();
};

const updateUser = (req, res) => {
  // res.send('getUsers');
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));

};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar })
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar
};
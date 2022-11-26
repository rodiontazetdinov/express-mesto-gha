

const getUser = (req, res) => {
  res.send(req.params.userId);
};

const getUsers = (req, res) => {
  res.send('getUsers');
};

const createUser = (req, res) => {
  // res.send('postUser');
  const { name, about, avatar } = req.body;
  const User = require('../models/User');
  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  // next();
};

module.exports = {
  getUser,
  getUsers,
  createUser
};
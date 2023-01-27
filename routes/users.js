/* eslint-disable linebreak-style */
const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.route('/').get(getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;

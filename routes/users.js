const usersRouter = require('express').Router();
const { getUser, getUsers, createUser, updateUser, updateAvatar } = require('../controllers/users')

usersRouter.route('/')
.get(getUsers)
.post(createUser);

usersRouter.get('/:userId', getUser);

usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);


module.exports = usersRouter;

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
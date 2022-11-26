const usersRouter = require('express').Router();
const { getUser, getUsers, createUser } = require('../controllers/users')

usersRouter.route('/')
.get(getUsers)
.post(createUser);

usersRouter.get('/:userId', getUser);


module.exports = usersRouter;
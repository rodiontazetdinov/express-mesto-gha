const usersRouter = require('express').Router();
const { getUser, getUsers, postUser } = require('../controllers/users')
// const { getUsers } = require('../controllers/getUsers')
// const { postUser } = require('../controllers/postUser')

usersRouter.route('/')
.get(getUsers)
.post(postUser);

usersRouter.get('/:userId', getUser);


module.exports = usersRouter;
const getUser = (req, res) => {
  res.send(req.params.userId);
};

const getUsers = (req, res) => {
  res.send('getUsers');
};

const postUser = (req, res) => {
  res.send('postUser');
};

module.exports = {
  getUser,
  getUsers,
  postUser
};
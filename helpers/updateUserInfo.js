/* eslint-disable linebreak-style */
const updateUserInfo = (req, res, User, option) => {
  switch (option) {
    case 'updateUser': {
      const { name, about } = req.body;
      if (req.user._id) {
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
              res.status(500).send({ message: 'На сервере произошла ошибка' });
            }
          });
      } else {
        throw new Error('Пользователь не авторизован');
      }
      break;
    }
    case 'updateAvatar': {
      const { avatar } = req.body;
      if (req.user._id) {
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
              res.status(500).send({ message: 'На сервере произошла ошибка' });
            }
          });
      } else {
        throw new Error('Пользователь не авторизован');
      }
      break;
    }
    default:
      res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = updateUserInfo;

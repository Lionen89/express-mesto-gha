const User = require('../models/user');
const { ErrCodeWrongData, ErrCodeNotFound, ErrCodeDefault } = require('../constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' }));
};

module.exports.getlUserById = (req, res) => {
  const { userId } = req.params;
  if (userId.length !== 24) {
    return (res.status(ErrCodeWrongData).send({ message: 'Неверно указан _id пользователя.' }));
  }
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrCodeWrongData).send({ message: 'Невалидный id ' });
      } else {
        res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
      }
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
      }
    });
};

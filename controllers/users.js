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
  return User.find({ _id: userId })
    .then((user) => {
      if (!user.length) {
        return res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user[0]);
    })
    .catch(() => {
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
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
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      res.status(ErrCodeNotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

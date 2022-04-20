const Card = require('../models/card');
const { ErrCodeWrongData, ErrCodeNotFound, ErrCodeDefault } = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(() => {
      res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные при создании карточки.' });
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  if (cardId.length !== 24) {
    return (res.status(ErrCodeWrongData).send({ message: 'Неверно указан _id карточки.' }));
  }
  return Card.findOneAndRemove({ _id: cardId })
    .then((card) => {
      if (card === null) {
        return res.status(ErrCodeNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ card });
    })
    .catch(() => res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' }));
};

module.exports.setLike = (req, res) => {
  if (req.params.cardId.length !== 24) {
    return (res.status(ErrCodeWrongData).send({ message: 'Неверно указан _id карточки.' }));
  }
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(ErrCodeNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ card });
    })
    .catch(() => {
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length !== 24) {
    return (res.status(ErrCodeWrongData).send({ message: 'Неверно указан _id карточки.' }));
  }
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(ErrCodeNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ card });
    })
    .catch(() => {
      res.status(ErrCodeWrongData).send({ message: 'Переданы некорректные данные.' });
      res.status(ErrCodeNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      res.status(ErrCodeDefault).send({ message: 'Произошла ошибка.' });
    });
};

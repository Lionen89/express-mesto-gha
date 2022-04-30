const router = require('express').Router(); // создали роутер
// const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, setLike, dislikeCard,
} = require('../controllers/cards'); // импортировали контроллеры
// задали роуты
router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router; // экспортировали роуты

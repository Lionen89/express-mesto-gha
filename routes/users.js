const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getlUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/', getAllUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userID: Joi.string().required().length(24).hex,
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(2).max(200),
  }).unknown(true),
}), getlUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).max(30),
  }),
}), updateAvatar);

module.exports = router; // экспортировали роуты

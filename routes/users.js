const router = require('express').Router(); // создали роутер
const {
  getAllUsers, getlUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getlUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router; // экспортировали роуты

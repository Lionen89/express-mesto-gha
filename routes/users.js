const router = require('express').Router(); // создали роутер
const {
  getAllUsers, getlUserById, getlCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/', getAllUsers);
router.get('/:userId', getlUserById);
router.get('/me', getlCurrentUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router; // экспортировали роуты

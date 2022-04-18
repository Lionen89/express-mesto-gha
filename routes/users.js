const router = require('express').Router(); // создали роутер
const {
  getAllUsers, getlUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/', getAllUsers);
router.get('/:userId', getlUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router; // экспортировали роуты

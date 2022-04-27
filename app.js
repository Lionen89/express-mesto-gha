/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ErrCodeNotFound } = require('./constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
}, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB!');
});

app.use((req, res, next) => {
  req.user = {
    _id: '625aff936fab04e57ad35916',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', auth, (req, res) => {
  res.status(ErrCodeNotFound).send({ message: 'Страницы по данному адресу не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

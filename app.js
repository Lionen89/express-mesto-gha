const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ErrCodeNotFound } = require('./constants');

const {
  PORT = 3000
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
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

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(ErrCodeNotFound).send({ message: 'Страницы по данный адресу не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
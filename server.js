const express = require('express');

const app = express();
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const dbName = require('./config/database.config');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(expressValidator());

mongoose.Promise = global.Promise;

mongoose.connect(dbName.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to database');
}).catch((e) => {
  console.log(e);
  process.exit();
});

require('./api/routes/node.routes')(app);

app.listen(5000, () => {
  console.log('Server started on 5000');
});

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const movies = require('./routes/movie.route');
const auth = require('./routes/user.route');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', movies);
app.use('/api', auth);

module.exports = app;

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./src/database/db');
const movies = require('./src/routes/movie.route');
require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', movies);

connectDb();

app.listen(5000, () => {
  console.log('Server started on 5000');
});

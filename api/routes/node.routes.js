const { check } = require('express-validator');
const notes = require('../controllers/node.controllers');
const { validate } = require('../middleware/validation');

module.exports = (app) => {
  console.log(notes);
  app.get(
    '/',
    [
      check('movie')
        .isLength({ min: 1 })
        .withMessage('The name must have minimum length of 1')
        .trim(),
    ],
    validate,
    notes.findMovie,
  );

  app.post('/add',
    [
      check('movie')
        .isLength({ min: 1 })
        .withMessage('The name must have minimum length of 1')
        .trim(),
      check('place')
        .isInt({ min: 1, max: 100 })
        .withMessage('Number must be between 1 to 100'),
    ],
    validate,
    notes.addMovie);

  app.get('/list',
    notes.listMovies);
};

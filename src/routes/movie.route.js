const router = require('express').Router();
const { check } = require('express-validator');
const notes = require('../controllers/movie.controller');
const { validate } = require('../middleware/validation');

router.get(
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
router.post('/add',
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

router.put('/update',
  [
    check('movie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
    check('newMovie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
  ],
  notes.updateMovie);

router.delete('/deleteMovie',
  [
    check('movie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
  ],
  notes.deleteMovie);
router.get('/list',
  notes.listMovies);

module.exports = router;

const router = require('express').Router();
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const movie = require('../controllers/movie.controller');
const { validate } = require('../middlewares/validation');

router.get(
  '/',
  authMiddleware,
  [
    check('movie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1')
      .trim(),
  ],
  validate,
  movie.findMovie,
);

router.post(
  '/add',
  authMiddleware,
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
  movie.addMovie,
);

router.put(
  '/update',
  authMiddleware,
  [
    check('movie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
    check('newMovie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
  ],
  movie.updateMovie,
);

router.delete(
  '/deleteMovie',
  authMiddleware,
  [
    check('movie')
      .isLength({ min: 1 })
      .withMessage('The name must have minimum length of 1'),
  ],
  movie.deleteMovie,
);

router.get(
  '/list',
  authMiddleware,
  movie.listMovies,
);

module.exports = router;

const Movie = require('../models/movie.model');
const movieService = require('../service/movie.service');

const findMovie = async (req, res) => {
  const { movie } = req.body;
  try {
    const movieData = await movieService.searchMovie(movie);

    res.json(movieData);
  } catch (e) {
    res.json({ error: e.message });
  }
};

const addMovie = async (req, res) => {
  const { movie, place } = req.body;
  try {
    const newMovie = await movieService.createMovie(movie, place, req.user);

    res.json({ message: `${movie} was added`, data: newMovie });
  } catch (e) {
    res.json(e.message);
  }
};

const listMovies = async (req, res) => {
  try {
    const userData = await movieService.listMovies(req.user);

    res.json({ data: userData });
  } catch (e) {
    res.json(e);
  }
};

const updateMovie = async (req, res) => {
  const { movie, newMovie } = req.body;
  try {
    // newMovie, newPlace ?
    const movieData = await movieService.renewMovie(movie, newMovie, req.user);

    res.json({ message: 'Movie has already updated', data: movieData });
  } catch (e) {
    res.json({ error: e.message });
  }
};

const deleteMovie = async (req, res) => {
  const { movie } = req.body;
  try {
    await movieService.deleteMovie(movie, req.user);

    res.json(`${movie} deleted from your list`);
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = {
  findMovie,
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
};

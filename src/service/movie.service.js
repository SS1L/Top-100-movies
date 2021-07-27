// need redesign, can have a lot of users

const axios = require('axios');
const movieSchema = require('../models/movie.model');

const movieDetail = async (movie) => {
  const movieInfo = await axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&query=${movie}`);

  if (!movieInfo.data.results.length) throw new Error('Something went wrong');

  return movieInfo.data.results[0];
};

const searchMovie = async (movie) => {
  const checkedMovie = await movieDetail(movie);

  const {
    title,
    overview,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = checkedMovie;

  return {
    title,
    overview,
    voteAverage,
    releaseDate,
  };
};

const chekcMovieInDb = async (movie, place, user) => {
  const checkedMovie = await movieSchema.find({ user: user.id, movie });
  if (checkedMovie.length) throw new Error('You add this film before');

  const checkedPlace = await movieSchema.find({ user: user.id, place });
  if (checkedPlace.length) throw new Error('You use this place before');
};

const createMovie = async (movie, place, user) => {
  const checkedMovie = await movieDetail(movie);
  await chekcMovieInDb(movie, place, user);
  const {
    movie: title,
    overview,
    vote_average: voteAverage,
    release_date: releaseDate,
  } = checkedMovie;

  await movieSchema.create({
    user: user.id,
    place,
    movie,
    overview,
    releaseDate,
  });

  return {
    title,
    overview,
    voteAverage,
    releaseDate,
  };
};

const listMovies = async (user) => {
  const userMovies = await movieSchema.find({ user: user.id });

  return userMovies;
};

// need fix, update by id?
const renewMovie = async (movie, newMovie, user) => {
  const userMovie = await movieSchema.find({ user: user.id, movie });
  if (!userMovie.length) throw new Error('Cant find movie in db');

  const latestMovieInDb = await movieSchema.find({ user: user.id, newMovie });
  if (latestMovieInDb.length) throw new Error('You add this movie before');

  const latestMovie = await movieDetail(newMovie);
  const updateMovie = await movieSchema.updateOne(
    {
      user: user.id,
      place: userMovie[0].place,
    },
    {
      $set:
      {
        movie: latestMovie.title,
        releaseDate: latestMovie.release_date,
      },
    },
  );

  return { userMovie, updateMovie };
};

const deleteMovie = async (movie, user) => {
  const userMovie = await movieSchema.find({ user: user.id, movie });
  if (!userMovie.length) throw new Error('Didn`t find a movie');

  await movieSchema.deleteOne({ user: user.id, movie });
};

module.exports = {
  searchMovie,
  createMovie,
  renewMovie,
  listMovies,
  deleteMovie,
};

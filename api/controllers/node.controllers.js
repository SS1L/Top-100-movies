const axios = require('axios');
const Note = require('../modules/note.model');

exports.findMovie = async (req, res) => {
  try {
    const { movie } = req.body;

    const userData = await axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&query=${movie}`);
    if (!userData.data) throw new SyntaxError('Something wrong!');

    const checkedData = userData.data?.results?.[0];
    if (!checkedData) throw new SyntaxError('Can`t find results!');

    const { title, overview, release_date: releaseDate } = checkedData;
    res.json({ title, overview, releaseDate });
  } catch (e) {
    if (e.name === 'SyntaxError') {
      res.status(400).json(e.message);
    } else {
      res.json(e);
    }
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { movie, place } = req.body;
    const checkedMovie = await Note.find({ movie });

    if (checkedMovie.length) throw new SyntaxError('You add this film before');

    const checkedPlace = await Note.find({ place });
    if (checkedPlace.length) throw new SyntaxError('You use this place before');

    const userData = await axios.get(`${process.env.URL}?api_key=${process.env.API_KEY}&query=${movie}`);
    if (!userData.data) throw new SyntaxError('Can`t find a movie!');

    const checkedData = userData.data?.results?.[0];
    if (!checkedData) throw new SyntaxError('Problem with results!');

    const { release_date: releaseDate } = checkedData;
    await Note.create({
      place, movie, releaseDate,
    });
    res.json(`${movie} was added`);
  } catch (e) {
    if (e.name === 'SyntaxError') {
      res.status(400).json(e.message);
    } else {
      res.json(e);
    }
  }
};

exports.listMovies = async (req, res) => {
  try {
    const data = await Note.find({});
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    // newMovie, newPlace
    const { movie, newMovie } = req.body;

    const userMovie = await Note.find({ movie });
    if (!userMovie.length) throw new SyntaxError(`Can't find ${movie} in your list`);

    const addNewMovie = await Note.find({ newMovie });
    if (addNewMovie.length) throw new SyntaxError(`You have ${newMovie} in your list`);

    await Note.findOneAndUpdate(movie, { movie: newMovie });
    res.json('All work');
  } catch (e) {
    if (e.name === 'SyntaxError') {
      res.status(400).json(e.message);
    } else {
      res.json(e);
    }
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { movie } = req.body;

    const userMovie = await Note.find({ movie });
    if (!userMovie.length) throw new SyntaxError('Didn`t find a movie');

    await Note.deleteOne({ movie });
    res.json(`${movie} deleted from your list`);
  } catch (e) {
    if (e.name === 'SyntaxError') {
      res.status(400).json(e.message);
    } else {
      res.json(e);
    }
  }
};

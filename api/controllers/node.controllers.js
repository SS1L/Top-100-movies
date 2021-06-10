const axios = require('axios');
const Note = require('../modules/note.model');

exports.findMovie = async (req, res) => {
  try {
    const { movie } = req.body;

    const userData = await axios.get(`${process.env.URL}${movie}`);
    if (!userData.data) return res.status(400).json('Something wrong!');

    const checkedData = userData.data?.results?.[0];
    if (!checkedData) return res.status(400).json('Something wrong!');

    const { title, overview, release_date: releaseDate } = checkedData;
    res.json({ title, overview, releaseDate });
  } catch (e) {
    console.log(e);
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
    res.json('Film added');
  } catch (e) {
    if (e.name === 'SyntaxError') {
      res.status(400).json(e.message);
    } else {
      res.json(e);
    }
  }
};

exports.listMovies = (req, res) => {
  console.log('all work');
};

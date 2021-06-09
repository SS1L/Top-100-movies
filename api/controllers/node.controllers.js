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
  // const user = req.body.user;
  try {
    const { movie, place } = req.body;
    console.log(`movie: ${movie}, place: ${place}`);
    const data = await axios.get(process.env.URL + movie).then((r) => r.data.results[0]);
    if (!data) return res.status(400).send('Can`t find this movie!');

    res.status(200).json({
      title: data['original_title'],
      overview: data['overview'],
      release_date: data['release_date']
    });
  } catch (e) {
    console.log(e);
  }
};

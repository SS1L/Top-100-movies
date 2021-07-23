const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  place: Number,
  movie: String,
  // overview: String,
  releaseDate: String,
});

module.exports = mongoose.model('Note', NoteSchema);

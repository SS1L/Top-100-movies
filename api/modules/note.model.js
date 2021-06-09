const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  place: Number,
  user: String,
  title: String,
  overview: String,
  release_date: String,
});

module.exports = mongoose.model('Note', NoteSchema);

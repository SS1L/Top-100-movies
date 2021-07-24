const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
  place: {
    type: Number,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

module.exports = model('movie', NoteSchema);

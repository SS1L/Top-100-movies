const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('movie', MovieSchema);

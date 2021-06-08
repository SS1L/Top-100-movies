const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({});

module.exports = mongoose.model('Note', NoteSchema);
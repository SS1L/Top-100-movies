module.exports = (app) => {
    let notes = require('../controllers/node.controllers');
    console.log(notes)
    app.get('/', notes.findMovie);
    app.get('/add', notes.addMovie);
}
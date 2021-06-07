module.exports = (app) => {
    let notes = require('../controllers/node.controllers');
    console.log(notes)
    app.get('/', notes.hello);
}
// const Note = require('');
const axios = require('axios');

exports.findMovie = async (req, res) => {
    const movie = req.body.movie;
    try {
        let data = await axios.get(process.env.URL + movie).then(r => r.data.results[0]);
        if(!data) return res.json("Can`t find this movie!");
        
        res.json({
            'title': data['original_title'],
            'overview': data['overview'],
            'release_date': data['release_date']
        });
    }
    catch (e) {
        console.log(e);
    }
}

exports.addMovie = (req, res) => {
    res.json('all work')
}
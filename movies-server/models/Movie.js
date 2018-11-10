const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:  String,
    overview: String,
    poster_path: String,
    overview: String,
    title: String,
    popularity: Number,
    tag: [{type:String}],
},
{
    timestamps: true
},
);


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
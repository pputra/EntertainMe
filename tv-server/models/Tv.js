const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSchema = new Schema({
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


const Tv = mongoose.model('Tv', tvSchema);

module.exports = Tv;
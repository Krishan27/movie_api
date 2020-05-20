const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    year: { type: Number },
    rating: { Source:String, Value:Number} ,
    genre: { type: String },
    director: {type: String},
    actors:{type: String},
    language: {type: String},
    poster: {type: String}
});

module.exports = mongoose.model('Movie', MovieSchema);
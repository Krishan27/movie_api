const mongoose = require('mongoose');
const userSchema = require('./user').userSchema
const MovieSchema = require('./movie').MovieSchema

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
        mywislist:[String]

})
module.exports = mongoose.model('Wishlist', wishlistSchema);
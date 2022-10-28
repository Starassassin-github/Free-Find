const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    image: String,
    title: String
})

exports.Post = mongoose.model('Posts', postSchema);
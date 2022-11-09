const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type_of_work: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 500,
    },
    image: {
        type: String,
    },
    images: [{
        type: String
    }],
    _id_apply: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    _id_offer: [{
        type: Object
    }],
    _id_reject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    jobs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs'
    },
    keyword: [{
        type: String,
    }],
    datePosted: {
        type: Date,
        default: Date.now,
    },
    name_who_post: {
        type: String
    },
    image_who_post: {
        type: String
    },
    count_recruit: {
        type: Number
    }
})

exports.Post = mongoose.model('posts', postSchema);
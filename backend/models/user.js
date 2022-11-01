const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    work_pending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    work_resolve: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    id_card: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    education_level: {
        type: String,
    },
    ability: {
        type: String,
    },
    isComp: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

exports.User = mongoose.model('users', userSchema);
const mongoose = require('mongoose');

const userCompanySchema = mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
    },
    isComp: {
        type: Boolean,
        default: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

exports.UserCompany = mongoose.model('users_companies', userCompanySchema);
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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
    },
})

exports.UserCompany = mongoose.model('users_companies', userCompanySchema);
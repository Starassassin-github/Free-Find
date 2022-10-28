const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
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
    owner: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],
    website: [{
        type: String,
    }],
    bussiness_type: {
        type: String,
    },
    founding_date: {
        type: String
    }

})

exports.Company = mongoose.model('companies', companySchema);
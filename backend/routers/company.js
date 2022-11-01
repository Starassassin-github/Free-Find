const express = require('express');
const { Company } = require('../models/company');

const router = express.Router();

router.get(`/`, async (req, res) => {
    const companyList = await Company.find();

    if (!companyList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(companyList);
});

router.get(`/:id`, async (req, res) =>{
    const company = await Company.findById(req.params.id)

    if(!company) {
        res.status(500).json({message: 'The company with the given ID was not found.'})
    } 
    res.status(200).send(company);
})

router.post(`/`, async (req, res) => {

    let company = new Company({
        name: req.body.name_comp,
        email: req.body.email_comp,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone_comp,
        owner: req.body.owner,
        images: req.body.images,
        posts: req.body.posts,
        website: req.body.website,
        bussiness_type: req.body.bussiness_type,
        founding_date: req.body.founding_date,
    })

    company = await company.save();

    if(!company)
    return res.status(400).send('the Company cannot be created!')

    res.send(company);
});

module.exports = router;
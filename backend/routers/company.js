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

module.exports = router;
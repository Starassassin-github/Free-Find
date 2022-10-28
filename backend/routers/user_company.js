const express = require('express');
const { UserCompany } = require('../models/user_company');


const router = express.Router();

router.get(`/`, async (req, res) => {
    const userCommpanyList = await UserCompany.find();

    if (!userCommpanyList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(userCommpanyList);
});

module.exports = router;
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

router.get(`/:id`, async (req, res) =>{
    const userComp = await UserCompany.findById(req.params.id)

    if(!userComp) {
        res.status(500).json({message: 'The user company with the given ID was not found.'})
    } 
    res.status(200).send(userComp);
})

router.post('/login', async (req, res) => {
    const userComp = await UserCompany.findOne({ email: req.body.email })

    if (!userComp) {
        return res.status(400).send('The user not found');
    }

    if (userComp && (req.body.password.localeCompare(userComp.password) === 0 )) {
        res.status(200).send(userComp)
    } else {
        res.status(400).send('password is wrong!');
    }

})

router.post(`/`, async (req, res) => {

    let userCompany = new UserCompany({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        company: req.body.company
    })

    userCompany = await userCompany.save();

    if(!userCompany)
    return res.status(400).send('the User Company cannot be created!')

    res.send(userCompany);
});

module.exports = router;
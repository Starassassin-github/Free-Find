const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(userList);
});

router.post(`/`, async (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        image: req.body.image,
        work_pending: req.body.work_pending,
        work_resolve: req.body.work_resolve,
        posts: req.body.posts,
        phone: req.body.phone,
        sex: req.body.sex,
        id_card: req.body.id_card,
        birthdate: req.body.birthdate,
        nationality: req.body.nationality,
        education_level: req.body.education_level,
        ability: req.body.ability,
    })

    user = await user.save();

    if(!user)
    return res.status(400).send('the User cannot be created!')

    res.send(user);
});

module.exports = router;
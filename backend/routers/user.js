const express = require('express');
const mongo = require('mongodb');
const { User } = require('../models/user');

const router = express.Router();

router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(userList);
});

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' })
    }
    res.status(200).send(user);
});

router.post(`/`, async (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        image: req.body.image,
        phone: req.body.phone,
        sex: req.body.sex,
        id_card: req.body.id_card,
        birthdate: req.body.birthdate,
        nationality: req.body.nationality,
        education_level: req.body.education_level,
        ability: req.body.ability,
    })

    user = await user.save();

    if (!user)
        return res.status(400).send('the User cannot be created!')

    res.send(user);
});

router.put('/:id', async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            image: req.body.image,
            posts: req.body.posts,
            phone: req.body.phone,
            sex: req.body.sex,
            id_card: req.body.id_card,
            birthdate: req.body.birthdate,
            nationality: req.body.nationality,
            education_level: req.body.education_level,
            ability: req.body.ability,
        },
        { new: true }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
});

router.patch('/work_pending/:id/:postid', async (req, res) => {
    
    const user = await User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $push: {
                work_pending: req.params.postid
            }
        }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')



    res.status(200).json({ message: "Work Status Done!" })
});

router.patch('/work_resolve/:id/:postid', async (req, res) => {

    const type_resolve = req.query.type_resolve

    const user = await User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $pull: {
                work_pending: req.params.postid
            },
            $push: {
                work_resolve: {
                    postid: new mongo.ObjectId(req.params.postid),
                    type_resolve: type_resolve
                }
            }
        }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')



    res.status(200).json({ message: "Work Status Done!" })
});

module.exports = router;
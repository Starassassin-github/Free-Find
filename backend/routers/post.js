const express = require('express');
const { Post } = require('../models/post');

const router = express.Router();

router.get(`/`, async (req, res) => {
    const postList = await Post.find();

    if (!postList) {
        res.status(500).json({ success: false })
    }
    res.send(postList);
});

router.post(`/`, (req, res) => {
    const post = new Post({
        name: req.body.name,
        image: req.body.image,
        title: req.body.title
    })
    post.save().then((createdPost => {
        res.status(201).json(createdPost)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
});

module.exports = router;
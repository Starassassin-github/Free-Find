const express = require('express');
const { Post } = require('../models/post');

const router = express.Router();

router.get(`/`, async (req, res) => {
    const postList = await Post.find();

    if (!postList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(postList);
});

router.get(`/:id`, async (req, res) =>{
    const post = await Post.findById(req.params.id)

    if(!post) {
        res.status(500).json({message: 'The post with the given ID was not found.'})
    } 
    res.status(200).send(post);
})

router.post(`/`, async (req, res) => {

    let post = new Post({
        name: req.body.name,
        title: req.body.title,
        type_of_work: req.body.type_of_work,
        description: req.body.description,
        image: req.body.image,
        images: req.body.images,
        _id_apply: req.body._id_apply,
        _id_offer: req.body._id_offer,
        _id_reject: req.body._id_reject,
        company: req.body.company,
        user: req.body.user,
        jobs: req.body.jobs,
        keyword: req.body.keyword
    })

    post = await post.save();

    if(!post)
    return res.status(400).send('the post cannot be created!')

    res.send(post);
});

module.exports = router;
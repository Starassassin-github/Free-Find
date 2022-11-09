const express = require('express');
const mongo = require('mongodb');
const multer = require('multer');

const { Post } = require('../models/post');

const router = express.Router();

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    const postList = await Post.find();

    if (!postList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(postList);
});

router.get(`/:id`, async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(500).json({ message: 'The post with the given ID was not found.' })
    }
    res.status(200).send(post);
})

router.post(`/`, uploadOptions.array('images', 15), async (req, res) => {

    const files = req.files;
    let imagePahts = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map(file => {
            imagePahts.push(`${basePath}${file.filename}`)
        })
    }
    

    if (!files) { 
        console.log('No image in the request'); 

        let post = new Post({
            name: req.body.name,
            title: req.body.title,
            type_of_work: req.body.type_of_work,
            description: req.body.description,
            image: req.body.image,
            company: req.body.company,
            user: req.body.user,
            jobs: req.body.jobs,
            keyword: req.body.keyword,
            name_who_post: req.body.name_who_post,
            image_who_post: req.body.image_who_post,
            count_recruit: req.body.count_recruit,
        })

        post = await post.save();

        if (!post)
            return res.status(400).send('the post cannot be created!')

        res.status(200).send(post);
    
    }

    if (files) {

        let post = new Post({
            name: req.body.name,
            title: req.body.title,
            type_of_work: req.body.type_of_work,
            description: req.body.description,
            image: req.body.image,
            images: imagePahts,
            company: req.body.company,
            user: req.body.user,
            jobs: req.body.jobs,
            keyword: req.body.keyword,
            name_who_post: req.body.name_who_post,
            image_who_post: req.body.image_who_post,
            count_recruit: req.body.count_recruit,
        })

        post = await post.save();

        if (!post)
            return res.status(400).send('the post cannot be created!')

        res.status(200).send(post);
    }
});

router.put('/apply/:id/:userid', async (req, res) => {

    const post = await Post.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $push: {
                _id_apply: req.params.userid
            }
        }
    )

    if (!post)
        return res.status(400).send('the post cannot be created!')

    res.status(200).send(post);
});

router.put('/offer/:id/:userid', async (req, res) => {

    const contract_id = req.query.contract_id

    const post = await Post.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $pull: {
                _id_apply: req.params.userid
            },
            $push: {
                _id_offer: {
                    _id_offer: new mongo.ObjectId(req.params.userid),
                    contract_id: new mongo.ObjectId(contract_id)
                }
            }

        }
    )

    if (!post)
        return res.status(400).send('the post cannot be created!')

    res.status(200).send(post);
});

router.put('/reject/:id/:userid', async (req, res) => {

    const post = await Post.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $pull: {
                _id_apply: req.params.userid
            },
            $push: {
                _id_reject: req.params.userid
            }

        }
    )

    if (!post)
        return res.status(400).send('the post cannot be created!')

    res.status(200).send(post);
});

module.exports = router;
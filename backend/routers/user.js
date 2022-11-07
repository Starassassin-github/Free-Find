const express = require('express');
const mongo = require('mongodb');
const multer = require('multer');

const { User } = require('../models/user');

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

router.get(`/work_history/:id`, async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).send(user.work_resolve)
})

router.get(`/work_status/:id`, async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).send({ work_pending: user.work_pending, work_resolve: user.work_resolve })
})

router.get(`/post_history/:id`, async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).send(user.posts)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && (req.body.password.localeCompare(user.password) === 0 )) {
        res.status(200).send(user)
    } else {
        res.status(400).send({ message: 'password is wrong!' });
    }

})

router.post(`/register`, async (req, res) => {

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

    res.status(200).send(user);
});

router.put('/:id', uploadOptions.single('image'), async (req, res) => {

    const userQuery = await User.findById(req.params.id)
    if (!userQuery) return res.status(400).send('Invalid User')

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`
    } else {
        imagepath = userQuery.image;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            image: imagepath,
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

    res.status(200).send(user);
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

router.patch('/posts/:id/:postid', async (req, res) => {

    const user = await User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $push: {
                posts: req.params.postid
            }
        }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.status(200).json({ message: "Posts has been Added!" })
});

router.put(`/work_resolve/clear/:id/`, async (req, res) => {

    const user = await User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        {
            $set: {
                work_resolve: []
            }
        }
    )

    if (!user)
        return res.status(400).send('the work cannot be deleted!')

    res.status(200).json({ message: "Work has been clear!" })



});


module.exports = router;
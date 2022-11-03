const express = require('express');
const multer = require('multer');

const { Company } = require('../models/company');

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

router.put('/:id', uploadOptions.single('image'), async (req, res) => {

    const companyQuery = await Company.findById(req.params.id)
    if (!companyQuery) return res.status(400).send('Invalid Company')

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`
    } else {
        imagepath = userQuery.image;
    }

    const company = await Company.findByIdAndUpdate(
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

    if (!company)
        return res.status(400).send('the company cannot be created!')

    res.send(company);
});

module.exports = router;
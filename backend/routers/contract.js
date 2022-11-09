const express = require('express');
const { Contract } = require('../models/contract');


const router = express.Router();

router.get(`/`, async (req, res) => {
    const contractList = await Contract.find();

    if (!contractList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(contractList);
});

router.get(`/:id`, async (req, res) =>{
    
    const contract = await Contract.findById(req.params.id)

    if(!contract) {
        res.status(500).json({message: 'The contract with the given ID was not found.'})
    } 
    res.status(200).send(contract);
})

router.post(`/`, async (req, res) => {

    let contract = new Contract({
        apply_name: req.body.apply_name,
        offer_name: req.body.offer_name,
        apply_id: req.body.apply_id,
        offer_id: req.body.offer_id,
        image_apply: req.body.image_apply,
        image_offer: req.body.image_offer,
        post: req.body.post,
    })

    contract = await contract.save();

    if(!contract)
    return res.status(400).send('the contract cannot be created!')

    res.status(200).send(contract);
});

module.exports = router;
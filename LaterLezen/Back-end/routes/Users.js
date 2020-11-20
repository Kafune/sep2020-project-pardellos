const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.get('/:email/tags' , async (req,res) => {
    let email = req.params.email;
    let allTags = await User.find({email: email}, {tags: 1})
    let response = JSON.parse(allTags)
    res.json(response)
})

module.exports = router
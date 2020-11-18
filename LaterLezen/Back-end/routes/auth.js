const express = require("express");
const passport = require('passport')
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isForOfStatement } = require("typescript");

require('./../models/User');
const User = mongoose.model('User');

// @desc    Auth with Google
// @route   Get /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc    Google auth callback
// @route   Get /auth/google/callback
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard')
})

router.post("/register", async (req, res) => {
    const saltRounds = 10;

    let email = req.body.email;
    let username = req.body.username;

    await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) throw err;
        let conditions = {
            Local: {
                email: email
            }
        }
    
        let update = {
            $setOnInsert: {
                email: email,
                username: username,
                password: hash
            }
        }
    
        let options = {
            upsert: true
            // new: true
        }
    
        User.findOneAndUpdate(conditions, update, options).exec()
        .then(user => {
            res.send(user);
        })
    })



})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;

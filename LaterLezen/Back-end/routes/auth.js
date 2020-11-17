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

router.post("/register", (req, res) => {
    const saltRounds = 10;

    let email = req.body.email;
    let username = req.body.username;
    let hashedPassword = '';

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if(err) throw err;
        hashedPassword = hash;

        let query = {
            Local: {
                email: email,
                username: username
            }
        }
    
        let update = {
            $setOnInsert: {
                email: email,
                username: username,
                password: hashedPassword
            }
        }
    
        let options = {
            upsert: true,
            new: true
        }
    
        console.log(email, username)
    
        User.findOneAndUpdate(query, update, options).exec((err, user) => {
            if (err) throw err;
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

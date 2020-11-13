const express = require("express");
const passport = require('passport')
const router = express.Router();
const bcrypt = require('bcrypt');

// @desc    Auth with Google
// @route   Get /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   Get /auth/google/callback
router.get("/google/callback", passport.authenticate('google', {failureRedirect: '/'}), (req, res)=>{
    res.redirect('/dashboard')
})

router.post("/register", async (req, res) => {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
            res.send(hashedPassword)
        })
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;

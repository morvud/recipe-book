'use strict'
const   express = require('express'),
        router  = express.Router(),
        passport = require('passport'),
        User    = require('../models/user')

//Landing page  
router.get("/", (req, res) => {
    res.render("landing");
});

// Register
router.get("/register", (req, res) => {
    res.render('register')
})

router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err)
            return res.render('register')
        }
        passport.authenticate('local')(req, res, () =>{
            res.redirect('/recipes')
        })
    })
})

//Login
router.get("/login", (req, res) => {
    res.render('login')
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/recipes",
        failureRedirect: "/login"
    }), (req, res) => {
    
})

//Logout
router.get("/logout", (req, res) => {
    req.logout()
    req.flash('error', 'Logged you out!')
    res.redirect('/recipes')
})

module.exports = router
'use strict'
const Recipe = require('../models/recipe')
module.exports = {
    checkRecipeOwnership: (req, res, next) => {
        if (req.isAuthenticated()){
            Recipe.findById(req.params.id, (err, foundRecipe) => {
                if(err){
                    res.redirect("back")
                } else {
                    if(foundRecipe.author.id.equals(req.user._id)){
                        next()
                    } else {
                        res.redirect("back")
                    }
                }
            })
        } else {
            res.redirect("back")
        }
    },
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'Please log in first!')
        res.redirect('/login')
    }
}
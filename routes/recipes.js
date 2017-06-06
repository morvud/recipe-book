'use strict'
const   express     = require('express'),
        router      = express.Router(),
        Recipe      = require("../models/recipe"),
        middleware  = require('../middleware')

//Show all recipes
router.get("/", (req, res) => {
    Recipe.find({}, (err, allrecipes) => {
        if(err){
            console.log(err);
        } else {
            res.render("index",{recipes:allrecipes});
        }
    });
});

//Add a recipe
router.post("/", middleware.isLoggedIn, (req, res) => {
    let name        = req.body.name;
    let method      = req.body.method;
    let protein     = req.body.protein;
    let carbs       = req.body.carbs;
    let fats        = req.body.fats;
    let macros      = {
        protein: protein,
        carbs: carbs,
        fats: fats
    }
    let author      = {
        id: req.user._id,
        username: req.user.username
    }
    let newRecipe   = {
        name: name,
        method: method,
        macros:macros,
        author: author
    }
    
    Recipe.create(newRecipe, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes");
        }
    });
});

//Get a new recipe form
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("new");
});

//Show a single recipe
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render("show" , {recipe: foundRecipe})
        }
    })
})

//Edit recipe
router.get("/:id/edit", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if(err){
            res.redirect('/recipes')
        } else {
            res.render('edit', {recipe: foundRecipe})
        }
    })

})

//Update recipe
router.put("/:id", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if(err){
            res.redirect("/recipes")
        } else {
            res.redirect("/recipes/" + req.params.id)
        }
    })
})

//Destroy recipe
router.delete("/:id", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/recipes")
        } else {
            res.redirect("/recipes")
        }
    })
})





module.exports = router
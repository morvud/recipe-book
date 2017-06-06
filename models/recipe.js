const   mongoose                = require('mongoose'),
        passportLocalMongoose   = require('passport-local-mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    macros: {
        protein: Number,
        carbs: Number,
        fats: Number
    },
    method: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model('Recipe', recipeSchema)
'use strict'
const   express         = require('express'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        User            = require('./models/user'),
        methodOverride  = require('method-override'),
        flash           = require('connect-flash')

const   recipesRoutes   = require('./routes/recipes'),
        indexRoutes     = require('./routes/index')
        
const   app             = express();

mongoose.connect("mongodb://localhost/recipe_book");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"))
app.use(flash())

//Passport configuration
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.message = req.flash('error')
    next()
})

app.use(indexRoutes)
app.use("/recipes", recipesRoutes)

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("RecipeBook has started...");
});
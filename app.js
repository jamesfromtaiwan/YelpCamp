var express     	= require("express"),
    app         	= express(),
    bodyParser  	= require("body-parser"),
    mongoose    	= require("mongoose"),
    MethodOverride  = require('method-override'),
    passport		= require('passport'),
    LocalStrategy 	= require('passport-local'),
    User 			= require('./models/user'),
    Campground 		= require('./models/campground'),
    flash           = require('connect-flash'),
    seedDB 			= require('./seeds'),
    Comment 		= require('./models/comment'),
    campRoute		= require('./routes/campgrounds'),
    commentRoute 	= require('./routes/comments'),
    indexRoute 		= require('./routes/index')	

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
// create yelp_camp database inside mongodb
// mongoose.connect("mongodb://james:james1994@ds017862.mlab.com:17862/yelpcamp");


app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
// For stylesheets & scripts files loading
app.use(express.static(__dirname + '/public'));

// Config the method-override for PUT method
app.use(MethodOverride('_method'));

app.use(flash());

// seedDB(); // SEED the database

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'James',
	resave: false,
	saveUninitialzed: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next) {
	res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
	next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req,res) {
	res.render('landing');
});

app.use('/campgrounds', campRoute);
// Nested route
app.use('/campgrounds/:id/comments', commentRoute);
app.use('/', indexRoute);



function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

app.listen(3000, function() {
	console.log('The server has been connected.');
});
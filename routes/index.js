//  Setup for Auth 
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


// AUTH ROUTE

router.get('/register', function (req,res) {
	res.render('register');
});

router.post('/register', function (req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err,user) {
		if (err) {
			req.flash('error', err.message);
			return res.render('register');
		};

		passport.authenticate('local')(req,res, function() {
			req.flash('success', 'Successfully Signed Up');
			res.redirect('/campgrounds');
		});

	});

});

router.get('/login', function (req, res) {
	res.render('login');
});

// Passport takes the req.body.username and req.body.password and passes it to our verification function in the local strategy.

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/login',
}) ,function (req, res) {
	// req.user contains the authenticated user
	req.flash('success', 'Successfully Logged In');
	res.redirect('/campgrounds');
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Successfully Logged Out');
	res.redirect('/campgrounds');
});

module.exports = router;
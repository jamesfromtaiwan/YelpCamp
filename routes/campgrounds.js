// Setup for campgrounds
var express = require('express');
var	Campground = require('../models/campground');
var router = express.Router();
var middleware = require('../middleware');

// INDEX ROUTE -- show all campgrounds
router.get('/', function(req,res) {
	
	// Get all the campgrounds from db; 
	Campground.find({}, function(err,allCampgrounds) {
		if (err) {
			console.log(err)
		} else {
			res.render('campgrounds/index', {campgrounds:allCampgrounds});
		}
	})
});

// CREATE ROUTE -- create a new route
router.post('/', middleware.isLoggedIn, function(req,res) {
	// res.send('You hit the post route.');
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {id: req.user._id, username: req.user.username};
	var newCampground = {name: name, image: image, description: desc, author:author};
	// campgrounds.push(newCampground); NOT AN ARRAY ANYMORE
	// Create a campground and save to the database
	Campground.create(newCampground, function(err,newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	})
});

// NEW ROUTE -- show form to create a new route
router.get('/new', middleware.isLoggedIn, function(req,res) {
	res.render('campgrounds/new');
});

// SHOW Route -- find the campground with provided id and show it.
router.get('/:id', function(req,res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

// EDIT Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req,res) {
	Campground.findById(req.params.id, function (err,foundCampground) {
		res.render('campgrounds/edit', {campground: foundCampground});
	});
});

// UPDATE Route
router.put('/:id', middleware.checkCampgroundOwnership, function (req,res) {
	var updatedCampground = req.body.campground;
	Campground.findByIdAndUpdate(req.params.id, updatedCampground, function (err,updated) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + updated._id );
		};
	});
});

// DELETE
router.delete('/:id', middleware.checkCampgroundOwnership, function (req,res) {
	Campground.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		};
	});
});

module.exports = router; 
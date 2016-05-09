// Setup for comments
var express = require('express');
// Make the :id able to go through Comment Route from Campground Route
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground'),
	Comment    = require('../models/comment');
	// It automatically look for the index.js 
var middleware = require('../middleware');

// NEW COMMENTS ROUTES
router.get('/new', middleware.isLoggedIn , function(req,res) {
	Campground.findById(req.params.id, function(err,foundCampground) {
		res.render('comments/new', {campground: foundCampground});
	});
});

// ALL COMMENTS ROUTES
router.post('/', middleware.isLoggedIn ,function(req,res) {
	Campground.findById(req.params.id, function(err,campground) {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err,comment) {
				if (err) { 
					req.flash('error', err.message);
					res.redirect('/campgrounds');
				} else {

					// add the user to comment
					comment.author.username = req.user.username;
					// add the user id to comment
					comment.author.id = req.user._id;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	})
});

// EDIT COMMENT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.render('comments/edit', {comment: foundComment, campground: req.params.id});
		}
	});
});

// UPDATE COMMENT ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership , function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DELETE COMMENT ROUTE 
router.delete('/:comment_id', middleware.checkCommentOwnership, function (req,res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});


module.exports = router; 
var Comment = require('../models/comment');
var Campground = require('../models/campground');

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Please Loggin First');
	res.redirect('/login');
};

// Check if the user is authenticated and if user is the author of the campground to authorize edit campground feature
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		// If the user is authenticated, then check if user is the author of the campground
		Campground.findById(req.params.id, function (err,foundCampground) {
			if (err) {
				console.log(err);
				res.redirect('/campgrounds');
			} else {
				// Using mongoose equals method. Notice === won't work because author.id is object while req.user._id is a string
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have the permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Please Login First');
		res.redirect('/login');
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		// If the user is authenticated, then check if user is the author of the campground
		Comment.findById(req.params.comment_id, function (err,foundComment) {
			if (err) {
				console.log(err);
				res.redirect('back');
			} else {
				// Using mongoose equals method. Notice === won't work because author.id is object while req.user._id is a string
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have the permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'Please Login First');
		res.redirect('/login');
	}
};

module.exports = middlewareObj;
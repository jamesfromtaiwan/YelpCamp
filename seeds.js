var mongoose 	= require('mongoose'),
	Campground 	= require('./models/campground'),
	Comment 	= require('./models/comment');

var data = [ 
	{	name: 'Granite Hill',
		image: 'https://farm4.staticflickr.com/3741/9586943706_b22f00e403.jpg',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{	name: 'Blue Lake Hut',
		image: 'http://static.panoramio.com/photos/original/63736617.jpg',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	},
	{
		name: 'Tongariro',
		image: 'http://www.newzealandphoto.info/photos/narodni-park-tongariro-modre-jezero-v-popredi-novy-zeland-195.jpg',
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
	}
];

function seedDB() {
	Campground.remove({}, function(err) {
		// if (err) {
		// 	console.log(err);
		// } else {
		// 	console.log('Removed Campgrounds!');
		// 	data.forEach(function(seed) {
		// 		Campground.create(seed,function(err,campground){
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log('Added a new campground.');
		// 				Comment.create({
		// 					text: 'This place is amazing',
		// 					author: 'James Lo'
		// 				}, function(err,comment) {
		// 					if (err) {
		// 						console.log(err);
		// 					} else {
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log('Created new  comment!');
		// 					}
		// 				})
		// 			}	
		// 		});
		// 	});
		// }
	});
}

module.exports = seedDB;

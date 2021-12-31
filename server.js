////////////////////////////////////////////////////////
// RoguelikeTweets - retweeter bot
// Modified from this post: https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08
// For all parameters see: https://dev.twitter.com/rest/reference/get/search/tweets
////////////////////////////////////////////////////////

try {
	var config = null;

	if (process.env.NODE_ENV === 'development') {
		config = require('./config.js');
	}
	else {
		config = {
		  consumer_key: process.env.CONSUMER_KEY,  
		  consumer_secret: process.env.CONSUMER_SECRET,
		  access_token: process.env.ACCESS_TOKEN,  
		  access_token_secret: process.env.ACCESS_TOKEN_SECRET
		}
	}

	var twit = require('twit');
	var twitter = new twit(config);

	var retweet = function() {
		
		var params = {
				q: '#roguelike',
				lang: 'en',
				count: 30,
				result_type: 'recent'
			}
		
		twitter.get('search/tweets', params, function(err, data) {
			if (!err) {
				data.statuses.forEach(function(tweet) {
					var id = tweet.id_str;
					
					// Retweet
					twitter.post('statuses/retweet/:id', {
						id: id
					}, function(err, response) {
						// do nothing
					});
				});			
			}
		});
	}

	retweet();

	// Run every 30 minutes
	setInterval(retweet, 1800000);
}
catch (err) {
	// do nothing
}
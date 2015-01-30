var _ = require('lodash');
var request = require('request');
// var Q = require('q');

exports.gameData = function(req, res){
	var gameId = 2015012500; // 2015012500 is the Pro Bowl. Use it for test data
	// var gameId = 2015020100; // 2015020100 is Super Bowl

	var url = "http://www.nfl.com/liveupdate/game-center/"+ gameId +"/"+ gameId +"_gtd.json";

	request.get({url:url, json:true}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body[gameId]);
		} else {
			if(response.statusCode == 404){
				// game hasn't started yet
				res.status(503);
				res.json({});
			}
		}
	});
}
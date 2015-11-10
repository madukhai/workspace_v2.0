var express = require('express');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var url = 'http://www.basketball-reference.com/teams/TOR/2016.html?lid=standings_team';

// app.get('http://stats.nba.com/league/player/#!/',function(req,res){
// 	console.log('2');
// 	console.log(res);
// 	console.log(req);
// });


request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body),
			temperature = $(".stats_table").html();
			console.log(temperature);
	// 	console.log("It’s " + temperature + " degrees Fahrenheit.");
	// } else {
	// 	console.log("We’ve encountered an error: " + error);
	}
});
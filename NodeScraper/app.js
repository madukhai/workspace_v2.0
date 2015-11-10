var request = require('request'),
	cheerio = require('cheerio'),
	url = "https://www.reddit.com/";

// request(url, function (error, response, body){
// 	if('err') {
// 		var $ = cheerio.load(body),
// 			 something = $("form").html();
// 		console.log(something);
// 	}
// });



// url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;
	
// request(url, function (error, response, body) {
// 	if (!error) {
// 		var $ = cheerio.load(body),
// 			temperature = $(".wx-value").html();
			
// 		console.log("It’s " + temperature + " degrees Fahrenheit.");
// 	} else {
// 		console.log("We’ve encountered an error: " + error);
// 	}
// });

request(url, function (error, response, body) {
	if (error) {
		console.log("Couldn’t get page because of error: " + error);
		return;
	}
	console.log('1');
	// load the body of the page into Cheerio so we can traverse the DOM
	var $ = cheerio.load(body),
		links = $(".tagline time").attr('datetime');
		console.log(links);

	// console.log('2');
	// console.log(links.html());
	count = 0;
	// links.each(function (i, link) {
	// 	if(count == 0){
	// 		console.log(link);
	// 	}
	// 	count++;
	// });
	// 	console.log('3');
	// 	var totalResults;
	// 	// get the href attribute of each link
	// 	var url = $(link).attr("href");
		
	// 	// strip out unnecessary junk
	// 	url = url.replace("/url?q=", "").split("&")[0];
	// 	console.log(url.charAt(0));
	// 	if (url.charAt(0) === "/") {
	// 		return;
	// 	}
		
	// 	// this link counts as a result, so increment results
	// 	totalResults++;
	// 	console.log(totalResults);
	//});
	
});




var request = require('request'),
	cheerio = require('cheerio'),
	base_url_front = 'http://www.boxofficemojo.com/yearly/chart/?page=' +'&view=releasedate&view2=domestic&yr=2013&p=.htm',
	base_url_back = '&view=releasedate&view2=domestic&yr=2013&p=.htm';
var eol = require('os').EOL;

function getMovie(i,movies){
	var req = request('http://www.boxofficemojo.com/alltime/world/',function(err,res,body){
		var $ = cheerio.load(body);
		var rows = $('#body table table tr');
		rows.each(function(i,val){
			// console.log(i + '   ' + val);
			// console.log($(this).text());

			if(i > 0 && i<101){
				// var movie = {
				// 	'rank': val.children[];
				// }
				// console.log($(val.children[1].children).text() + ' ' + $(val.children[1].children).text(6));
				//console.log($(val).html().split(eol));
				$(val).html().split(eol).map(function(v,index){
					console.log('['+index+']' + v);
				});
			}
		})
		// console.log(movies);
	})
	
}

getMovie(1,[]);
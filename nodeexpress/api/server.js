var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
var request = require('request');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + './../app/'));

app.get('/',function(req,res){
	res.send(__dirname);
})


app.get('/test',function(req, res){
	res.json({message: 'Express GET works'});
	// response.send('My express is on');
});

app.post('/login',function(req, res){
	// console.log(request.body);
	var data = JSON.stringify({
			username: JSON.parse(req.body.data).username,
			password: JSON.parse(req.body.data).password
		});
	
	request.post({url:'http://174.129.248.23/brainstation/shop/login',form:{'data':data}},function(err,response,body){
		console.log('Error:'+err);
		console.log('BODY:'+body);
		res.json(body);
	});
	

});



app.post('/record_order', function(req,res){
	console.log( typeof req.body.data);

	
	request.post({url:'http://174.129.248.23/brainstation/shop/record_order',form:{'data':req.body.data}},function(err,response,body){
		console.log('Error:'+err);
		console.log('BODY:'+body);
		res.json(body);
	});
	
});

app.get('/retrieve_orders', function(req,res){
	http.get('http://174.129.248.23/brainstation/shop/retrieve_orders/team3' ,function(response) {

	    var body = "";

	    response.on('data',function(chunk) {
	        body += chunk;
	        // console.log(body);
	    });

	    response.on('end',function() {
	        if(response.statusCode === 200){
	            try {
	                // console.log(JSON.parse(body));
	            } catch(e) {
	                // console.log('Could not parse JSON object');
	            }
	            // console.log(JSON.parse(body));
	            res.json(JSON.parse(body));
	        }

	    });

	});
});

app.get('/retrieve_products', function(req,res){
	// console.log(request);
	 http.get('http://174.129.248.23/brainstation/shop/retrieve_products/team3' ,function(response) {

	    var body = "";

	    response.on('data',function(chunk) {
	        body += chunk;
	        // console.log(body);
	    });

	    response.on('end',function() {
	        if(response.statusCode === 200){
	            try {
	                // console.log(JSON.parse(body));
	            } catch(e) {
	                // console.log('Could not parse JSON object');
	            }
	            // console.log(JSON.parse(body));
	            res.json(JSON.parse(body));
	        }

	    });

	});
	// console.log(req);
	// response.json(req);


});

app.post('/newproduct', function(req,res){
	// console.log(req);
	// var data = JSON.stringify(req.body);
	// console.log(req.body);


	request.post({url:'http://174.129.248.23/brainstation/shop/newproduct',form:{'data':req.body.data} , headers:{'Authorization':'HAFS7NBAF'} },function(err,response,body){
		// console.log('Error:'+err);
		console.log(response);
		// console.log('BODY:'+body);
		// var data_json = JSON.parse(body);
		// data_json.productId = req.params.id;
		// var data = JSON.stringify(data_json);
		// console.log(data);
		res.json(body);
	});
});	

app.post('/editproduct/:id', function(req,res){
	// console.log(req.params.id);
	// var data = JSON.stringify(req.body.data
	// 		username: JSON.parse(req.body.data).username,
	// 		password: JSON.parse(req.body.data).password
		// );

	
	// req.setHeader({'authToken' :'HAFS7NBAF'});




	console.log(req);
	// var data = JSON.stringify(req.body);
	// console.log(req.body);


	request.post({url:'http://174.129.248.23/brainstation/shop/editproduct/' + req.params.id,form:{'data':req.body.data} , headers:{'Authorization':'HAFS7NBAF'} },function(err,response,body){
		// console.log('Error:'+err);
		console.log(response);
		// console.log('BODY:'+body);
		// var data_json = JSON.parse(body);
		// data_json.productId = req.params.id;
		// var data = JSON.stringify(data_json);
		// console.log(data);
		res.json(body);
	});
});


app.listen('8080',function(){
	console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

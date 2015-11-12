var express = require('express');
var pg = require('pg');
var conString = "postgres://postgres:Zhoufeng15@localhost/shopapp";
 




pg.connect(conString, function(err, client, done) {
  	if(err) {
    	return console.error('error fetching client from pool', err);
  	}
	else{
		var app = express();
		app.get('/', function(req,res){
			// res.send('App started');
			var object  = {
				name:'axe2',
				category: 'weanpons',
				description: 'New weanpon',
				price:'10',
				image:'',
				quantity: 10,
				status: 'active'
			};

			// building query.
			var sql_query = "INSERT INTO products (name,category,description,price,image,quantity,status) VALUES('"+ object.name +"','"+ object.category +"','"+ object.description+"','"+object.price+"','"+object.image+"','"+object.quantity+"','"+object.status +"');";
			client.query(sql_query,function(err,result){
				done();

				if(err){
					res.send(err);
				}
				else{
					res.send(result);
				}
			});

			// res.send(sql_query);
		});

		app.listen('8080',function(){
			console.log('listening localhost:8080');
			console.log('Stop with CTRL + C');
		});
	}  	
});



var express = require('express');
var bodyParser = require('body-parser')
// var http = require('http');
var pg = require('pg');
// var request = require('request');

var conString = "postgres://postgres:Zhoufeng15@localhost/shopapp";
var pg_client = null;
var pg_done = null;
pg.connect(conString,function(err, client, done){
	if(err){
		return console.error('error fetching client from pool', err);
	}else{
		pg_client = client;
		pg_done = done;
		start_app();
	}
})

function start_app(){
	var app = express();
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + './../app/'));

	app.post('/login',function(req, res){
		
		var object = {
				username: JSON.parse(req.body.data).username,
				password: JSON.parse(req.body.data).password
			};
		var sql_query = "SELECT * FROM users" +  " WHERE email='" + object.username +"' AND password='" + object.password + "';";
		console.log(sql_query);
		pg_client.query(sql_query,function(err,result){
			// console.log(result);
			pg_done();
			if(err){
				console.log('-------');
				console.log('login Error: ' + err.stack);
				res.send(err);
			}else{
				var data = {};
				if(result.rows.length == 1){
					data = { authToken : 'get this'};
					console.log(data);
					// authToken is just astring here, no meaning, just avoid a falsyvalue.
					res.json(data);
				}
				else{
					data = { authToken: 'Invalid Credentials'}
					res.json(data);
				}
			}
		});
	});

	app.post('/record_order', function(req,res){
		// console.log(req.body.data);
		var object = JSON.parse(req.body.data);
		
		// console.log(object);
		var sql_query = "INSERT INTO orders (total, tax, finaltotal, cart) VALUES ('" + object.total + "','"+ object.tax + "','" + object.final_total + "','" + JSON.stringify(object.cart) + "');";

		// console.log(sql_query);
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				console.log('get Order ERROR: ' + err.stack);
			}else{
				sql_query = "SELECT * FROM orders WHERE orderid = (SELECT MAX(orderid) FROM orders) ;";
				pg_client.query(sql_query,function(err,result){
					pg_done();
					if(err){
						console.log('-------');
						console.log('addorder Error:  show()' + err.stack);
						res.send(err);
					}else{
						console.log(result);
						object.productId = result;
						res.json(object);
					}
				});
			}
		})
	});

	app.get('/retrieve_orders', function(req,res){
		var sql_query = 'SELECT * FROM orders;';
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				console.log('-------');
				console.log("getorders ERROR: " + err);
				res.send(result);
			}else{
				console.log(result.rows);
				res.json(result.rows);
			}
		});
		
	});

	app.get('/retrieve_order/:orderid', function(req,res){
		var sql_query = 'SELECT * FROM orders WHERE orderid = ' + req.params.orderid + ';';
		console.log(sql_query);
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				console.log('-------');
				console.log("getorder ERROR: " + err);
				res.send(result);
			}else{
				console.log(result.rows);
				res.json(result.rows);
			}
		});
	})



	app.get('/retrieve_products', function(req,res){
		
		// res.json({});
		var sql_query = 'SELECT * FROM products;';
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				// console.log(err);
				console.log('-------');
				console.log('getproduct Error: ' + err.stack);
				res.send(err);
			}else{
				// console.log(result);
				
				res.json(result.rows);
			}
		});

	});

	app.post('/newproduct', function(req,res){
		var object = JSON.parse(req.body.data);
		var sql_query = "INSERT INTO products (name,category,description,price,image,quantity,status) VALUES('"+ object.name +"','"+ object.category +"','"+ object.description+"','"+object.price+"','"+object.image+"','"+object.quantity+"','"+object.status +"');";	
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				console.log('-------');
				console.log('addproduct Error: ' + err.stack);
				
				res.send(err);
			}else{
				// console.log(result);
				
				sql_query = "SELECT * FROM products WHERE productid = (SELECT MAX(productid) FROM products) ;";
				pg_client.query(sql_query,function(err,result){
					pg_done();
					if(err){
						console.log('-------');
						console.log('addproduct Error:  show()' + err.stack);
						res.send(err);
					}else{
						console.log(result);
						object.productId = result;
						res.json(object);
					}
				})
			}
		})
		
	});	

	app.post('/editproduct/:id', function(req,res){
		
		var object = JSON.parse(req.body.data);
		
		var sql_query = "UPDATE products SET name = '"+ object.name +"',category = '" + object.category +"',description = '" + object.description+"',price = '"+ object.price + "',image = '"+ object.image + "',quantity = "+ object.quantity + " ,status = '"+object.status +"' WHERE productid=" + req.params.id +";";	
		pg_client.query(sql_query,function(err,result){
			pg_done();
			if(err){
				console.log('-------');
				console.log('addproduct Error: ' + err.stack);
				
				res.send(err);
			}else{
				// console.log(result);
				
				sql_query = "SELECT * FROM products WHERE productid = " + req.params.id + ";";
				pg_client.query(sql_query,function(err,result){
					pg_done();
					if(err){
						console.log('-------');
						console.log('addproduct Error:  show()' + err.stack);
						res.send(err);
					}else{
						// console.log(result);
						object.productId = result;
						res.json(object);
					}
				})
			}
		})
	});


	app.listen('8080',function(){
		console.log('Server Started on http://localhost:8080');
	    console.log('Press CTRL + C to stop server');
	});
}
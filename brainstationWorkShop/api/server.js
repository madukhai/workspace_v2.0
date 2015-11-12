var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + './../app/'));

app.get('/:step',function(req,res){
	console.log(step);
});
app.post('/',function(req,res){

});

app.listen('8080',function(){
	console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

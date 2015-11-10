
// console.log(process);
// console.log(process.argv);
// var num1 = parseInt(process.argv[2]);
// var num2 = parseInt(process.argv[3]);
// var num3 = parseInt(process.argv[4]);
// console.log(num1 + num2 + num3);
// added, multiplied, divided, or subtracted

var doStuff = function (){
	var operator;
	var res = 0;
	switch (process.argv[2]){
		case 'added': 
			operator = added;
			break;
		case 'multiplied':
			operator = multiplied;
			res  = 1;
			break;
		case 'divided':
			res = 1;
			operator = divided;
			break;
		case 'subtracted':
			operator = subtracted;
			break;
		default:
			console.log('Error: please type an operator after file name');
			return false;
	}



	
	for(var i = 3; i< process.argv.length;i++ ){
		
		if(parseInt(process.argv[i]) || parseInt(process.argv[i]) == 0){
			
			if(parseInt(process.argv[i]) == 0){
				
				if(process.argv[2] == 'multiplied'){
					res = 0;
					
					break;
				}else if(process.argv[2] == 'divided'){
					
					res = 'Error: you can divided by 0.';
					break;
					
				}

			}
		
		res = operator(res,parseInt(process.argv[i])); 
		}
	}
	
	console.log(res);
};

var added = function (var1, var2){
	return (var1 + var2);
}

var multiplied = function (var1, var2){
	
	return (var1 * var2);
}

var divided = function (var1, var2){
	return (var1 / var2);
}

var subtracted = function (var1, var2){
	return (var1 - var2);
}

// doStuff();


var http = require('http');

// use http's get method to access a URL and write a callback
http.get('http://brainstation.io', function(response){

    var body = '';

    response.on('data', function(chunk){

        console.log('Body: ' + chunk)   

        // re-assemble the chunk
        body += chunk;

    });

    // 
    response.on('end',function(){
        console.log('Final Body: ' + body);
    });

});












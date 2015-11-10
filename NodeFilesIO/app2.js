var isPrime = require('is-prime');
var num = parseInt(process.argv[2]);

// console.log(num);

if(!isNaN(num)){
	console.log(isPrime(num));
}else{
	console.log( 'Please enter a NUMBER!');
}

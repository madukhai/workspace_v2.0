var compress = require('./compress');
var fileCode = process.argv[2];
var fileName = '';
switch (fileCode) {
	case '1':
		fileName = "pyramid.txt";
		break; 
	case '2':
		fileName = 'star_wars.txt';
		break;
	case '3':
		fileName = 'casper.txt';
		break;
}
compress.compressing(fileName);
compress.uncompressing('new_' + fileName);












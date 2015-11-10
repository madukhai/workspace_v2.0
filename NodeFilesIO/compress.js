var fs = require('fs');
function compressing(file){
	var data = fs.readFileSync(file,'utf8');		
	var content = '';
	var num = 0;
	var cur = '';
	for(var i = 0; i< data.length;i++){
		// console.log(data[i]); 
		if( num == 0){
			cur = data[i];
			num++;
		}else if(data[i] == '\n'){
			content += num;
			content += cur;
			content += '\n';
			cur = '';
			num = 0;
		}else{
			if(data[i] == cur){
				num ++;
			}else{
				content += num;
				content += cur;
				cur = data[i];
				num = 1;
			}
			if( i == (data.length -1)){
				
				if(data[i-1] == data[i]){
					num++;
				}
				content += num;
				content += cur;
			}
		}
	}
	fs.writeFileSync('new_' + file, content);
	
}

function uncompressing(file){
	fs.readFile(file,'utf8',function(err, data){
		var graph = '';
		var num = '';
		for(var i=0;i<data.length;i++){
			if(parseInt(data[i]) || parseInt(data[i]) == 0){
				num += data[i];
			}else if(data[i] != '\n'){
				var amount = parseInt(num);
				for(var j=0;j<amount;j++){
					graph += data[i];
				}
				num = '';
			}else{
				graph += '\n';
				}
			}

		console.log(graph);
	})
}
module.exports.compressing = compressing;
module.exports.uncompressing = uncompressing;




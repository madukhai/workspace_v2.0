
function titleCaseFilter(){
	return function(inputString){
		var index = inputString.search("-");
		var res = '';
		res = inputString.charAt(0).toUpperCase() + inputString.slice(1);
		var fixed =0;
		while(index != -1){
			res = res.slice(0,index + 1) + res.charAt(index + fixed + 1).toUpperCase() + res.slice(index + 2);
			index = res.slice(index+1).search("-");
			console.log(index);
			fixed += index;
		}
		console.log(index);
			
		
		return res;
	}
}


angular.module('insultApp').filter('titleCaseFilter', titleCaseFilter);
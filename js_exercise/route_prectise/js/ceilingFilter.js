function ceilingFilter(){
	return function(num){
		return Math.ceil(num);
	}
}
app.filter('ceilingFilter', ceilingFilter);
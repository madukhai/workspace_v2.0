function searchFilter(){
	return function(movies,search){
	  	if (search){
	  		var new_list = [];
	  		// return movie.Title.toLowerCase().includes(search.toLowerCase()) ? true: false;
	  		for(var i=0;i<movies.length;i++){
	  			if(movies[i].Title.toLowerCase().includes(search.toLowerCase())){
	  				new_list.push(movies[i]);
	  			}
	  		}
	  		return new_list;
	  	}else {
	  		return movies;
	  	}
	  
	}
}





app.filter('searchFilter', searchFilter);
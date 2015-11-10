app.controller('MovieDetailsCtrl', MovieDetailsCtrl);

function MovieDetailsCtrl(movieService, $routeParams, $location,$http) {
  /*TODO #4: Load the movie from the movieService using the id form the route params*/
  this.movieId = $routeParams.movieId;
  this.service = movieService;
  this.location = $location;
  this.http = $http;
  this.movie = this.service.getMovie(this.location.url().split(':')[1]);
  
}


// imstagram API.
// MovieDetailsCtrl.prototype.instagram_api_search = function (){
// 	var that = this;
//     // var url = "https://www.googleapis.com/youtube/v3/youtube.search.list?part=snippet&order=viewCount&q=" + removeSpace(that.movie.Title) + "+trailer&type=video&videoDefinition=high";
//    	var url = "https://api.instagram.com/v1/tags/" + that.movie.Title + "/media/recent?client_id=61f8b631abd34732a3bcd8c73d0d73a9&callback=JSON_CALLBACK";;

//    	var that = this;
//     that.http.jsonp(url).then(function successCallback(response) {
//             console.log('success');
//             console.log(response);
//         }, function errorCallback(response) {
//         	 console.log('error');
//         	 console.log(response);
//    		});
// };


// function removeSpace(str){
// 	var str_list =  str.split(' ');
// 	var res = "";
// 	for(var i=0;i<str_list.length;i++){
// 		res += str_list[i];
// 		res += '+';
// 	}
// 	return res.slice(0,res.length-1);
// }

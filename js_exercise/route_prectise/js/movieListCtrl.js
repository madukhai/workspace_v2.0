app.controller('MovieListCtrl', MovieListCtrl);

function MovieListCtrl(movieService, $location) {
  /*TODO #3: Load all of the movies from the movieService*/
  this.service = movieService;
  this.movies = this.service.getMovies();
  this.location = $location;
  this.sortOptions = [
    {label: 'Title', sortField: 'Title', reverse: false},
    {label: 'Rating', sortField: "imdbRating", reverse: true}
  ]
  
  this.curPage = 1;
  this.moviesPerPage = 4;

  this.goTo = function(movieId){
  	this.location.path('/movie:' + movieId);
  };


  this.changePage = function(bool){
  	if(bool){
      this.curPage--;
    }else{
      this.curPage++;
    }
  }

  // this.svg = make_triangle();
  // console.log(this.svg);
}
MovieListCtrl.prototype.resetPage = function(){
  this.curPage = 1;
}

// function make_triangle(){
//   return Trianglify({
//     width: window.innerWidth,
//     height: window.outerHeight*1.5,
//     cell_size: 100,
//     variance: 1,
//     stroke_width: 1
//   }).svg();
// }
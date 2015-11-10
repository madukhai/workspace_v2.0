
var app = angular.module('myApp', ['ngRoute','angularUtils.directives.dirPagination']);
app.config(function($routeProvider) {
	/*
  TODO #2:
  Configure the router to:
    -load movieList.html and use the MovieListCtrl when the url is '/home'
    -load movieDetails.html and use the MovieDetailsCtrl when the url is '/movie/:movieId'
  For any other url redirect the user to the home page.
  */
    back_setting();
    $routeProvider
        .when('/home', {
          templateUrl: 'templates/movieList.html',
          controller: 'MovieListCtrl as ctrl'
        })
        .when('/movie:movieId', {
        	templateUrl: 'templates/movieDetails.html',
        	controller: 'MovieDetailsCtrl as ctrl'
        })
        .otherwise({
          redirectTo: '/home'
        });
});


function back_setting(){
  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.outerHeight,
    cell_size: 150,
    variance: 1,
    stroke_width: 1
  }).svg(); // Render as SVG.
  
  // Add pattern to DOM.
  var svg = angular.element(pattern);
  console.log(svg);
  var container = angular.element('body').context.children[0].children[1];
  
  console.log(container);
  angular.element(container).append(svg);
}




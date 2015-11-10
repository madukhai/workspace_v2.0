var app = angular.module('userApp', ['ngRoute','ui.bootstrap','ngMessages']);

app.config(function($routeProvider, $httpProvider) {
  back_setting();
  $routeProvider
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl as ctrl'
    })
    .when('/profile', {
      templateUrl: 'templates/profile.html',
      controller: 'ProfileCtrl as ctrl',
      /*TODO #3: Add a "resolve" that loads the user
      profile before the profile page loads. If there
      is an error loading the profile then redirect
      the user to the login page.*/
      resolve: {
        user: function(api, $location){
          return api.getProfile(api.user)
          .then(function(data){
            return data.data;
          },function(data){
            alert(data.data.error);
            $location.path('/login');
          });
         }
      }
    })
    .otherwise({
      redirectTo: '/login'
    });


  $httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if (localStorage.authToken) {
          config.headers.Authorization = localStorage.authToken;
        }
        return config;
      }
    };
  });
});


function back_setting(){
  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.outerHeight,
    cell_size: 150,
    variance: 0,
    stroke_width: 1
  }).svg(); // Render as SVG.
  
  // Add pattern to DOM.
  var svg = angular.element(pattern);

  var container = angular.element('.trianglify').context.children[0].children[1];
  
  
  angular.element(container).append(svg);
}

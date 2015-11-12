app.controller('AuthCtrl',AuthCtrl);

function AuthCtrl(api,$location, $modalInstance){
	this.api = api;
	this.$location = $location;
  this.$modalInstance = $modalInstance;
}
AuthCtrl.prototype.authenticate = function(username, password){
	var self = this;
	var request_body = {
		username:username,
		password:password
	};

	this.api.request('/login',request_body,'POST')
	.then(function(response) {
      var data = response.data;
      console.log(data);
      if(data.authToken != 'Invalid Credentials' && data.authToken != null  ){
      	//reset local storage data
      	localStorage.removeItem('products');
      	localStorage.setItem('authToken',data.authToken);
        
      	self.$location.path('/admin');
      }
    },function(response){
    	console.log(response);
    	
    });;
  this.$modalInstance.close();
}

AuthCtrl.prototype.close = function(){
  this.$modalInstance.close();
}




// angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };

//   $scope.ok = function () {
//     $uibModalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });
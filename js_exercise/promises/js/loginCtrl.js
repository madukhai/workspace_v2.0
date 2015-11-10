function LoginCtrl(api,$q, $location,$uibModal) {
  this.api = api;
  this.$q = $q;
  this.$location = $location;
  this.$uibModal = $uibModal;
}

LoginCtrl.prototype.logIn = function() {
	var that = this;
	this.api.login(this.username, this.password)
		.then(function(data){
			that.api.user = that.username;
			that.$location.path('/profile');
		},function(data){
			alert(data.data.error);
		});
};

LoginCtrl.prototype.open = function(){
	var that = this;
	this.modal = this.$uibModal.open({
      animation: true,
      
      templateUrl: 'templates/createprofile.html',
      controller: 'CreateProfileCtrl as ctrl',

    });
    

}


angular.module('userApp').controller('LoginCtrl', LoginCtrl);
function ProfileCtrl(api,$location,user) {
  this.api = api;
  this.$location = $location;
  this.user = user;
}


ProfileCtrl.prototype.logout = function(){
	var that = this;
	this.api.logout().then(function(data){
		that.api.user = '';
		that.$location.path('/login');
	});
}


angular.module('userApp').controller('ProfileCtrl', ProfileCtrl);
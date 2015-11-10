function CreateProfileCtrl(api, $uibModal,$modalInstance){
	this.api = api;
	this.$uibModal = $uibModal;
	this.$modalInstance = $modalInstance;
}

CreateProfileCtrl.prototype.submit = function(){
	this.data = {"username": this.username, "password": this.password, "email":this.email, "name": this.name,"age":this.age}
  	this.api.createAccount(this.data);
   	this.$modalInstance.close(this.$modalInstance.result);
}

CreateProfileCtrl.prototype.cancel = function(){
	
 	console.log('hey!');
 	this.$modalInstance.dismiss('cancel');
}
















app.controller('CreateProfileCtrl', CreateProfileCtrl);
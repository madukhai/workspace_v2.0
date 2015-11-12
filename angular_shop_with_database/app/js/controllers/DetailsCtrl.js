app.controller('DetailsCtrl', DetailsCtrl);
function DetailsCtrl($modalInstance, product){
	this.$modalInstance = $modalInstance;
	this.product = product;
}

DetailsCtrl.prototype.close = function(){
	console.log(this.$modalInstance);
	this.$modalInstance.close();
};
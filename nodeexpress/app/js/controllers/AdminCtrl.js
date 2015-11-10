app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService,$location,products){
	var self = this;
	this.location = $location;

	//services
	this.productService = productService;
	this.products = products;
	// console.log(this.products);
}

AdminCtrl.prototype.logout = function(){
   // localStorage.removeItem('products');
   localStorage.removeItem('authToken');
   console.log(localStorage);
   this.location.path('/home');
}
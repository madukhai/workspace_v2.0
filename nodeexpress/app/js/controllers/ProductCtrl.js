app.controller('ProductCtrl',ProductCtrl);

function ProductCtrl(productService){
	this.productService = productService;
}
ProductCtrl.prototype.addProduct = function(){
	//create the api request that makes the product on the backend
	//as part of your response you need to add it to your current
	//product array using the product service
	console.log(this.price);
	if(this.price==null){
		this.price = 0;
	}
	
	var self = this;
	var request_body = {
		name:self.name,
		description:self.description,
		price:self.price,
		category:self.category,
		quantity:self.quantity,
		status:self.status,
		image: self.image
	}

	this.productService.addProduct(request_body);
	

}
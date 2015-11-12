app.service('productService',ProductService);

function ProductService(api){
	//services
	this.api = api;

	this.products = localStorage.getItem('products');

	// console.log(this.products);
}


ProductService.prototype.retrieveProducts = function(){
	var self = this;
	return this.api.request('/retrieve_products',{},'GET');
}

ProductService.prototype.setProducts = function(products){
	//store the products in local storage so you don't have to make an API
	//request each time you are on this page.

	localStorage.setItem('products',JSON.stringify(products));
	this.products = products;

}

ProductService.prototype.getProducts = function(){
	var self = this;
	//if there are no products stored in localStorage
	//grab them from the API,store them in localStorage
	//and pass back the products as a promise
	// if(this.products == null){
		// console.log('3');
		
	return this.retrieveProducts().then(function(response){
			self.setProducts(response.data);
			// console.log(response.data);
			return response.data;
	   });
}
ProductService.prototype.addProduct = function(product){
 	//TODO: add the new product to the current product list and
 	//return the updated list
	return this.api.request('/newproduct',product,'POST')
			.then(function(response){

				console.log(response);
			});

}

/*
Function to edit a product. returns a POST request to api /editproduct/:productId and a promise to update products list in localStorage.
Parameters:
product: object containing key/value pairs of product properties
id: comes from product property: productId
*/
ProductService.prototype.editProduct = function(product,id){
	console.log(product);
	console.log(id);
	var self = this;
    return this.api.request('/editproduct/' + id, product,'POST')
    .then(function(response){
    	
    	console.log(self.getProducts());

        console.log(response);
    });
}

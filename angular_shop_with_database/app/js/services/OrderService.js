app.service('OrderService', OrderService);

function OrderService(api) {
	this.api = api;
	// this.order = localStorage.getItem('order');
}

OrderService.prototype.confirmOrder = function(order) {
	// Recording an order to the backend via api
	// return an order

	return this.api.request('/record_order', order, 'POST')
	.then(function(response){
		// console.log(response);
	},function(response){
		// console.log(response);
	});
}

OrderService.prototype.setOrder = function(order){
	//store the products in local storage so you don't have to make an API
	//request each time you are on this page.
	this.order = JSON.stringify(order);
	localStorage.setItem('order',this.order);
}

OrderService.prototype.retrieveOrders = function(){
	var self = this;
	return this.api.request('/retrieve_orders/', {}, 'GET');
}

OrderService.prototype.getOrders = function(){
	var self = this;
	//if there are no products stored in localStorage
	//grab them from the API,store them in localStorage
	//and pass back the products as a promise
	// if(this.order == null){
		return this.retrieveOrders().then(function(response){
				
				self.setOrder(response.data);
				
				return response.data;
		   });
}

OrderService.prototype.getOrder = function(id){
	var self = this;

	return this.api.request('/retrieve_order/' + id,{},'GET').then(function(response){
		return response.data;
	})
}




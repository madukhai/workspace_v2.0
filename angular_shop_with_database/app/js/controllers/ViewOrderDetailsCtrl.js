app.controller('ViewOrderDetailsCtrl',ViewOrderDetailsCtrl);
function ViewOrderDetailsCtrl($location,OrderService,$routeParams){
	this.location = $location;
	this.OrderService = OrderService;
	this.routeParams = $routeParams;
	this.orderid = $routeParams.orderid;
	// this.orders = orders;
	this.getOrder();


}
ViewOrderDetailsCtrl.prototype.getOrder = function(){
	var path_array = this.location.path().split('/:');
    var id = path_array[path_array.length - 1];
    console.log(id);
    for(var i=0;i<this.orders.length;i++){
        if(this.orders[i].orderId == id){
            return this.orders[i];
        }
    }
}
ViewOrderDetailsCtrl.prototype.goBack = function(){
	this.location.path('/view_orders');
}


ViewOrderDetailsCtrl.prototype.getOrder = function(){
	var self = this;
	this.OrderService.getOrder(this.orderid).then(function(response){
		// console.log(response);
		self.order = response[0];
		self.cart = JSON.parse(self.order.cart);
	});
}
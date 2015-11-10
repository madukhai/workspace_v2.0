app.controller('ViewOrderCtrl', ViewOrderCtrl);

function ViewOrderCtrl(OrderService,$location,$routeParams,orders){
    this.location = $location;
    this.orderId = $routeParams.orderId;
    this.OrderService = OrderService;
    this.orders = orders;
    
}
ViewOrderCtrl.prototype.goBack = function(){
	this.location.path('/admin');
}


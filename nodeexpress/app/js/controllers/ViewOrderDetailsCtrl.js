app.controller('ViewOrderDetailsCtrl',ViewOrderDetailsCtrl);
function ViewOrderDetailsCtrl(orders,$location){
	this.location = $location;
	this.orders = orders;
	this.order = this.getOrder();
	this.cart = JSON.parse(this.order.cart);
	console.log(this.cart);
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
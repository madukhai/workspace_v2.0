app.controller('CheckOutCtrl',CheckOutCtrl);
function CheckOutCtrl($modalInstance, order, OrderService,productService,$uibModal){
	this.$modalInstance = $modalInstance;
	this.order = order;
	this.OrderService = OrderService;
	this.productService	= productService;
	this.$uibModal = $uibModal;
	console.log(this.order);
}




CheckOutCtrl.prototype.confirmOrder = function() {
	console.log(this.order);
	
	for(var i=0; i<this.order.cart.length;i++){
		
		this.order.cart[i].quantity -= this.order.cart[i].amount;
		
		var request_body = {
        name:this.order.cart[i].name,
        description:this.order.cart[i].description,
        price:this.order.cart[i].price,
        category:this.order.cart[i].category,
        quantity:this.order.cart[i].quantity,
        status:this.order.cart[i].status,
        image:this.order.cart[i].image
    }
		console.log(request_body);
		this.productService.editProduct(request_body, this.order.cart[i].productid);
		
	}
	console.log(this.order);
	
	this.OrderService.confirmOrder(this.order);
	
	for(var j=0; j<this.order.cart.length;j++){
		this.order.cart[j].amount = 0;
	}
	
	this.$modalInstance.close();
};

CheckOutCtrl.prototype.backToCart = function(){
	var self = this;
	var options = {
    animation:true,
    templateUrl: 'templates/cart.html',
    controller: 'CartCtrl as Ctrl',
    resolve: {
      cart: function(){
         return self.order.cart;
      }
    }
  }
  this.$modalInstance.close();
  this.$modalInstance = this.$uibModal.open(options);
}

CheckOutCtrl.prototype.close = function(){

	this.$modalInstance.close();
}
app.controller('CartCtrl',CartCtrl);

function CartCtrl($uibModal, $modalInstance,cart){
	this.$uibModal = $uibModal;
	this.$modalInstance = $modalInstance;
	this.cart = cart;
	// console.log(this.cart);
	

	this.order = {};
	this.total = 0;
	this.tax = 0;
	this.final_total = 0;
	this.upgradeCart();
	
}



CartCtrl.prototype.checkOut = function(){
	var self = this;

	this.order = {
		cart: self.cart,
		total: self.total,
		tax: self.tax,
		final_total: self.final_total
	}

  	var options = {
	    animation:true,
	    templateUrl: 'templates/checkout.html',
	    controller: 'CheckOutCtrl as Ctrl',
	    resolve: {
	    	order: function(){
	    		return self.order;
	    	}
	    }
  	}
  	// reset cart;
  	this.cart = [];
  	this.total = 0;
  	this.tax = 0;
  	this.final_total = 0;



  	this.$modalInstance.close();
  	this.modalInstance = this.$uibModal.open(options);
  	
}
CartCtrl.prototype.close = function(){
	this.$modalInstance.close();
}




CartCtrl.prototype.upgradeCart = function(){
	// add total,tax,final.
	if(this.cart.length != 0){
		this.total = 0;
		for(var i=0; i < this.cart.length; i++){
			this.total += parseInt(this.cart[i].price)*this.cart[i].amount;
		}
		this.tax = this.total*TAX_RATE;
		this.final_total = this.tax + this.total;
	}
}


CartCtrl.prototype.updateAmount = function (procedure, product){
	if (procedure == "addition"){
		product.amount += 1;
	}
	if (procedure == "subtraction"){
		product.amount -= 1;
	}
	this.upgradeCart();    
}





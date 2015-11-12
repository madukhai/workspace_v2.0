app.controller('MainCtrl',MainCtrl);

function MainCtrl(productService, $uibModal,products){
	back_setting();
	this.productService = productService;
	this.$uibModal = $uibModal;
	this.products = products;
  console.log(this.products);
  this.curPage = 0;
  this.productsPerPage = 6;
  
  console.log(this.products.length);

  this.categoryOptions = [
    {label: "All", categoryFilter: ""},
    {label: "Weapons", categoryFilter : "Weapon"},
    {label: "Concealables", categoryFilter : "Undercover"},
    {label: "Vehicles", categoryFilter : "Vehicle"}
  ]

  this.categoryOption = this.categoryOptions[0];
}




MainCtrl.prototype.getVideoHeight = function (){
	var video = angular.element('body').context.children[0].children[1].children[0].children[2];
	return angular.element(video)[0].clientHeight;
}

MainCtrl.prototype.getNumPages = function(){
  return Math.ceil(this.products.length/this.productsPerPage);
}

MainCtrl.prototype.openLogin = function(){
	var self = this;
  var options =  {
    animation: true,
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl as Ctrl',
    
  }
  this.modalInstance = this.$uibModal.open(options);

  
}

MainCtrl.prototype.openCart = function(){
  var self = this;
  self.clearCart();
  var options = {
    animation:true,
    templateUrl: 'templates/cart.html',
    controller: 'CartCtrl as Ctrl',
    resolve: {
      cart: function(){
         return self.cart;
      }
    }
  }

  this.modalInstance = this.$uibModal.open(options);

}

MainCtrl.prototype.cart = [];

MainCtrl.prototype.addToCart = function(product){
  var index = findProduct(this.cart,product);
  
  if(index == -1 && product.amount != 0){
    
    if(product.amount == undefined){
      product.amount = 1;
    }
    
    this.cart.push(product);
    
  }else{
    this.cart[index].amount += product.amount;
  }
  
}

MainCtrl.prototype.clearCart = function(){
    var new_cart = []
    for(var i=0;i<this.cart.length;i++){
      if(this.cart[i].amount > 0){
        new_cart.push(this.cart[i]);
      }
    }
    this.cart = new_cart;
  }



MainCtrl.prototype.showMoreDetails = function(product){
  
  var options = {
    animation:true,
    templateUrl: 'templates/productDetails.html',
    controller: 'DetailsCtrl as Ctrl',
    resolve: {
      product: function(){
         return product;
      }
    }
  }
  this.modalInstance = this.$uibModal.open(options);
}



function findProduct(cart, product){
 
  var index = -1;
  if(cart.length != 0){
   for(var i=0;i<cart.length;i++){
    if(product.productId == cart[i].productid){
      index = i;
      break;
      }
    }
  }
  return index;
}

function back_setting(){
  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 250,
    variance: 1,
    stroke_width: 2,

    // color_function : function(x, y) {
    //     return "#1b1b1b";
    //   }
  }).svg(); // Render as SVG.
  
  // Add pattern to DOM.
  var svg = angular.element(pattern);

  var container = angular.element('body').context.children[0].children[1].children[0].children[0];

  


  
  angular.element(container).append(svg);
}


	










// var gun1 = {
// 	name:'Russian SKS Semi-Auto Rifle w/ Laminate Stock',
// 	description:'• Top-quality Russian-manufactured SKS rifles\n Durable laminated wood stock\n Original factory blueing\nThese are some of the best looking SKS rifles we have come across in a long time. Don’t be misled by other SKS rifles on the market, these rifles are individually hand-picked and represent the best, top-quality SKS rifles manufactured in Russia. These premium rifles feature original factory blueing, durable laminated wood stock, 5-shot top-feed magazine with hinged floor plate and a 20” barrel with folding bayonet. Includes cleaning kit, oil bottle and sling.\nCaliber: 7.62x39mm.\nWARNING: Cleaning and removal of oil from all parts will be required to ensure safe and reliable operation.\nNOTE: Due to the varying condition of SKS surplus rifles condition, colouring and finish of the stock will vary.',
// 	price:229.99,
// 	category:['Rifle','Firearms'],
// 	quantity:50,
// 	status:'active'
// 	}

// var gun2 = {
// 	name:'Sig Sauer 1911- 45 ACP Desert',
// 	description: 'The legendary 1911 design has been brought into the 21st century with the refinement today’s shooters demand.',
// 	price:949.95,
// 	category:['Handgun','Firearms'],
// 	quantity:50,
// 	status:'active'
// }

// var gun3 = {
// 	name:'Remington - 870 Express 20Ga ($384.95 After Mail in Rebate)',
// 	description:'The Remington 870 Express synthetic pump shotguns have non-binding twin action bars for smooth, easy operation. Strong lock-up of breech bolt lug in to a massive barrel extension. Features a non-reflective matte black synthetic stock',
// 	price:409.99,
// 	category:['Shotgun','Firearms'],
// 	quantity:50,
// 	status:'active'
// }
// var gun4 = {
// 	name:'MagPul - PMAG 5/20 AR/M4 GEN M3, 5.56x45 Magazine',
// 	description:'Rifle Magazine, 5.56x45 NATO/.223 Remington 5/20 Round Capacity, Impact/Dust Cover Slimline Floorplate, Marking Matrix Over-Travel Insertion Stop',
// 	price:19.95,
// 	category:['Magazine','Accessory'],
// 	quantity:200,
// 	status:'active'
// }
// var gun5 = {
// 	name:'Federal AE 50 BMG 660 gr 100 Rounds (10 boxes)',
// 	description:'50 BMG',
// 	price:479.99,
// 	category:['Bullet','Amution'],
// 	quantity:500,
// 	status:'active'
// }


// MainCtrl.prototype.products = [gun1,gun2,gun3,gun4,gun5];


















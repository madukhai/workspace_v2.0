app.controller('EditProductCtrl',EditProductCtrl);

//could you reuse productCtrl to control edit_product.html?

function EditProductCtrl(productService,$location,$routeParams,products){
    this.location = $location;
    this.productId = $routeParams.productId;
    // this.name = this.product.name;
    this.products = products;
    // console.log(this.products);
    //services
    this.productService = productService;
   
    // console.log(this.productId);
    this.product = this.getProduct();
    console.log(this.product);

}

EditProductCtrl.prototype.getProduct = function() {
    
    for(var i=0;i<this.products.length;i++){
        if(this.products[i].productId == this.productId){
            return this.products[i];
        }
    }
  // return this.products.filter(function(product) {
  //   return product.productId === id})[0];
  //loops through the entire localStorage.products array. It then puts all the objects into a new array that fit the requirements that equal the 'id'. This will only ever return one object. the [0] sercurity buffer. If more than one product has the same id, it will only put the first product with the id into the array.
}

EditProductCtrl.prototype.editProduct = function(){
    var self = this;
    
    // console.log(this.product.image);
    var request_body = {
        name:this.product.name,
        description:this.product.description,
        price:this.product.price,
        category:this.product.category,
        quantity:this.product.quantity,
        status:this.product.status,
        image:this.product.image
    }
    
    // console.log(request_body);
    // console.log(this.productId);
    this.productService.editProduct(request_body, this.productId);
    // this.products = this.productService.getProducts();
    // console.log(this.products);

    // .then(self.productService.getProducts());

    this.location.path('/admin');
}


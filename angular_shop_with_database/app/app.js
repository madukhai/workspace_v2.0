
var TAX_RATE = 0.13;


var app = angular.module('ShopApp',['ngRoute','ui.bootstrap','ngMessages']);


app.config(function($routeProvider,$httpProvider){

	$routeProvider.when('/',{
		templateUrl:'templates/home.html',
		controller:'MainCtrl as Ctrl',
		resolve:{
			products: function(productService){
				// console.log(productService.getProducts());
				return productService.getProducts();
			}
		}
	})
	
	.when('/admin',{
		templateUrl:'templates/admin.html',
		controller:'AdminCtrl as Ctrl',
		resolve:{
			path:function($location){
					// console.log(localStorage.getItem('authToken'));
					if(localStorage.getItem('authToken') == null){
						
						
						$location.path('/login');
					}
					
				},
			products:function(productService){
					// console.log(productService.getProducts());

					return productService.getProducts();
				}
			}
	})
	.when('/add_product',{
		templateUrl:'templates/add_product.html',
		controller:'ProductCtrl as Ctrl'
	})

	.when('/view_orders',{
		templateUrl:'templates/view_orders.html',
		controller:'ViewOrderCtrl as Ctrl',
		resolve:{
			orders:function(OrderService){
				return OrderService.getOrders();
			}
		}
	})
	.when('/view_orders/:orderid',{
		templateUrl:'templates/view_order_details.html',
		controller: 'ViewOrderDetailsCtrl as Ctrl',
		// resolve:{
		// 	order:function(OrderService){
		// 		return OrderService.getOrder(orderid);
		// 	}
		// }
	})
    .when('/edit_product/:productId',{
        templateUrl:'templates/edit_product.html',
        controller: 'EditProductCtrl as Ctrl',
        resolve:{
            path:function($location){
                if(localStorage.getItem('authToken') == null){
                    $location.path('/login');
                }
            },
            products:function(productService){
 
                return productService.getProducts();
            }
        }
    })
    
	.otherwise({
		redirectTo:'/'
	});

	$httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if (localStorage.authToken) {
          config.headers.Authorization = localStorage.authToken;
        }
        return config;
      }
    };
  });
});
 











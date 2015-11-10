var app = angular.module('myApp',['ngAnimate']);
// app.config(['$httpProvider', function($httpProvider){
// 	$httpProvider.defaults.useXDomain = true;
// 	delete $httpProvider.defaults.headers.common['X-Requested-With'];
// 	}
// ]);
function AppCtrl($http, $interval){
	this.searchTag = "";
	this.$http = $http;
	this.images = [];
	this.$interval = $interval;
	this.marginUp = 0;
	this.myStyle = {};
}
app.controller('AppCtrl',  AppCtrl);

AppCtrl.prototype.results = [];

AppCtrl.prototype.showResult = function() {
	
	this.results = [];
	this.instagram_api(this.searchTag, this.$http);
};

AppCtrl.prototype.search = function(){
	//search images by tag.
};

AppCtrl.prototype.instagram_api = function (tag, $http){
	    var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=61f8b631abd34732a3bcd8c73d0d73a9&callback=JSON_CALLBACK";
	   	var that = this;
	    $http.jsonp(url).then(function successCallback(response) {
	            var collections = [];
	           
	            
	            that.load_more(response.data,collections,$http);

	            // this callback will be called asynchronously
	            // when the response is available
	        }, function errorCallback(response) {
	        	 console.log(response.data);
	        	 console.log('----1');
	            //console.log(response);
	            // called asynchronously if an error occurs
	            // or server returns response with an error status.
	           
	        });
	
	
};

AppCtrl.prototype.load_more = function (imgsObj,collections,$http){
	 var url = imgsObj.pagination.next_url + "&callback=JSON_CALLBACK";
	 var that = this;
	$http.jsonp(url).then(function successCallback(response){
			/* PLACE FUNCTION HERE */
			if(collections.length <50){
				collections = collections.concat(response.data.data,collections);
				that.load_more(response.data,collections,$http);
			}else{
				that.images_response(collections);
			}	
		},
		function errorCallback(response){
			console.log('----2');
			console.log(response);	
		});
	

};


AppCtrl.prototype.animate = function(){
	console.log(this.marginUp);
	var that = this;
	// this.$interval(function(){
 //    	// animate scrolling up;
 //    	that.marginUp -= 10;
 //    	var marginTop = that.marginUp + 'px';
 //    	that.myStyle = {'top': that.marginUp };
    	
 //  	},100);
	$animate.on('move', container,
   		function callback(element, start) {
     // cool we detected an enter animation within the container
   		}
	);

}

AppCtrl.prototype.images_response = function (collections){
	this.images = [];
	for(var i=0; i<collections.length;i++){
		if(this.images.indexOf(collections[i].images.standard_resolution.url) == -1){
			this.images.push(collections[i].images.standard_resolution.url);
			console.log(collections[i].images.standard_resolution.url);
		}
	}
	this.animate();
	
	
	// var images = [];
	
	// for(var i=0; i<data.length;i++){
	// 	for(var j=0;j<data[i].data.length;j++){
	// 		images.push(data[i].data[j]);
	// 	}
	// }
	
	// for(image in images){
	
	// 	// 
	// 	var html = "";
	// 	html +=' <svg width="600" height="600">';
	// 	html +='  <defs>'
	// 	html +='      <pattern id="imgpattern' + images[image].id + '" x="0" y="0" width="2" height="2">';
	// 	html +='        <image width="500" height="500"';	  
	// 	html +='               xlink:href="'+ images[image].images.standard_resolution.url +'"/>';
	// 	html +='      </pattern>';
	// 	html +='  </defs>';
	// 	html +=' </svg>';
	// 	$('#instagram-pics').append(html);
	// }
	// var temp_containers = $('#instagram-pics')[0].children;
	
	// var path_container = $("#image-container svg")[0].children;
	
	// var counter = 0;
	
	// $('path').each(function(){
	
	// 	if(counter < temp_containers.length){
	// 		// get patternid.
	// 		var patternId = $(temp_containers[counter]).find('pattern')[0].getAttribute('id');
			
	// 	}else{
	// 		var patternId = $(temp_containers[counter-temp_containers.length]).find('pattern')[0].getAttribute('id');
	// 	}
	// 	patternId = "url(#" + patternId + ")";		
	// 		// 	// connect to path fill;		
	// 	$(this).attr('fill',patternId);
	// 	counter++;
	// });	
}

	//enable listeners
// back_setting();
// $('#tag-search').submit(function(event){
// 	event.preventDefault();
	
// 	$('#instagram-pics').empty();
// 	$("#image-container").stop(true, false);
// 	$("#image-container").css('top','0') ;
// 	instagram_api($(this));
	
// })


// $('#tag-search').keyup(function(event){
// 	event.preventDefault();
// 	$('.dropdown-menu').empty()
// 	instagram_search($(this));
// });
// $('.dropdown-menu').on('click',function(event){
	
// 	event.preventDefault();
// 	$('#tag-search').trigger('submit');
// });




// //global variable
// var animation ='';

// function instagram_api(frm){
// 	var search = frm.find('input[name="tag_search"]').val();
// 	/* PLACE FUNCTION HERE */
	
// 	ajax_call(search);
	
// }



// var scroll_images=function(){
// 	$('#image-container').animate({'top':'-=10'},100,function(){
		 
// 	});
	
// }
// function images_response(data){
	
// 	var images = [];
	
// 	for(var i=0; i<data.length;i++){
// 		for(var j=0;j<data[i].data.length;j++){
// 			images.push(data[i].data[j]);
// 		}
// 	}
	
// 	for(image in images){
	
// 		// 
// 		var html = "";
// 		html +=' <svg width="600" height="600">';
// 		html +='  <defs>'
// 		html +='      <pattern id="imgpattern' + images[image].id + '" x="0" y="0" width="2" height="2">';
// 		html +='        <image width="500" height="500"';
		  
// 		html +='               xlink:href="'+ images[image].images.standard_resolution.url +'"/>';
// 		html +='      </pattern>';
// 		html +='  </defs>';

		

// 		html +=' </svg>';
// 		$('#instagram-pics').append(html);
// 	}
// 	var temp_containers = $('#instagram-pics')[0].children;

	
// 	var path_container = $("#image-container svg")[0].children;
	
// 	var counter = 0;
	
// 	$('path').each(function(){
	
// 		if(counter < temp_containers.length){
// 			// get patternid.
// 			var patternId = $(temp_containers[counter]).find('pattern')[0].getAttribute('id');
			
// 		}else{
// 			var patternId = $(temp_containers[counter-temp_containers.length]).find('pattern')[0].getAttribute('id');
// 		}
// 		patternId = "url(#" + patternId + ")";		
// 			// 	// connect to path fill;
		
// 		$(this).attr('fill',patternId);
// 		counter++;



// 	});

	
	
// }

// function ajax_call(tag){



	
// 	$.ajax({
// 		url:"https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=client_id=61f8b631abd34732a3bcd8c73d0d73a9",
// 		type:'GET',
// 		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
// 		dataType:'jsonp',
// 		success:function(data){
// 			/* PLACE FUNCTION HERE */
// 			var collections = [];
// 			load_more(data,collections);
			
// 		},
// 		error:function(data){
// 			console.log(data);
// 		}	
// 	});
	
// }



// function load_more(imgsObj,collections){
// 	$.ajax({
// 		url: imgsObj.pagination.next_url,
// 		type:'GET',
// 		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
// 		dataType:'jsonp',
// 		success:function(data){
// 			/* PLACE FUNCTION HERE */
// 			if(collections.length <5){
// 				collections = collections.concat(data,collections);
// 				load_more(data,collections);
// 			}else{
// 				images_response(collections);
// 			}
			
			
// 		},
// 		error:function(data){
// 			console.log(data);
// 		}	
// 	});
	

// }



	
// function instagram_search(frm){
// 	var search = frm.find('input[name="tag_search"]').val();
// 	ajax_search(search);
// }


// function ajax_search(tag){

	
	
// 	var photos = {};
	
// 	$.ajax({
// 		url:"https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=client_id=61f8b631abd34732a3bcd8c73d0d73a9",
// 		type:'GET',
// 		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
// 		dataType:'jsonp',
// 		success:function(data){
// 			/* PLACE FUNCTION HERE */
// 			dropdown(data,tag);
// 		},
// 		error:function(data){
// 			console.log(data);
// 		}		
// 	});
	
// }

// function dropdown(data,tag){
// 	var results = data.data;
// 	var all_match = [];
//  	for(var result in results){
//  		for(var i =0; i< results[result].tags.length;i++){
//  			if(results[result].tags[i].slice(0,tag.length) == tag){
//  				if(all_match.indexOf(results[result].tags[i]) == -1){
//  					all_match.push(results[result].tags[i]);
//  				}
//  			};
//  		}
//  	}

//  	for(var j=0;j< all_match.length;j++){
//  		var html = ""
// 		html = "<li><a>" + all_match[j] + "</a></li>";
		
// 		$('.dropdown-menu').append(html);
		
//  	}
// }

//triangle....
// function back_setting(){
// 	var pattern = Trianglify({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     cell_size: 150,
//     variance: 1,
//     stroke_width: 1
//   }).svg(); // Render as SVG.

//   // Add pattern to DOM.
//   var container = document.querySelector('.trianglify');
//   container.insertBefore(pattern, container.firstChild);

// }


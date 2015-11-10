$(document).ready(function(){
	//enable listeners
	back_setting();
	$('#tag-search').submit(function(event){
		event.preventDefault();
		// $('.outlay').css('opacity','0.5');
		$('#instagram-pics').empty();
		$("#image-container").stop(true, false);
		$("#image-container").css('top','0') ;
		instagram_api($(this));
		
	})
	//load default page
	/*PLACE FUNCTION HERE THAT LOADS PICTURES ON PAGE LOAD */
	// back_setting();

	$('#tag-search').keyup(function(event){
		event.preventDefault();
		$('.dropdown-menu').empty()
		instagram_search($(this));
	});
	$('.dropdown-menu').on('click',function(event){
		
		event.preventDefault();
		$('#tag-search').trigger('submit');
	});


});

//global variable
var animation ='';

function instagram_api(frm){
	var search = frm.find('input[name="tag_search"]').val();
	/* PLACE FUNCTION HERE */
	
	ajax_call(search);
	
}



var scroll_images=function(){
	$('#image-container').animate({'top':'-=10'},100,function(){
		 // console.log($("#image-container").css('top'));
	});
	
}
function images_response(data){
	
	var images = [];
	// console.log(data);
	for(var i=0; i<data.length;i++){
		for(var j=0;j<data[i].data.length;j++){
			images.push(data[i].data[j]);
		}
	}
	
	for(image in images){
		// console.log(images[image]);
		// 
		var html = "";
		html +=' <svg width="600" height="600">';
		html +='  <defs>'
		html +='      <pattern id="imgpattern' + images[image].id + '" x="-1" y="-1" width="2" height="2">';
		html +='        <image width="500" height="500"';
		  // html +='               xlink:href="http://lorempixel.com/output/animals-q-c-640-480-2.jpg"/>';
		html +='               xlink:href="'+ images[image].images.standard_resolution.url +'"/>';
		html +='      </pattern>';
		html +='  </defs>';

		  // html +='  <path fill="url(#imgpattern)" stroke="black" stroke-width="4"';
		//   // html +='        d="M 100,50 L 120,110 150,90 170,220 70,300 50,250 50,200 70,100 50,70 Z" />';

		html +=' </svg>';
		$('#instagram-pics').append(html);
	}
	var temp_containers = $('#instagram-pics')[0].children;

	
	var path_container = $("#image-container svg")[0].children;
	// console.log(path_container);
	var counter = 0;
	// var pathes = [];
	$('path').each(function(){
	
		if(counter < temp_containers.length){
			// get patternid.
			var patternId = $(temp_containers[counter]).find('pattern')[0].getAttribute('id');
			
		}else{
			var patternId = $(temp_containers[counter-temp_containers.length]).find('pattern')[0].getAttribute('id');
		}
		patternId = "url(#" + patternId + ")";		
			// 	// connect to path fill;
		
		$(this).attr('fill',patternId);
		counter++;



	});

	
	
}

function ajax_call(tag){



	
	$.ajax({
		url:"https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=client_id=61f8b631abd34732a3bcd8c73d0d73a9",
		type:'GET',
		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
		dataType:'jsonp',
		success:function(data){
			/* PLACE FUNCTION HERE */
			var collections = [];
			load_more(data,collections);
			// back_setting();
		},
		error:function(data){
			console.log(data);
		}	
	});
	
}



function load_more(imgsObj,collections){
	$.ajax({
		url: imgsObj.pagination.next_url,
		type:'GET',
		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
		dataType:'jsonp',
		success:function(data){
			/* PLACE FUNCTION HERE */
			if(collections.length <5){
				collections = collections.concat(data,collections);
				load_more(data,collections);
			}else{
				images_response(collections);
			}
			
			// back_setting();
		},
		error:function(data){
			console.log(data);
		}	
	});
	

}



	
function instagram_search(frm){
	var search = frm.find('input[name="tag_search"]').val();
	ajax_search(search);
}


function ajax_search(tag){

	/* 
	complete the AJAX code block below to gather the 20 most recent photos with the tag 
	you searched for

	You can use the following client Id:
	client_id=61f8b631abd34732a3bcd8c73d0d73a9

	*/
	
	var photos = {};
	// console.log('---------1');
	$.ajax({
		url:"https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=client_id=61f8b631abd34732a3bcd8c73d0d73a9",
		type:'GET',
		data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
		dataType:'jsonp',
		success:function(data){
			/* PLACE FUNCTION HERE */
			dropdown(data,tag);
		},
		error:function(data){
			console.log(data);
		}		
	});
	
}

function dropdown(data,tag){
	var results = data.data;
	var all_match = [];
 	for(var result in results){
 		for(var i =0; i< results[result].tags.length;i++){
 			if(results[result].tags[i].slice(0,tag.length) == tag){
 				if(all_match.indexOf(results[result].tags[i]) == -1){
 					all_match.push(results[result].tags[i]);
 				}
 			};
 		}
 	}

 	for(var j=0;j< all_match.length;j++){
 		var html = ""
		html = "<li><a>" + all_match[j] + "</a></li>";
		// console.log(html);
		$('.dropdown-menu').append(html);
		
 	}
}


function back_setting(){
	var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cell_size: 200,
    variance: 0,
    stroke_width: 1
  }).svg(); // Render as SVG.

  // Add pattern to DOM.
  var container = document.querySelector('.trianglify');
  container.insertBefore(pattern, container.firstChild);

}


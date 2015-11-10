// header('content-type: application/json; charset=utf-8');
// header("access-control-allow-origin: *");


$(document).ready(function(){


	$('button').on('click', function(event){
		var stepId = $(this).attr('id');
		load_step(stepId);
	});
});






function load_step(step){

	$.ajax({
		url:'step/' + step + '.html',
		type:'GET',
		dataType:'html',
		success:function(data){
			$('#htmlEditor textarea').html(data);
		},
		error:function(data){
			console.log(data);
		}		
	});

	$.ajax({
		url:'step/' + step + '.css',
		type:'GET',
		dataType:'css',
		success:function(data){
			$('#cssEditor textarea').html(data);
		},
		error:function(data){
			console.log(data);
		}		
	});


	// var html = 'step/' + step + '.html';
	// var css = 'step/' + step + '.css';
	// var content_html = $('*').load(html);
	// var content_css = $('*').load(css);
	// console.log(content_html);
	// $('#htmlEditor textarea').html(content_html);
	// $('#cssEditor textarea').html(content_css);
}








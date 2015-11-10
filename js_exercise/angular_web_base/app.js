var app = angular.module('todoApp', []);

function TodoCtrl() {
  this.todos = [
    {text: 'learn angular', done: false},
    {text: 'write the content for the next module', done: false},
    {text: 'buy cheese', done: true}
  ];
  
  this.filters = [
    {label: 'All', showTodo: function(todo) {return true;}},
    {label: 'Active', showTodo: function(todo) {return !todo.done;}},
    {label: 'Complete', showTodo: function(todo) {return todo.done;}}
  ]
}

app.controller('TodoCtrl', TodoCtrl);

TodoCtrl.prototype.clickDisabled = false;

TodoCtrl.prototype.noComplete = function(){
	this.clickDisabled = !checkComplete(this.todos)[1];
	return this.clickDisabled;
}

TodoCtrl.prototype.addTodo = function(text){
	var todo = {};
	todo.text = this.text;
	todo.done = false;
	this.todos.push(todo);
	this.text = "";
	this.clickDisabled = true;
};


TodoCtrl.prototype.clearComplete = function(){


	this.todos = checkComplete(this.todos)[0];
	if(this.todos.length != 0){
		this.clickDisabled = true;
	}
	
};
function checkComplete(todos){
	var todo_list = [];
	var res = [];
	var have_complete = false;
	for(var i=0;i<todos.length;i++){
		if(!todos[i].done){
			todo_list.push(todos[i]);
			
		}else{
			have_complete = true;
		}
	} 
	res.push(todo_list);
	res.push(have_complete);
	return res;
}
function InsultCtrl(service) {
   
  
   this.service = service;
   this.insult = this.service.generateInsult();
}

angular.module('insultApp').controller('InsultCtrl',  InsultCtrl);



InsultCtrl.prototype.replaceInsult = function (){
	
	this.insult = this.service.generateInsult();;
	console.log(this.insult);
};







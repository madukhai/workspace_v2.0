app.controller('MainCtrl', MainCtrl);

function MainCtrl(api, fileService){
	this.api = api;
	this.fileService = fileService;
	this.files = this.fileService.getFiles(0);
}

MainCtrl.prototype.save = function(){
	this.fileService.saveFiles(this.files);
}

MainCtrl.prototype.goToStep = function(step){
	this.files = this.fileService.getFiles(step);
}






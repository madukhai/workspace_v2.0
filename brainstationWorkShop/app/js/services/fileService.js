function FileService(api){
	this.api = api;
}

angular.module('myApp').service('fileService', FileService);

FileService.prototype.getFiles = function(step) {
	// body...
	this.api.request(step,'','GET');


};


FileService.prototype.saveFiles = function(files) {

};












var app = angular.module('queen', []);

var QueenCtrl = function($interval) {
  var ctrl = this;

  
  ctrl.cells = [];
  ctrl.size = 8;
  ctrl.draw(0);
  ctrl.queens = [];
  ctrl.headqueen;
  ctrl.queens_num = 0;

}

QueenCtrl.prototype.draw = function(index){
  
  for(var i = index; i< this.size;i++){
    var row = [];
    for(var j = 0; j< this.size;j++){
      row.push({'queen': false, 'position': [i,j], 'avaliable' : true});
    }
    if(this.cells[i] == []){
      this.cells.push(row);
    }else{
      this.cells[i] = row;
    }
    
  }
  
}

app.controller('QueenCtrl', QueenCtrl);

QueenCtrl.prototype.checkAvaliable = function(cell){



  if(cell.avaliable == true){
    var node_cell = new NodeCell(cell);
    if( this.queens_num == 0 ){
      this.headqueen = node_cell;
    }




    cell.queen = true;
    cell.avaliable = false;
    this.queens_num++;
    this.queens.push(cell);

    this.checkHelper(cell);
    
    
  }else if (cell.queen){
    cell.queen = false;
    cell.avaliable = true;
    this.queens_num--;
    this.queens.pop();
    
      this.draw(0);
      for(var k=0;k<this.queens_num;k++){
        this.checkHelper(this.queens[k]);
      }
    
    
  }
  
  return false;  

  
}


QueenCtrl.prototype.checkHelper = function (cell){
  for(var i = cell.position[0]; i< this.size;i++){

      for(var j = 0; j< this.size;j++){
        if(i == cell.position[0]){
          this.cells[i][j].avaliable = false;
        }else if(j == cell.position[1]){
          this.cells[i][j].avaliable = false;
        }else if ((i-j) == (cell.position[0] - cell.position[1]) ){
          this.cells[i][j].avaliable = false;
        }else if ( (i+j) == (cell.position[0] + cell.position[1]) ){
          this.cells[i][j].avaliable = false;
        }
      }
    }
}

QueenCtrl.prototype.check = function(node_cell){
  
  node_cell.cell.avaliable = false;
  this.queens++;
  for(var i = node_cell.cell.position[0]; i< this.size;i++){
    
    for(var j = 0; j< this.size;j++){
      if(i == node_cell.cell.position[0] || j == node_cell.cell.position[1] || (i-j) == (node_cell.cell.position[0] - node_cell.cell.position[1]) || (i+j) == (node_cell.cell.position[0] + node_cell.cell.position[1]) ){
        this.cells[i][j].avaliable = false;
      }else if( i == (node_cell.cell.position[0] + 1) ){
        node_cell.cell.queen = true;
      }
    }
  }





}









QueenCtrl.prototype.cleared = false;
QueenCtrl.prototype.clear = function(){

  this.cells = [];
  
  for(var i=0;i<this.size;i++){
    var row = [];
    for(var j=0;j<this.size;j++){
      row.push({alive:false});
    }
    this.cells.push(row);
  }
  this.cleared = true;
  this.isPaused = true;
}

QueenCtrl.prototype.isPaused = false;

QueenCtrl.prototype.switch = function(){
  if(this.isPaused){
    this.isPaused = false;
    if(this.cleared){
      this.randomize();
    }
  }else{
    this.isPaused = true;
  }
}
function NodeCell(cell){
  this.cell = cell;
  this.next = [];
  this.addNext = function(cell){
    this.next.push(cell);
  } 
  this.popLast = function(){
    this.next.pop();
  }
}



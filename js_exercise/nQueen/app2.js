var app = angular.module('queen', []);

var QueenCtrl = function($interval) {
  
  this.cells = [];
  this.size = 5;
  this.draw();
  
  this.headqueen;
  this.queens_num = 0;
  this.queens = [];
  this.route = null;
  this.lastNode = null;
  
}

function Node(){
  this.position = [];
  this.children = [];
  this.next = null;
  this.avaliable = true;
  this.depth = 0;
  this.queen = false;
  this.length = 0;
  this.change = false;
  this.prev = null;
  // this.addChild = function(node){
  //   this.children.push(node);
  // }
  // this.popChild = function(){
  //   return this.children.pop();
  // }
}

QueenCtrl.prototype.draw = function(){
    for(var i = 0; i< this.size;i++){
      var row = [];
      for(var j = 0; j< this.size;j++){
        var node = new Node();
        // asign position to each node;
        node.position.push(i);
        node.position.push(j);
        row.push(node);
      }
      this.cells.push(row);
  }
};

QueenCtrl.prototype.switchQueen = function(node){
  if(node.avaliable){
    node.queen = true;
    node.avaliable = false;
    this.queens.push(node);
    // do something about depth here;
     for(var i = 0; i< this.size;i++){
      for(var j = 0; j< this.size;j++){
        if(i == node.position[0]){
          this.cells[i][j].avaliable = false;
        }else if(j == node.position[1]){
          this.cells[i][j].avaliable = false;
        }else if ((i-j) == (node.position[0] - node.position[1]) ){
          this.cells[i][j].avaliable = false;
        }else if ( (i+j) == (node.position[0] + node.position[1]) ){
          this.cells[i][j].avaliable = false;
        }
      }

    }
    
  }else if(node.queen){
    // reset part of it;
    
    node.queen = false;
    node.avaliable = true;
    this.queens.pop();
    this.cells = [];
    this.draw();
    if(this.queens.length == 0){
      
      
    }else{
      
      for(var n=0; n<this.queens.length;n++){
        this.cells[this.queens[n].position[0]][this.queens[n].position[1]].queen = true;
        for(var i = 0; i< this.size;i++){
          for(var j = 0; j< this.size;j++){
            
            if(i == this.queens[n].position[0]){
              this.cells[i][j].avaliable = false;
            }else if(j == this.queens[n].position[1]){
              this.cells[i][j].avaliable = false;
            }else if ((i-j) == (this.queens[n].position[0] - this.queens[n].position[1]) ){
              this.cells[i][j].avaliable = false;
            }else if ( (i+j) == (this.queens[n].position[0] + this.queens[n].position[1]) ){
              this.cells[i][j].avaliable = false;
            }
          }
        }
      }
    }  
  }
 
}
QueenCtrl.prototype.findRoute = function (node) {
  // body...
   
  this.switchQueen(node);
  if(this.route == null){
    this.route = node;
    this.lastNode = node;

  
  }else{
    this.lastNode.next = node;
    node.prev = this.lastNode;
    this.lastNode = node;
  }
  this.route.length++;


  // console.log(this.queens);
  //   console.log(this.route.position);
  //    console.log(this.lastNode.position);
     
     console.log('------');
  



  if (this.route.length == this.size){
    var cur = this.route;

    while(cur != null){
      cur.avaliable = true;
      
      this.switchQueen(cur);
      cur.change = true;
      
      cur = cur.next;

    }

    return true;
  }else{
    // check next line.
   
    var y = this.lastNode.position[0] + 1;
     
    var canGo = false;
    for(var i=0;i<this.size;i++){
      if(this.cells[y][i].avaliable){
          canGo = true;
          this.lastNode.children.push(this.cells[y][i]);
      }
    }
    // no avaliable move return false;
    if(canGo == false){
      console.log('------2');
       this.route.length--;
       this.lastNode.prev.next = null;
       this.lastNode = this.lastNode.prev;
       var cur = this.route;
      while(cur != null){
        console.log(cur);
        cur = cur.next;
      }

       // this.lastNode.avaliable = false;
      //  var temp = this.lastNode;
      //  var new_last = this.lastNode.prev;;
      //  this.lastNode = null;
      //  this.lastNode = new_last;
      // this.findRoute(this.lastNode);
      
      // var temp = clone_node(this.lastNode);
      //  var new_last = clone_node(this.lastNode.prev);
      // this.lastNode = null;
      // this.cells[temp.position[0]][temp.position[1]] = temp;
      // temp.avaliable = false;
      // this.lastNode = new_last;
      // console.log(this.lastNode.position);
      this.findRoute(this.lastNode);
      // return false;

      
      

    }else{
      console.log('------3');
      for(var j=0; j< this.lastNode.children.length;j++){
        this.findRoute(this.lastNode.children[j]); 




      }
      // this.findRoute(this.lastNode);
      // console.log(this.lastNode.queen);
       return false;



    }

    // for(var i=0;i<this.size;i++){
    //   if(this.cells[y][i].avaliable){
    //     if(canGo == false){
    //       canGo = this.findRoute(this.cells[y][i]);
    //     }else{

    //     }
          
    //   }
    // }
    



  }





}

function clone_node(node){
  var res = new Node();
  // this.position = [];
  // this.children = [];
  // this.next = null;
  // this.avaliable = true;
  // this.depth = 0;
  // this.queen = false;
  // this.length = 0;
  // this.change = false;
  for(prop in node){
      res[prop] = node[prop];   
  }
  this.next = null;
  return res;
}
// function rebuild_route(node, length){
//   var cur = node;
//   var new_node = clone_node(cur);
//   var res = new_node;
//   var i = 0;
//   while(i < length){
//     cur = cur.next;
//     new_node.next = cur;
//     new_node = new_node.;
//     i++
//   }
// }




// QueenCtrl.prototype.checkAvaliable = function(cell){



//   if(cell.avaliable == true){
//     var node_cell = new NodeCell(cell);
//     if( this.queens_num == 0 ){
//       this.headqueen = node_cell;
//     }




//     cell.queen = true;
//     cell.avaliable = false;
//     this.queens_num++;
//     this.queens.push(cell);

//     this.checkHelper(cell);
    
    
//   }else if (cell.queen){
//     cell.queen = false;
//     cell.avaliable = true;
//     this.queens_num--;
//     this.queens.pop();
    
//       this.draw(0);
//       for(var k=0;k<this.queens_num;k++){
//         this.checkHelper(this.queens[k]);
//       }
    
    
//   }
  
//   return false;  

  
// }


// QueenCtrl.prototype.checkHelper = function (cell){
//   for(var i = cell.position[0]; i< this.size;i++){

//       for(var j = 0; j< this.size;j++){
//         if(i == cell.position[0]){
//           this.cells[i][j].avaliable = false;
//         }else if(j == cell.position[1]){
//           this.cells[i][j].avaliable = false;
//         }else if ((i-j) == (cell.position[0] - cell.position[1]) ){
//           this.cells[i][j].avaliable = false;
//         }else if ( (i+j) == (cell.position[0] + cell.position[1]) ){
//           this.cells[i][j].avaliable = false;
//         }
//       }
//     }
// }

// QueenCtrl.prototype.check = function(node_cell){
  
//   node_cell.cell.avaliable = false;
//   this.queens++;
//   for(var i = node_cell.cell.position[0]; i< this.size;i++){
    
//     for(var j = 0; j< this.size;j++){
//       if(i == node_cell.cell.position[0] || j == node_cell.cell.position[1] || (i-j) == (node_cell.cell.position[0] - node_cell.cell.position[1]) || (i+j) == (node_cell.cell.position[0] + node_cell.cell.position[1]) ){
//         this.cells[i][j].avaliable = false;
//       }else if( i == (node_cell.cell.position[0] + 1) ){
//         node_cell.cell.queen = true;
//       }
//     }
//   }





// }









// QueenCtrl.prototype.cleared = false;
// QueenCtrl.prototype.clear = function(){

//   this.cells = [];
  
//   for(var i=0;i<this.size;i++){
//     var row = [];
//     for(var j=0;j<this.size;j++){
//       row.push({alive:false});
//     }
//     this.cells.push(row);
//   }
//   this.cleared = true;
//   this.isPaused = true;
// }

// QueenCtrl.prototype.isPaused = false;

// QueenCtrl.prototype.switch = function(){
//   if(this.isPaused){
//     this.isPaused = false;
//     if(this.cleared){
//       this.randomize();
//     }
//   }else{
//     this.isPaused = true;
//   }
// }
// function NodeCell(cell){
//   this.cell = cell;
//   this.next = [];
//   this.addNext = function(cell){
//     this.next.push(cell);
//   } 
//   this.popLast = function(){
//     this.next.pop();
//   }
// }

app.controller('QueenCtrl', QueenCtrl);

// create global varaibles
let cellSize = 100;
let cellGap = 3;
let grid = [];


function setup() {
  //create the canvas and the canvas.id for html
  var canvas = createCanvas(900,600);
  canvas.id("canvas1");
}


function draw() {
  background(255);


  // fill the grid
  x = cellSize;
  while( x < width){
    line(x, 0, x, height);
    x = x + cellSize;
  }

  y = cellSize;
  while( y < height){
    line(0, y, width, y);
    y = y + cellSize;
  }

  //condition background
  fill(250,128,120);
  rect(0,0, width, cellSize);

}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  display(){
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
}

// set up the defender class
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.shoot = false;
    this.health = 100;
    this.projectiles = [];
    this.frequency = 0;
  }

  show(){
    fill(250,50,50);
    rect(this.x, this.y, this.height, this.width);
    text("DEF: ", this.health,  this.x + 50, this.y +50);
  }
}

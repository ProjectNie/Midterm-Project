// create global varaibles
let cellSize = 100;
let cellGap = 3;
let grid = [];
let defender = [];
let enemy = [];
let defMove = false;


function setup() {
  //create the canvas and the canvas.id for html
  var canvas = createCanvas(900,600);
  canvas.id("canvas1");

  rectMode(CENTER);
  // for loop to create the grid array
  for (let y = cellSize; y < canvas.height; y += cellSize){
    for( let x = 0; x < canvas.width; x += cellSize){
      grid.push(new Cell(x,y));
    }
  }
}

function draw() {
  background(255);

  //grid handler
  for (let i = 0; i < grid.length; i ++){
    grid[i].display();
  }

  for (let i = 0; i < defender.length; i ++){

    defender[i].show();
    //console.log(dist(mouseX, mouseY, defender[i].x, defender[i].y));
  }

  //create the for loop for robot array
  if (frameCount % 220 == 0){
    enemy.push(new Enemy(random(900, 1000), 250));
  }

  //condition background
  fill(100,128,220);
  rect(width/2,50, width, cellSize);

  for (let i = 0; i < enemy.length; i ++){
    enemy[i].show();
    enemy[i].move();
  }



}


function mousePressed(){

  if (dist(mouseX, mouseY, Cell.x, Cell.y)<10){
    defender.push(new Defender(mouseX, mouseY));
  }

}



class Cell {
  constructor(x, y) {
    this.x = x+50;
    this.y = y+50;
    this.width = cellSize;
    this.height = cellSize;
  }

  display(){
    fill(200);
    rect(this.x, this.y, this.width, this.height);
    fill(125);
    ellipse(this.x, this.y, 5, 5);
  }



}

// set up the defender class
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize-25;
    this.height = cellSize-25;
    this.shoot = false;
    this.health = 100;
    this.projectiles = [];
    this.frequency = 0;
  }

  show(){
    fill(250,50,50);
    rect(this.x, this.y, this.height, this.width);
    fill(255);
    text("DEFENDER: ", this.x - 35, this.y);
  }

  shot(){

  }

}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize-25;
    this.height = cellSize-25;
    this.veloctiy = -0.5;
    this.health = 200;
    this.frequency = 0;
  }

  show(){
    fill(100,200,50);
    rect(this.x, this.y, this.height, this.width);
  }

  move(){
    this.x += this.veloctiy;
  }
}

class Plant {
  constructor(x, y, money, health, damage) {
    this.x = x;
    this.y = y;
    this.money = money;
    this.health = health;
    this.dmg = damage;
  }

  show(){

  }
}

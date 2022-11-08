// create global varaibles
let cellSize = 100;
let cellGap = 3;
let grid = [];
let defender = [];
let enemy = [];
let defMove = false;
let row1 = 150;
let row2 = 250;
let row3 = 350;
let row4 = 450;
let row5 = 550;
let enemycon;
let rowTotal = [row1, row2, row3, row4, row5];
let shovel, sun, shovelImage, sunImage;
let sunTotal = [];
let totalEnergy = 0;

function preload() {
  // load the sun and shovel
  shovelImage = loadImage('images/shovel.png');
  sunImage = loadImage('images/sun.png');
}

function setup() {
  //create the canvas and the canvas.id for html
  var canvas = createCanvas(900, 600);
  canvas.id("canvas1");

  //create new enemy controller

  enemycon = new enemyController();

  rectMode(CENTER);
  let cellCount = 1;
  // for loop to create the grid array
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width - 100; x += cellSize) {
      grid.push(new Cell(x, y, cellCount));
      cellCount++;
    }
  }

  //make new randon config with controller
  enemycon.buildRand();

  shovel = new Shovel();
}


// draw function
function draw() {
  background(255);
  let rowNumber = random(rowTotal);
  //grid handler
  for (let i = 0; i < grid.length; i++) {
    grid[i].displayandupdate();
  }

  for (let i = 0; i < defender.length; i++) {

    defender[i].show();
    //console.log(dist(mouseX, mouseY, defender[i].x, defender[i].y));
  }

  //condition background
  fill(100, 128, 220);
  rect(width / 2, 50, width, cellSize);
  fill(255);
  textSize(20);
  text ("Total Energy: " + totalEnergy,  20, 50);

  //using frameCount to input the enemy array
  if (frameCount % 220 == 0) {
    enemycon.update();
  }
  enemycon.showEne();

  //shovel and the sun
  shovel.show();
  //framecount to push new sun
  if (frameCount % 500 == 0){
    sunTotal.push(new Sun());
  }

  for(let i = 0; i < sunTotal.length; i++){
    sunTotal[i].moveAndDisplay();
    //deal with the extra sun once its finished use
    if(sunTotal[i].y > 700){
      sunTotal.splice(i, 1);
    }
  }
}


// mouse pressre function for the hover
function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].hovered == 1) {
      grid[i].clicked();
    }
  }
}

function mouseClicked() {
  if (dist(mouseX,mouseY, shovel.x, shovel.y) < 20){
    shovel.clicked();
    shovel.times += 1;
  }
}

class enemyController {
  constructor() {
    this.R1 = [];
    this.R2 = [];
    this.R3 = [];
    this.R4 = [];
    this.R5 = [];
    this.AR1 = [];
    this.AR2 = [];
    this.AR3 = [];
    this.AR4 = [];
    this.AR5 = [];
    this.lvlProg = 0;
    this.largest = 0;
  }

  buildRand() {
    for (let i = 0; i < 51; i++) {
      let tempr = random([0, 1, 2, 3, 4, 5]);
      let tempE = random([1, 2]);
      switch (tempr) {
        case 0:
          this.R1.push(0);
          this.R2.push(0);
          this.R3.push(0);
          this.R4.push(0);
          this.R5.push(0);
          break;
        case 1:
          this.R1.push(tempE);
          this.R2.push(0);
          this.R3.push(0);
          this.R4.push(0);
          this.R5.push(0);
          break;
        case 2:
          this.R1.push(0);
          this.R2.push(tempE);
          this.R3.push(0);
          this.R4.push(0);
          this.R5.push(0);
          break;
        case 3:
          this.R1.push(0);
          this.R2.push(0);
          this.R3.push(tempE);
          this.R4.push(0);
          this.R5.push(0);
          break;
        case 4:
          this.R1.push(0);
          this.R2.push(0);
          this.R3.push(0);
          this.R4.push(tempE);
          this.R5.push(0);
          break;
        case 5:
          this.R1.push(0);
          this.R2.push(0);
          this.R3.push(0);
          this.R4.push(0);
          this.R5.push(tempE);
          break;
      }
    }

  }

  update() {
    switch (this.R1[this.lvlProg]) {
      case 0:
        break;
      case 1:
        this.AR1.push(new Enemy(row1));
        break;
      case 2:
        this.AR1.push(new Enemy(row1));
        break;
    }
    switch (this.R2[this.lvlProg]) {
      case 0:
        break;
      case 1:
        this.AR2.push(new Enemy(row2));
        break;
      case 2:
        this.AR2.push(new Enemy(row2));
        break;
    }
    switch (this.R3[this.lvlProg]) {
      case 0:
        break;
      case 1:
        this.AR3.push(new Enemy(row3));
        break;
      case 2:
        this.AR3.push(new Enemy(row3));
        break;
    }
    switch (this.R4[this.lvlProg]) {
      case 0:
        break;
      case 1:
        this.AR4.push(new Enemy(row4));
        break;
      case 2:
        this.AR4.push(new Enemy(row4));
        break;
    }
    switch (this.R5[this.lvlProg]) {
      case 0:
        break;
      case 1:
        this.AR5.push(new Enemy(row5));
        break;
      case 2:
        this.AR5.push(new Enemy(row5));
        break;
    }
    this.lvlProg++;
  }
  showEne() {
    for (let i = 0; i < this.AR1.length; i++) {
      this.AR1[i].show();
      this.AR1[i].move();
    }
    for (let i = 0; i < this.AR2.length; i++) {
      this.AR2[i].show();
      this.AR2[i].move();
    }
    for (let i = 0; i < this.AR3.length; i++) {
      this.AR3[i].show();
      this.AR3[i].move();
    }
    for (let i = 0; i < this.AR4.length; i++) {
      this.AR4[i].show();
      this.AR4[i].move();
    }
    for (let i = 0; i < this.AR5.length; i++) {
      this.AR5[i].show();
      this.AR5[i].move();
    }
  }
  pollRows() {
    let poll = [];
    poll.push(this.AR1.length);
    poll.push(this.AR2.length);
    poll.push(this.AR3.length);
    poll.push(this.AR4.length);
    poll.push(this.AR5.length);
    return poll;
  }
}

class Cell {
  constructor(x, y, cellnum) {
    this.num = cellnum;
    this.x = x + 50;
    this.y = y + 50;
    this.hovered = 0;
    this.width = cellSize;
    this.height = cellSize;
    this.plant = 0;
    this.taken = -1;
  }

  clicked() {

    this.taken *= -1;
  }

  displayandupdate() {
    if (((((this.x - 50) < mouseX) && (mouseX < (this.x + 50))) && (((this.y - 50) < mouseY) && (mouseY < (this.y + 50))))) {
      this.hovered = 1;
    } else {
      this.hovered = 0;
    }

    fill(200);
    if (this.hovered == 1) {
      fill(0);
    }
    if (this.taken == 1) {
      fill(255, 0, 0);
    }
    rect(this.x, this.y, this.width, this.height);
    //test the cell center
    fill(125);
    text(this.num, this.x, this.y);
  }
}
class plantController {
  constructor() {
    this.P1 = [];
    this.P2 = [];
    this.P3 = [];
    this.P4 = [];
    this.P5 = [];
    this.rowStatus = [0, 0, 0, 0, 0];
  }

  addPlant(x, y, cellnum, pType) {
    let rownum = ceil(cellnum / 8);
    switch (rownum) {
      case 1:
        this.P1.push(new Plant(x, y, pType));
        break;
      case 2:
        this.P2.push(new Plant(x, y, pType));
        break;
      case 3:
        this.P3.push(new Plant(x, y, pType));
        break;
      case 4:
        this.P4.push(new Plant(x, y, pType));
        break;
      case 5:
        this.P5.push(new Plant(x, y, pType));
        break;
      default:
        break;
    }
  }

}

class Plant {
  constructor(x, y, pType) {
    this.x = x;
    this.y = y;
    this.money = money;
    this.health = health;
    this.dmg = damage;
  }

  show() {

  }
}

class Enemy {
  constructor(rowNumber) {
    this.x = 950;
    this.y = rowNumber;
    this.width = cellSize - 25;
    this.height = cellSize - 25;
    this.veloctiy = -0.5;
    this.health = 200;
    this.frequency = 0;
  }

  show() {
    fill(100, 200, 50);
    rect(this.x, this.y, this.height, this.width);
  }

  move() {
    this.x += this.veloctiy;
  }
}


class Shovel {
  constructor() {
    this.x = 650;
    this.y = 50;
    this.size = cellSize;
    this.shov = false;
    this.times = 0;
    //might change later;
    this.cost = 50;
    this.move = -1;
  }

  clicked(){
    this.move *= -1;
  }

  show(){
    imageMode(CENTER);
    fill(255);
    //noStroke();
    rect(this.x, this.y, 70, 70);
    //only three plants allow to remove
    if (this.move == 1 && this.times <6){
      image(shovelImage, mouseX, mouseY, 60, 60);
    }
    else{
      image(shovelImage, this.x, this.y, 60, 60);
    }
  }

}


class Sun {
  constructor() {
    this.x = random(80, 720);
    this.y = -150;
    this.angle = random(360);
    this.speed = random(1,3);
  }

  moveAndDisplay(){
    this.y += this.speed;
    //collect the sun
    if (dist(this.x, this.y, mouseX, mouseY) < 50) {
      totalEnergy++;
      this.y += 600;
    }

    imageMode(CENTER);
    //image(sunImage, this.x, this.y, 50, 50);
    // rotation
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    image(sunImage, 0, 0, 70, 70);
    this.angle++;
    pop();
  }
}
//Try out codes for bullet and projectiles

// //shot the bullet from the defender x and y
// class Projectile {
//   if (this.frequency % 20 == 0) {
//     this.projectiles.push(new Projectile(this.x, this.y));
//   }
//   this.frequency++;
// }


//
// class Bullet {
//     if (this.frequency % 20 == 0) {
//       this.projectiles.push(new Projectile(this.x, this.y));
//     }
//     this.frequency++;
//   //set up the bullet array
//   this.projectiles = [];
//
//   //set up the bullet show function
//   show() {
//     fill(255, 0, 0);
//     ellipse(this.x, this.y, 10, 10);
//   }
//
//   //set up the bullet move function
//   move() {
//     this.x += 5;
//   }
//
//   //set up the bullet collision function
//   collision() {
//     for (let i = 0; i < enemy.length; i++) {
//       if (dist(this.x, this.y, enemy[i].x, enemy[i].y) < 20) {
//         enemy.splice(i, 1);
//         this.projectiles.splice(i, 1);
//       }
//     }
//   }
//
//
//   //set up the bullet remove function
//   remove() {
//     for (let i = 0; i < this.projectiles.length; i++) {
//       if (this.projectiles[i].x > width) {
//         this.projectiles.splice(i, 1);
//       }
//     }
//   }
//
//   //set up the bullet array handler
//   for (let i = 0; i < this.projectiles.length; i++) {
//     this.projectiles[i].show();
//     this.projectiles[i].move();
//     this.projectiles[i].collision();
//     this.projectiles[i].remove();
//   }
// }

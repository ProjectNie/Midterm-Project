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
let rowTotal = [row1, row2, row3, row4, row5];

function setup() {
  //create the canvas and the canvas.id for html
  var canvas = createCanvas(900, 600);
  canvas.id("canvas1");

  rectMode(CENTER);
  // for loop to create the grid array
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      grid.push(new Cell(x, y));
    }
  }
}

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

  //create the for loop for enemy array
  if (frameCount % 220 == 0) {
    enemy.push(new Enemy(row1));
  }

  //condition background
  fill(100, 128, 220);
  rect(width / 2, 50, width, cellSize);

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].show();
    enemy[i].move();
  }



}


function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].hovered == 1) {
      grid[i].clicked();
    }
  }
}



class Cell {
  constructor(x, y) {
    this.x = x + 50;
    this.y = y + 50;
    this.hovered = 0;
    this.width = cellSize;
    this.height = cellSize;
    this.plant = 0;
    this.taken = -1;
    this.row = 0;
    if (this.y == row1) {
      this.row == 1;
    }
    else if (this.y == row2) {
      this.row == 2;
    }
    else if (this.y == row3) {
      this.row ==3;
    }
    else if (this.y == row4) {
      this.row ==4;
    }
    else if (this.y == row5) {
      this.row ==5;
    }
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
    // fill(125);
    // ellipse(this.x, this.y, 5, 5);
  }



}

// set up the defender class
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize - 25;
    this.height = cellSize - 25;
    this.shoot = false;
    this.health = 100;
    this.projectiles = [];
    this.frequency = 0;
  }

  show() {
    fill(250, 50, 50);
    rect(this.x, this.y, this.height, this.width);
    fill(255);
    text("DEFENDER: ", this.x - 35, this.y);
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

class Plant {
  constructor(x, y, money, health, damage) {
    this.x = x;
    this.y = y;
    this.money = money;
    this.health = health;
    this.dmg = damage;
  }

  show() {

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
  }

  show(){
    
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

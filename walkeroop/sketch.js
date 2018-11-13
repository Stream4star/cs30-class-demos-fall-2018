// Walker OOP Demo
// Dan Schellenberg

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.color = "red";
    this.speed = 5;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    ellipse(this.x, this.y, 2, 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let tyler;
let nevan;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tyler = new Walker();
  nevan = new Walker();
  nevan.color = "blue";
}

function draw() {
  tyler.move();
  nevan.move();

  tyler.display();
  nevan.display();
}

// Ship with Bullets
//  Demonstrating Objects within Objects
// Dan Schellenberg
// Nov 22, 2018

class Bullet {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.offScreen = false;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x >= width + this.radius || this.x <= 0 - this.radius || this.y >= height + this.radius || this.y <= 0 - this.radius) {
      this.offScreen = true;
    }
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}

class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 5;
    this.w = 100;
    this.h = 20;
    this.bulletArray = [];
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  handleKeyPress() {
    if (key === "w") {
      this.isMovingUp = true;
    }
    if (key === "s") {
      this.isMovingDown = true;
    }
    if (key === "a") {
      this.isMovingLeft = true;
    }
    if (key === "d") {
      this.isMovingRight = true;
    }

    if (key === " ") {
      //fire photons!!!
      let someBullet = new Bullet(this.x + this.w/2, this.y, 0, -10);
      this.bulletArray.push(someBullet);
    } 
  }

  handleKeyRelease() {
    if (key === "w") {
      this.isMovingUp = false;
    }
    if (key === "s") {
      this.isMovingDown = false;
    }
    if (key === "a") {
      this.isMovingLeft = false;
    }
    if (key === "d") {
      this.isMovingRight = false;
    }
  }

  update() {
    //move ship
    if (this.isMovingDown) {
      this.y += this.dy;
    }
    if (this.isMovingUp) {
      this.y -= this.dy;
    }
    if (this.isMovingRight) {
      this.x += this.dx;
    }
    if (this.isMovingLeft) {
      this.x -= this.dx;
    }

    //show bullets
    for (let i = this.bulletArray.length - 1; i >= 0; i--) {
      this.bulletArray[i].update();
      this.bulletArray[i].display();
      if (this.bulletArray[i].offScreen) {
        this.bulletArray.splice(i, 1);
      }
    }
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.w, this.h); 
  }

}

let enterprise;

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2);
}

function draw() {
  background(255);
  enterprise.update();
  enterprise.display();
}

function keyPressed() {
  enterprise.handleKeyPress();
}

function keyReleased() {
  enterprise.handleKeyRelease();
}

// State Variables Rectangle Demo
// Dan Schellenberg
// Sept 24, 2018


let state = 1;
let x = 0;
let y = 0;
let boxSize = 25;
let speed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  determineState();
  moveRect();
  fill(0);
  rect(x, y, boxSize, boxSize);
}

function determineState() {
  if (state === 1 && x >= width - boxSize) {
    x = width - boxSize;
    state = 2;
  }
  else if (state === 2 && y >= height - boxSize) {
    y = height - boxSize;
    state = 3;
  }
  else if (state === 3 && x <= 0) {
    x = 0;
    state = 4;
  }
  else if (state === 4 && y <= 0) {
    y = 0;
    state = 1;
  }
}

function moveRect() {
  if (state === 1) {
    x += speed;
  }
  else if (state === 2) {
    y += speed;
  }
  else if (state === 3) {
    x -= speed;
  }
  else if (state === 4) {
    y -= speed;
  }
}

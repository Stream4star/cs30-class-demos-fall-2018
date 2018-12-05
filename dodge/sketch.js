// Car Dodging Game
//   - uses hammer.js to allow user to swipe left/right on a phone/tablet
// Dan Schellenberg
// Dec 5, 2018

let rows = 10;
let cols = 4;
let grid;
let cellSize;
let carImg, carX, carY;
let leftEdgeOfGrid;
const EMPTY_CELL = 0;
const CAR_CELL = 1;

function preload() {
  carImg = loadImage("assets/car.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2dArray(cols, rows);
  cellSize = height / rows;
  leftEdgeOfGrid = width/2 - (cols*cellSize)/2;
  
  //place car
  carY = rows - 1;
  carX = 0;
  grid[carY][carX] = CAR_CELL;
  
  setupSwipeHandling();
}


function draw() {
  background(255);
  displayGrid(grid, leftEdgeOfGrid);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight();
  }
}

function moveLeft() {
  if (carX > 0) {
    //check for collision

    //if no collision
    grid[carY][carX] = EMPTY_CELL;
    carX -= 1;
    grid[carY][carX] = CAR_CELL;
  }
}

function moveRight() {
  if (carX < cols - 1) {
    //check for collision

    //if no collision
    grid[carY][carX] = EMPTY_CELL;
    carX += 1;
    grid[carY][carX] = CAR_CELL;
  }
}


function setupSwipeHandling() {
  // set options to prevent default behaviors for swipe, pinch, etc
  let options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  let hammer = new Hammer(document.body, options);
  hammer.get("swipe").set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);
}

function swiped(event) {
  if (event.direction === Hammer.DIRECTION_RIGHT) {
    moveLeft();
  }
  else if (event.direction === Hammer.DIRECTION_LEFT) {
    moveRight();
  }
  else if (event.direction === Hammer.DIRECTION_UP) {
    console.log("you swiped up");
  } 
  else if (event.direction === Hammer.DIRECTION_DOWN) {
    console.log("you swiped down");
  }
}

function displayGrid(grid, xOffset = 0) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else {
        fill(0);
      }
      rect(x*cellSize + xOffset, y*cellSize, cellSize, cellSize);
    }
  }
}

function createEmpty2dArray(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y < rows; y++) {
    emptyGrid.push([]);
    for (let x = 0; x < cols; x++) {
        emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}
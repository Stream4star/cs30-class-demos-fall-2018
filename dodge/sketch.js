// Car Dodging Game
//   - uses hammer.js to allow user to swipe left/right on a phone/tablet
// Dan Schellenberg
// Dec 5, 2018

let rows = 10;
let cols = 4;
let grid;
let cellSize;
let carImg, carX, carY;
let truckImg;
let leftEdgeOfGrid, rightEdgeOfGrid;
let speed = 20;
let isAlive = true;
let score = 0;

const EMPTY_CELL = 0;
const CAR_CELL = 1;
const TRUCK_CELL = 2;

function preload() {
  carImg = loadImage("assets/car-truck1.png");
  truckImg = loadImage("assets/car-truck2.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2dArray(cols, rows);
  cellSize = height / rows;
  leftEdgeOfGrid = width/2 - (cols*cellSize)/2;
  rightEdgeOfGrid = leftEdgeOfGrid + (cols*cellSize);
  
  //place car
  carY = rows - 1;
  carX = 0;
  grid[carY][carX] = CAR_CELL;

  setupSwipeHandling();
}

function draw() {
  if (isAlive) {
    gamePlay();
  }
  else {
    deathScreen();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight();
  }
}

function gamePlay() {
  background(255);
  displayLanes();
  if (frameCount % speed === 0) {
    updateGrid();
    spawnEnemy();
  }
  displayGrid(grid, leftEdgeOfGrid);
}

function deathScreen() {
  background(255);
  fill(255, 0, 0);
  textSize(42);
  textAlign(CENTER, CENTER);
  text("You are dead!\nYou dodged " + score + " vehicles.", width/2, height/2);

}

function updateScoreAndSpeed() {
  score += 1;
  if (score > 10) {
    speed = 15;
  }
  else if (score > 20) {
    speed = 10;
  } 
  else if (score > 35) {
    speed = 8;
  } 
  else if (score > 50) {
    speed = 5;
  }
  else if (score > 100) {
    speed = 3;
  }
  else if (score > 200) {
    speed = 1;
  }
}

function spawnEnemy() {
  if (random(100) > 50) {
    let whichLane = Math.floor(random(cols));
    grid[0][whichLane] = TRUCK_CELL;
  }
}

function moveLeft() {
  if (carX > 0) {
    //check for collision
    if (grid[carY][carX-1] !== EMPTY_CELL) {
      isAlive = false;
    }

    //if no collision
    grid[carY][carX] = EMPTY_CELL;
    carX -= 1;
    grid[carY][carX] = CAR_CELL;
  }
}

function moveRight() {
  if (carX < cols - 1) {
    //check for collision
    if (grid[carY][carX+1] !== EMPTY_CELL) {
      isAlive = false;
    }

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
    moveRight();
  }
  else if (event.direction === Hammer.DIRECTION_LEFT) {
    moveLeft();
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
      if (grid[y][x] === CAR_CELL) {
        image(carImg, x*cellSize + xOffset + cellSize/4, y*cellSize, cellSize/2, cellSize);
      }
      else if (grid[y][x] === TRUCK_CELL) {
        image(truckImg, x*cellSize + xOffset + cellSize/4, y*cellSize, cellSize/2, cellSize);
      }
    }
  }
}

function updateGrid() {
  for (let y = rows - 1; y >= 0; y--) {
    for (let x = cols - 1; x >= 0; x--) {
      if (grid[y][x] === TRUCK_CELL) {
        if (y + 1 < rows) {
          //vehicle is still going to be on the grid
          if (grid[y+1][x] === CAR_CELL) {
            //ran into the car
            isAlive = false;
          }
          else {
            //vehicle is moving into an open space
            grid[y+1][x] = TRUCK_CELL;
            grid[y][x] = EMPTY_CELL;
          }
        }
        else {
          //vehicle is dropping off the bottom of the grid
          grid[y][x] = EMPTY_CELL;
          updateScoreAndSpeed();
        }
      }
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

function displayLanes() {
  //create a black rect to hold the whole road
  fill(0);
  rect(leftEdgeOfGrid, 0, rightEdgeOfGrid - leftEdgeOfGrid, height);

  //add lanes
  stroke(255);
  strokeWeight(2);
  for (let x = 0; x < 4; x++) {
    let laneX = leftEdgeOfGrid + x*(cols * cellSize / 4);
    for (let i = 0; i < rows; i += 2) {
      line(laneX, i*cellSize, laneX, (i+1)*cellSize);
    }
  }
}
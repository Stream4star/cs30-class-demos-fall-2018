// Drawing Ellipses and Rects
// Dan Schellenberg
// Sept 12
//
// Extra for Experts:
// - not expert yet....

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  if (mouseIsPressed && keyIsPressed) {
    if (key === "r") {
      rect(mouseX, mouseY, 10, 10);
    }
  	if (key === "e") {
      ellipse(mouseX, mouseY, 10, 10);
    }
  }
}

function keyTyped() {
  if (key === "w") {
    background(255);
  }
  else if (key === "b") {
    background(0);
  }
}

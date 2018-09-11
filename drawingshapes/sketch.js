// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
    createCanvas(windowWidth, windowHeight);
  	background(255);
}

function draw() {
  	let theWeight = abs(mouseX - pmouseX);
    strokeWeight(theWeight);
    fill(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function keyTyped() {
  background(255, 255, 255);
}

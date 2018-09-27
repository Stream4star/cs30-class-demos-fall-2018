// Loops Examples
// Dan Schellenberg
// Sept 27/18

let diameter, sliceWidth;
let x, y;
let targetColors = ["white", "white", "black", "black", "blue", "blue", "red", "red", "yellow", "yellow"];

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(240);
  // diameter = 400;
  // while (diameter > 10) {
  // 	ellipse(x, y, diameter, diameter);
  // 	diameter -= sliceWidth;
  // }

  //for loop version
  // for (let diameter = 400; diameter > 10; diameter -= sliceWidth) {
  // 	ellipse(x, y, diameter, diameter);
  // }

  //another for loop version
  stroke(200);
  diameter = 400;
  sliceWidth = diameter / 10;
  for (let i = 0; i < 10; i++) {
    fill(targetColors[i]);
    ellipse(x, y, diameter, diameter);
    diameter -= sliceWidth;
  }
}

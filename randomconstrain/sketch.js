//constrain and random demo

function setup() {
  createCanvas(800, 800);
  noStroke();
  background(220);
}

function draw() {
  fill(random(255), random(255), random(255), random(255));
  let ellipseSize = random(10, 75);
  let x = random(width);
  let y = random(height);
  x = constrain(x, 350, 450);
  y= constrain(y, 350, 450);
  ellipse(x, y, ellipseSize, ellipseSize);
}

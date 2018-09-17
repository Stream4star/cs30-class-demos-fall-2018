//randomly drawn rects and circles

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  if (mouseX < width / 2) {
    fill(random(255), random(255)); //pick a gray
    rect(random(width), random(height), random(50), random(50));
  }
  else {
    fill(random(255), random(255), random(255), random(255));
    let circleSize = random(20, 75);
    ellipse(random(width), random(height), circleSize, circleSize);
  }

}

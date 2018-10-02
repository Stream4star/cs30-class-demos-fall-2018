let boxSize;
let isFilledWithBlack;

function setup() {
  createCanvas(600, 600);
  boxSize = width/8;
  isFilledWithBlack = false;
}

function draw() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isFilledWithBlack) {
        fill(0);
      }
      else {
        fill(255);
      }
      rect(i * boxSize, j * boxSize, boxSize, boxSize);
      isFilledWithBlack = !isFilledWithBlack;
    }
    isFilledWithBlack = !isFilledWithBlack;
  }

}

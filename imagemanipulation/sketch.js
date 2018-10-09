// Image Manipulation Demo
// Dan Schellenberg
// Oct 9, 2018

let fish;
let grayFish;

function preload() {
  fish = loadImage("assets/fish.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image(fish, 0, 0);
  grayFish = makeGrayscale(fish);
  image(grayFish, 0, 0);
}

function draw() {

}

function makeGrayscale(sourceImage) {
  let img = createImage(sourceImage.width, sourceImage.height);

  img.loadPixels();
  sourceImage.loadPixels();

  for (let x = 0; x < sourceImage.width; x++) {
    for (let y = 0; y < sourceImage.height; y++) {
      let p = sourceImage.get(x, y);

      let r = red(p);
      let g = green(p);
      let b = blue(p);

      let newPixel = color((r+g+b)/3, (r+g+b)/3, (r+g+b)/3);

      img.set(x, y, newPixel);
    }
  }

  img.updatePixels();
  return img;
}

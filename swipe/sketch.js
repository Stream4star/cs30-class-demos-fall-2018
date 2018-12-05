// Hammer.js test
// Dan Schellenberg
// Dec 5, 2018

let imagesArray = [];
let whichImage = 0;

function preload() {
  for (let i = 0; i < 7; i++) {
    imagesArray[i] = loadImage("assets/" + i + ".jpeg");
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  textSize(30);
  noStroke();

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


function draw() {
  background(250, 10, 100);
  imageMode(CENTER);
  image(imagesArray[whichImage], width/2, height/2);
}


function swiped(event) {
  if (event.direction === Hammer.DIRECTION_RIGHT) {
    whichImage++;
  }
  else if (event.direction === Hammer.DIRECTION_LEFT) {
    whichImage--;
    if (whichImage === -1) {
      whichImage = imagesArray.length - 1;
    }
  }
  else if (event.direction === Hammer.DIRECTION_UP) {
    console.log("you swiped up");
  } 
  else if (event.direction === Hammer.DIRECTION_DOWN) {
    console.log("you swiped down");
  } 
  console.log(whichImage);
  whichImage = whichImage % imagesArray.length;
}

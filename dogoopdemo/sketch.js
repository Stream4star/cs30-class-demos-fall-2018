// Initial Classes Demo

class Dog {
  // constructor() {
  //   this.name = "Fido";
  //   this.age = 0;
  // }

  constructor(name) {
    this.name = name;
    this.age = 0;
  }

  bark() {
    console.log("Woof! My name is " + this.name);
  }
}

let myDog = new Dog("Snoopy");
let otherDog = new Dog("Fido");

function setup() {
  createCanvas(windowWidth, windowHeight);
  myDog.bark();
  otherDog.bark();
}

function draw() {

}

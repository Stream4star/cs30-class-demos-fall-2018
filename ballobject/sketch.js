let ball;

function setup() {
  createCanvas(400, 400);
	ball = {
		x: 100,
		y: 200,
		radius: 25,
		fillColor: color(255, 0, 0)
	};
}

function draw() {
  background(220);
	fill(ball.fillColor);
	ellipse(ball.x, ball.y, ball.radius*2, ball.radius*2);
}

function mousePressed() {
	ball.x = mouseX;
	ball.y = mouseY;
}

function keyTyped() {
	if (key === "w") {
		ball.radius *= 1.1;
	}
	else if (key === "s") {
		ball.radius *= 0.9;
	}
}

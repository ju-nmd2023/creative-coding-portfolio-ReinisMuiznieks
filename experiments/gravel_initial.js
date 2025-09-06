const squareSize = 40;
const rows = floor(height / squareSize);
const cols = floor(width / squareSize);

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  rectMode(CENTER);
  background(222, 222, 218);
}

function draw() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const maxDisplacement = row * 0.9;
      const maxRotation = radians(row * 2);
      const x = col * squareSize + squareSize / 2;
      const y = row * squareSize + squareSize / 2;

      const offsetX = random(-maxDisplacement, maxDisplacement);
      const offsetY = random(-maxDisplacement, maxDisplacement);

      push();
      translate(x + offsetX, y + offsetY);
      rotate(random(-maxRotation, maxRotation));
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}

const squareSize = 40;
let rows, cols;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  textAlign(CENTER, CENTER);
  textSize(32);
  background(0);

  rows = floor(height / squareSize);
  cols = floor(width / squareSize);
}

function draw() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const maxDisplacement = row * 0.9;
      const maxRotation = radians(row * 4);
      const x = col * squareSize + squareSize / 2;
      const y = row * squareSize + squareSize / 2;

      const offsetX = random(-maxDisplacement, maxDisplacement);
      const offsetY = random(-maxDisplacement, maxDisplacement);

      push();
      translate(x + offsetX, y + offsetY);
      rotate(random(-maxRotation, maxRotation));
      scale(map(row + col, 0, rows + cols - 2, 0.6, 3));
      fill(255);
      text("A", 0, 0);
      pop();
    }
  }
}

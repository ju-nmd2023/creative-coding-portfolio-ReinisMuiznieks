const squareSize = 40;
const rows = floor(height / squareSize);
const cols = floor(width / squareSize);
let time = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  background("black");
  colorMode(HSB, 360, 100, 100);
  frameRate(30);
}

function draw() {
  time += 0.01;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const maxDistort = row * 1.2;
      const maxRotation = radians(row * 3);
      const x = col * squareSize + squareSize / 2;
      const y = row * squareSize + squareSize / 2;

      const offsetX = map(
        noise(col * 0.1, row * 0.1, time),
        0,
        1,
        -maxDistort,
        maxDistort
      );

      const offsetY = map(
        noise(row * 0.1, col * 0.1, time + 100),
        0,
        1,
        -maxDistort,
        maxDistort
      );

      push();
      fill(0, 100, map(row, 0, rows - 1, 100, 30));
      translate(x + offsetX, y + offsetY);
      rotate(
        map(
          noise(row * 0.1, col * 0.1, time + 200),
          0,
          1,
          -maxRotation,
          maxRotation
        )
      );

      strokeWeight(0.2);
      stroke(0);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}

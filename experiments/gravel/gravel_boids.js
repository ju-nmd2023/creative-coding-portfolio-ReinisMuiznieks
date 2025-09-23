const squareSize = 40;
const numBoids = 60;

let rows, cols;
let time = 0;
const flowField = [];
const boids = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  frameRate(40);

  rows = floor(height / squareSize);
  cols = floor(width / squareSize);

  initFlowField();

  for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid(random(width), random(height)));
  }

  background(0);
}

function draw() {
  time += 0.01;
  background(0);

  updateFlowField();
  drawGridSquares();

  for (let boid of boids) {
    boid.followFlow(flowField, rows, cols, squareSize);
    boid.update();
    boid.edges();
    boid.display();
  }
}

function initFlowField() {
  for (let r = 0; r < rows; r++) {
    flowField[r] = [];
    for (let c = 0; c < cols; c++) {
      flowField[r][c] = p5.Vector.fromAngle(
        noise(c * 0.16, r * 0.16) * TWO_PI * 2
      );
    }
  }
}

function updateFlowField() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      flowField[r][c] = p5.Vector.fromAngle(
        noise(c * 0.12, r * 0.12, time) * TWO_PI
      );
    }
  }
}

function drawGridSquares() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * squareSize + squareSize / 2;
      const y = row * squareSize + squareSize / 2;

      const maxDistort = row * 1.4 + sin(time * 2 + row * 1.3) * 15;
      const maxRotation = radians(row * 5) + sin(col + time) * 0.3;

      const offsetX = map(
        noise(col * 0.13, row * 0.13, time),
        0,
        1,
        -maxDistort,
        maxDistort
      );

      const offsetY = map(
        noise(row * 0.13, col * 0.14, time + 37),
        0,
        1,
        -maxDistort,
        maxDistort
      );

      push();

      fill(
        isBoidNearSquare(x, y)
          ? color(240, 100, 100, 0.87)
          : color(0, 0, 0, 0.87)
      );
      rect(0, 0, squareSize, squareSize);

      translate(x + offsetX, y + offsetY);
      rotate(
        map(
          noise(row * 0.09, col * 0.1, time + 200),
          0,
          1,
          -maxRotation,
          maxRotation
        )
      );
      strokeWeight(1);
      stroke(0, 0, 15, 0.13);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}

function isBoidNearSquare(x, y) {
  for (let boid of boids) {
    if (dist(x, y, boid.pos.x, boid.pos.y) < squareSize * 2) {
      return true;
    }
  }
  return false;
}

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.hist = [];
  }

  followFlow(flowField, rows, cols, squareSize) {
    const col = constrain(floor(this.pos.x / squareSize), 0, cols - 1);
    const row = constrain(floor(this.pos.y / squareSize), 0, rows - 1);
    const d = p5.Vector.add(flowField[row][col], p5.Vector.mult(this.vel, 0.8));
    this.vel.lerp(d, 0.17);
  }

  update() {
    this.pos.add(this.vel);
    this.hue = (this.hue + 0.3) % 360;
    this.hist.push(this.pos.copy());
    if (this.hist.length > 25) this.hist.shift();
  }

  edges() {
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  display() {
    noFill();
    stroke(117, 100, 100, 100);
    strokeWeight(1.5);
    beginShape();
    for (let p of this.hist) vertex(p.x, p.y);
    endShape();

    fill(117, 100, 100, 0.87);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 9, 9);
  }
}

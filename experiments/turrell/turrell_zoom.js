let rectWidth;
let rectHeight;
let initialWidth, initalHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  frameRate(60);
  noStroke();

  rectWidth = 140;
  rectHeight = 70;
}

function mouseWheel(event) {
  rectWidth += event.delta;
  rectHeight += event.delta / 2;
  rectWidth = constrain(rectWidth, 140, width + height);
  rectHeight = constrain(rectHeight, 70, height + 10);
  redraw();
}

function draw() {
  drawRadialGradientBackground();
  drawRoundedRectGradient(width / 2, height / 2, rectWidth, rectHeight, 80);
}

function drawRadialGradientBackground() {
  let test = width / 2;
  let cy = height / 2;
  let maxRadius = dist(0, 0, test, cy);
  for (let r = maxRadius; r > 0; r--) {
    let inter = map(r, 0, maxRadius, 1, 0);
    let c = lerpColor(
      color(162, 125, 2001, 255),
      color(118, 24, 53, 255),
      inter
    );
    fill(c);
    ellipse(test, cy, r * 3, r * 2.2);
  }
}

function drawRoundedRectGradient(x, y, w, h, radius) {
  push();
  translate(x - w / 2, y - h / 2);
  noStroke();

  let grad = drawingContext.createRadialGradient(
    w / 2,
    h / 2,
    10,
    w / 2,
    h / 2,
    max(w, h) / 1.2
  );
  grad.addColorStop(0, "rgba(113,15,209,255)");
  grad.addColorStop(1, "rgba(113,115,249,255) ");

  drawingContext.fillStyle = grad;
  rect(0, 0, w, h, radius);
  pop();
}

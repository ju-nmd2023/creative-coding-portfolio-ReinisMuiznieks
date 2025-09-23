let rectWidth = 140;
let rectHeight = 70;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  frameRate(60);
  noStroke();
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
  drawRoundedRectGradient();
}

function drawRadialGradientBackground() {
  const maxRadius = dist(0, 0, width / 2, height / 2);

  for (let r = maxRadius; r > 0; r--) {
    fill(
      lerpColor(
        color(162, 125, 2001, 255),
        color(118, 24, 53, 255),
        map(r, 0, maxRadius, 1, 0)
      )
    );
    ellipse(width / 2, height / 2, r * 3, r * 2.2);
  }
}

function drawRoundedRectGradient() {
  push();
  translate(height / 2 - rectWidth / 2, width / 2 - rectHeight / 2);
  noStroke();

  const grad = drawingContext.createRadialGradient(
    rectWidth / 2,
    rectHeight / 2,
    10,
    rectWidth / 2,
    rectHeight / 2,
    max(rectWidth, rectHeight) / 1.2
  );
  grad.addColorStop(0, "rgba(113,15,209,255)");
  grad.addColorStop(1, "rgba(113,115,249,255) ");

  drawingContext.fillStyle = grad;
  rect(0, 0, rectWidth, rectHeight, 80);
  pop();
}

const layers = 6;
let centerX, startY, maxRadiusX, maxRadiusY;
let followX, followY;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();

  centerX = width / 2;
  startY = height / 2;
  maxRadiusX = width / 3;
  maxRadiusY = width / 6;

  followX = centerX;
  followY = startY;
}

function draw() {
  background(30, 10, 50);
  const lightColor = color(230, 190, 255, 200);
  const darkColor = color(180, 40, 230, 100);

  const targetX = constrain(mouseX - centerX, -120, 120);
  const targetY = constrain(mouseY - startY, -10, 110);

  followX += (targetX - followX) * 0.05;
  followY += (targetY - followY) * 0.05;

  for (let i = layers; i > 0; i--) {
    const radiusX = (maxRadiusX / layers) * i;
    const radiusY = (maxRadiusY / layers) * i;
    const col = lerpColor(lightColor, darkColor, i / layers);

    col.setAlpha(map(i, 1, layers, 255, 20));
    fill(col);

    const moveScale = map(i, 1, layers, 1, 0.1);

    const xOffset = followX * moveScale;
    const yOffset = -10 * (layers - i) + followY * moveScale;

    ellipse(centerX + xOffset, startY + yOffset, radiusX * 2, radiusY * 2);
  }
}

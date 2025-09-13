let song;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
}

function draw() {
  background(30, 10, 50);

  const centerX = width / 2;
  const startY = height / 2;
  const maxRadiusX = width / 3;
  const maxRadiusY = width / 6;
  const layers = 6;
  const yOffsetStep = 10;

  const lightColor = color(230, 190, 255, 200);
  const darkColor = color(180, 40, 230, 100);

  for (let i = layers; i > 0; i--) {
    let radiusX = (maxRadiusX / layers) * i;
    let radiusY = (maxRadiusY / layers) * i;
    let alpha = map(i, 1, layers, 255, 20);
    let col = lerpColor(lightColor, darkColor, i / layers);
    col.setAlpha(alpha);
    fill(col);
    ellipse(
      centerX,
      startY - yOffsetStep * (layers - i),
      radiusX * 2,
      radiusY * 2
    );
  }
}

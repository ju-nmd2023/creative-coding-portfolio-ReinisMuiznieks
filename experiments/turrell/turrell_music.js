let song;
let amplitude;

function preload() {
  soundFormats("mp3");
  song = loadSound("../../assets/sounds/xtal.mp3");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
}

function draw() {
  background(30, 10, 50);

  const centerX = width / 2;
  const startY = height / 2;
  const maxRadiusX = width / 3;
  const maxRadiusY = width / 3;
  const layers = 5;
  const level = 6;
  const bounce = map(level, 0, 0.3, 0.9, 1.2, true);

  const lightColor = color(230, 190, 255, 200);
  const darkColor = color(180, 40, 230, 100);

  for (let i = layers; i > 0; i--) {
    let radiusX = (maxRadiusX / layers) * i * bounce;
    let radiusY = (maxRadiusY / layers) * i * bounce;
    let alpha = map(i, 1, layers, 255, 20);
    let col = lerpColor(lightColor, darkColor, i / layers);
    col.setAlpha(alpha);
    fill(col);
    ellipse(centerX, startY, radiusX * 2, radiusY * 2);
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

let canvSize;
const rezAngle = 0.006;
const rezColor = 0.005;
const gap = 15;
const baseLen = 10;
const startVary = 25;

let img;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  colorMode(HSB, 360, 120, 100, 255);
  background(0);
  fill(0, 80, 80);
  circle(width / 3, height / 3, width * 0.6);
}

function draw() {
  strokeCap(SQUARE);
  // The complex formulas and calculations are taken
  // from a video Making a Static Flow Field in p5.js - https://www.youtube.com/watch?v=R0OFyWEglGA&t=1608s
  for (let i = -20; i < width + 20; i += gap) {
    for (let j = -20; j < height + 20; j += gap) {
      const noiseColorVal = (noise(i * rezColor, j * rezColor) - 0.2) * 1.7;
      let hue = floor(noiseColorVal * 7) * (360 / 7) + random(360);
      hue = hue > 360 ? hue - 360 : hue;

      let x = i + random(-startVary, startVary);
      let y = j + random(-startVary, startVary);

      for (let k = 10; k > 0; k--) {
        let len = baseLen * random(0.7, 1.3);
        strokeWeight(k * 0.3);
        let noiseAngleVal = (noise(x * rezAngle, y * rezAngle) - 0.2) * 1.7;

        let centerAngle = atan2(height / 2 - y, width / 2 - x);
        noiseAngleVal = lerp(noiseAngleVal * TWO_PI, centerAngle, 0.3) / TWO_PI;

        let angle = noiseAngleVal * TWO_PI;
        const strokeHue = hue + random(-8, 8);
        const strokeSat = 80 + random(-15, 15);
        const strokeBright = 80 + random(-15, 15);

        stroke(strokeHue, strokeSat, strokeBright, map(k, 10, 1, 180, 30));

        const newX = cos(angle) * len + x;
        const newY = sin(angle) * len + y;
        line(x, y, newX, newY);
        x = newX;
        y = newY;
      }
    }
  }
}

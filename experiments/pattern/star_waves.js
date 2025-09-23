const rows = 40;
const cols = 40;
const diameter = 15;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  const cellW = (width - 2) / cols;
  const cellH = (height - 2) / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = i * cellW + cellW / 2;
      const y = j * cellH + cellH / 2;

      const val = getPattern(t, x - width / 2, y - height / 2);
      const r = diameter * val;

      fill(val > 0.5 ? "#ff0dda" : "#780c67");
      ellipse(x, y, r, r);
    }
  }

  t += 0.05;
}

// pattern forumla based on Tixy.land examples using sine/cosine wave math.
function getPattern(t, x, y) {
  // distance from center
  const distance = Math.sqrt(x * x + y * y);

  // angle relative to center
  const angle = Math.atan2(y, x);

  // wave pattern based on time; distance and angle
  const wave = Math.cos(distance - t * 10 + Math.sin(angle * 8 + t * 4) * 5);

  return (wave + 1) / 2;
}

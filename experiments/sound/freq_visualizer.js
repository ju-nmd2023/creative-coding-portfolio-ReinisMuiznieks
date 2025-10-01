let player, analyser;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);

  if (typeof Tone !== "undefined") {
    player = new Tone.Player("assets/2hollis_3.mp3").toDestination();
    analyser = new Tone.Analyser("fft", 64);
    player.connect(analyser);
    player.autostart = true;
  }
}

function draw() {
  background(0, 0, 0, 50);
  if (!analyser) {
    text("Loading Tone.js...", width / 2, height / 2);
    return;
  }

  const bars = analyser.getValue().length;

  const gap = 2;
  const barWidth = width / bars - gap;

  for (let i = 0; i < bars; i++) {
    let normValue = map(analyser.getValue()[i], -140, 0, 0, 1);
    normValue = constrain(normValue, 0, 1);

    const amplitude = normValue * height;

    fill(255, 0, 0);
    rect(i * (barWidth + gap), height - amplitude, barWidth, amplitude);
  }
}

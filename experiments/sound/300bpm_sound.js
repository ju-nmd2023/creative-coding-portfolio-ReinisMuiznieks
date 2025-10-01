const rows = 30;
const cols = 50;
let t = 0;

let kickLoop, hiHatLoop, kick808Loop;
let count = 0;

let hiHatFlash = 0;
let kick808Flash = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  textAlign(CENTER, CENTER);
  textSize(24);

  hiHatFlash *= 0.85;
  kick808Flash *= 0.85;

  if (typeof Tone !== "undefined") {
    kick = new Tone.MembraneSynth().toDestination();

    hiHat = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
      filter: { type: "highpass", frequency: 7000 },
    }).toDestination();

    distortion = new Tone.Distortion(0.4).toDestination();
    reverb = new Tone.Reverb({
      decay: 1.5,
      wet: 0.3,
    }).toDestination();
    kick = new Tone.MembraneSynth();
    kick.chain(distortion, reverb);

    kick808 = new Tone.MembraneSynth({
      pitchDecay: 0.1,
      octaves: 12,
      envelope: {
        attack: 0.001,
        decay: 1.5,
        sustain: 1,
        release: 5.5,
      },
    }).toDestination();

    kickLoop = new Tone.Loop((time) => {
      kick.triggerAttackRelease("C2", "8n", time);

      if (count > 16 && count < 20) {
        kickLoop.interval = "8n";
      } else {
        kickLoop.interval = "4n";
      }
    }, "4n");

    hiHatLoop = new Tone.Loop((time) => {
      hiHat.triggerAttackRelease("16n", time);
      count++;

      if (count <= 12) {
        if (count > 4 && count < 12) {
          hiHatLoop.interval = "4n";
        } else {
          hiHatLoop.interval = "2n";
        }
      } else if (count > 12 && count < 16) {
        hiHatLoop.interval = "8n";
      } else if (count > 16 && count < 20) {
        hiHatLoop.interval = "2n";
      } else {
        count = 1;
      }
      console.log(count);
    }, "2n");

    kick808Loop = new Tone.Loop((time) => {
      kick808.triggerAttackRelease("C0", "8n", time);
      kick808Flash = 1.0;
    }, "2n");

    Tone.start().then(() => {
      Tone.Transport.bpm.value = 300;
      kickLoop.start(0);
      hiHatLoop.start(0);
      kick808Loop.start(0);
      Tone.Transport.start();
    });
  }
}

function draw() {
  background(0);

  const cellW = width / cols;
  const cellH = height / rows;

  hiHatFlash *= 0.85;
  kick808Flash *= 0.85;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cellW + cellW / 2;
      const y = j * cellH + cellH / 2;

      // Formula taken from tixy.land (https://tixy.land/?code=sin%28t*5%29+*+tan%28t*7%29)
      let val = Math.sin(t * 5) * Math.tan(t * 7);

      const flash = hiHatFlash + kick808Flash;

      val = constrain(val, -1, 1);

      fill(255 * (0.5 + 0.5 * flash), 100 + 155 * val, 255);

      const size = 5 + abs(val) * 10 + flash * 20;
      ellipse(x, y, size, size);
    }
  }

  t += 0.05;
}

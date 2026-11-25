// Writes public/audio/night-ferry-sample.wav: 20 seconds of a soft synthesized
// harbor drone (slow chord, a little filtered noise for water, a distant bell).
// Made from math, so there is nothing to license. Run with `pnpm sample-audio`.
import { writeFileSync, mkdirSync } from "node:fs";

const rate = 16000;
const seconds = 20;
const n = rate * seconds;
const samples = new Int16Array(n);

// Small seeded random so the file is identical every run.
let seed = 7;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

const chord = [110, 164.81, 220, 277.18];
let lp = 0;
for (let i = 0; i < n; i++) {
  const t = i / rate;
  const fade = Math.min(1, t / 2.5, (seconds - t) / 2.5);
  let v = 0;
  chord.forEach((f, k) => {
    const swell = 0.6 + 0.4 * Math.sin(2 * Math.PI * (0.07 + k * 0.013) * t + k);
    v += Math.sin(2 * Math.PI * f * t) * swell * 0.12;
  });
  // water: low-passed noise with a slow swell
  lp += (rand() - lp) * 0.02;
  v += lp * 0.9 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.18 * t));
  // a bell every 6 seconds
  const bt = t % 6;
  if (t > 1.5) v += Math.sin(2 * Math.PI * 880 * bt) * Math.exp(-bt * 2.2) * 0.12;
  samples[i] = Math.max(-1, Math.min(1, v * fade)) * 32767 * 0.8;
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + n * 2, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(rate, 24);
header.writeUInt32LE(rate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(n * 2, 40);

mkdirSync("public/audio", { recursive: true });
writeFileSync("public/audio/night-ferry-sample.wav", Buffer.concat([header, Buffer.from(samples.buffer)]));
console.log("Wrote public/audio/night-ferry-sample.wav", 44 + n * 2, "bytes");

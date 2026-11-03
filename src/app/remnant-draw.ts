const TAU = Math.PI * 2;

export interface RemnantFrame {
  width: number;
  height: number;
  collapse: number;
  time: number;
  reducedMotion: boolean;
  quality: 'hero' | 'nav';
}

interface Particle {
  radius: number;
  theta: number;
  size: number;
  heat: number;
}

interface FieldStar {
  x: number;
  y: number;
  z: number;
  brightness: number;
  phase: number;
}

const heroDisk = makeDisk(1600, 3.4);
const navDisk = makeDisk(360, 2.2);
const localStars = makeLocalStars(70);
const skyStars = makeSkyStars(260);
const nebulae = [
  { x: 0.72, y: 0.28, r: 0.34, rgb: [90, 130, 190] },
  { x: 0.22, y: 0.62, r: 0.28, rgb: [120, 90, 150] },
  { x: 0.55, y: 0.78, r: 0.22, rgb: [70, 110, 160] },
];

export function drawSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  collapse: number,
  time: number,
  reducedMotion: boolean,
  pointer: { x: number; y: number },
  scrollY: number,
): void {
  ctx.clearRect(0, 0, width, height);

  const drift = reducedMotion ? 0 : time * 0.004;
  const parallaxX = (pointer.x - 0.5) * 18;
  const parallaxY = (pointer.y - 0.5) * 12;

  for (const cloud of nebulae) {
    const x = cloud.x * width + parallaxX * 0.25;
    const y = wrap(cloud.y * height - scrollY + parallaxY * 0.25, height);
    const radius = cloud.r * Math.max(width, height);
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const alpha = 0.015 + collapse * 0.07;
    glow.addColorStop(0, `rgba(${cloud.rgb.join(',')}, ${alpha})`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  const starAlpha = 0.06 + collapse * 0.78;

  for (const star of skyStars) {
    const depth = 0.92 + star.z * 0.08;
    const x = ((star.x + drift * (0.2 + star.z * 0.4)) % 1) * width + parallaxX * depth * 0.4;
    const y = wrap(star.y * height - scrollY * depth + parallaxY * depth * 0.4, height);
    const twinkle = reducedMotion ? 1 : 0.72 + 0.28 * Math.sin(time * 0.9 + star.phase);
    const size = (0.5 + star.z * 1.4) * (0.7 + collapse * 0.5);
    ctx.globalAlpha = starAlpha * star.brightness * twinkle;
    ctx.fillStyle = collapse > 0.45 ? '#e8f0ff' : '#6d7f9a';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, TAU);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

export function drawRemnant(ctx: CanvasRenderingContext2D, frame: RemnantFrame): void {
  const { width, height, collapse, reducedMotion, quality } = frame;
  const time = reducedMotion ? 0 : frame.time;
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height);

  if (collapse < 0.995) {
    drawWhiteDwarf(ctx, cx, cy, scale, 1 - collapse, time, quality);
  }

  if (collapse > 0.02) {
    drawBlackHole(ctx, cx, cy, scale, collapse, time, quality);
  }
}

function drawWhiteDwarf(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  presence: number,
  time: number,
  quality: 'hero' | 'nav',
): void {
  const pulse = 0.96 + 0.04 * Math.sin(time * 1.4);
  const core = scale * (quality === 'nav' ? 0.18 : 0.075) * pulse;
  const glowR = scale * (quality === 'nav' ? 0.46 : 0.4);
  ctx.save();
  ctx.globalAlpha = Math.pow(presence, 0.75);

  const halo = ctx.createRadialGradient(cx, cy, core * 0.2, cx, cy, glowR);
  halo.addColorStop(0, 'rgba(255,255,255,0.98)');
  halo.addColorStop(0.14, 'rgba(160,200,255,0.85)');
  halo.addColorStop(0.34, 'rgba(70,120,200,0.4)');
  halo.addColorStop(0.58, 'rgba(210,170,90,0.18)');
  halo.addColorStop(1, 'rgba(234,240,247,0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, TAU);
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  const spikeAlpha = 0.45 * presence;
  drawSpike(ctx, cx, cy, scale * 0.46, 0, scale * 0.014, `rgba(90,130,190,${spikeAlpha})`);
  drawSpike(ctx, cx, cy, scale * 0.46, Math.PI / 2, scale * 0.014, `rgba(90,130,190,${spikeAlpha * 0.9})`);
  drawSpike(ctx, cx, cy, scale * 0.26, Math.PI / 4, scale * 0.007, `rgba(196,160,90,${spikeAlpha * 0.55})`);
  drawSpike(ctx, cx, cy, scale * 0.26, -Math.PI / 4, scale * 0.007, `rgba(196,160,90,${spikeAlpha * 0.55})`);

  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, core);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.4, '#d7e7ff');
  coreGrad.addColorStop(0.78, '#7ea6e3');
  coreGrad.addColorStop(1, 'rgba(90,140,210,0.15)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, core, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawSpike(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  length: number,
  angle: number,
  width: number,
  color: string,
): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  const grad = ctx.createLinearGradient(-length, 0, length, 0);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-length, 0);
  ctx.lineTo(0, -width);
  ctx.lineTo(length, 0);
  ctx.lineTo(0, width);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBlackHole(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  collapse: number,
  time: number,
  quality: 'hero' | 'nav',
): void {
  const compact = quality === 'nav';
  const rs = scale * (compact ? 0.084 : 0.072);
  const photon = rs * 1.55;
  const tilt = 0.46;
  const diskOuter = compact ? 4.15 : 4.8;
  const glowR = rs * (compact ? 4.6 : 7);
  const particles = compact ? navDisk : heroDisk;
  const alpha = Math.pow(collapse, 1.05);

  ctx.save();
  ctx.globalAlpha = alpha;

  const glow = ctx.createRadialGradient(cx, cy, rs, cx, cy, glowR);
  glow.addColorStop(0, 'rgba(255, 140, 60, 0.16)');
  glow.addColorStop(0.35, 'rgba(255, 90, 40, 0.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, glowR, 0, TAU);
  ctx.fill();

  if (quality === 'hero') {
    drawLensedStars(ctx, cx, cy, rs, photon, time);
  }

  drawDiskBody(ctx, cx, cy, rs, tilt, diskOuter);
  drawDiskParticles(ctx, particles, cx, cy, rs, tilt, time, false);
  drawLensedEyebrow(ctx, cx, cy, rs, photon, tilt, time, collapse);

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, rs, 0, TAU);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = `rgba(255, 214, 150, ${0.95 * collapse})`;
  ctx.lineWidth = Math.max(1.6, scale * 0.007);
  ctx.ellipse(cx, cy, photon, photon * 0.92, 0, 0, TAU);
  ctx.stroke();

  drawDiskParticles(ctx, particles, cx, cy, rs, tilt, time, true);

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, rs * 0.96, 0, TAU);
  ctx.fill();

  ctx.restore();
}

function drawDiskBody(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rs: number,
  tilt: number,
  outer = 4.8,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.translate(cx, cy);
  ctx.scale(1, tilt);

  const span = rs * outer;
  const inner = ctx.createRadialGradient(0, 0, rs * 1.35, 0, 0, span);
  inner.addColorStop(0, 'rgba(255, 230, 180, 0)');
  inner.addColorStop(0.14, 'rgba(255, 190, 110, 0.92)');
  inner.addColorStop(0.32, 'rgba(255, 120, 48, 0.7)');
  inner.addColorStop(0.62, 'rgba(255, 70, 30, 0.22)');
  inner.addColorStop(1, 'rgba(255, 70, 30, 0)');
  ctx.fillStyle = inner;
  ctx.beginPath();
  ctx.arc(0, 0, span, 0, TAU);
  ctx.fill();

  const doppler = ctx.createLinearGradient(-span, 0, span, 0);
  doppler.addColorStop(0, 'rgba(90, 170, 255, 0.55)');
  doppler.addColorStop(0.45, 'rgba(90, 170, 255, 0)');
  doppler.addColorStop(0.55, 'rgba(255, 90, 30, 0)');
  doppler.addColorStop(1, 'rgba(255, 90, 30, 0.5)');
  ctx.fillStyle = doppler;
  ctx.beginPath();
  ctx.arc(0, 0, span, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawDiskParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  cx: number,
  cy: number,
  rs: number,
  tilt: number,
  time: number,
  front: boolean,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  for (const particle of particles) {
    const omega = 0.42 * Math.pow(1.85 / particle.radius, 1.5);
    const theta = particle.theta + time * omega;
    const sin = Math.sin(theta);
    const isFront = sin > 0;
    if (isFront !== front) {
      continue;
    }

    const x = Math.cos(theta) * particle.radius * rs;
    const y = sin * particle.radius * rs * tilt;
    const px = cx + x;
    const py = cy + y;

    if (!front && Math.hypot(x, y) < rs * 0.92) {
      continue;
    }

    const approach = 0.5 - 0.5 * Math.cos(theta);
    const beaming = 0.28 + 0.72 * Math.pow(approach, 1.35);
    const heat = particle.heat;
    const r = 70 + heat * 90 + (1 - approach) * 95;
    const g = 90 + heat * 80 + approach * 40;
    const b = 40 + approach * 200 + heat * 20;
    const radius = (0.45 + particle.size * 0.55) * rs * 0.055 * (0.7 + heat * 0.6);
    ctx.fillStyle = `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${0.32 * beaming})`;
    ctx.beginPath();
    ctx.arc(px, py, radius * (front ? 1 : 0.75), 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

function drawLensedEyebrow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rs: number,
  photon: number,
  tilt: number,
  time: number,
  collapse: number,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = `rgba(255, 170, 90, ${0.18 * collapse})`;
  ctx.lineWidth = rs * 0.12;
  const wobble = Math.sin(time * 0.35) * 0.04;
  ctx.beginPath();
  ctx.ellipse(
    cx,
    cy - photon * 0.12,
    photon * 1.15,
    photon * tilt * 0.72,
    wobble,
    Math.PI * 1.08,
    Math.PI * 1.92,
  );
  ctx.stroke();
  ctx.strokeStyle = `rgba(120, 180, 255, ${0.12 * collapse})`;
  ctx.lineWidth = rs * 0.07;
  ctx.beginPath();
  ctx.ellipse(
    cx,
    cy - photon * 0.12,
    photon * 1.15,
    photon * tilt * 0.72,
    wobble,
    Math.PI * 1.08,
    Math.PI * 1.35,
  );
  ctx.stroke();
  ctx.restore();
}

function drawLensedStars(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rs: number,
  photon: number,
  time: number,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  for (const star of localStars) {
    const dx = star.x * rs * 6;
    const dy = star.y * rs * 6;
    const dist = Math.hypot(dx, dy);
    if (dist < rs * 1.15) {
      continue;
    }

    const warp = 1 + (0.55 * rs) / dist;
    const px = cx + dx * warp;
    const py = cy + dy * warp;
    const ringDist = Math.abs(Math.hypot(px - cx, py - cy) - photon);
    const ringBoost = Math.max(0, 1 - ringDist / (rs * 0.55));
    const twinkle = 0.65 + 0.35 * Math.sin(time * 1.2 + star.phase);
    ctx.globalAlpha = (0.18 + star.brightness * 0.35 + ringBoost * 0.4) * twinkle;
    ctx.fillStyle = '#f4f7ff';
    ctx.beginPath();
    ctx.arc(px, py, 0.6 + star.brightness * 1.1 + ringBoost, 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

function makeDisk(count: number, spread: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const u = hash(i, 1);
    particles.push({
      radius: 1.85 + Math.pow(u, 0.62) * spread,
      theta: hash(i, 2) * TAU,
      size: 0.45 + hash(i, 3) * 1.5,
      heat: 1 - Math.pow(u, 0.62),
    });
  }
  return particles;
}

function makeLocalStars(count: number): FieldStar[] {
  const stars: FieldStar[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: hash(i, 11) * 2 - 1,
      y: hash(i, 12) * 2 - 1,
      z: hash(i, 13),
      brightness: 0.35 + hash(i, 14) * 0.65,
      phase: hash(i, 15) * TAU,
    });
  }
  return stars;
}

function makeSkyStars(count: number): FieldStar[] {
  const stars: FieldStar[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: hash(i, 21),
      y: hash(i, 22),
      z: hash(i, 23),
      brightness: 0.25 + hash(i, 24) * 0.75,
      phase: hash(i, 25) * TAU,
    });
  }
  return stars;
}

function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}

function hash(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

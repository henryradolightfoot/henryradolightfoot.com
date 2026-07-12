const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let stars = [];

function resize() {
  const scale = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  const count = Math.min(180, Math.max(80, Math.floor((width * height) / 9000)));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.6 + 0.3,
    pulse: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.004
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.pulse += star.speed;
    const alpha = 0.35 + Math.sin(star.pulse) * 0.25;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();

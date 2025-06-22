const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let drops = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = document.querySelector('.hero').offsetHeight;
}

function createRainDrops(num) {
  drops = [];
  for (let i = 0; i < num; i++) {
    drops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.2 + 0.1
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(174,194,224,0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let drop of drops) {
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
  }

  ctx.stroke();
}

function updateRain() {
  for (let drop of drops) {
    drop.y += drop.speed;
    if (drop.y > height) {
      drop.y = -drop.length;
      drop.x = Math.random() * width;
    }
  }
}

function animate() {
  drawRain();
  updateRain();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createRainDrops(150);
});

resizeCanvas();
createRainDrops(150);
animate();

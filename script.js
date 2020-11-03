const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
  x: 0,
  y: 400,
  width: 40,
  height: 56,
  frameX: 0,
  frameY: 0,
  speed: 8,
  moving: false,
};
const playerSprite = new Image();
playerSprite.src = "hulk.png";
const background = new Image();
background.src = "background.png";

function drawSprite(
  img,
  sprintX,
  sprintY,
  sprintWidth,
  sprintHeight,
  drawX,
  drawY,
  drawWidth,
  drawHeight
) {
  ctx.drawImage(
    img,
    sprintX,
    sprintY,
    sprintWidth,
    sprintHeight,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );
}

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  delete keys[event.key];
  player.moving = false;
});

function movePlayer() {
  if (keys["ArrowUp"] && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }

  if (keys["ArrowDown"] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) player.frameX++;
  else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    handlePlayerFrame();
  }
}
startAnimating(30);

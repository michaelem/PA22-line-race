import Player from "./player"
import Level from "./level"

var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var playerOne: Player;
var viewPosition: number;
var level: Level
var lost = false;

// system variables
var last_tick_t = 0;
var width: number;
var height: number;

function draw() {
  if (lost) {
    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);
    return;
  }
  context.resetTransform();
  context.clearRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  playerOne.draw(viewPosition);
  level.draw(viewPosition);
}

function update(dt: number) {
  playerOne.move(dt);
  // Center viewport on player one:
  viewPosition = playerOne.positionX - width / 2;
  if (level.collide(playerOne.positionX, playerOne.positionY)) {
    lost = true;
  }
}

function loop(t_ms: number) {
  // calculate dt
  let dt = t_ms - last_tick_t;
  last_tick_t = t_ms;

  update(dt / 1000); // to seconds
  draw();

  window.requestAnimationFrame(loop);
}

function resized() {
  width = window.innerWidth;
  height = window.innerHeight;
  if (width > height) {
    canvas.width = height;
    canvas.height = height;
  } else {
    canvas.width = width;
    canvas.height = width;
  }
}

function keyDownListner(event: KeyboardEvent) {
  switch(event.code) {
    case "ArrowUp":
      playerOne.moveUp();
      break;
    case "ArrowDown":
      playerOne.moveDown();
      break;
  }
}

function main() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  width = canvas.width;
  height = canvas.height;

  viewPosition = width / 2;

  context = canvas.getContext("2d")!;
  window.addEventListener("keydown", keyDownListner);
  // window.addEventListener("resize", resized);
  // resized();

  playerOne = new Player("orange", context);
  level = new Level(context);

  loop(performance.now());
}

main();

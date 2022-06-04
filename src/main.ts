import Player from "./player"
import Level from "./level"

var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var playerOne: Player;
var playerTwo: Player;

var viewPosition: number;
var level: Level
var lost = false;
var won = false;

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

  if (won) {
    context.fillStyle = "green";
    context.fillRect(0, 0, width, height);
    return;
  }

  context.resetTransform();
  context.clearRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  playerOne.draw(viewPosition);
  playerTwo.draw(viewPosition);
  level.draw(viewPosition);
}

function update(dt: number) {
  if (lost) {
    return;
  }

  if (won) {
    return;
  }

  playerOne.update(dt);
  playerTwo.update(dt);

  // Center viewport on player one:
  viewPosition = playerOne.positionX - width / 2;

  if (level.collide(playerOne.positionX, playerOne.positionY)) {
    lost = true;
  }
  if (level.collide(playerTwo.positionX, playerTwo.positionY)) {
    lost = true;
  }

  if (level.finish(playerOne.positionX)) {
    won = true;
  }

  if (level.finish(playerTwo.positionX)) {
    won = true;
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
    case "KeyW":
      playerTwo.moveUp();
      break;
    case "KeyS":
      playerTwo.moveDown();
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

  playerOne = new Player("right player", "orange", context, 190);
  playerTwo = new Player("left player", "green", context, 210);
  level = new Level(context);

  loop(performance.now());
}

main();

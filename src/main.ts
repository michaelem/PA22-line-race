import Player from "./player";
import Level from "./level";
import { Point, DrawScale } from "./drawing";

var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var players: Player[];

var viewPosition: number;
var level: Level;
var lost = false;
var looser: string;
var won = false;
var winner: string;

// system variables
var last_tick_t = 0;
var width: number;
var height: number;

function drawScale(): DrawScale {
  return { xScale: width / 400, yScale: height / 400 };
}

function draw() {
  context.resetTransform();

  if (lost) {
    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);

    context.font = `${30 * drawScale().yScale}px sans-serif`;
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(
      `🙈 ${looser} lost`,
      200 * drawScale().xScale,
      200 * drawScale().yScale
    );
    return;
  }

  if (won) {
    context.fillStyle = "green";
    context.fillRect(0, 0, width, height);

    context.font = `${30 * drawScale().yScale}px sans-serif`;
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(
      `🚀 ${winner} won`,
      200 * drawScale().xScale,
      200 * drawScale().yScale
    );
    return;
  }

  context.clearRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  for (let player of players) {
    player.draw(viewPosition, drawScale());
  }
  level.draw(viewPosition, drawScale());
}

function update(dt: number) {
  if (lost) {
    return;
  }

  if (won) {
    return;
  }

  for (let player of players) {
    player.update(dt);
  }

  // Center viewport on average player position:
  const averagePosition =
    players.reduce((total, next) => total + next.positionX, 0) / players.length;
  viewPosition = averagePosition - 200;

  for (let player of players) {
    if (level.collide(player.positionX, player.positionY)) {
      lost = true;
      looser = player.name;
    }
  }

  for (let player of players) {
    if (level.finish(player.positionX)) {
      won = true;
      winner = player.name;
    }
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
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  console.log(width, height);
  if (wWidth > wHeight) {
    width = wHeight;
    height = wHeight;
  } else {
    width = wWidth;
    height = wWidth;
  }
  canvas.width = width;
  canvas.height = height;
}

function keyDownListner(event: KeyboardEvent) {
  for (let player of players) {
    if (event.code == player.upKeyCode) {
      player.moveUp();
    }
    if (event.code == player.downKeyCode) {
      player.moveDown();
    }
  }
}

function main() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  width = canvas.width;
  height = canvas.height;

  viewPosition = 200;

  context = canvas.getContext("2d")!;
  window.addEventListener("keydown", keyDownListner);
  window.addEventListener("resize", resized);
  resized();

  players = [
    new Player("right player", "orange", context, 190, "ArrowUp", "ArrowDown"),
    new Player("left player", "green", context, 210, "KeyW", "KeyS"),
  ];
  level = new Level(context);

  loop(performance.now());
}

main();

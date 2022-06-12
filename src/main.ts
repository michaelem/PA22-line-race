import Player from "./player";
import Level from "./level";
import EndScreen from "./end-screen";
import PauseOverlay from "./pause-overlay";
import { Point, DrawScale } from "./drawing";

enum State {
  'running',
  'paused',
  'lost',
  'won'
}

// game variables
var players: Player[];
var viewPosition: number;
var level: Level;

var state: State = State.running;
var looser: string;
var winner: string;
var endScreen: EndScreen;

// system variables
var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var last_tick_t = 0;
var width: number;
var height: number;
var drawScale: DrawScale;

function draw() {
  context.resetTransform();

  if (state == State.lost) {
    endScreen.draw(`🙈 ${looser} lost`, "red", drawScale);
    return;
  }

  if (state == State.won) {
    endScreen.draw(`🚀 ${winner} won`, "green", drawScale);
    return;
  }

  context.clearRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  for (let player of players) {
    player.draw(viewPosition, drawScale);
  }
  level.draw(viewPosition, drawScale);

  if (state == State.paused) {
    const overlay = new PauseOverlay(context);
    overlay.draw(drawScale);
  }
}

function update(dt: number) {
  if (state == State.won || state == State.lost || state == State.paused) {
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
      state = State.lost;
      looser = player.name;
    }
  }

  for (let player of players) {
    if (level.finish(player.positionX)) {
      state = State.won;
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
  if (wWidth > wHeight) {
    width = wHeight;
    height = wHeight;
  } else {
    width = wWidth;
    height = wWidth;
  }
  canvas.width = width;
  canvas.height = height;

  drawScale = { xScale: width / 400, yScale: height / 400 };
}

function keyDownListner(event: KeyboardEvent) {
  if (event.code == "Space") {
    if (state == State.running) {
      state = State.paused;
    } else {
      state = State.running
    }
  }

  for (let player of players) {
    if (event.code == player.upKeyCode) {
      player.moveUp();
    }
    if (event.code == player.downKeyCode) {
      player.moveDown();
    }
  }
  if (event.code == "KeyR" && (state == State.won || state == State.lost)) {
    players = Player.createPlayers(context);

    for (let player of players) {
      player.positionX = level.startLine;
    }
    state = State.running
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

  players = Player.createPlayers(context);
  level = new Level(context);
  endScreen = new EndScreen(context);

  loop(performance.now());
}

main();

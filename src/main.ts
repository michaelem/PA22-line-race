import Player from "./player";
import Level from "./level";
import EndScreen from "./end-screen";
import PauseOverlay from "./pause-overlay";
import MenuScreen from "./menu-screen";
import KeyState from "./key-state";

import { DrawScale } from "./drawing";

enum State {
  "menu",
  "running",
  "paused",
  "lost",
  "won",
}

// game variables
var players: Player[];
var viewPosition: number;
var level: Level;

var state: State = State.menu;
var lastGameMode: string = "start-1-p";
var looser: string;
var winner: string;
var endScreen: EndScreen;
var menuScreen: MenuScreen;
var timer: number;

// system variables
var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var lastTime = 0;
var width: number;
var height: number;
var drawScale: DrawScale;
var keyState: KeyState = new KeyState();

function draw() {
  context.resetTransform();

  if (state == State.menu) {
    menuScreen.draw(drawScale);
    return;
  }

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

  level.draw(viewPosition, drawScale);
  for (let player of players) {
    player.draw(viewPosition, drawScale);
  }

  context.fillStyle = "rgba(128, 20, 20, 0.7)";;
  context.textAlign = "right";
  context.font = `${30*drawScale.yScale}px RobotMono-Regular`;
  const timerText = String(timer.toFixed(2)).split('.')
  context.fillText(`${timerText[0]}:${timerText[1]}`, (390 * drawScale.xScale), (30 * drawScale.yScale))
  if (state == State.paused) {
    const overlay = new PauseOverlay(context);
    overlay.draw(drawScale);
  }
}

function update(dt: number) {
  if (state != State.running) {
    return;
  }

  for (let player of players) {
    player.update(dt, keyState);
  }

  // Center viewport on average player position:
  const averagePosition =
    players.reduce((total, next) => total + next.position.x, 0) / players.length;
  viewPosition = averagePosition - 200;

  for (let player of players) {
    if (level.collide(player.position.x, player.position.y)) {
      state = State.lost;
      looser = player.name;
    }

    if (level.crossedStartLine(player.position) && !level.crossedFinishLine(player.position)) {
      timer = timer + dt;
    } 


    if (level.crossedFinishLine(player.position)) {
      state = State.won;
      winner = player.name;
    }
  }
}

function loop(time: number) {
  // calculate dt
  let dt = time - lastTime;
  lastTime = time;

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

function startGame(withTutorial = true) {
  timer = 0;
  switch (lastGameMode) {
    case "start-1-p": {
      players = Player.createPlayer(context);
      break;
    }
    case "start-2-p": {
      players = Player.createPlayers(context);
      break;
    }
    default: {
      return;
    }
  }

  if (withTutorial == false) {
    for (let player of players) {
      player.position.x = level.startLine;
    }
  }

  state = State.running;
}

function keyDownListner(event: KeyboardEvent) {
  switch (state) {
    case State.lost:
      if (event.code == "KeyR") {
        startGame(false);
      }
      break;

    case State.won:
      if (event.code == "KeyR") {
        startGame(false);
      }
      break;

    case State.running:
      if (event.code == "Space") {
        state = State.paused;
      }
      break;

    case State.paused:
      if (event.code == "Space") {
        state = State.running;
      }
      break;

    case State.menu:
      lastGameMode = menuScreen.handleKey(event.code);
      startGame();
      break;
  }
}

function main() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  width = canvas.width;
  height = canvas.height;

  viewPosition = 200;

  context = canvas.getContext("2d")!;
  window.addEventListener("keydown", keyDownListner);
  window.addEventListener("keydown", (event) => keyState.onKeydown(event));
  window.addEventListener("keyup", (event) => keyState.onKeyup(event));
  window.addEventListener("resize", resized);
  resized();

  players = Player.createPlayers(context);
  level = new Level(context);
  endScreen = new EndScreen(context);

  menuScreen = new MenuScreen(context);

  loop(performance.now());
}

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    main();
  }
}
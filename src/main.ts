var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var playerOne: Player;

// system variables
var last_tick_t = 0;
var width: number;
var height: number;
var keyStates: Set<string> = new Set();

class Player {
  positionX: number;
  positionY: number;
  speed: number;
  context: CanvasRenderingContext2D;
  color: string;

  constructor(color: string, context: CanvasRenderingContext2D) {
    this.speed = 10;
    this.positionX = 200;
    this.positionY = 200;
    this.context = context;
    this.color = color;
  }

  moveUp() {
    this.positionY = this.positionY - 20;
  }

  moveDown() {
    this.positionY = this.positionY + 20;
  }

  draw() {
    const ctx = this.context;
    ctx.resetTransform();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.positionY);
    ctx.lineTo(this.positionX, this.positionY);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

function draw() {
  context.resetTransform();
  context.clearRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  playerOne.draw();
}

function update(dt: number) {
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

  context = canvas.getContext("2d")!;
  window.addEventListener("keydown", keyDownListner);
  // window.addEventListener("resize", resized);
  // resized();

  playerOne = new Player("orange", context);

  loop(performance.now());
}

main();

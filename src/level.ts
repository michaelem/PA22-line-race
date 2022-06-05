export default class Level {
  context: CanvasRenderingContext2D;
  end: number = 4300;
  squares: Square[] = [
    { x: 0, y: 0, size: 50 },
    { x: 0, y: 400, size: 50 },
    { x: 200, y: 400, size: 50 },
    { x: 200, y: 0, size: 50 },
    { x: 400, y: 400, size: 50 },
    { x: 400, y: 0, size: 50 },
    { x: 600, y: 400, size: 50 },
    { x: 600, y: 0, size: 50 },
    { x: 800, y: 400, size: 50 },
    { x: 800, y: 0, size: 50 },
    { x: 1000, y: 400, size: 50 },
    { x: 1000, y: 0, size: 50 },
    { x: 1200, y: 400, size: 50 },
    { x: 1200, y: 0, size: 50 },
    { x: 1400, y: 400, size: 50 },
    { x: 1400, y: 0, size: 50 },
    { x: 1600, y: 400, size: 50 },
    { x: 1600, y: 0, size: 50 },
    { x: 1620, y: 200, size: 50 },
    { x: 1800, y: 400, size: 50 },
    { x: 1800, y: 0, size: 50 },
    { x: 2000, y: 400, size: 50 },
    { x: 2000, y: 0, size: 50 },
    { x: 2200, y: 0, size: 50 },
    { x: 2200, y: 400, size: 50 },
    { x: 2400, y: 0, size: 100 },
    { x: 2400, y: 400, size: 100 },
    { x: 2600, y: 200, size: 50 },
    { x: 2600, y: 0, size: 100 },
    { x: 2600, y: 400, size: 100 },
    { x: 2750, y: 320, size: 80 },
    { x: 2750, y: 200, size: 80 },
    { x: 2750, y: 80, size: 80 },
    { x: 2900, y: 400, size: 100 },
    { x: 2900, y: 200, size: 100 },
    { x: 2900, y: 0, size: 100 },
    { x: 3300, y: 0, size: 350 },
    { x: 3300, y: 400, size: 350 },
    { x: 3800, y: 200, size: 150 },
    { x: 3800, y: 0, size: 150 },
    { x: 3800, y: 400, size: 150 },
  ];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  collide(x: number, y: number): boolean {
    for (let square of this.squares) {
      const squareX = square.x - square.size / 2;

      if (x >= squareX && x <= squareX + square.size) {
        const squareY = square.y - square.size / 2;

        if (y >= squareY && y <= squareY + square.size) {
          return true;
        }
      }
    }
    return false;
  }

  finish(x: number) {
    return x >= this.end;
  }

  draw(viewPosition: number) {
    const ctx = this.context;
    for (let square of this.squares) {
      const x = square.x - square.size / 2 - viewPosition;
      const y = square.y - square.size / 2;
      ctx.strokeStyle = "white";
      ctx.strokeRect(x, y, square.size, square.size);
    }

    if (viewPosition < 2500) {
      ctx.font = "30px sans-serif";
      ctx.textAlign = "left";

      ctx.fillStyle = "green";
      ctx.fillText("Left is green", 400 - viewPosition, 300);
      ctx.fillText("Use 'w' and 's' to move", 800 - viewPosition, 300);

      ctx.fillStyle = "orange";
      ctx.fillText("Right is orange", 400 - viewPosition, 130);
      ctx.fillText("Use 'up' and 'down' to move", 800 - viewPosition, 130);

      ctx.fillStyle = "grey";
      ctx.fillText(`avoid the squares =>`, 1300 - viewPosition, 210);

      ctx.fillStyle = "grey";
      ctx.fillText(`get to finish first!`, 1900 - viewPosition, 210);

      ctx.beginPath();
      ctx.moveTo(2400 - viewPosition, 50);
      ctx.lineTo(2400 - viewPosition, 350);
      ctx.strokeStyle = "grey";
      ctx.stroke()
    }
    ctx.beginPath();
    ctx.moveTo(4300 - viewPosition, 0);
    ctx.lineTo(4300 - viewPosition, 400);
    ctx.strokeStyle = "grey";
    ctx.stroke()
  }
}

interface Square {
  x: number;
  y: number;
  size: number;
}

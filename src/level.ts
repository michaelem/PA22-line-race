import { DrawScale, Point } from "./drawing";

export default class Level {
  context: CanvasRenderingContext2D;
  startLine: number = 2400;
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

  crossedStartLine(position: Point): boolean {
    return position.x > this.startLine
  }

  crossedFinishLine(position: Point): boolean {
    return position.x >= this.end;
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

  draw(viewPosition: number, drawScale: DrawScale) {
    const ctx = this.context;
    ctx.lineWidth = 2 * drawScale.yScale;
    for (let square of this.squares) {
      const x = square.x - square.size / 2 - viewPosition;
      const y = square.y - square.size / 2;
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        x * drawScale.xScale,
        y * drawScale.yScale,
        square.size * drawScale.xScale,
        square.size * drawScale.yScale
      );
    }

    if (viewPosition < 2500) {
      ctx.font = `${30*drawScale.yScale}px KdamThmorPro-Regular`;
      ctx.textAlign = "left";

      ctx.fillStyle = "green";
      ctx.fillText(
        "Left is green",
        (400 - viewPosition) * drawScale.xScale,
        300 * drawScale.yScale
      );
      ctx.fillText(
        "Use 'w' and 's' to move",
        (800 - viewPosition) * drawScale.xScale,
        300 * drawScale.yScale
      );

      ctx.fillStyle = "orange";
      ctx.fillText(
        "Right is orange",
        (400 - viewPosition) * drawScale.xScale,
        130 * drawScale.yScale
      );
      ctx.fillText(
        "Use 'up' and 'down' to move",
        (800 - viewPosition) * drawScale.xScale,
        130 * drawScale.yScale
      );

      ctx.fillStyle = "grey";
      ctx.fillText(
        `avoid the squares =>`,
        (1300 - viewPosition) * drawScale.xScale,
        210 * drawScale.yScale
      );

      ctx.fillStyle = "grey";
      ctx.fillText(
        `get to finish first!`,
        (1900 - viewPosition) * drawScale.xScale,
        210 * drawScale.yScale
      );

      ctx.beginPath();
      ctx.moveTo(
        (this.startLine - viewPosition) * drawScale.xScale,
        50 * drawScale.yScale
      );
      ctx.lineTo(
        (this.startLine - viewPosition) * drawScale.xScale,
        350 * drawScale.yScale
      );
      ctx.strokeStyle = "grey";
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo((4300 - viewPosition) * drawScale.xScale, 0 * drawScale.yScale);
    ctx.lineTo(
      (4300 - viewPosition) * drawScale.xScale,
      400 * drawScale.yScale
    );
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
}

interface Square {
  x: number;
  y: number;
  size: number;
}

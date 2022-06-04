export default class Level {
  context: CanvasRenderingContext2D;
  end: number = 1200;
  squares: Square[] = [
    { x: 0, y: 0, size: 50 },
    { x: 0, y: 400, size: 50 },
    { x: 200, y: 0, size: 50 },
    { x: 200, y: 400, size: 50 },
    { x: 400, y: 0, size: 100 },
    { x: 400, y: 400, size: 100 },
    { x: 600, y: 200, size: 50 },
    { x: 600, y: 0, size: 100 },
    { x: 600, y: 400, size: 100 },
    { x: 700, y: 300, size: 80 },
    { x: 700, y: 200, size: 80 },
    { x: 700, y: 100, size: 80 },
    { x: 900, y: 400, size: 100 },
    { x: 900, y: 200, size: 100 },
    { x: 900, y: 0, size: 100 },
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
  }
}

interface Square {
  x: number;
  y: number;
  size: number;
}

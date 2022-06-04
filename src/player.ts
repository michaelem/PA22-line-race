export default class Player {
  positionX: number;
  positionY: number;
  speed: number;
  context: CanvasRenderingContext2D;
  color: string;
  trail: Point[];

  constructor(color: string, context: CanvasRenderingContext2D) {
    this.speed = 50;
    this.positionX = 200;
    this.positionY = 200;
    this.context = context;
    this.color = color;
    
    this.trail = [{ x: 0, y: 200}];
  }

  moveUp() {
    this.positionY = this.positionY - 20;
  }

  moveDown() {
    this.positionY = this.positionY + 20;
  }

  move(dt: number) {
    this.trail.push({ x: this.positionX, y: this.positionY })
    console.log(this.trail);
    this.positionX = this.positionX + this.speed * dt;
  }

  draw(viewPosition: number) {
    const ctx = this.context;
    ctx.resetTransform();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.trail[0].x-viewPosition, this.trail[0].y);

    for (let point of this.trail) {
      ctx.lineTo(point.x-viewPosition, point.y);
    }

    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

interface Point {
  x: number,
  y: number
}
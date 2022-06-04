export default class Player {
  positionX: number;
  positionY: number;
  speed: number;
  context: CanvasRenderingContext2D;
  color: string;

  constructor(color: string, context: CanvasRenderingContext2D) {
    this.speed = 50;
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

  move(dt: number) {
    this.positionX = this.positionX + this.speed * dt;
  }

  draw(viewPosition: number) {
    const ctx = this.context;
    ctx.resetTransform();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, this.positionY);
    ctx.lineTo(this.positionX-viewPosition, this.positionY);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
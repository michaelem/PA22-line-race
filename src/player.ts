import { Point, DrawScale } from "./drawing";
export default class Player {
  name: string;
  positionX: number;
  positionY: number;
  targetY: number;
  movementTimer: number;
  speed: number;
  context: CanvasRenderingContext2D;
  color: string;
  trail: Point[];
  upKeyCode: string;
  downKeyCode: string;

  constructor(
    name: string,
    color: string,
    context: CanvasRenderingContext2D,
    startY: number,
    upKeyCode: string,
    downKeyCode: string
  ) {
    this.name = name;
    this.speed = 50;
    this.positionX = 200;
    this.positionY = startY;
    this.targetY = startY;
    this.movementTimer = 0;
    this.context = context;
    this.color = color;
    this.upKeyCode = upKeyCode;
    this.downKeyCode = downKeyCode;

    this.trail = [{ x: 0, y: startY }];
  }

  maxedOutMovement(): boolean {
    // return Math.abs(this.targetY - this.positionY) >= 1;
    return this.movementTimer > 0;
  }

  moveUp() {
    if (!this.maxedOutMovement()) {
      this.movementTimer = 0.25;
      this.targetY = this.targetY - 10;
    }
  }

  moveDown() {
    if (!this.maxedOutMovement()) {
      this.movementTimer = 0.25;
      this.targetY = this.targetY + 10;
    }
  }

  update(dt: number) {
    this.trail.push({ x: this.positionX, y: this.positionY });
    this.positionX = this.positionX + this.speed * dt;
    let speed: number;

    if (Math.abs(this.targetY - this.positionY) > 0) {
      speed =
        (this.speed - 30) *
        (Math.cos((this.movementTimer / 0.25) * Math.PI) + 1);

      if (this.targetY - this.positionY > 0) {
        this.positionY = Math.min(this.targetY, this.positionY + speed * dt);
      } else {
        this.positionY = Math.max(this.targetY, this.positionY - speed * dt);
      }
    } else {
      speed = this.speed;
    }

    this.positionX = this.positionX + speed * dt;

    if (this.movementTimer > 0) {
      this.movementTimer = this.movementTimer - dt;
    }
  }

  draw(viewPosition: number, drawScale: DrawScale) {
    const ctx = this.context;
    ctx.resetTransform();

    this.drawTrail(viewPosition, drawScale);
  }

  drawTrail(viewPosition: number, drawScale: DrawScale) {
    this.cutTrail(viewPosition);

    const ctx = this.context;

    ctx.beginPath();
    ctx.lineWidth = 2 * drawScale.yScale;
    ctx.moveTo(
      (this.trail[0].x - viewPosition) * drawScale.xScale,
      this.trail[0].y * drawScale.yScale
    );

    for (let point of this.trail) {
      ctx.lineTo(
        (point.x - viewPosition) * drawScale.xScale,
        point.y * drawScale.yScale
      );
    }

    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  cutTrail(viewPosition: number) {
    this.trail = this.trail.filter((point) => point.x >= viewPosition - 200);
  }
}

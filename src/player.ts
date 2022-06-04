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

  constructor(name: string, color: string, context: CanvasRenderingContext2D, startY: number) {
    this.name = name;
    this.speed = 50;
    this.positionX = 200;
    this.positionY = startY;
    this.targetY = startY;
    this.movementTimer = 0;
    this.context = context;
    this.color = color;

    this.trail = [{ x: 0, y: startY }];
  }

  maxedOutMovement(): boolean {
    console.log(`target: ${this.targetY} position: ${this.positionY}`);
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

    if (Math.abs(this.targetY - this.positionY) > 0) {
      const speed = this.speed * (Math.cos(this.movementTimer/0.25 * Math.PI) + 1)
      if (this.targetY - this.positionY > 0) { 

        this.positionY = Math.min(this.targetY, this.positionY + speed * dt)
      } else {
        this.positionY = Math.max(this.targetY, this.positionY - speed * dt)
      }
      // this.positionY = this.positionY + ((this.targetY - this.positionY)) * (this.movementTimer * dt);
    }

    if (this.movementTimer > 0) {
      console.log(Math.cos(this.movementTimer/0.25))
      this.movementTimer = this.movementTimer - dt;
    }
  }

  draw(viewPosition: number) {
    const ctx = this.context;
    ctx.resetTransform();

    this.drawTrail(viewPosition);
  }

  drawTrail(viewPosition: number) {
    this.cutTrail(viewPosition);

    const ctx = this.context;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.trail[0].x - viewPosition, this.trail[0].y);

    for (let point of this.trail) {
      ctx.lineTo(point.x - viewPosition, Math.round(point.y));
    }

    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  cutTrail(viewPosition: number) {
    this.trail = this.trail.filter((point) => point.x >= viewPosition - 200);
  }
}

interface Point {
  x: number;
  y: number;
}

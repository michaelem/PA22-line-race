import { Point, DrawScale } from "./drawing";
import KeyState from "./key-state";

export default class Player {
  name: string;
  color: string;
  context: CanvasRenderingContext2D;
  upKeyCode: string;
  downKeyCode: string;

  position: Point;
  speed: number;
  direction: number;
  trail: Point[];

  constructor(
    name: string,
    color: string,
    context: CanvasRenderingContext2D,
    startY: number,
    upKeyCode: string,
    downKeyCode: string
  ) {
    this.name = name;
    this.speed = 100;
    this.position = { x: 200, y: startY };
    this.context = context;
    this.color = color;
    this.upKeyCode = upKeyCode;
    this.downKeyCode = downKeyCode;
    this.direction = 0;

    this.trail = [{ x: 0, y: startY }];
  }

  static createPlayer(context: CanvasRenderingContext2D) {
    return [
      new Player(
        "right player",
        "orange",
        context,
        200,
        "ArrowUp",
        "ArrowDown"
      ),
    ];
  }

  static createPlayers(context: CanvasRenderingContext2D) {
    return [
      new Player(
        "right player",
        "orange",
        context,
        190,
        "ArrowUp",
        "ArrowDown"
      ),
      new Player("left player", "green", context, 210, "KeyW", "KeyS"),
    ];
  }

  private moveUp(dt: number) {
    const change = -90 * dt;
    this.direction = Math.max(-30, this.direction + change);
  }

  private moveDown(dt: number) {
    const change = 90 * dt;
    this.direction = Math.min(30, this.direction + change);
  }

  private moveBack(dt: number) {
    const change = 90 * dt;

    if (this.direction >= 0) {
      this.direction = Math.max(0, this.direction - change);
    } else {
      this.direction = Math.min(0, this.direction + change);
    }

    this.direction;
  }

  update(dt: number, keyState: KeyState) {
    this.trail.push(this.position);

    if (keyState.isDown(this.upKeyCode)) {
      this.moveUp(dt);
    } else if (keyState.isDown(this.downKeyCode)) {
      this.moveDown(dt);
    } else {
      this.moveBack(dt);
    }

    if (this.direction != 0) {
      this.speed = 80;
    } else {
      this.speed = 100;
    }

    const distanceTraveled = this.speed * dt;
    const newX =
      this.position.x +
      Math.cos(this.direction * (Math.PI / 180)) * distanceTraveled;
    const newY =
      this.position.y +
      Math.sin(this.direction * (Math.PI / 180)) * distanceTraveled;

    this.position = { x: newX, y: newY };
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

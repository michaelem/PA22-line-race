import { DrawScale } from "./drawing";

export default class EndScreen {
  constructor(private context: CanvasRenderingContext2D) {}

  draw(text: string, fillStyle: string, drawScale: DrawScale) {
    const ctx = this.context;

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, 400 * drawScale.xScale, 400 * drawScale.yScale);

    ctx.font = `${30 * drawScale.yScale}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(text, 200 * drawScale.xScale, 200 * drawScale.yScale);

    ctx.font = `${20 * drawScale.yScale}px sans-serif`;
    ctx.fillText(
      "press 'r' to restart",
      200 * drawScale.xScale,
      230 * drawScale.yScale
    );
    return;
  }
}

import { DrawScale } from "./drawing";

export default class PauseOverlay {
  constructor(private context: CanvasRenderingContext2D) {}

  draw(drawScale: DrawScale) {
    const ctx = this.context;
    ctx.fillStyle = "rgba(20,20,20,0.8)";
    ctx.fillRect(0, 0, 400 * drawScale.xScale, 400 * drawScale.yScale);

    ctx.globalAlpha = 2.0;

    ctx.font = `${30 * drawScale.yScale}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(`paused`, 200 * drawScale.xScale, 200 * drawScale.yScale);
  }
}

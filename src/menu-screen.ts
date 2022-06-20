import { DrawScale } from "./drawing";

interface MenuItem {
  key: string;
  title: string;
  color: string;
}

const menu: MenuItem[] = [
  { key: "start-1-p", title: "start single player game", color: "orange" },
  { key: "start-2-p", title: "start two player game", color: "green" },
];

const spacing = 28;

export default class MenuScreen {
  selected: string = menu[0].key;

  constructor(private context: CanvasRenderingContext2D) {}

  draw(drawScale: DrawScale) {
    const ctx = this.context;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400 * drawScale.xScale, 400 * drawScale.yScale);

    ctx.font = `${spacing * drawScale.yScale}px KdamThmorPro-Regular`;
    
    ctx.textAlign = "left";

    const start = 200 - (menu.length * spacing) / 2;

    menu.forEach((menuItem: MenuItem, index: number) => {
      if (this.selected == menuItem.key) {
        ctx.fillStyle = menuItem.color;
      } else {
        ctx.fillStyle = "grey";
      }
      ctx.fillText(
        menuItem.title,
        spacing * drawScale.xScale,
        (start + (index + 1) * spacing) * drawScale.yScale
      );
    });

    return;
  }

  handleKey(key: string): string {
    let index = menu.findIndex((e) => e.key == this.selected);
    let result = "stay";

    switch (key) {
      case "Enter": {
        result = this.selected;
        break;
      }
      case "ArrowUp": {
        if (index > 0) {
          index = index - 1;
        }
        break;
      }
      case "ArrowDown": {
        if (index < menu.length) {
          index = index + 1;
        }
        break;
      }
    }

    this.selected = menu[index].key;
    return result;
  }
}

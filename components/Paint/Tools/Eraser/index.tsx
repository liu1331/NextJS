import React from "react";
import { getCoords } from "utils/getCoords";
import { Brush } from "..";

export class Eraser extends Brush {
  width = 10;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas, "eraser");
  }

  drawFunction = (x: number, y: number) => {
    if (!this.ctx2D || !this.canvas) return;
    this.ctx2D.strokeStyle = "white";
    this.ctx2D.lineWidth = this.width;
    this.ctx2D.lineTo(x, y);
    this.ctx2D.stroke();
  };
}

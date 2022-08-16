import React from "react";
import { getCoords } from "utils/getCoords";
import { Tool } from "..";
import { IToolProps, Tools } from "../type";

export class Brush extends Tool {
  constructor(canvas: IToolProps, name?: Tools) {
    super(canvas, name || "brush");

    this.initToolListners();
  }

  initToolListners() {
    if (!this.canvas) return;
    this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
    this.canvas.onmouseup = this.onMouseUpHandler.bind(this);
    this.canvas.onmousemove = this.onMouseMoveHandler.bind(this);
  }

  onMouseDownHandler(ev: any) {
    this.isMouseDown = true;
    const { x, y } = getCoords(ev);
    this.ctx2D?.beginPath();
    this.ctx2D?.lineTo(x, y);
  }
  onMouseUpHandler(e: any) {
    this.isMouseDown = false;
  }
  onMouseMoveHandler(ev: any) {
    if (this.isMouseDown) {
      const { x, y } = getCoords(ev);
      this.drawFunction(x, y);
    }
  }

  drawFunction = (x: number, y: number) => {
    this.ctx2D?.lineTo(x, y);
    this.ctx2D?.stroke();
  };
}

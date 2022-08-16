import React from "react";
import { getCoords } from "utils/getCoords";
import { Tool } from "../Tool";
import { IToolProps, Tools } from "../type";

export class Line extends Tool {
  saved: string | null = null;
  img: HTMLImageElement | null = null;
  currentX = 0;
  currentY = 0;
  constructor(canvas: IToolProps, name?: Tools) {
    super(canvas, name || "line");
    this.initToolListners();
  }
  initToolListners() {
    if (!this.canvas) return;
    this.canvas.onmousedown = this.onMouseDownHandler;
    this.canvas.onmouseup = this.onMouseUpHandler;
    this.canvas.onmousemove = this.onMouseMoveHandler;
  }
  onMouseDownHandler = (event: any) => {
    if (this.ctx2D === null || !this.canvas) return;
    this.isMouseDown = true;
    const { x, y } = getCoords(event);
    this.currentX = x;
    this.currentY = y;
    this.ctx2D.beginPath();
    this.ctx2D.moveTo(x, y);
    this.saved = this.canvas.toDataURL();
  };
  onMouseUpHandler = () => {
    this.isMouseDown = false;
  };
  onMouseMoveHandler = (event: any) => {
    if (this.isMouseDown) {
      const { x, y } = getCoords(event);

      this.drawFunction(x, y);
    }
  };

  drawFunction = (x: number, y: number) => {
    if (!this.saved || !this.ctx2D || !this.canvas) return;
    if (this.img === null) {
      this.img = new Image();
    }
    this.img.src = this.saved;
    this.img.onload = () => {
      if (!this.saved || !this.ctx2D || !this.canvas || !this.img) return;
      this.ctx2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx2D.drawImage(
        this.img,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.ctx2D.beginPath();
      this.ctx2D.moveTo(this.currentX, this.currentY);
      this.ctx2D.lineTo(x, y);
      this.ctx2D.stroke();
    };
  };
}

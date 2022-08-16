import React from "react";
import { Tools } from ".";

export class Tool {
  name: Tools = "";
  canvas: HTMLCanvasElement | null = null;
  ctx2D: CanvasRenderingContext2D | null = null;
  color = "black";
  width = 1;
  isMouseDown = false;
  constructor(canvas: HTMLCanvasElement, name: Tools) {
    this.canvas = canvas;
    this.name = name;
    if (this.canvas) this.ctx2D = canvas.getContext("2d");
    if (this.ctx2D) {
      this.ctx2D.strokeStyle = this.color;
      this.ctx2D.lineWidth = this.width;
    }

    this.removeListeners();
  }

  removeListeners() {
    if (!this.canvas) return;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }
  set setLineWidth(width: number) {
    if (this.ctx2D) this.ctx2D.lineWidth = width;
  }
  setColor(color: string) {
    if (this.ctx2D) {
      this.color = color;
      this.ctx2D.strokeStyle = color;
    }
  }
  setFillColor(color: string) {
    if (this.ctx2D) this.ctx2D.fillStyle = color;
  }
}

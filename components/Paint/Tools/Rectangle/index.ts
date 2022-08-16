import React, { Component } from 'react'
import { Line } from '../Line'
import { IToolProps, Tools } from '../type'

export  class Rectangle extends Line {
 constructor(canvas:IToolProps){
    super(canvas, "rectangle")
 }

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

    this.ctx2D.strokeRect(this.currentX,this.currentY, x - this.currentX, y - this.currentY)
    };


  };
}

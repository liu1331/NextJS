import React, { useEffect, useRef } from "react";

import { useCanvasContext } from "../Context";
import { Brush } from "../Tools/Brush";

import css from "./style.module.scss";

export const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setCanvas, setTool, canvas, setUndoList } = useCanvasContext();
  useEffect(() => {
    if (canvasRef.current !== null) {
      setCanvas(canvasRef.current);
      canvasRef.current.onmousedown = () => {};

      setTool(new Brush(canvasRef.current));
    }
  }, []);
  const onMouseDownHandler = () => {
    if (canvas) setUndoList(canvas.toDataURL());
  };
  return (
    <canvas
      onMouseDown={onMouseDownHandler}
      width={500}
      height={500}
      ref={canvasRef}
      className={css.canvas}
    >
      CanvasComponent
    </canvas>
  );
};

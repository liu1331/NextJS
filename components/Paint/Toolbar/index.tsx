import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { useCanvasContext } from "../Context";
import { Tools } from "../Tools";
import { Brush } from "../Tools/Brush";
import { Eraser } from "../Tools/Eraser";
import { Line } from "../Tools/Line";
import { Rectangle } from "../Tools/Rectangle";
import { tools } from "./config";

import css from "./style.module.scss";
export const Toolbar = () => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const { setTool, tool, canvas, undo, redo, download } = useCanvasContext();

  const onClick = (toolName: Tools) => {
    if (toolName === tool.name || !canvas) return;
    switch (toolName) {
      case "brush":
        setTool(new Brush(canvas));
        break;
      case "line":
        setTool(new Line(canvas));
        break;
      case "eraser":
        setTool(new Eraser(canvas));
        break;
      case "rectangle":
        setTool(new Rectangle(canvas));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (tool && colorInputRef.current) {
      colorInputRef.current.value = tool.color;
    }
  }, [tool]);

  return (
    <div>
      {tools.map((tool, i) => {
        return (
          <button
            className={css.toolButton}
            key={`${tool}-${i}`}
            onClick={() => onClick(tool)}
          >
            {tool}
          </button>
        );
      })}
      <button className={css.toolButton} onClick={() => undo()}>
        undo
      </button>
      <button className={css.toolButton} onClick={() => redo()}>
        redo
      </button>
      <button className={css.toolButton} onClick={() => download()}>
        download
      </button>
      {tool && (
        <input
          ref={colorInputRef}
          type="color"
          onChange={(e) => {
            tool.setColor(e.target.value);
          }}
        />
      )}
    </div>
  );
};

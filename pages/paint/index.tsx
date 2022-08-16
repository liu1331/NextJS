import React, { useEffect, useRef } from "react";
import {
  CanvasComponent,
  CanvasContextProvider,
  Toolbar,
} from "components/Paint";
import css from "./style.module.scss";

const Paint = () => {
  return (
    <div className={css.root}>
      <CanvasContextProvider>
        <Toolbar />
        <CanvasComponent />
      </CanvasContextProvider>
    </div>
  );
};
export default Paint;

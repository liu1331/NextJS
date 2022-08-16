import {
  createContext,
  FC,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const AppContext = createContext<IContextReturn>({
  canvas: null,
  tool: null,
  setCanvas: () => {},
  setTool: () => {},
  setUndoList: () => {},
  undo: () => {},
  redo: () => {},
  download: () => {},
});
interface ILists {
  undo: string[];
  redo: string[];
}
interface IProps {
  children?: React.ReactNode;
}
interface IContextReturn {
  canvas: HTMLCanvasElement | null;
  setCanvas: (e: any) => void;
  tool: any;
  setTool: (e: any) => void;
  setUndoList: (data: string) => void;
  undo: () => void;
  redo: () => void;
  download: () => void;
}

export const CanvasContextProvider: FC<IProps> = ({ children }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState(null);
  const lists = useRef<ILists>({
    redo: [],
    undo: [],
  });

  const value = useMemo(() => {
    const ctx = canvas?.getContext("2d");
    const undo = () => {
      if (!canvas) return;
      if (lists.current.undo.length > 0) {
        const lastImgData = lists.current.undo.pop();
        lists.current.redo.push(canvas.toDataURL());
        const img = new Image();
        img.src = lastImgData!;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      } else {
        ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    const redo = () => {
      if (!canvas) return;

      if (lists.current.redo.length > 0) {
        const lastImgData = lists.current.redo.pop();
        lists.current.undo.push(canvas.toDataURL());
        const img = new Image();
        img.src = lastImgData!;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
    };

    const setUndoList = (data: string) => {
      lists.current.undo.push(data);
    };

    const download = () => {
      if (!canvas) return;
      let link = document.createElement("a");
      link.download = "filename.png";
      link.href = canvas.toDataURL();
      link.click();
    };
    return {
      canvas,
      setCanvas,
      tool,
      setTool,
      setUndoList,
      undo,
      redo,
      download,
    };
  }, [canvas, tool]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useCanvasContext() {
  return useContext(AppContext);
}

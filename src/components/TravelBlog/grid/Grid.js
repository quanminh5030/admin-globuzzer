import React from "react";
import gCss from "./grid.module.css";

function Grid({ children }) {
  return <div className={gCss.grid}>{children}</div>;
}

export default Grid;

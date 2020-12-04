import React from "react";
import center from "./center.module.css";

function Center({ children, myClass }) {
  return <div className={myClass || center.container}>{children}</div>;
}

export default Center;

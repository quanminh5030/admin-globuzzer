import React from "react";
import flex from "./flex.module.css";

export default function Flex({ children, myClass = null }) {
  return <div className={myClass || flex.flex}>{children}</div>;
}

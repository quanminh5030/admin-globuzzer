import React from "react";
import section from "./section.module.css";

function Section({ children }) {
  return <section className={section.section}>{children}</section>;
}

export default Section;

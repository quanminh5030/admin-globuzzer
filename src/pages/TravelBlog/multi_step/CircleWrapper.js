import React from "react";

export default function circleWrapper({
  container,
  circle,
  number,
  label,
  style = null,
  chosen=null,
  lineClass,
}) {
  return (
    <div className={container}>
      <div className={circle} style={style}>
        {number}
      </div>

      <div className={lineClass}></div>
      <p style={chosen}>{label}</p>
    </div>
  );
}

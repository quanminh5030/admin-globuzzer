import React from "react";
import { IconContext } from "react-icons";

export default function Icon({ label, myClass = null }) {
  return (
    <IconContext.Provider
      value={{
        style: { verticalAlign: "middle" },
        className: myClass,
      }}
    >
      {label}
    </IconContext.Provider>
  );
}

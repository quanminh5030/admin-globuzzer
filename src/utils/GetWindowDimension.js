import React from "react";

export const GetWindowDimension = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  const updateWidthAndHeight = async () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  return { width, height };
};

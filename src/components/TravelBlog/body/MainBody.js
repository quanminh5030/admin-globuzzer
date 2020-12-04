import React from "react";

function MainBody({ children, myClass = null }) {
  const divStyle = {
    width: "95%",
    margin: "75px auto 0 auto",
    maxWidth: "1300px",
  };

  return (
    <div style={divStyle} className={myClass}>
      {children}
    </div>
  );
}

export default MainBody;

import React from "react";
import { CURRENT_YEAR } from "../../config";
import "./style.css";

const FooterCopyright = () => {
  return <p id="footer-copyright">© { CURRENT_YEAR } Globuzzer. All rights reserved</p>;
};

export default FooterCopyright;

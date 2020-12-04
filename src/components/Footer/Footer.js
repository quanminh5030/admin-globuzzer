import React, { useContext } from "react";
import logo from "../../assets/Footer/globuzzer_logo.png";
import FooterCopyRight from "./FooterCopyright";
import FooterIcons from "./FooterIcons";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import { FooterContext } from "../../pages/TravelBlog/contexts/refContext";
import "./style.css";

const mapLink = `https://www.google.com/maps/place/Back%C3%A4ngsv%C3%A4gen+24,+192+73+Sollentuna/@59.4576364,17.
8907952,17z/data=!3m1!4b1!4m5!3m4!1s0x465f98b09703d6db:0x75988cff7b409cd4!8m2!3d59.4576337!4d17.8929839?shorturl=1`;
export const Footer = () => {
  const myRef = useContext(FooterContext);
  const { width } = GetWindowDimension();
  const FooterDesktop = () => (
    <footer id="main_footer" ref={myRef}>
      <img src={logo} alt="logo" className="footer-logo" />
      <div className="footer-content">
        <div className="footer-content-column">
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            Backängsvägen 24 <br />
            192 73 Sollentuna, Sweden
          </a>
          <a href="tel:+46 73 555 5 134">+46 73 555 5 134</a>
          <a
            href="mailto:info@globuzzer.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@globuzzer.com
          </a>
        </div>
        <div className="footer-content-column">
          <a href="/#section_newcity">Destination</a>

          <a href="/#featured_articles">Articles</a>
          <a href="/#aux_services">Services</a>
          <div id="buffer" />
        </div>
        <div className="footer-content-column">
          <a href="https://www.mightynetworks.com/terms-of-use">
            Terms & Conditions{" "}
          </a>
          <a href="https://www.mightynetworks.com/privacy-policy">
            {" "}
            Privacy Policy
          </a>
        </div>
        <div className="footer-content-column">
          <a href="../../pages/Home.js" id="footer-follow">
            FOLLOW US
          </a>
          <FooterIcons />
        </div>
      </div>
      <FooterCopyRight />
    </footer>
  );
  const FooterMobile = () => (
    <footer>
      <img src={logo} alt="logo" className="footer-logo" />
      <div className="footer-content">
        <div className="footer-content-column">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: "center" }}
          >
            Backängsvägen 24 <br />
            192 73 Sollentuna, Sweden
          </a>
          <a href="tel:+46 73 555 5 134">+46 73 555 5 134</a>
          <a
            href="mailto:info@globuzzer.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@globuzzer.com
          </a>
        </div>
        <div className="footer-content-column">
          <FooterIcons />
        </div>
      </div>
      <FooterCopyRight />
    </footer>
  );
  return <>{width > 1100 ? <FooterDesktop /> : <FooterMobile />}</>;
};

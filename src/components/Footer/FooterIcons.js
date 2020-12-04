import React from "react";
import {
  FaPlayCircle,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import "./style.css";
const FooterIcons = () => {
  return (
    <>
      <div className="footer-content-icon-container">
        <a
          className="footer-icons-container"
          href="https://www.facebook.com/Globuzzer/"
        >
          <FaFacebook className="footer-icons" />
        </a>
        <a
          className="footer-icons-container"
          href="https://twitter.com/globuzzer"
        >
          <FaTwitter className="footer-icons" />
        </a>
        <a
          className="footer-icons-container"
          href="https://www.pinterest.se/globuzzer/"
        >
          <FaPinterestP className="footer-icons" />
        </a>
      </div>
      <div className="footer-content-icon-container">
        <a
          className="footer-icons-container"
          href="https://www.youtube.com/channel/UC4u8N-QBDMWG6OqzSni8clw"
        >
          <FaPlayCircle className="footer-icons" />
        </a>
        <a
          className="footer-icons-container"
          href="https://www.linkedin.com/company/globuzzer/"
        >
          <FaLinkedinIn className="footer-icons" />
        </a>
        <a
          className="footer-icons-container"
          href="https://www.instagram.com/globuzzer/"
        >
          <FaInstagram className="footer-icons" />
        </a>
      </div>
    </>
  );
};

export default FooterIcons;

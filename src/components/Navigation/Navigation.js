import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FiMenu } from "react-icons/fi";
import { animated, useSpring } from "react-spring";
import GLOBUZZER from "../../assets/Logo.svg";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import DestinationIcon from "../../assets/Nav/DestinationIcon.svg";
import ServicesIcon from "../../assets/Nav/ServicesIcon.svg";
import CareerIcon from "../../assets/Nav/CareerIcon.svg";
import PricingIcon from "../../assets/Nav/PricingIcon.svg";
import "./style.css";

export const Navigation = () => {
  const [navColor, setNavColor] = useState("transparent");
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = GetWindowDimension();

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      setNavColor("rgba(128,128,128,0.6)");
    } else {
      setNavColor("transparent");
    }
  });

  const animation = useSpring({
    height: isOpen ? `${height}px` : "0px",
    opacity: isOpen ? 1 : 0,
    width: isOpen ? "213px" : "0px",
    backgroundColor: "#2A293A",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: isOpen ? "auto" : "none",
    display: "flex",
    flexDirection: "column",
    config: {
      duration: isOpen ? 100 : 150,
    },
  });
  const Nav = () => (
    <section className="section_navigation">
      <Link to="/">
        <img src={GLOBUZZER} alt="logo" />
      </Link>
      <div className="navigation_center">
        <a
          href="/#section_newcity"
          className="navigation_link"
          id="link_destination"
        >
          Destinations
        </a>
        <a href="/#aux_services" className="navigation_link" id="link_services">
          Services
        </a>

        <Link to="/pricing" className="navigation_link" id="link_pricing">
          Pricing
        </Link>

        <a
          href="https://skillscanner.globuzzer.com/"
          className="navigation_link"
          id="link_career"
        >
          Career
        </a>

        <Link to="/travel-blog"
          className="navigation_link"
          id="link_own"
        >
          Create your travel blog
        </Link>
      </div>
      <div className="navigation_control">
        <a
          type="button"
          className="navigation_button"
          id="button_login"
          href="https://globuzzer.mn.co/sign_in"
        >
          Login
        </a>
        <button type="button" className="navigation_button" id="button_signup">
          <Link to="/signup" className="navigation_link">
            Sign up
          </Link>
        </button>
      </div>
    </section>
  );
  const NavMobileMenu = () => (
    <div style={{ display: "flex" }}>
      {isOpen && (
        <div
          onKeyDown={() => { }}
          tabIndex={0}
          role="button"
          style={{
            backgroundColor: "transparent",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            color: "transparent",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Test
        </div>
      )}
      <animated.div style={animation} className="navigation_mobile_menu">
        <div className="nav_top">
          <HashLink className="nav_item" to="/#section_newcity" smooth>
            <img src={DestinationIcon} alt="nav_icon" className="nav_icon" />
            Destination
          </HashLink>
          <HashLink className="nav_item" to="/#aux_services" smooth>
            <img src={ServicesIcon} alt="nav_icon" className="nav_icon" />
            Services
          </HashLink>

          <HashLink className="nav_item" to="/pricing">
            <img src={PricingIcon} alt="nav_icon" className="nav_icon" />
            Pricing
          </HashLink>
          <a href="http://skillscanner.globuzzer.com/" className="nav_item">
            <img src={CareerIcon} alt="nav_icon" className="nav_icon" />
            Career
          </a>
        </div>
        <div className="nav_bottom">
          <Link
            to="/travel-blog"
            className="nav_mobile_own"
          >
            Create your travel blog
          </Link>
          <div className="nav_bottom_container">
            <a
              type="button"
              href="https://globuzzer.mn.co/sign_in"
              className="nav_mob_link"
            >
              Login
            </a>
            <button type="button" className="nav_mob_link" id="mob_sign">
              <Link to="/signup" className="nav_mob_link">
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
  const NavMobile = () => (
    <section className="section_navigation">
      <Link to="/">
        <img src={GLOBUZZER} alt="logo" />
      </Link>
      <FiMenu
        className="mobile_hamburger_menu"
        onClick={() => setIsOpen(!isOpen)}
      />
      <NavMobileMenu />
    </section>
  );

  return <>
    {width > 1100 ? <Nav /> : <NavMobile />}
  </>;
};

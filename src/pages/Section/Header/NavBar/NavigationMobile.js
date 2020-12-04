import React, { useState } from "react";
import styles from "./NavigationMobile.module.css";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { ReactComponent as Logo } from "../../../../assets/Section/Header/globuzzer_logo.svg";
import { GetWindowDimension } from "../../../../utils/GetWindowDimension";
import mobileIcon from "../../../../assets/Section/Header/icons8-menu-50.svg";
import one from "../../../../assets/Section/Header/1.svg";
import two from "../../../../assets/Section/Header/2.svg";
import three from "../../../../assets/Section/Header/3.svg";
import four from "../../../../assets/Section/Header/4.svg";
const NavigationMobile = () => {
  const { width, height } = GetWindowDimension();
  const [isOpen, setIsOpen] = useState(false);

  const animation = useSpring({
    height: isOpen ? `${height}px` : "0px",
    opacity: isOpen ? 1 : 0,
    width: isOpen ? `${width / 1.6}px` : "0px",
    backgroundColor: "#2A293A",
    position: "fixed",
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

  const NavMobileMenu = () => (
    <div>
      {isOpen && (
        <div
          onKeyDown={() => {}}
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
        />
      )}
      <animated.div style={animation} className={styles.mobileMenu}>
        <div className={styles.navTop}>
          <a className={styles.navItem} href="https://globuzzer.com/#section_newcity">
            <img src={three} alt="nav-icon" className={styles.navIcon} />
            Destination
          </a>
          <a className={styles.navItem} href="https://globuzzer.com/#aux_services">
            <img src={four} alt="nav-icon" className={styles.navIcon} />
            Services
          </a>
          <a className={styles.navItem} href="https://globuzzer-topics.web.app/">
            <img src={one} alt="nav-icon" className={styles.navIcon} />
            Topics
          </a>
          <a className={styles.navItem} href="https://pricing-page-mobile.web.app/pricing">
            <img src={two} alt="nav-icon" className={styles.navIcon} />
            Pricing
          </a>
        </div>
        <div className={styles.navBottom}>
          <button className={styles.ownCityMobile}>Own your own city section</button>
          <div className={styles.navBottomContainer}>
            <span className={styles.loginBtn}>
              <Link>Login</Link>
            </span>
            <Link to='/cities'>
            <button className={styles.signUpMobile}>Sign Up</button>
            </Link>
          </div>
        </div>
      </animated.div>
    </div>
  );
  return (
    <div className={styles.mobileNavigation}>
      <Link to="/" className={styles.logoContainer}>
        <Logo className="logo" />
      </Link>
      <img className={styles.mobileIcon} src={mobileIcon} alt="mobile-icon" onClick={() => setIsOpen(!isOpen)} />
      <NavMobileMenu />
    </div>
  );
};

export default NavigationMobile;

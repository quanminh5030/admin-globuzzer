import React from 'react'
import footers from "./footer.module.css";
import globe from "../../../assets/Topic/footer/globe.png";
import logo from "../../../assets/Topic/footer/globuzzer_logo.png";
import f_i from "../../../assets/Topic/footer/facebook_icon.png";
import twitter from "../../../assets/Topic/footer/twitter.png";
import pinterest from "../../../assets/Topic/footer/pinterest.png";

const Footer = () => {
  return (
    <>
      <div className={footers.ownsection}>
        <div className={footers.ownleft}>
          <img src={globe} alt="globe" />
        </div>

        <div className={footers.ownright}>
          <div className={footers.rightbig}>
            <p>Want to have your own</p>
            <p>secton?</p>
          </div>

          <div className={footers.rightsmall}>
            <p>Become a part of our global community!</p>
            <p>Apply to start your own travel blog</p>
          </div>

          <button>Start now</button>
        </div>
      </div>

      <footer className={footers.footer}>
        <header>
          <img src={logo} alt="logo" />
        </header>

        <nav className={footers.footermenu}>
          <ul>
            <li>Backängsvägen 24 </li>
            <li>192 73 Sollentuna, Sweden</li>
            <li>+46 73 555 5 134</li>
            <li>info@globuzzer.com</li>
            <li style={{ paddingTop: "50px" }}>
              2019 Globuzzer All rights reserved
            </li>
          </ul>

          <ul>
            <li>Destinations</li>
            <li>Videos</li>
            <li>Articles</li>
            <li>Services</li>

            <li style={{ paddingTop: "10px" }}>Log in/Sign up</li>
          </ul>

          <ul>
            <li>About Globuzzer</li>
            <li>Contact us</li>
            <li>For companies</li>
          </ul>

          <ul>
            <li>FOLLOW US</li>
            <div>
              <span>
                <img src={f_i} alt="facebook" />
              </span>
              <span>
                <img src={twitter} alt="facebook" />
              </span>
              <span>
                <img src={pinterest} alt="facebook" />
              </span>
            </div>

            <div>
              <span>
                <img src={f_i} alt="facebook" />
              </span>
              <span>
                <img src={f_i} alt="facebook" />
              </span>
              <span>
                <img src={f_i} alt="facebook" />
              </span>
            </div>
          </ul>
        </nav>
      </footer>

      <footer className={footers.footersmall}>
        <header>
          <img src={logo} alt="logo" />
        </header>

        <nav className={footers.smallmenu}>
          <ul>
            <li>Backängsvägen 24 </li>
            <li>192 73 Sollentuna, Sweden</li>
            <li>+46 73 555 5 134</li>
            <li>info@globuzzer.com</li>

            <li>
              <img src={f_i} alt="facebook" />

              <img src={twitter} alt="twitter" />

              <img src={pinterest} alt="pinterest" />
            </li>

            <li>
              <img src={f_i} alt="facebook" />

              <img src={twitter} alt="twitter" />

              <img src={pinterest} alt="pinterest" />
            </li>

            <li style={{ paddingTop: "50px" }}>
              2020 Globuzzer. All rights reserved
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export default Footer

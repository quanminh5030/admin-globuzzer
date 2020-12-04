import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import header0 from "../../../../assets/Pricing/Pricing_header_0.png";
import header1 from "../../../../assets/Pricing/Pricing_header_1.png";
import "./style.css";

export const PricingHeader = ({ width, setContactModal }) => (
  <section className="pricing_header">
    {width >= 1100 ? (
      <>
        <div className="pricing_header_left">
          <div className="pricing_header_url">
            <p>
              <Link to="/">Landing Page</Link>
            </p>
            <AiFillCaretRight className="pricing_header_url_icon" />
            <p>
              <Link to="/pricing">Pricing Page</Link>
            </p>
          </div>
          <p id="pricing_our_number">
            Branding success starts
            <br /> with the right audience
          </p>
          <p id="pricing_your_brand">
            Reach millions of travelers and make your brand more accessible to
            the public.
          </p>
          <div>
            <button type="button" id="pricing_header_start_button">
              <a href="#our_plans" style={{ textDecoration: "none" }} id="fix">
                Get started
              </a>
            </button>
            <button
              type="button"
              id="pricing_header_contact_button"
              onClick={() => setContactModal(true)}
            >
              Contact us
            </button>
          </div>
        </div>
        <img src={header0} alt="header" className="pricing_header_art_0" />
      </>
    ) : (
      <>
        <img src={header1} alt="header" className="pricing_header_art_1" />
        <div className="pricing_header_left">
          <p id="pricing_our_number">
            Branding success starts with the right audience
          </p>
          <p id="pricing_your_brand">
            Reach millions of travelers and make your brand more accessible to
            the public.
          </p>
          <div className="contact_btn">
            <button id="pricing_header_start_button" type="button">
              <a href="#our_plans" style={{ textDecoration: "none" }} id="fix">
                Get started
              </a>
            </button>
            <button
              type="button"
              id="pricing_header_contact_button"
              onClick={() => setContactModal(true)}
            >
              Contact us
            </button>
          </div>
        </div>
      </>
    )}
  </section>
);

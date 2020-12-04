import React from "react";
import "./style.css";

const PricingReview = ({ ava, url }) => {
  return (
    <a href={url} className="review_container">
      <img src={ava} alt="ava" className="review_ava" />
    </a>
  );
};

export default PricingReview;

import React from "react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./style.css";

export const OwnSectionPlan = (props) => {
  const { pricingPackage } = props;
  const {
    isFree,
    title,
    price,
    insight,
    copywriting,
    guidelines,
    keyword,
    positioning,
    SEO,
    cardColor,
  } = pricingPackage;

  const styles = {
    banner: { backgroundColor: cardColor },
  };
  return (
    <div className="card_container">
      <p id="card_type">{title}</p>
      <div className="own_pricing_plan_feature">
        {insight ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>Set-up platform</p>
      </div>
      <div className="own_pricing_plan_feature">
        {copywriting ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>Insight and alalytics</p>
      </div>
      <div className="own_pricing_plan_feature">
        {guidelines ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>Access courses and guides</p>
      </div>
      <div className="own_pricing_plan_feature">
        {keyword ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>Established community</p>
      </div>
      <div className="own_pricing_plan_feature">
        {positioning ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>
          Control of subscriptions
          <br /> and revenue streams
        </p>
      </div>
      <div className="own_pricing_plan_feature">
        {SEO ? (
          <AiOutlineCheck className="card_feature_icon checked" />
        ) : (
          <AiOutlineClose className="card_feature_icon" />
        )}
        <p>SEO optimization</p>
      </div>
      <button type="button" className="card_get" style={styles.get}>
        Choose
      </button>
      <div id="own_card_banner" style={styles.banner}>
        {isFree ? (
          "FREE"
        ) : (
          <p id="price">
            Starting from <br /> <span id="bold">€ {price}</span> / month
          </p>
        )}
      </div>
    </div>
  );
};

import React from "react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./style.css";

export const PricingPlanChoose = (props) => {
  const { pricingPackage, width } = props;
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
    cardLinearColor,
    cardHandle,
    promo,
    insightBold,
    copywritingBold,
    guidelinesBold,
    keywordBold,
    positioningBold,
    SEOBold,
  } = pricingPackage;

  const styles = {
    back: { backgroundColor: cardColor },
    banner: { backgroundColor: cardColor },
    handle: {
      borderBottom:
        width >= 1100
          ? `34px solid${cardHandle}`
          : `21.14px solid${cardHandle}`,
    },
    get: { background: cardLinearColor },
  };
  return (
    <div className="choose_pricing_card_container">
      <p className="choose_pricing_card_type">{title}</p>
      <div className="choose_pricing_plan_feature">
        {insight ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: insightBold && "bold" }}>{promo}</p>
      </div>
      <div className="choose_pricing_plan_feature">
        {copywriting ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: copywritingBold && "bold" }}>
          Globuzzer account
        </p>
      </div>
      <div className="choose_pricing_plan_feature">
        {guidelines ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: guidelinesBold && "bold" }}>Banner space</p>
      </div>
      <div className="choose_pricing_plan_feature">
        {keyword ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: keywordBold && "bold" }}>
          SEO optimised article
        </p>
      </div>
      <div className="choose_pricing_plan_feature">
        {positioning ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: positioningBold && "bold" }}>
          Positioning in newsletter
        </p>
      </div>
      <div className="choose_pricing_plan_feature">
        {SEO ? (
          <AiOutlineCheck className="choose_pricing_card_feature_icon choose_pricing_checked" />
        ) : (
          <AiOutlineClose className="choose_pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: SEOBold && "bold" }}>Business blog community</p>
      </div>

      <div id="choose_pricing_card_back" style={styles.back} />
      <div id="choose_pricing_card_banner" style={styles.banner}>
        {isFree ? (
          "FREE"
        ) : (
          <p id="choose_pricing_price">
            Starting from <br /> <span id="choose_pricing_bold">€ {price}</span>{" "}
            / month
          </p>
        )}
      </div>
      <div id="choose_pricing_card_handle" style={styles.handle} />
    </div>
  );
};

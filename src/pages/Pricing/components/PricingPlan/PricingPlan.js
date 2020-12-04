import React from "react";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./style.css";

export const PricingPlan = (props) => {
  const { pricingPackage, width, setStartModal, index, setPlan } = props;
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
    <div className="pricing_card_container">
      <p id="pricing_card_type">{title}</p>
      <div className="pricing_plan_feature">
        {insight ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: insightBold && "bold" }}>{promo}</p>
      </div>
      <div className="pricing_plan_feature">
        {copywriting ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: copywritingBold && "bold" }}>
          Globuzzer account
        </p>
      </div>
      <div className="pricing_plan_feature">
        {guidelines ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: guidelinesBold && "bold" }}>Banner space</p>
      </div>
      <div className="pricing_plan_feature">
        {keyword ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: keywordBold && "bold" }}>
          SEO optimised article
        </p>
      </div>
      <div className="pricing_plan_feature">
        {positioning ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: positioningBold && "bold" }}>
          Positioning in newsletter
        </p>
      </div>
      <div className="pricing_plan_feature">
        {SEO ? (
          <AiOutlineCheck className="pricing_card_feature_icon pricing_checked" />
        ) : (
          <AiOutlineClose className="pricing_card_feature_icon" />
        )}
        <p style={{ fontWeight: SEOBold && "bold" }}>Business blog community</p>
      </div>
      <button
        type="button"
        className="pricing_card_get"
        style={styles.get}
        onClick={() => {
          setStartModal(true);
          setPlan(index);
        }}
      >
        SELECT
      </button>
      <div id="pricing_card_back" style={styles.back} />
      <div id="pricing_card_banner" style={styles.banner}>
        {isFree ? (
          "FREE"
        ) : (
          <p id="pricing_price">
            Starting from <br /> <span id="pricing_bold">€ {price}</span> /
            month
          </p>
        )}
      </div>
      <div id="pricing_card_handle" style={styles.handle} />
    </div>
  );
};

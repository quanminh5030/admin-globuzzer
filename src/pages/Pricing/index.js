import React, { useState, useRef } from "react";
import "./style.css";

import { AiFillStar } from "react-icons/ai";
import { Slide } from "react-slideshow-image";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import { PricingHeader } from "./components/PricingHeader/PricingHeader";
import header1D from "../../assets/Pricing/Pricing_header_desktop_1.svg";
import header2D from "../../assets/Pricing/Pricing_header_desktop_2.svg";
import header3D from "../../assets/Pricing/slider-image-map.svg";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { PricingPlan } from "./components/PricingPlan/PricingPlan";
import { OwnSection } from "../../components/OwnSection/OwnSection";
import { Footer } from "../../components/Footer/Footer";
import globe from "../../assets/Pricing/Pricing_globe_1.svg";
import { MemberNearYou } from "../../components/MemberNearYou/MemberNearYou";
import MemberNearYouData from "../../Data/MemberNearYouData";
import { PricingWhyContent } from "./components/PricingWhyContent/PricingWhyContent";
import pricingExtraServices from "../../Data/PricingExtraServicesData";
import { PricingExtraService } from "./components/PricingExtraService/PricingExtraService";
import PricingReview from "./components/PricingReview/PricingReview";
import ReviewData from "../../Data/ReviewData";
import pricingPackages from "../../Data/PricingPackagesData";
import { PricingContactUs } from "./components/PricingContactUs/PricingContactUs";
import { PricingGetStarted } from "./components/PricingGetStarted/PricingGetStarted";
import { PricingExtraServiceChoose } from "./components/PricingExtraServiceChoose/PricingExtraServiceChoose";
import one from "../../assets/Pricing/one.png";
import two from "../../assets/Pricing/one1.png";
import three from "../../assets/Pricing/one2.png";

const why = [one, two, three];
const slideImages = [header1D, header2D, header3D];
export const Pricing = () => {
  const { width } = GetWindowDimension();
  const [contactModal, setContactModal] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [plan, setPlan] = useState(0);
  const [extraModal, setExtraModal] = useState(false);
  const [extraPlan, setExtraPlan] = useState(0);
  const [active, setActive] = useState(0);
  const slideRef = useRef();
  const goto = (index) => {
    slideRef.current.goTo(index);
  };

  return (
    <>
      <PricingHeader width={width} setContactModal={setContactModal} />
      <section className="section-know-service">
        <div className="know-service-text-container">
          <p id="know-service-title">Why advertise with Globuzzer?</p>
          <div className="know-service-container">
            <button
              type="button"
              className="know-service-block-container"
              onClick={() => {
                goto(0);
                setActive(0);
              }}
            >
              <AiFillStar
                className="know-service-block_icon"
                style={{ color: active === 0 && "#E1586D" }}
              />
              <p
                className="know-service-block-text"
                style={{
                  color: active === 0 && "#E1586D",
                  fontWeight: active === 0 && "bold",
                }}
              >
                Increase your brand’s visibility
              </p>
            </button>
            <button
              type="button"
              className="know-service-block-container"
              onClick={() => {
                goto(1);
                setActive(1);
              }}
            >
              <AiFillStar
                className="know-service-block-icon"
                style={{ color: active === 1 && "#E1586D" }}
              />
              <p
                className="know-service-block-text"
                style={{
                  color: active === 1 && "#E1586D",
                  fontWeight: active === 1 && "bold",
                }}
              >
                Generate traffic and leads
              </p>
            </button>
            <button
              type="button"
              className="know-service-block-container"
              onClick={() => {
                goto(2);
                setActive(2);
              }}
            >
              <AiFillStar
                className="know-service-block-icon"
                style={{ color: active === 2 && "#E1586D" }}
              />
              <p
                className="know-service-block-text"
                style={{
                  color: active === 2 && "#E1586D",
                  fontWeight: active === 2 && "bold",
                }}
              >
                Reach locals and expats
              </p>
            </button>
          </div>
        </div>
        <div className="slide-container">
          <Slide
            indicators
            infinite
            arrows={false}
            duration={10000}
            ref={slideRef}
            onChange={() => {
              const newIndex = active + 1;
              active === 2 ? setActive(0) : setActive(newIndex);
            }}
          >
            {slideImages.map((image, index) => (
              <div className="each-slide" key={index}>
                <img src={image} alt="header" className="slide-img" />
              </div>
            ))}
          </Slide>
        </div>
      </section>
      <section className="section-pricing-plans" id="our_plans">
        <SectionHeader header="Choose your plan" />
        <p id="pricing-plans-des">
          Our plans are tailored to fit any brand or business. Select the plan
          that best suits your needs.
        </p>
        <div className="pricing-plans-grid">
          {pricingPackages.map((pricingPackage, index) => (
            <PricingPlan
              key={index}
              pricingPackage={pricingPackage}
              width={width}
              setStartModal={setStartModal}
              index={index}
              setPlan={setPlan}
            />
          ))}
        </div>
      </section>
      <section className="section-why">
        <SectionHeader header="Why Globuzzer Network?" />
        <div className="pricing-why">
          <div className="pricing-why-reason">
            <img src={globe} alt="globe" className="pricing-why-globe" />
            <p className="pricing-why-text" id="text-globe">
              <span className="pricing-why-text-em">18 </span> City sections and
              growing
            </p>
          </div>
          <div className="pricing-why-reason">
            <div className="pricing-why-reason-member-grid">
              {MemberNearYouData.map((memberData, index) => (
                <MemberNearYou memberData={memberData} key={index} />
              ))}
            </div>
            <p className="pricing-why-text" id="text-member">
              <span className="pricing-why-text-em">&nbsp;32K </span> Users in
              our network
            </p>
          </div>
          <div className="pricing-why-reason">
            <div className="temp-pricing-content">
              {why.map((content, index) => (
                <PricingWhyContent content={content} key={index} />
              ))}
            </div>

            <p className="pricing-why-text" id="text-member">
              <span className="pricing-why-text-em">180K </span> In social media
              reach
            </p>
          </div>
        </div>
      </section>
      <section className="section-extra-service">
        <SectionHeader header="Available services at Globuzzer" />
        <div className="pricing-extra-service-grid">
          {pricingExtraServices.map((pricingExtraService, index) => (
            <PricingExtraService
              pricingExtraService={pricingExtraService}
              key={index}
              setExtraPlan={setExtraPlan}
              setExtraModal={setExtraModal}
              index={index}
            />
          ))}
        </div>
      </section>
      <section className="section-pricing-review">
        <SectionHeader header="Our partners" />
        <div className="review-slide-container">
          <Slide infinite arrows duration={5000}>
            {ReviewData.map(({ ava, score, url }) => (
              <PricingReview ava={ava} key={score} url={url} />
            ))}
          </Slide>
        </div>
      </section>
      <OwnSection />
      <Footer />
      <PricingContactUs
        contactModal={contactModal}
        setContactModal={setContactModal}
      />
      <PricingGetStarted
        startModal={startModal}
        setStartModal={setStartModal}
        plan={plan}
      />
      <PricingExtraServiceChoose
        extraModal={extraModal}
        extraPlan={extraPlan}
        setExtraModal={setExtraModal}
        setExtraPlan={setExtraPlan}
      />
    </>
  );
};

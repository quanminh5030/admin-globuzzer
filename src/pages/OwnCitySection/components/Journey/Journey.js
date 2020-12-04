import React from "react";
import { Slide } from "react-slideshow-image";
import { SectionHeader } from "../../../../components/SectionHeader/SectionHeader";
import { Blogger } from "../Blogger/Blogger";
import BloggerData from "../../../../Data/BloggerData";
import { GetWindowDimension } from "../../../../utils/GetWindowDimension";
import "./style.css";

const Mobile = () => (
  <section className="section_journey" id="section_journey">
    <SectionHeader header="Blogger's journey with Globuzzer" />
    <div className="journey_slide_container">
      <Slide
        arrows={false}
        indicators
        autoplay={false}
        transitionDuration={500}
      >
        {BloggerData.map((blogger, index) => (
          <Blogger blogger={blogger} key={index} />
        ))}
      </Slide>
    </div>
  </section>
);
const Desktop = () => (
  <section className="section_journey" id="section_journey">
    <SectionHeader header="Blogger's journey with Globuzzer" />
    <div className="journey_container">
      {BloggerData.map((blogger, index) => (
        <Blogger blogger={blogger} key={index} />
      ))}
    </div>
  </section>
);
export const Journey = () => {
  const { width } = GetWindowDimension();
  return <>{width > 1100 ? <Desktop /> : <Mobile />}</>;
};

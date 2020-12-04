import React from "react";
import Header from "../Header/Header";
import MainBody from "../../../components/TravelBlog/body/MainBody";
import Footer from "../footer/footer";
import HowItWorks from "../HowItWorks/HowItWorks";

export default function Blog() {
  return (
    <div>
      <Header />
      <MainBody>
        <HowItWorks />
      </MainBody>
      <Footer />
    </div>
  );
}

import React, { useRef, useState } from "react";
import Header from "./Header/Header";
// import MainBody from "../../components/TravelBlog/body/MainBody";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyGlobuzzer from "./WhyGlobuzzer/WhyGlobuzzer";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import BloggersJourney from "./BloggersJourney/BloggersJourney";
import GetStarted from "./multi_step/UserForm";

import { Footer } from "../../components/Footer/Footer";
import { FooterContext, BloggerContext } from "./contexts/refContext";
import { getStarted } from "./multi_step/showGetStarted";
import "./index.css";

function Index() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  const footerRef = useRef(null);
  const bloggerRef = useRef(null);

  const setGetStarted = (val) => {
    setShowGetStarted(val);
  };

  const state = {
    showGetStarted,
    setGetStarted,
  };
  return (
    <div>
      <FooterContext.Provider value={footerRef}>
        <BloggerContext.Provider value={bloggerRef}>
          <getStarted.Provider value={state}>
            <GetStarted />
            <Header />
            <HowItWorks />
            <WhyGlobuzzer />
            <WhoWeAre />
            <BloggersJourney />
            <Footer />
          </getStarted.Provider>
        </BloggerContext.Provider>
      </FooterContext.Provider>
    </div>
  );
}

export default Index;

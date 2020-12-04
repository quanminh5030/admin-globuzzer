import React, { useState, useEffect } from "react";
import BlogHeader from "../../../components/TravelBlog/sectionHeader/SectionHeader";
import Section from "../../../components/TravelBlog/section/Section";
import Grid from "../../../components/TravelBlog/grid/Grid";
import Todo from "../../../components/TravelBlog/todo/Todo";

function HowItWorks() {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const checkScreen = () => {
    window.innerWidth <= 760 ? setSmallScreen(true) : setSmallScreen(false);
  };

  return (
    <Section>
      <BlogHeader label={smallScreen ? "How does it work? " : "How it works"} />

      <Grid>
        <Todo
          number={1}
          header="Apply for a topic"
          body="Choose a topic for your travel blog or transfer your existing blog to the Globuzzer platform."
        />
        <Todo
          number={2}
          header="Select a plan"
          body="Explore the benefits of our Free or Premium plans and choose the one that best suits you."
        />
        <Todo
          number={3}
          header="Start to make revenue"
          body={
            <span>
              Begin creating content! Set up subscription prices and choose
              streams to make revenue
            </span>
          }
        />
      </Grid>
    </Section>
  );
}

export default HowItWorks;

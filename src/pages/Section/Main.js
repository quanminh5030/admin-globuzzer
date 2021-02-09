import React, {useEffect} from "react";
import Header from "./Header/Header";
import NavBar from "./Header/NavBar/NavBar";
import Services from "./Services/Services";
import Topics from "./Topics/Topics";
import Members from "./Members/Members";
import Articles from "./Articles/Articles";
import Relocate from "./Relocate/Relocate";
import SliderBanner from "./SliderBanner/SliderBanner";
import Vimeo from "./Vimeo/Vimeo";
import { OwnSection } from "../../components/OwnSection/OwnSection";
import { Footer } from "../../components/Footer/Footer";
import styles from "./index.module.css";

const Main = () => {
  // useEffect(() => {
  //   document.querySelector(".section_navigation").style.visibility = "hidden";
  // }, []);
  return (
    <div className={styles.section}>
      {/* <NavBar /> */}
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.services}>
            <Services />
            <Topics />
          </div>
          <div className={styles.slider}>
            <SliderBanner />
            <Vimeo />
          </div>
        </div>

        <div className={styles.members}>
          <Members />
        </div>
        <div className={styles.articles}>
          <Articles />
        </div>
        <div className={styles.relocate}>
          <Relocate />
        </div>
      </div>

      <div className={styles.footer}>
        <OwnSection />
        <Footer />
      </div>
    </div>
  );
};

export default Main;

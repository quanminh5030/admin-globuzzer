import React, { useContext } from "react";
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
import { EditContext } from "../../contexts/editContext";
import SHeader from "../../components/SHeader/SHeader";

const Main = ({ cityId }) => {
  const { editMode} = useContext(EditContext);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <SHeader contentEditable={editMode ? true : false} cityId={cityId} />
      </div>
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.services}>
            <Services cityId={cityId} />
            <Topics />
          </div>
          <div className={styles.slider}>
            <SliderBanner cityId={cityId} />
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

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
import AddArticle from "./Articles/AddArticle";
import TopVideos from "./TopVideos/TopVideos";
import AddService from "./Services/AddService";

const Main = ({ cityId }) => {
  const { editMode } = useContext(EditContext);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <SHeader contentEditable={editMode ? true : false} cityId={cityId} />
      </div>
      <div className={styles.main}>
        <div className={styles.center}>
          <div className={styles.services}>
          {editMode &&
          <AddService cityId={cityId}/>
        }
            <Services cityId={cityId} />
            <Topics cityId={cityId} />
          </div>
          <div className={styles.slider}>
            <SliderBanner cityId={cityId} />
            <Vimeo cityId={cityId} />
          </div>
        </div>
        <div className={styles.members}>
          <Members cityId={cityId} />
        </div>
        <div className={styles.articles}>
        {editMode &&
          <AddArticle cityId={cityId}/>
        }
          <Articles cityId={cityId} />
        </div>
        <div className={styles.relocate}>
          {/* <Relocate /> */}
          <TopVideos cityId={cityId} />
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

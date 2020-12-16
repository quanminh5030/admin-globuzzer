import React, { useState, useRef, useContext, useEffect } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import AuxServiceSection from "../components/AuxService/AuxServiceSection";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { SearchCity } from "../components/SearchCity/SearchCity";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
import JoinCitySection from "../components/JoinCity/JoinCitySection";
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
import { EditContext } from "../contexts/editContext";
import BannerForm from "./Admin/BannerForm/BannerForm";
import FeatureBox from "../components/FeatureBox/FeatureBox";
import { firestore } from "./../utils/firebase.utils";

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  const [showFeature, setShowFeature] = useState(false);
  //state for homeValue
  const [homeData, setHomeData] = useState([]);
  let place = useRef("");

  const {
    editStyle,
    places,
    handleShowForm,
    setCurrentPlace,
    handleChangeText,
    fetchedTexts,
    setCurrentText,
  } = useContext(EditContext);

  // select the clicked 'place'
  const handleClick = (e) => {
    const newPlace = places.filter((place) => {
      return place.id === e.target.name;
    });
    setCurrentPlace(newPlace[0]);
  };

  // select the clicked 'text'
  const getCurrentText = (e) => {
    const newText = fetchedTexts.filter((text) => {
      return text.id === e.target.id;
    });
    setCurrentText(newText[0]);
  };

  //fetching features data from firebase firestore
  useEffect(() => {
    const getData = async () => {
      const getFeatures = await firestore.collection("features").get();
      const snapShot = [];
      getFeatures.forEach((feature) => {
        // console.log({ ...feature.data() });
        snapShot.push({
          id: feature.id,
          ...feature.data(),
        });
      });

      setHomeData(snapShot);
    };
    getData();
  }, []);

  //toggle feature box function
  const handleShowFeature = (index) => {
    setShowFeature(index + 1);
  };

  return (
    <div className="home-page">
      <BannerForm />
      <LazyLoad>
        <section className="section_header" id="section_header">
          <div onClick={handleShowForm} className="headers">
            {fetchedTexts.map((t) => (
              <p
                key={t.id}
                id={t.id}
                name={t.id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onBlur={handleChangeText}
                onClick={handleShowForm}
                onFocus={getCurrentText}
              >
                {t.content}
              </p>
            ))}
          </div>
          <SearchCity />
          <div>
            <p id="header_suggestion" onClick={handleShowForm}>
              Maybe{" "}
              {places.map((p) => (
                <a
                  href={p.link}
                  key={p.id}
                  name={p.id}
                  contentEditable={contentEditable}
                  suppressContentEditableWarning="true"
                  style={{ ...editStyle, color: p.color }}
                  ref={place}
                  onFocus={handleClick}
                >
                  {p.text}
                </a>
              ))}
            </p>
          </div>
        </section>
      </LazyLoad>
      <section className="section_value">
        <div>
          <HomeValue
            homeData={homeData}
            handleShowFeature={handleShowFeature}
          />
        </div>
      </section>
      {showFeature && (
        <div>
          <FeatureBox
            homeData={homeData}
            setHomeData={setHomeData}
            showFeature={showFeature}
            setShowFeature={setShowFeature}
          />
        </div>
      )}
      <section className="section_newcity" id="section_newcity">
        {/* <p id="newcity_p">Move to a new city? </p> */}
        <SectionHeader header="What is your next destination? " />
        <div className="newcity_input">
          <FiSearch className="search_icon" />
          <input
            type="text"
            placeholder="Find your city"
            id="newcity_input_city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <JoinCitySection />
      </section>
      <JoinCommunity />
      <section className="featured_articles" id="featured_articles">
        <SectionHeader header="Featured articles" />
        <FeaturedArticlePage />
      </section>
      <section className="aux_services" id="aux_services">
        <SectionHeader header="Helpful services" />
        <AuxServiceSection />
      </section>
      <OwnSection />
      <Footer />
    </div>
  );
};
export default Home;

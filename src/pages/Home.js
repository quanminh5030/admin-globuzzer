import React, { useState, useRef, useContext } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
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
import FeatureCardPage from "../components/FeatureCard/FeatureCardPage";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import AddService from "../components/AuxService/AddService";

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  let place = useRef();
  const {
    editStyle,
    places,
    showBannerForms,
    setCurrentPlace,
    handleChangeText,
    fetchedTexts,
    setCurrentText, editMode, banners, fetchedCommunityTexts, setCurrentCommunityText
  } = useContext(EditContext);

  // select the clicked 'place'
  const handleClick = (e) => {
    const newPlace = places.filter((place) => {
      return place.id === e.target.name;
    });
    setCurrentPlace(newPlace[0]);
  };

  // select the clicked 'text' on banner
  const getCurrentText = (e) => {
    const newText = fetchedTexts.filter((text) => {
      return text.id === e.target.id;
    });
    setCurrentText(newText[0]);
  };
  // select the clicked 'text' on join community
  const getCurrentCommunityText = (e) => {
    const newText = fetchedCommunityTexts.filter((text) => {
      return text.id === e.target.id;
    });
    setCurrentCommunityText(newText[0]);
  };

  return (
    <div className="home-page">
      <LazyLoad>
        {/* <HeroBanner contentEditable={editMode ? true : false}/> */}
        {banners.map(banner => (
          <section key={banner.img} className="section_header" 
          id="section_header" style={{backgroundImage: `url(${banner.img})`}}>
          <BannerForm />
          <div onClick={showBannerForms} className="headers">
            {fetchedTexts.map((t) => (
              <p
                key={t.id}
                id={t.id}
                name={t.id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onBlur={handleChangeText}
                onClick={showBannerForms}
                onFocus={getCurrentText}
              >
                {t.content}
              </p>
            ))}
          </div>
          <SearchCity />
          <div>
            <p id="header_suggestion" onClick={showBannerForms}>
              Maybe{" "}
              {places.map((p) => (
                <a
                  href={p.link}
                  target="_new"
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
        ))}
      </LazyLoad>
      <section className="section_value">
        <div>
          <FeatureCardPage />
        </div>
      </section>
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
      <JoinCommunity 
        texts={fetchedCommunityTexts} 
        editStyle={editStyle} 
        contentEditable={contentEditable} 
        getCurrentCommunityText={getCurrentCommunityText}
      />
      <section className="featured_articles" id="featured_articles">
        <SectionHeader header="Featured articles" />
        <FeaturedArticlePage />
      </section>
      <section className="aux_services" id="aux_services">
        {editMode &&
          <AddService />
        }
        <SectionHeader header="Helpful services" />
        <AuxServiceSection />
      </section>
      <OwnSection />
      <Footer />
    </div>
  );
};
export default Home;

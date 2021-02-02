import React, { useState, useContext } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import AuxServiceSection from "../components/AuxService/AuxServiceSection";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
import JoinCitySection from "../components/JoinCity/JoinCitySection";
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
import { EditContext } from "../contexts/editContext";
import FeatureCardPage from "../components/FeatureCard/FeatureCardPage";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import AddService from "../components/AuxService/AddService";
import { GetWindowDimension } from "../utils/GetWindowDimension";

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  const { editStyle, editMode } = useContext(EditContext);

const { width, height } = GetWindowDimension();
  return (
    <div className="home-page">
      <div style={{position: 'fixed', top: '20px', left: '20px'}}>{`width: ${width}  height: ${height}`}</div>
      <LazyLoad>
        <HeroBanner contentEditable={editMode ? true : false}/>
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
        // texts={fetchedCommunityTexts} 
        editStyle={editStyle} 
        contentEditable={contentEditable} 
        // getCurrentCommunityText={getCurrentCommunityText}
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

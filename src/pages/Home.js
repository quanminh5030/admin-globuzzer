import React, { useState, useRef, useContext } from "react";
import "../css/Home.css";
// import edit from "../css/Form.module.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import community from "../assets/Value_community.svg";
import expert from "../assets/Value_expert.svg";
import journey from "../assets/Value_journey.svg";
import AuxServiceSection from "../components/AuxService/AuxServiceSection";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { SearchCity } from "../components/SearchCity/SearchCity";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
// import { Link } from "react-router-dom";
import JoinCitySection from '../components/JoinCity/JoinCitySection';
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
import { EditContext } from '../contexts/editContext';
import BannerForm from './Admin/BannerForm/BannerForm';

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  let place = useRef('');

  const { editStyle, places, handleShowForm,
          setCurrentPlace, handleChangeText,
          fetchedTexts, setCurrentText, currentText
        } = useContext(EditContext);

  // select the clicked 'place'
  const handleClick = (e) => {
    const newPlace = places.filter((place) => {
      return place.id === e.target.name
    })
    setCurrentPlace(newPlace[0]);
  }

  // select the clicked 'text'
  const getCurrentText = (e) => {
     const newText = fetchedTexts.filter((text) => {
        return text.id === e.target.id
     })
     setCurrentText(newText[0]);
  }

  const one = `Globuzzer is a global network that provides the full relocating experience.
Find topics, join communities, attend events, book flights, and much more. `;
  const two = `Reliable information shared by expats and locals.
Everything from visa requirements and local documentation to valuable tips.`;
  const three = `We are locals. We are expats.
We are travelers. We are students.
Most importantly, we have been in the same spot, and we can support you. `;
  return (
    <div className="home-page">
      <BannerForm  />
      <LazyLoad>
        <section className="section_header" id="section_header">
        <div onClick={handleShowForm} className="headers">
        {fetchedTexts.map((t) => (
              <p key={t.id}
             id={t.id}
             name={t.id}
             contentEditable={contentEditable}
             style={{...editStyle, ...t.style}}
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
          <div >
          <p id="header_suggestion" onClick={handleShowForm}>
          Maybe {" "}
            {places.map((p) => (
              <a href={p.link}
               key={p.id}
               name={p.id}
               contentEditable={contentEditable}
               suppressContentEditableWarning="true"
               style={{...editStyle, color:p.color}}
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
        <HomeValue
          src={community}
          imgCaption="All-in-one platform"
          alt="value"
          imgDescription={one}
        />
        <HomeValue
          src={expert}
          imgCaption="Trustworthy content"
          alt="value"
          imgDescription={two}
        />
        <HomeValue
          src={journey}
          imgCaption="Local communities"
          alt="value"
          imgDescription={three}
        />
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
        <JoinCitySection/>
      </section>
      <JoinCommunity />

      <section className="featured_articles" id="featured_articles">
        <SectionHeader header="Featured articles" />
        <FeaturedArticlePage />
      </section>
      <section className="aux_services" id="aux_services">
        <SectionHeader header="Helpful services" />
          <AuxServiceSection/>
      </section>
      <OwnSection />
      <Footer />
    </div>
  );
};

export default Home;

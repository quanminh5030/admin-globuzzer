import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/Home.css";
import edit from "../css/Form.module.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { JoinCity } from "../components/JoinCity/JoinCity";
import community from "../assets/Value_community.svg";
import expert from "../assets/Value_expert.svg";
import journey from "../assets/Value_journey.svg";
import AuxServicesData from "../Data/AuxServicesData";
import AuxService from "../components/AuxService/AuxService";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { SearchCity } from "../components/SearchCity/SearchCity";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
import { RequestNewCity } from "../components/RequestNewCity/RequestNewCity";
import { Link } from "react-router-dom";
import { firestore } from "../utils/firebase.utils";
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
import { EditContext } from '../contexts/editContext';

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [articles, setArticles] = useState([]);

  let headerOne = useRef('');
  let headerTwo = useRef('');
  let city = useRef('');

  let [hO, setO] = useState('');
  let [hT, setT] = useState('');
  let [c, setC] = useState('');

  const { texts, handleForm, handleSubmit, handleCancel, details, editMode } = useContext(EditContext);

  const formStyle = !editMode? {display: "none"} : {};
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px" } : {};


  useEffect(() => {
    firestore
      .collection("cities")
      .orderBy("name")
      .limit(11)
      .onSnapshot((snapshot) => {
        const newCity = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJoinCity(newCity);
        // console.log(newCity);
      });
  }, []);

  const one = `Globuzzer is a global network that provides the full relocating experience.
Find topics, join communities, attend events, book flights, and much more. `;
  const two = `Reliable information shared by expats and locals.
Everything from visa requirements and local documentation to valuable tips.`;
  const three = `We are locals. We are expats.
We are travelers. We are students.
Most importantly, we have been in the same spot, and we can support you. `;

  return (
    <div className="home-page">
    <div className={edit.title} style={formStyle}>
    <div className={edit.arrowDown}></div>
    </div>
    <div className={edit.place} style={formStyle}>
      <p className={edit.head}>Place</p>
      <hr color="#E4E4E4" />
      <form className={edit.form} onSubmit={handleSubmit}>
          <label htmlFor="color">Color</label>
          <input type="text"
                 value={details.color}
                 id="color"
                 onChange={handleForm}
          />
          <label htmlFor="text">Text</label>
          <input type="text"
                 value={details.text}
                 id="text"
                 onChange={handleForm}
          />
          <label htmlFor="link">Link</label>
          <input type="text"
                 value={details.link}
                 id="link"
                 onChange={handleForm}
          />
      </form>
      <div className={edit.command}>
      <p id="apply" onClick={handleSubmit}>Apply</p>
      <p id="cancel" onClick={handleCancel}>Cancel</p>
      </div>
    </div>
      <LazyLoad>
        <section className="section_header" id="section_header">
        <div style={editStyle}>
          <p id="header_1"
             contentEditable={contentEditable}
             suppressContentEditableWarning="true"
             ref={headerOne}
             onChange={(e) => headerOne.current.innerText = e.target.value}
             onBlur={() => setO(headerOne.current.innerText)}
          >
             {texts.textOne}
          </p>
          <p id="header_2"
             contentEditable={contentEditable}
             suppressContentEditableWarning="true"
             ref={headerTwo}
             onChange={(e) => headerTwo.current.innerText = e.target.value}
             onBlur={() => setT(headerTwo.current.innerText)}
          >
             {texts.textTwo}
          </p>
        </div>
          <SearchCity />
          <p id="header_suggestion">
            Maybe{" "}
            <a href="https://globuzzer.mn.co/groups/195831/feed"
               contentEditable={contentEditable}
               suppressContentEditableWarning="true"
               style={editStyle}
               id="town"
               ref={city}
               onChange={(e) => city.current.innerText = e.target.value}
               onBlur={() => setC(city.current.innerText)}
            >
               {texts.newPlace}
            </a>,
            <Link to="/section">Helsinki</Link> or{" "}
            <a href="https://globuzzer.mn.co/groups/195834/feed">Paris</a>?
          </p>
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
        <div className="joincity_grid">
          {joinCity.map((cityData, index) => (
            <JoinCity cityData={cityData} key={index} />
          ))}
          {!moreJoinCity && joinCity.length > 0 && (
            <JoinCity
              cityData={{ name: "Explore more cities" }}
              isViewMore
              setMoreJoinCity={setMoreJoinCity}
            />
          )}
          {moreJoinCity && joinCity.length > 0 && <RequestNewCity />}
        </div>
        <div className="no_item">
          {joinCity.length === 0 && <RequestNewCity />}
        </div>
      </section>
      <JoinCommunity />

      <section className="featured_articles" id="featured_articles">
        <SectionHeader header="Featured articles" />
        <FeaturedArticlePage />
      </section>
      <section className="aux_services" id="aux_services">
        <SectionHeader header="Helpful services" />
        <div className="aux_list">
          {AuxServicesData.map(({ name, ...otherProps }) => (
            <AuxService name={name} key={name} {...otherProps} />
          ))}
        </div>
      </section>
      <OwnSection />
      <Footer />
    </div>
  );
};

export default Home;

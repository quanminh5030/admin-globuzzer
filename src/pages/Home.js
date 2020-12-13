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
import BannerForm from './Admin/BannerForm/BannerForm';

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [articles, setArticles] = useState([]);

  const { editStyle, places, handleShowForm, setCurrentPlace } = useContext(EditContext);
  let header_1 = useRef('');
  let header_2 = useRef('');
  let place = useRef('');

  const handleRefChange = (e) => {
    e.target.id.current.innerText = e.target.value
  }

  const handleClick = (e) => {
    const newPlace = places.filter((place) => {
      return place.id === e.target.name
    })
    setCurrentPlace(newPlace[0]);
  }

  const [newHeaderOne, setHeaderOne] = useState();
  const [newHeaderTwo, setHeaderTwo] = useState();

  const [newPlace, setPlace] = useState();



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
      <BannerForm newPlace={newPlace} />
      <LazyLoad>
        <section className="section_header" id="section_header">
        <div>
          <p id="header_1"
             contentEditable={contentEditable}
             style={editStyle}
             suppressContentEditableWarning="true"
             ref={header_1}
             onChange={handleRefChange}
             onBlur={() => setHeaderOne(header_1.current.innerText)}
             onClick={handleShowForm}
          >
             The global community of locals and expats
          </p>
          <p id="header_2"
             contentEditable={contentEditable}
             style={editStyle}
             suppressContentEditableWarning="true"
             ref={header_2}
             onChange={handleRefChange}
             onBlur={() => setHeaderTwo(header_2.current.innerText)}
             onClick={handleShowForm}
          >
             Commplete guidance when relocating to a new city
          </p>
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
               // onChange={handleRefChange}
               // onBlur={(e) => setPlace(e.target.innerText)}
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

import React, { useState, useEffect, Fragment } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { JoinCity } from "../components/JoinCity/JoinCity";
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
import FeatureBox from "../components/FeatureBox/FeatureBox";

const Home = () => {
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showFeature, setShowFeature] = useState(false);

  //state for homeValue
  const [homeData, setHomeData] = useState([]);

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
  console.log(homeData);

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

  //toggle feature box function
  const handleShowFeature = (index) => {
    setShowFeature(index + 1);
  };

  return (
    <div className="home-page">
      <LazyLoad>
        <section className="section_header" id="section_header">
          <p id="header_1" className="content-editable">
            The global community of locals and expats
          </p>
          <p id="header_2">Commplete guidance when relocating to a new city</p>
          <SearchCity />
          <p id="header_suggestion">
            Maybe{" "}
            <a href="https://globuzzer.mn.co/groups/195831/feed">Stockholm</a>,
            <Link to="/section">Helsinki</Link> or{" "}
            <a href="https://globuzzer.mn.co/groups/195834/feed">Paris</a>?
          </p>
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

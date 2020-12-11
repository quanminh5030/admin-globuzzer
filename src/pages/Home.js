import React, { useState, useEffect } from "react";
import "../css/Home.css";
import { FiSearch } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import { HomeValue } from "../components/HomeValue/HomeValue";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { JoinCity } from "../components/JoinCity/JoinCity";
import community from "../assets/Value_community.svg";
import expert from "../assets/Value_expert.svg";
import journey from "../assets/Value_journey.svg";
import AuxServicesData from "../Data/AuxServicesData";
import AuxServiceSection from "../components/AuxService/AuxServiceSection";
import { OwnSection } from "../components/OwnSection/OwnSection";
import { Footer } from "../components/Footer/Footer";
import { SearchCity } from "../components/SearchCity/SearchCity";
import { JoinCommunity } from "../components/JoinCommunity/JoinCommunity";
import { RequestNewCity } from "../components/RequestNewCity/RequestNewCity";
import { Link } from "react-router-dom";
import { firestore } from "../utils/firebase.utils";
import CityForm from './Admin/CityForm/CityForm';
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
const Home = () => {
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const initialItemState = [
    { id: null, name: "", img: "", members: ""},
  ];

  const [currentItem, setCurrentItem] = useState(initialItemState);
  useEffect(() => {
    const unsubscribe=firestore
      .collection("cities")
      .orderBy("name")
      .limit(11)
      .onSnapshot((snapshot) => {
        const newCity = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJoinCity(newCity);
        console.log(newCity);
      });
      return () => unsubscribe();
  }, []);

 
const formHandler = (cityData) => {
  setIsVisible(true);
  setCurrentItem({
   id: cityData.id,
   name:cityData.name,
   members: cityData.members,
   img:cityData.img
 })
};

const updateItem = (({currentItem}, updatedItem)=> {
  console.log("it sends item to the updated item function", updatedItem, currentItem.id);
  setIsVisible(false);
  firestore.collection('cities').doc(currentItem.id).update(updatedItem);
})

  const one = `Globuzzer is a global network that provides the full relocating experience. 
Find topics, join communities, attend events, book flights, and much more. `;
  const two = `Reliable information shared by expats and locals. 
Everything from visa requirements and local documentation to valuable tips.`;
  const three = `We are locals. We are expats. 
We are travelers. We are students. 
Most importantly, we have been in the same spot, and we can support you. `;

  return (
    <div className="home-page">
      <LazyLoad>
        <section className="section_header" id="section_header">
          <p id="header_1" className="content-editable">
            The global community of locals and expats
          </p>
          <p id="header_2" className="content-editable">
            Commplete guidance when relocating to a new city
          </p>
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
          {joinCity.map((cityData) => (
            <JoinCity cityData={cityData} key={cityData.id} openForm={()=>formHandler(cityData)}/>
          ))}
          {!moreJoinCity && joinCity.length > 0 && (
            <JoinCity
              cityData={{ name: "Explore more cities" }}
              isViewMore
              setMoreJoinCity={setMoreJoinCity}
            />
          )}
          {moreJoinCity && joinCity.length > 0 && <RequestNewCity />}
          {isVisible &&  <div>
          <CityForm setIsVisible={setIsVisible} currentItem={currentItem} updateItem={updateItem}/>                
        </div>}  
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
          <AuxServiceSection/>
      </section>
      <OwnSection />
      <Footer />
    </div>
  );
};

export default Home;

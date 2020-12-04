import React, { useState, useEffect } from "react";
import "../css/Signup.css";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDropleft } from "react-icons/io";
import { SignUpJoinCity } from "../components/SignUpJoinCity/SignUpJoinCity";
import JoinCityData from "../Data/JoinCityData";
import { RequestNewCity } from "../components/RequestNewCity/RequestNewCity";

export const SignUp = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState();
  const [joinCity, setJoinCity] = useState(JoinCityData);
  const [navlink, setNavlink] = useState();

  useEffect(() => {
    fetchJoinCityData();
  }, [query]);

  const fetchJoinCityData = () => {
    const sorted = JoinCityData.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setJoinCity(
      sorted.slice(0, 4).sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
    );
  };
  const navigateTo = (url) => {
    window.location.href = `${url}`;
  };
  return (
    <div className="container">
      <Link to="/" className="link">
        <IoIosArrowDropleft className="link_icon" />
        Back to home
      </Link>
      <div className="input_container">
        <p className="input_title">Search cities</p>
        <div className="input_field_container">
          <FiSearch className="search_icon" />
          <input
            type="text"
            placeholder="Seach cities here"
            className="input_field"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div
        className="joincity_grid signup_grid"
        style={{
          gridTemplateColumns:
            joinCity.length === 1 && joinCity[0].name === query && "185px",
        }}
      >
        {joinCity.map((cityData, index) => (
          <SignUpJoinCity
            cityData={cityData}
            key={index}
            index={index}
            selected={selected}
            setSelected={setSelected}
            setNavlink={setNavlink}
            setQuery={setQuery}
          />
        ))}
        {joinCity.length !== 0 &&
          joinCity[0].name !== query &&
          query.length !== 0 && (
            <RequestNewCity
              requestPlaceholder="Type your city here"
              requestTitle="Can’t find a city? Request it here"
            />
          )}
      </div>
      <div className="no_item">
        {joinCity.length === 0 && (
          <RequestNewCity
            requestPlaceholder="Type your city here"
            requestTitle="Can’t find a city? Request it here"
          />
        )}
      </div>

      <button
        type="button"
        className="button_submit signup_button_letsgo"
        onClick={() => {
          selected !== undefined
            ? navigateTo(navlink)
            : alert("Please select a city");
        }}
      >
        Explore
      </button>
    </div>
  );
};

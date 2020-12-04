import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import JoinCityData from "../../Data/JoinCityData";

export const SearchCity = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [joinCity, setJoinCity] = useState(JoinCityData);
  const [currentURL, setCurrentURL] = useState();
  const node = useRef();

  useEffect(() => {
    fetchJoinCityData();
  }, [query]);

  const fetchJoinCityData = () => {
    const sorted = JoinCityData.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setJoinCity(sorted.sort());
  };
  
  const onSelectCity = (city, url) => {
    setIsVisible(!isVisible);
    setCurrentURL(url);
    setQuery(city);
  };
  
  const navigateTo = (url) => {
    window.location.href = `${url}`;
  };
  
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
    } else {
      setIsVisible(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  
  return (
    <div className="search_city_container" ref={node}>
      <div className="header_search">
        <div className="search_input">
          <FiSearch className="search_icon" />
          <input
            autoComplete="new-password"
            type="text"
            placeholder="Your next destination "
            id="header_input_city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        <button
          type="button"
          className="button_submit"
          id="search_submit"
          onClick={() => {
            query !== ""
              ? navigateTo(currentURL)
              : alert("Please enter a city name");
          }}
        >
          Search
        </button>
      </div>
      {isVisible && (
        <div className="search_result_containter">
          {JoinCityData.map((city, index) => (
            <button
              className="result_item"
              onClick={() => onSelectCity(city.name, city.url)}
              type="button"
              key={index}
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

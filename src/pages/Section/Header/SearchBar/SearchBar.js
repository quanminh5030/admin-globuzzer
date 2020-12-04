import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import styles from  "./SearchBar.module.css";
import RelatedInfo from "./RelatedInfo";
import RelatedInfoData from '../../../../assets/Section/Header/RelatedInfoData';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const node = useRef();

  const onSelectCity = () => {
    setIsVisible(!isVisible);
  };

  const navigationHandler = () => {
    window.addEventListener("submit", (e) => {
      e.preventDefault();
      let searchForm = document.querySelector(".headerSearch");
      const value = searchForm.querySelector("#header-input-city").value.replace(/[^a-z0-9 ]/gi, "");
      if (searchForm && value) {
        window.open(`https://globuzzer.mn.co/groups/195832/search?term=${value}`);
      }
    });
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
    <div className={styles.container} ref={node}>
      <form className={styles.headerSearch}>
        <div className={styles.searchInput}>
          <BsSearch className={styles.searchIcon} size="40px" />
          <input
            autoComplete="new-password"
            type="text"
            placeholder="Tell us what you are looking for? "
            id="header-input-city" className={styles.headerInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        <button
          type="submit"
          className={styles.submit}
          id="search-submit"
          onClick={() => {
            query !== "" ? navigationHandler() : alert("Please enter a keyword");
          }}
        >
          Let's go
        </button>
      </form>
      {isVisible && (
        <div className={styles.resultContainer}>
          <div
            className={styles.suggestions}
            onSelect={() => {
              onSelectCity();
            }}
          >
              {RelatedInfoData.map(({text,id})=>(
                  <RelatedInfo text={text} key={id}/>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

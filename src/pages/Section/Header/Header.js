import React, { useContext, Fragment, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import SearchBar from "./SearchBar/SearchBar";
import styles from  "./Header.module.css";
import { Link, useParams } from "react-router-dom";
import { EditContext } from "../../../contexts/editContext";
import useFetch from "../../../hooks/useFetch";

const Header = ({ contentEditable }) => {
  const { editMode, editStyle } = useContext(EditContext);
  const { city, cityId } = useParams();
  const { error, loading, items } = useFetch('section_items');
  const data = items.find((data) => data.id === cityId && data.name === city);
  const { bannerImg, name, places, texts } = data;

  return (
    <Fragment>
      {!loading && 
        <Fragment>
          <div 
            className={styles.header} 
            style={{backgroundImage: `url(${bannerImg})`}}
          >
          <div className={styles.content}>
            <div className={styles.url}>
              <p>
                <Link to ='/'>Landing Page</Link>
              </p>
              <AiFillCaretRight className={styles.icon} />
              <p>
                <a id="city-name" href="www">{name}</a>
              </p>
            </div>
            <div className={styles.text}>
              <Fragment>
                <p
                contentEditable={contentEditable}
                style={{ ...editStyle, ...texts.title.style }}
                suppressContentEditableWarning="true"
                // onFocus={getCurrentText}
                // onBlur={handleChangeText}
                // onClick={() => setShowTextForm(true)}
                >
                  {texts.title.content}
                </p>
                <p
                contentEditable={contentEditable}
                style={{ ...editStyle, ...texts.subtitle.style }}
                suppressContentEditableWarning="true"
                // onFocus={getCurrentText}
                // onBlur={handleChangeText}
                // onClick={() => setShowTextForm(true)}
                >
                  {texts.subtitle.content}
                </p>
              </Fragment>
              {/* <p className={styles.textOne}>{data.name} Community</p>
              <p className={styles.textTwo}>Explore different topics and information</p> */}
              <SearchBar />
              <p className={styles.suggestions}>
                <Fragment>
                  <a 
                    href={places.one.link}
                    target="_new"
                    contentEditable={contentEditable}
                    suppressContentEditableWarning="true"
                    style={{ ...editStyle, color: places.one.color }}
                    // onFocus={handleClick}
                  >
                    {places.one.text}
                  </a>
                </Fragment>
      
              </p>
              
            </div>
          </div>
        </div>
        </Fragment>
      }
      
    </Fragment>
    
  );
};

export default Header;

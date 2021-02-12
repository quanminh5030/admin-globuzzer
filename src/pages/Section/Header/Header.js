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
 
  return (
    <Fragment>
      {!loading && 
        <Fragment>
          <div 
            className={styles.header} 
            style={{backgroundImage: `url(${data.banner.img})`}}
          >
          <div className={styles.content}>
            <div className={styles.url}>
              <p>
                <Link to ='/'>Landing Page</Link>
              </p>
              <AiFillCaretRight className={styles.icon} />
              <p>
                <a id="city-name" href="www">{data.name}</a>
              </p>
            </div>
            <div className={styles.text}>
            {data.banner.texts.map((t) => (
              <Fragment key={t.id}>
                <p
                id={t.id}
                name={t.id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                // onFocus={getCurrentText}
                // onBlur={handleChangeText}
                // onClick={() => setShowTextForm(true)}
                >
                  {t.content}
                </p>
              </Fragment>
              ))}
              {/* <p className={styles.textOne}>{data.name} Community</p>
              <p className={styles.textTwo}>Explore different topics and information</p> */}
              <SearchBar />
              <p className={styles.suggestions}>
              {data.banner.places.map((p) => (
                <Fragment key={p.id}>
                  <a 
                    href={p.link}
                    target="_new"
                    name={p.id}
                    contentEditable={contentEditable}
                    suppressContentEditableWarning="true"
                    style={{ ...editStyle, color: p.color }}
                    // onFocus={handleClick}
                  >
                    {p.text}
                  </a>
                </Fragment>
                ))}
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

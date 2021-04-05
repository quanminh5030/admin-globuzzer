import React, { useState } from 'react';
import { Fragment } from 'react';
import useFetch from '../../../hooks/useFetch';
import styles from './AdminSection.module.css';
import SectionItems from './SectionItems';
import { BsSearch } from "react-icons/bs";
import { dataObj } from '../../Admin/AdminSection/Data';
import { createNew } from '../../../utils/actions.firebase';

const SectionMain = () => {
  const { loading, items } = useFetch('section_items');
  const [searchedCity, setSearchedCity] = useState('');
  const mySearch = () => {
    return items.filter(item => item
      .name.toLowerCase()
      .includes(searchedCity.toLowerCase()))
  };
  
  return (
    <Fragment>
      {loading ? 'Loading...' : 
      <div className={styles.mainContainer}>
        <div className={styles.actions}>
          <span className={styles.inputForm}>
            <BsSearch />
            <input type="text"
              value={searchedCity}
              onChange={ (e) => setSearchedCity(e.target.value)} 
            />
          </span>
        <button onClick={() => createNew('section_items', dataObj)}>Add</button>
        </div>
        <SectionItems currentItems={mySearch()} loading={loading}/>
      </div>
    }
    </Fragment>
    
  );
};

export default SectionMain;
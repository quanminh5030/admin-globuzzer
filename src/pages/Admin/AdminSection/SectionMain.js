import React, { useState } from 'react';
import { Fragment } from 'react';
import useFetchSection from '../../../hooks/useFetchSection';
import styles from './AdminSection.module.css';
import SectionItems from './SectionItems';

const SectionMain = () => {
  
  const { error, loading, items } = useFetchSection();
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
        <input type="text"
          value={searchedCity}
          onChange={ (e) => setSearchedCity(e.target.value)} 
        />
        <button>Add</button>
        </div>
        <SectionItems items={mySearch()} loading={loading}/>
      </div>
    }
    </Fragment>
    
  );
};

export default SectionMain;
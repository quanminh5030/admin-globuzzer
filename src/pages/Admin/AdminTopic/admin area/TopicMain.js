import React from 'react'
import { BsSearch } from 'react-icons/bs';
import useFetch from '../../../../hooks/useFetch'
import styles from './AdminTopic.module.css';
import TopicItems from './TopicItems';
import { dataObj } from '../RawData';
import { createNew } from '../../../../utils/actions.firebase';

const TopicMain = () => {
  const { loading, items } = useFetch('accomodation_items');

  return (
    <>
      {loading ? 'Loading...' :
        <div className={styles.mainContainer}>
          <div className={styles.actions}>
            <span className={styles.inputForm}>
              <BsSearch />
              <input type="text"
              // value={searchedCity}
              // onChange={(e) => setSearchedCity(e.target.value)}
              />
            </span>
            <button
              onClick={() => createNew('accomodation_items', dataObj)}
            >
              Add
            </button>
          </div>
          <TopicItems currentItems={items} />
        </div>
      }
    </>
  )
}

export default TopicMain

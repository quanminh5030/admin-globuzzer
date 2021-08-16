import React, { useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import useFetch from '../../../../hooks/useFetch'
import styles from './AdminTopic.module.css';
import TopicItems from './TopicItems';
import { dataObj } from '../RawData';
import { createNew } from '../../../../utils/actions.firebase';
import { useParams } from 'react-router-dom';

const TopicMain = ({ setTopicSelected }) => {
  const { loading, items } = useFetch('accomodation_items');
  const {topic} = useParams();

  console.log(topic)

  useEffect(() => setTopicSelected({isSelected: true, topicContent: topic}), [])

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

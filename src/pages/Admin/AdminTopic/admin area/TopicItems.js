import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './AdminTopic.module.css';

const TopicItems = ({ currentItems }) => {
  const { topic } = useParams();

  console.log(currentItems)

  const deleteWarning = item => {

  }

  return (
    <>
      <div className={styles.sectionGrid}>
        {currentItems.map(item => (
          <div
            key={item.id}
            className={styles.card}
            style={{ backgroundImage: `url(${item.mainImg || item.bannerImg}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0,0.2), rgba(0, 0, 0, 0.5))`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          >
            <div className={styles.released}>
              {/*{released.includes(item.id) ? "released" : ""} */}
            </div>

            <div className={styles.options}>
              <Link to={`/topic/${topic}/${item.city}/${item.id}`}>
                <p>Edit</p>
              </Link>
              <p onClick={() => deleteWarning(item)}>Delete</p>
            </div>
            <div className={styles.name}>{item.city}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TopicItems

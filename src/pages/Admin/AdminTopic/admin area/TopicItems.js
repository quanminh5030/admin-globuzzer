import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PlaceAutoComplete from '../../../../components/AutoComplete/PlaceAutoComplete';
import useFetch from '../../../../hooks/useFetch';
import { deleteWithId, readData } from '../../../../utils/actions.firebase';
import styles from './AdminTopic.module.css';

const TopicItems = ({ currentItems, path }) => {
  const { admin, live } = path;

  const { items } = useFetch(live);
  const { topic } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [released, setReleased] = useState([])

  useEffect(() => {
    setReleased(items.map((i) => i.id))
  }, [items]);

  const deleteWarning = item => {
    setClickedCard(item);
    setShowWarning(true);
  }

  const warningForm = (data) => {
    return (
      <div className="warningBox" style={{ margin: '0 auto', position: 'absolute' }}>
        <div className="warningHeader">Warning</div>
        <div className="warningText">
          {`Are you sure you want to DELETE ${topic.toUpperCase()} of "${data.city}"?`}
        </div>
        <div className="warningActions">
          <p onClick={() => onDelete(data)}>Yes</p>
          <p onClick={() => setShowWarning(false)}>No</p>
        </div>
      </div>
    );
  };

  // delete selected id from both places in db - live and edit
  const onDelete = async (data) => {
    const id = await filterDeleted(currentItems, data.id);
    await deleteWithId(admin, data.id)
    await deleteWithId(live, id);
    setShowWarning(false);
  };

  // find the id of deleted item in live-db
  const filterDeleted = async (items, id) => {
    const docId = await readData(live, id);
    return docId
  };


  const unRelease = async (data) => {
    const id = await filterDeleted(currentItems, data.id);
    await deleteWithId(live, id);

    alert('Country was unreleased');
  };

  //set city name
  const sortCities = cities => cities.sort((a, b) => {
    if (a.city === b.city) {
      return 0;
    }
    else if (a.city === null) {
      return 1;
    }
    else if (b.city === null) {
      return -1;
    } else {
      return a.city < b.city ? 1 : -1;
    }
  })

  return (
    <>
      {currentItems.length > 0 ?
        <div className={styles.sectionGrid}>
          {sortCities(currentItems)
            .map(item => (
              <div
                key={item.id}
                className={styles.card}
                style={{ backgroundImage: `url(${item.mainImg || item.bannerImg}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0,0.2), rgba(0, 0, 0, 0.5))`, }}
              >
                <div className={styles.released}>
                  {released.includes(item.id) ? "released" : ""}
                </div>

                {item.city &&
                  <div className={styles.options}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={{
                        pathname: `/topic/${topic}/${item.city}/${item.id}`,
                        state: { pathName: path }
                      }}>
                      <p>Edit</p>
                    </Link>
                    <p onClick={() => deleteWarning(item)}>Delete</p>
                  </div>
                }

                {released.includes(item.id) &&
                  <div className={styles.optionsx}>
                    <p onClick={() => unRelease(item)}>NotRelease</p>
                  </div>
                }

                {item.city
                  ?
                  <div className={styles.name}>{item.city}</div>
                  :
                  <div className={styles.name} style={{ bottom: -40 }}>
                    <PlaceAutoComplete
                      styles={{ position: 'absolute', width: '100%', top: '40px', }}
                      doc={item.id}
                      col={admin}
                    />
                  </div>
                }
                {showWarning && item.id === clickedCard.id
                  ? warningForm(clickedCard) : null}
              </div>
            ))}
        </div>
        : <h2>No topics yet</h2>
      }
    </>
  )
}

export default TopicItems

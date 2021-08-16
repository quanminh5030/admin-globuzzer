import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import { deleteWithId, readData } from '../../../../utils/actions.firebase';
import styles from './AdminTopic.module.css';

const TopicItems = ({ currentItems }) => {
  const { items } = useFetch('accomodation_live');
  const { topic } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [released, setReleased] = useState([]);

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
    await deleteWithId('accomodation_items', data.id)
    await deleteWithId('accomodation_live', id);
    setShowWarning(false);
  };

  // find the id of deleted item in live-db
  const filterDeleted = async (items, id) => {
    console.log(id)
    const docId = await readData('accomodation_live', id);
    return docId
  };

  
  const unRelease = async (data) => {
    const id = await filterDeleted(currentItems, data.id);
    await deleteWithId('accomodation_live', id);

    alert('Country was unreleased');
  };

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
              {released.includes(item.id) ? "released" : ""}
            </div>

            <div className={styles.options}>
              <Link to={`/topic/${topic}/${item.city}/${item.id}`}>
                <p>Edit</p>
              </Link>
              <p onClick={() => deleteWarning(item)}>Delete</p>
            </div>
            {released.includes(item.id) &&
              <div className={styles.optionsx}>
                <p onClick={() => unRelease(item)}>NotRelease</p>
              </div>
            }
            <div className={styles.name}>{item.city}</div>
            {showWarning && item.id === clickedCard.id
              ? warningForm(clickedCard) : null}
          </div>
        ))}
      </div>
    </>
  )
}

export default TopicItems

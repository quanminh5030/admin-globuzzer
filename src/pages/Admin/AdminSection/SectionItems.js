import React, { useState } from 'react';
import { Fragment } from 'react';
import styles from './AdminSection.module.css';
import { Link, withRouter } from "react-router-dom";
import { deleteWithId, readData } from '../../../utils/actions.firebase';

const SectionItems = ({ items }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  const deleteWarning = (item) => {
    setClickedCard(item);
    setShowWarning(true);
  };

  // find the id of deleted item in live-db
  const filterDeleted = async (items, id) => {
    const docId = await readData('section_live', id);
    return docId
  }

  // delete selected id from both places in db - live and edit
  const onDelete = async (data) => {
    const id = await filterDeleted(items, data.id);
    await deleteWithId('section_items', data.id)
    await deleteWithId('section_live', id);
    setShowWarning(false);
  }
  
  const warningForm = (data) => {
    return (
      <div className="warningBox" style={{margin: '0 auto'}}>
        <div className="warningHeader">Warning</div>
        <div className="warningText">
        {`Are you sure you want to DELETE "${data.name}" section?`}
        </div>
        <div className="warningActions">
          <p onClick={() => onDelete(data)}>Yes</p>
          <p onClick={() => setShowWarning(false)}>No</p>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
        <div className={styles.sectionGrid}>
        {items.map(item => (
          <div 
            key={item.id}
            className={styles.card} 
            style={{backgroundImage: `url(${item.img || item.bannerImg}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0,0.2), rgba(0, 0, 0, 0.5))`, backgroundSize: 'cover', backgroundRepeat:'no-repeat'}}
          >
            <div className={styles.options}>
              <Link to={`/section/${item.name}/${item.id}`}>
              <p>Edit</p>
              </Link>
              <p onClick={() => deleteWarning(item)}>Delete</p>
            </div>
            <div className={styles.name}>{item.name}</div>
          </div>
        ))}
        {showWarning ? warningForm(clickedCard) : null}
        </div>
    </Fragment>
  );
};

export default withRouter(SectionItems);
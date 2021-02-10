import React, { useState } from 'react';
import { Fragment } from 'react';
import { firestore } from '../../../utils/firebase.utils';
import styles from './AdminSection.module.css';
import { Link, withRouter } from "react-router-dom";

const SectionItems = ({ items }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [city, setCity] = useState(null);
  const [edit, setEdit] = useState(false);

  const deleteWarning = (item) => {
    setClickedCard(item);
    setShowWarning(true);
  };

  const onSelectedCard = (item) => {
    setEdit(true);
    setCity(item.name);
  };

  const deleteSection = async (data) => {
    await firestore.collection('section_items').doc(data.id).delete();
    setShowWarning(false);
  };
  const warningForm = (data) => {
    return (
      <div className="warningBox" style={{margin: '0 auto'}}>
        <div className="warningHeader">Warning</div>
        <div className="warningText">
        {`Are you sure you want to DELETE "${data.name}" section?`}
        </div>
        <div className="warningActions">
          <p onClick={() => deleteSection(data)}>Yes</p>
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
            style={{backgroundImage: `url(${item.url}), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.3))`}}
          >
            <div className={styles.options}>
              <Link to={`/section/${item.name}`}>
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
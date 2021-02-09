import React, { useState } from 'react';
import { Fragment } from 'react';
import useFetchSection from '../../../hooks/useFetchSection';
import { firestore } from '../../../utils/firebase.utils';
import styles from './AdminSection.module.css';

const SectionMain = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const { error, loading, items } = useFetchSection();
  console.log('error:', error);
  console.log('loading:', loading);
  console.log('items:', items);

  const deleteWarning = (item) => {
    setClickedCard(item);
    setShowWarning(true);
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
      {loading ? 'Loading...' : 
        <div className={styles.sectionGrid}>
        {items.map(item => (
          <div 
            key={item.id}
            className={styles.card} 
            style={{backgroundImage: `url(${item.url}), linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0,0.3), rgba(0, 0, 0, 0.3))`}}
          >
            <div className={styles.options}>
              <p>Edit</p>
              <p onClick={() => deleteWarning(item)}>Delete</p>
            </div>
            <div className={styles.name}>{item.name}</div>
          </div>
        ))}
        {showWarning ? warningForm(clickedCard) : null}
        </div>
      }
      
    </Fragment>
    
  );
};

export default SectionMain;
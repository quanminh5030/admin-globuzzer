import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { firestore } from '../../../utils/firebase.utils';
import styles from './AdminSection.module.css';

const SectionMain = () => {
  const [sectionItems, setSectionItems] = useState([]);

  useEffect(() => {
    const getItems = firestore
      .collection("section_items")
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSectionItems(items);
      });
      return () => getItems();
  }, []);
  console.log(sectionItems)
  return (
    <Fragment>
      
          <div className={styles.sectionGrid}>
          {sectionItems.map(item => (
            <div className={styles.card}>
              <div className={styles.name}>{item.name}</div>
            </div>
      ))}
      </div>
    </Fragment>
    
  );
};

export default SectionMain;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditContext } from '../../../contexts/editContext';
import { firestore } from '../../../utils/firebase.utils';
import styles from './Vimeo.module.css';
import VimeoForm from './VimeoForm';

const Vimeo = ({ cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [show, setShow] = useState(false);
	const [fileUrl, setFileUrl] = useState(null);
	const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);
	const [currentItem, setCurrentItem] = useState({});
	const advRef = useRef(null);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setAdvertisements(doc.data().advertisements)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId, show]);

	const handleClick = (item) => (e) => {
		if (editMode) {
			if (advRef.current.contains(e.target)) {
				setCurrentItem(item)
				}
			setShow(true)
		}
	};

	// const getCurrentItem = (e) => (item) => {
	// if (advRef.current.contains(e.target)) {
		
	// }
	// }
    return (
        <>
				{advertisements.map((adv) => (
					<div ref={advRef} key={adv.id} className={styles.wrapper} style={{...editStyle, background: adv.bgColor }} onClick={handleClick(adv)}>
					<div className={styles.container}>
							{/* <p className={styles.title}>Vimeo</p> */}
							<img src={adv.logo} alt="logo"/>
							<p className={styles.caption}>{adv.text1}</p>
							<p className={styles.text}>{adv.text2}</p>
					</div>
					<button className={styles.btn} style={{background: adv.btColor}}>Learn more</button>
			</div>
				))}
				{editMode && show &&
					<VimeoForm setShow={setShow} currentItem={currentItem}/>
				}
        
        </>
    );
}

export default Vimeo;

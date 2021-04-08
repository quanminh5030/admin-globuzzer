import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditContext } from '../../../contexts/editContext';
import { firestore, app } from '../../../utils/firebase.utils';
import styles from './Vimeo.module.css';
import VimeoForm from './VimeoForm';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { sizeTransform } from '../../../utils/sizeTransform';

const Vimeo = ({ cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [show, setShow] = useState(false);
	const [fileUrl, setFileUrl] = useState(null);
	const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [advertisements, setAdvertisements] = useState([]);
	const [currentFeatureCard, setCurrentFeatureCard] = useState({});
	const advRef = useRef(null);

	const settings = {
    dots: true,
    dotsClass: "slider-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

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

	// const handleClick = (item) => (e) => {
	// 	if (editMode) {
	// 		if (advRef.current.contains(e.target)) {
	// 			setCurrentItem(item)
	// 			}
	// 		setShow(true)
	// 	}
	// };

	const openEditForm = (data) => {
    setShow(true);
    setCurrentFeatureCard({
      id: data.id,
      text1: data.text1,
			text2: data.text2,
      link: data.link,
      logo: data.logo,
			bgColor: data.bgColor,
			btColor: data.btColor,
    })
  };

  const updateFeatureCard = (({currentFeatureCard}, updatedFeatureCard) => {
    setShow(false);
   const updatedServices = advertisements.map((s) => s.id === updatedFeatureCard.id ? {...updatedFeatureCard, logo: fileUrl || updatedFeatureCard.logo} : s)
   return firestore.collection('section_items').doc(cityId).update({advertisements: updatedServices})
  });

  const typeValidation = ["image/png",  "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload file form + type and size validation
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`section/news/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  const onSelectedCard = (currentFeatureCard) => {
    return (
      show && editMode &&
      <div>
      <VimeoForm 
        setShow={setShow} 
        currentItem={currentFeatureCard} 
        updateArticles={updateFeatureCard} 
        onFileChange={onFileChange}
      />
    </div>
    );
  };

    return (
			<>
      <div className={styles.mainContainer} style={editStyle}>
				<Slider {...settings}>
				{advertisements.map((adv) => (
					<div key={adv.id}>
					<div ref={advRef} className={styles.wrapper}  onClick={() => openEditForm(adv)} style={{background: adv.bgColor}}>
					<div className={styles.container}>
							{/* <p className={styles.title}>Vimeo</p> */}
							<img src={adv.logo} alt="logo"/>
							<p className={styles.caption}>{adv.text1}</p>
							<p className={styles.text}>{adv.text2}</p>
					</div>
					<button className={styles.btn} style={{background: adv.btColor}}>Learn more</button>
			</div>
			</div>
				))}
			</Slider>
			</div>
				{editMode && show &&
					onSelectedCard(currentFeatureCard)
				}
      </>
    );
}

export default Vimeo;

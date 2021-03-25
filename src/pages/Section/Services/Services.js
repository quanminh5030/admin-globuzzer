import React, { useContext, useEffect, useState } from "react";
import styles from './Services.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import ServiceCard from "./ServiceCard";
// import {ServiceData} from '../../../assets/Section/Services/ServiceData';
import more from '../../../assets/Section/Services/more.svg';
import { EditContext } from "../../../contexts/editContext";
import { firestore, app } from "../../../utils/firebase.utils";
import FeatureCardForm from "../../Admin/FeatureCardForm/SectionServiceCardForm";
import { sizeTransform } from "../../../utils/sizeTransform";

const Services = ({ cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  
  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setServiceData(doc.data().services)
        setLoading(false);
      }
    };
    getCurrentCity();
    
}, [cityId]);

  const openEditForm = (data) => {
    setShow(true);
    setCurrentFeatureCard({
      id: data.id,
      text: data.text,
      title: data.title,
      image: data.image,
      url: data.url
    })
  };

  const updateFeatureCard = (({currentFeatureCard}, updatedFeatureCard) => {
    setShow(false);
   const updatedServices = serviceData.map((s) => s.id === updatedFeatureCard.id ? {...updatedFeatureCard, image: fileUrl || updatedFeatureCard.image} : s)
   return firestore.collection('section_items').doc(cityId).update({services: updatedServices})
  });

  // on form submit, the file url is set in firestore
  // const onSubmit = async (data) => {
  //   const getCollection = firestore.collection('section_items');
  //   await getCollection.doc(cityId).update({
  //     services: {
  //       ...data,
  //       image: fileUrl || data.image,
  //     }
  //   })
  //   console.log("file saved:", fileUrl)
  //   // setShow(false);
  // }


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
      const fileRef = storageRef.child(`section/services/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
    console.log(e.target.files)
  }

  const onSelectedCard = (card, currentCard) => {
    return (
      card.id === currentCard.id &&
      show && editMode &&
      <div>
      <FeatureCardForm 
        setShow={setShow} 
        currentFeatureCard={currentFeatureCard} 
        updateFeatureCard={updateFeatureCard} 
        onFileChange={onFileChange}
        // onFileSubmit={onSubmit}
      />
    </div>
    );
  };
  
  return (
    <div className={styles.wrapper}>
      <BlogHeader label="Recommend Services" />
      <div className={styles.container}>
        {serviceData.map(card => (
          <div style={editStyle} key={card.id}>
          <ServiceCard 
            card={card} 
            editFeatureCard={() => openEditForm(card)} 
            editMode={editMode}
          />
          {onSelectedCard(card, currentFeatureCard)}
          </div>
        ))}
        <div className={styles.moreBtn} >
        <img src={more} alt='more-icon' className={styles.moreIcon}/>
        <p className={styles.moreText}>More</p>
      </div>
      </div>
      
    </div>
  );
};

export default Services;
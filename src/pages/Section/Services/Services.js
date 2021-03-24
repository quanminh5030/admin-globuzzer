import React, { useContext, useEffect, useState } from "react";
import styles from './Services.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import ServiceCard from "./ServiceCard";
// import {ServiceData} from '../../../assets/Section/Services/ServiceData';
import more from '../../../assets/Section/Services/more.svg';
import { EditContext } from "../../../contexts/editContext";
import { firestore } from "../../../utils/firebase.utils";
import FeatureCardForm from "../../Admin/FeatureCardForm/SectionServiceCardForm";

const Services = ({ cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentFeatureCard, setCurrentFeatureCard] = useState([]);

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
  const onSelectedCard = (card, currentCard) => {
    return (
      card.id === currentCard.id &&
      show && editMode &&
      <div>
      <FeatureCardForm 
        setShow={setShow} 
        currentFeatureCard={currentFeatureCard} 
        // updateFeatureCard={updateFeatureCard} 
        // onFileChange={onFileChange}
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
          <ServiceCard card={card} editFeatureCard={() => openEditForm(card)} editMode={editMode}/>
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
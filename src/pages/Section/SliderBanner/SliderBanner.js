import React, { useContext, useEffect, useState } from "react";
import styles from "./SliderBanner.module.css";
import "./SliderBanner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImg from "../../../assets/Section/slider-banner.jpg";
import { EditContext } from "../../../contexts/editContext";
import { firestore } from "../../../utils/firebase.utils";
import FeatureCardForm from "../../Admin/FeatureCardForm/SectionServiceCardForm";
import { sizeTransform } from "../../../utils/sizeTransform";

const SliderBanner = ({ cityId }) => {
  const slideImage = [sliderImg, sliderImg, sliderImg];
  const { editStyle, editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
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
        setNewsData(doc.data().news)
        setLoading(false);
      }
    };
    getCurrentCity();
    
  }, [cityId]);


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

  const openEditForm = (data) => {
    setShow(true);
    setCurrentFeatureCard({
      id: data.id,
      text: data.text,
      link: data.link,
      image: data.image,
    })
  };

  const updateFeatureCard = (({currentFeatureCard}, updatedFeatureCard) => {
    setShow(false);
  //  const updatedServices = serviceData.map((s) => s.id === updatedFeatureCard.id ? {...updatedFeatureCard, image: fileUrl || updatedFeatureCard.image} : s)
  //  return firestore.collection('section_items').doc(cityId).update({services: updatedServices})
  });

  const typeValidation = ["image/png",  "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload file form + type and size validation
  const onFileChange = async (e) => {
    // const file = e.target.files[0];
    // const storageRef = app.storage().ref();
    // if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
    //   const fileRef = storageRef.child(`section/services/${file.name}`);
    //   await fileRef.put(file);
    //   setFileUrl(await fileRef.getDownloadURL());
    // } else {
    //   alert(message(file))
    // }
  }

  const onSelectedCard = (currentFeatureCard) => {
    return (
      show && editMode &&
      <div>
      <FeatureCardForm 
        setShow={setShow} 
        currentFeatureCard={currentFeatureCard} 
        updateFeatureCard={updateFeatureCard} 
        onFileChange={onFileChange}
      />
    </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} style={editStyle}>
        <Slider {...settings}>
          {newsData.map((news) => (
            <div>
            <div className={styles.eachSlide} key={news.id} onClick={() => openEditForm(news)}>
              <div
                style={{
                  backgroundImage: `url(${news.image})`,
                  position: "relative",
                }}
              />
              <p className={styles.headline}>
                {news.text}
              </p>
            </div>
            
            </div>
          ))}
        </Slider>
      </div>
      {onSelectedCard(currentFeatureCard)}
    </div>
  );
};

export default SliderBanner;

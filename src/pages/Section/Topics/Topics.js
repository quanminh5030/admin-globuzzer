import React, { useState, useEffect, useContext } from "react";
import styles from "./Topics.module.css";
import BlogHeader from "../../../components/TravelBlog/sectionHeader/SectionHeader";
import TopicCard from "./TopicCard";
import { TopicsData } from "../../../assets/Section/Topics/TopicsData";
import arrow from "../../../assets/Section/Topics/arrow-icon.svg";
import { Link } from "react-router-dom";
import { GetWindowDimension } from "../../../utils/GetWindowDimension";
import CityForm from "../../Admin/CityForm/SectionTopicsForm";
import { EditContext } from "../../../contexts/editContext";
import { sizeTransform } from "../../../utils/sizeTransform";
import { firestore, app } from "../../../utils/firebase.utils";

const Topics = ({ cityId }) => {
  const { width } = GetWindowDimension();
  const { editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  
  const arraySize = () => {
    let size;
    (window.innerWidth <= 900) ? (size = 6) : (size = 9);
      return size;
  };
  const [cardsToShow, setCardsToShow] = useState(arraySize());
  const [isVisible, setIsVisible] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const initialItemState = [{ id: null, text: "", image: "", link: ""}];
  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [topics, setTopics] = useState([]);

  const moreCards = () => {
    let no = cardsToShow + 3;
    if (cardsToShow >= topics.length) {
      if (window.innerWidth <= 1100) no = 3;
          else no = 6;
    }
    return setCardsToShow(no);
  };

  const moreOrLess = () => {
    let label = "View more";
    if (cardsToShow >= topics.length) {
      label = "View less";
    }
    return label;
  };
  
  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setTopics(doc.data().topics)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId, isVisible]);
  
   
const formHandler = (data) => {
  setIsVisible(true);
  setCurrentItem({
    id: data.id,
    text: data.text,
    image: data.image,
    link: data.link
  })
};

//validations
const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
const sizeValidation = 200000;
const message = (file) => {
  return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
};

const onFileChange = async (e) => {
  const file = e.target.files[0];
  const storageRef = app.storage().ref();
  
  if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) 
  {
    const fileRef = storageRef.child(`section/topics/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }     
};

const updateItem = (({currentItem}, updatedItem)=> {
  // console.log("it sends item to the updated item function", updatedItem, currentItem.id);
  const updatedTopics = topics.map((s) => s.id === updatedItem.id ? {...updatedItem, image: fileUrl || updatedItem.image} : s)
  setIsVisible(false);
  firestore.collection('section_items').doc(cityId).update({topics: updatedTopics});
});

  const onSelectedTopic = (data, topic) => {
    return (
      topic.id === data.id &&
      isVisible && editMode &&
        <div>
          <CityForm 
            setIsVisible={setIsVisible} 
            currentItem={currentItem} 
            updateItem={updateItem}
            onFileChange={onFileChange}
            fileUrl={fileUrl}
          />                
        </div>
    );
  }
  
  const TopicsMobile = () => {

    return (
      <div className={styles.wrapper}>
        <BlogHeader label="Top Topics to explore" />
        <div className={styles.container}>
          <TopicCard topicsToRender={TopicsData.slice(0, cardsToShow)} />
        </div>
        <button 
          className={styles.moreBtn} 
          // onClick={showTopicsHandler}
        >
          View More
        </button>
        <div 
          className={styles.moreDesk} 
          // onClick={showTopicsHandler}
        >
          <Link className={styles.moreLink}>See more topics</Link>
          <img src={arrow} alt="arrow-icon" className={styles.arrow} />
        </div>
      </div>
    );
  };

  const TopicsDesktop = () => {
    return (
      <div className={styles.wrapper}>
        <BlogHeader label="Top Topics to explore" />
        <div className={styles.container}>
        {topics.slice(0, cardsToShow).map(topic => (
          <div key={topic.id}>
            <TopicCard  
            openForm={() => formHandler(topic)}
            topic={topic}
            currentCity={currentCity}
            />
          {onSelectedTopic(topic, currentItem)}
          </div>
        ))
        }
          
        </div>
        <button 
          className={styles.moreBtn} 
          // onClick={showTopicsHandlerDesk}
        >
          View More
        </button>
        <div 
          className={styles.moreDesk} 
          // onClick={showTopicsHandlerDesk}
        >
          <p className={styles.moreLink} onClick={moreCards}>
            {moreOrLess().includes("less") ? "See Less topics" : "See More topics" }
          <img src={arrow} alt="arrow-icon" className={styles.arrow} />
          </p>
        </div>
      </div>
    );
  };

  return <>{width > 1100 ? TopicsDesktop() : TopicsMobile()}</>;
};

export default Topics;

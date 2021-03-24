import React, { useContext, useEffect, useState } from "react";
import styles from './Services.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import ServiceCard from "./ServiceCard";
// import {ServiceData} from '../../../assets/Section/Services/ServiceData';
import more from '../../../assets/Section/Services/more.svg';
import { EditContext } from "../../../contexts/editContext";
import { firestore } from "../../../utils/firebase.utils";

const servicesPerPage = 5;
let arrayForHoldingServices =[];
const Services = ({cityId}) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [ServiceData, setServiceData] = useState([]);
  const [servicesToShow, setServicesToShow]=useState([]);
  const [next, setNext] = useState(5);

  const loopWithSlice = (start,end)=>{
    const slicedServices = ServiceData.slice(start,end);
    arrayForHoldingServices=[...arrayForHoldingServices, ...slicedServices];
    setServicesToShow(arrayForHoldingServices);
  };

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
    console.log('martor render')
}, [cityId]);
console.log(ServiceData)
  const showMoreHandler = ()=>{
    loopWithSlice(next, next + servicesPerPage);
    setNext(next + servicesPerPage);
  };
  return (
    <div className={styles.wrapper} >
      <BlogHeader label="Recommend Services" />
      <div className={styles.container}>
        <ServiceCard servicesToRender={servicesToShow}/> 
        <div className={styles.moreBtn} onClick={showMoreHandler}>
        <img src={more} alt='more-icon' className={styles.moreIcon}/>
        <p className={styles.moreText}>More</p>
      </div>
      </div>
      
    </div>
  );
};

export default Services;
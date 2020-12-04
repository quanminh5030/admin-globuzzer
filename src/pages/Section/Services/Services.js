import React, { useEffect, useState } from "react";
import styles from './Services.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import ServiceCard from "./ServiceCard";
import {ServiceData} from '../../../assets/Section/Services/ServiceData';
import more from '../../../assets/Section/Services/more.svg';

const servicesPerPage = 5;
let arrayForHoldingServices =[];
const Services = () => {
  const [servicesToShow, setServicesToShow]=useState([]);
  const [next, setNext] = useState(5);

  const loopWithSlice = (start,end)=>{
    const slicedServices = ServiceData.slice(start,end);
    arrayForHoldingServices=[...arrayForHoldingServices, ...slicedServices];
    setServicesToShow(arrayForHoldingServices);
  };

  useEffect(()=>{
    loopWithSlice(0, servicesPerPage);
  },[]);

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
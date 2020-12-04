import React from "react";
import styles from "./ServiceCard.module.css";
const ServiceCard = ({ servicesToRender}) => {
  return (
    <>
   {servicesToRender.map((service, index)=>(
    <div className={styles.card} key={index} >
        <img src={service.icon} alt='service-icon' className={styles.icon}/>
        <p className={styles.text}>{service.text}</p>
    </div>
      ))}
     </>
  );
  
};

export default ServiceCard;

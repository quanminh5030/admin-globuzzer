import React ,{useState, useEffect} from "react";
import styles from './Desktop.module.css';
import { Link } from "react-router-dom";
import {RelocateData} from '../../../../assets/Section/Relocate/RelocateData';
import DesktopCard from "./DesktopCard";
import Add from "../../../../assets/Section/Relocate/add-btn.svg";
import arrow from "../../../../assets/Section/Relocate/arrow-icon.svg";

const packagesPerPage = 3;
let arrayHoldingPackages = [];
const Desktop = () => {
  const [packagesToShow, setPackagesToShow]=useState([]);
  const [next, setNext]=useState(3);
  const [like,setLike] = useState();
  const increaseLike = (item) =>{ 
    const likeNumber = RelocateData.find((p) => p.id === item.id);
    setLike(likeNumber);
    likeNumber.liked = !likeNumber.liked;
  };

  const loopWithSlice = (start, end)=>{
    const slicedPackages = RelocateData.slice(start,end);
    arrayHoldingPackages=[...arrayHoldingPackages, ...slicedPackages];
    setPackagesToShow(arrayHoldingPackages);
  };

  useEffect(()=>{
    loopWithSlice(0, packagesPerPage);
  },[]);

  const showPackagesHandler = ()=>{
    loopWithSlice(next, next + packagesPerPage);
    setNext(next + packagesPerPage);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <DesktopCard packagesToRender={packagesToShow} heart={increaseLike}/>
        <div className={styles.guide}>
          <p className={styles.title}>Start to create your own Guides!</p>
          <img src={Add} alt="add-btn" className={styles.addBtn} />
        </div>
      </div>
      <div className={styles.moreDesk} onClick={showPackagesHandler}>
        <Link className={styles.moreLink}>View All Guides</Link>
        <img src={arrow} alt="arrow-icon" className={styles.arrow} />
      </div>
    </div>
  );
};

export default Desktop;

import React, { useEffect, useRef, useState } from 'react';
import styles from './Document.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PlaceDetails = ({ place }) => {
  const componentRef = useRef();

  //states
  const [openInfo, setOpenInfo] = useState(false);
  const [current, setCurrent] = useState({});

  //bind the outer click event
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current
        if (!ref.contains(e.target)) {
          setOpenInfo(false);
          setCurrent('');
        }
      }
    }
  }, []);

  const showPlace = item => {
    console.log(item);

    setOpenInfo(true);
    setCurrent(item);
  }

  return (
    <>
      <div
        className={styles.place}
        onMouseOver={() => showPlace(place)}
        ref={componentRef}
        style={place.place_id === current.place_id ? { padding: 16 } : {}}
      >
      </div>

      {(openInfo && (place.place_id === current.place_id)) ?
        <div className={styles.placeInfo}>
          <img src={place.imgUrl} alt={place.name} style={{ height: 200 }} />
          <header>{place.name}</header>
          <p>
            <FaMapMarkerAlt style={{ marginRight: 5 }} />
            {place.vicinity}
          </p>
          <button>Explore more</button>

          <button onClick={()=>{
            console.log(current.place_id)
            console.log(place.place_id)
          }}>Test</button>
        </div> :
        undefined
      }
    </>
  )
}

export default PlaceDetails

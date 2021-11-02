import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Document.module.css';
import AxiosService from '../../Service/axios/AxiosService';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Rating } from '@mui/material';

const Map = ({ center, museums, churches, cemeteries, category }) => {
  const componentRef = useRef();

  const [data, setData] = useState([]);

  const [museWithPhoto, setMuseWithPhoto] = useState([]);
  const [churWithPhoto, setChurWithPhoto] = useState([]);
  const [cemeWithPhoto, setCemeWithPhoto] = useState([]);
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

  //get places with their photos
  useEffect(() => {
    getImgUrl(museums, setMuseWithPhoto);
    getImgUrl(churches, setChurWithPhoto);
    getImgUrl(cemeteries, setCemeWithPhoto);
  }, [museums, churches, cemeteries])

  //get list of final data
  useEffect(() => {
    if (museWithPhoto.length > 0 && churWithPhoto.length > 0) {
      const documentationList = museWithPhoto.concat(churWithPhoto, cemeWithPhoto);
      setData(documentationList)
    }
  }, [museWithPhoto, churWithPhoto, cemeWithPhoto])

  const getImgUrl = async (places, setPlacesWithPhotos) => {
    const placeNewArr = [];

    let results = places.map(m => AxiosService.getHospitalPhoto(m.photos[0].photo_reference))
    results = await Promise.all(results)

    for (let i = 0; i < places.length; i++) {
      const placeObj = places[i];
      placeObj.imgUrl = results[i].data;
      placeNewArr.push(placeObj)
    }

    setPlacesWithPhotos(placeNewArr)
  }

  const showPlace = place => {
    setOpenInfo(true);
    setCurrent(place);
  }

  const Places = ({ place }) => (
    <>
      <div
        className={styles.place}
        onMouseOver={() => showPlace(place)}
        ref={componentRef}
        style={place.place_id === current.place_id ? { padding: 12 } : {}}
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

          <div className={styles.rating}>
            <Rating
              name='read-only'
              readOnly
              precision={0.5}
              value={Number(place.rating)}
              color=''
            />
          </div>

          {/* <button>Explore more</button> */}
        </div> :
        undefined
      }
    </>
  );

  const getSelectedData = items => {
    const newData = items.filter(i => i.types.includes(category));
    return newData;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEAPI_KEY }}
        defaultZoom={14}
        center={center}
      >
        {getSelectedData(data)
          .map(d =>
            <Places
              key={d.place_id}
              lat={d.geometry.location.lat}
              lng={d.geometry.location.lng}
              place={d}
            />
          )}
      </GoogleMapReact>
    </div>
  )
}

export default Map

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import { firestore } from '../../../../utils/firebase.utils';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Document.module.css';
import Map from './Map';
import { upperCaseFirstLetter } from '../../../../utils/upperCaseFirstLetter';


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=60.192059%2C24.945831&radius=50000&type=painter&key=AIzaSyBjJs2hbIhLaaO5mOt43DwhbVwUvgP1avs


const Documentation = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [museums, setMuseums] = useState([]);
  const [churches, setChurches] = useState([]);
  const [cemeteries, setCemeteries] = useState([]);

  // const [places, setPlaces] = useState(
  //   'museum': [],
  //   'church': [],
  //   'stadium': []
  // })

  const [currentType, setCurrentType] = useState('museum');

  const types = [
    { id: 1, name: 'museum' },
    { id: 2, name: 'church' },
    { id: 3, name: 'cemetery' }
  ]

  // get coordinates of current city
  useEffect(() => {
    firestore.collection(topicName.admin).doc(cityId).get()
      .then(res => {
        setCoordinates({ lat: res.data().lat, lng: res.data().lng });
      })
  }, []);

  //get list of documentation in that city
  useEffect(() => {
    if (coordinates) {
      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'museum')
        .then(res => setMuseums(getGoodData(res.data)))
        .catch(err => console.error(err));

      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'church')
        .then(res => setChurches(getGoodData(res.data)))
        .catch(err => console.error(err));

      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'cemetery')
        .then(res => setCemeteries(getGoodData(res.data)))
        .catch(err => console.error(err));

      // const obj = { ...places }

      // //test
      // Object.keys(places).map(key => {
      //   AxiosService
      //     .getPlaces(coordinates.lat, coordinates.lng, key)
      //     .then(res => {
      //       obj[key] = getGoodData(res.data);
      //     })
      //     .catch(err => console.error(err));
      // }
      // )

      // setPlaces(obj)
    }
  }, [coordinates])

  const getGoodData = data => data.filter(d => d.business_status === "OPERATIONAL" && d.photos && d.types.length > 0)

  return (
    <section className={styles.container}>
      <div className={styles.docHeader}>
        <BlogHeader label='Institution to go' />
      </div>

      <div className={styles.btnGroup}>
        {types.map(t =>
          <button
            key={t.id} onClick={() => setCurrentType(t.name)}
            style={t.name.toLowerCase() === currentType ? { color: 'white', backgroundColor: '#F24B6A' } : {}}
          >
            {upperCaseFirstLetter(t.name)}
          </button>)}
      </div>

      <Map
        center={coordinates}
        // places={places}
        museums={museums}
        churches={churches}
        cemeteries={cemeteries}
        category={currentType}
      />
    </section>
  )
}

export default Documentation

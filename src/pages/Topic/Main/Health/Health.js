import { Rating } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { VscLoading } from 'react-icons/vsc';
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import { firestore } from '../../../../utils/firebase.utils';
import { sliceData } from '../../../../utils/sliceData';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Health.module.css';

const Health = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [hospitals, setHospitals] = useState([]);
  const [hospitalsWithImg, setHospitalsWithImg] = useState([]);
  const [hospitalSize, setHospitalSize] = useState(4);

  // get coordinates of current city
  useEffect(() => {
    firestore.collection(topicName.admin).doc(cityId).get()
      .then(res => {
        setCoordinates({ lat: res.data().lat, lng: res.data().lng });
      })
  }, [])

  // get list of hospitals in the selected city
  useEffect(() => {
    coordinates && AxiosService
      .getPlaces(coordinates.lat, coordinates.lng, 'hospital')
      .then(res => getHospitalInfo(res.data))
      .catch(err => console.error(err));
  }, [coordinates])

  useEffect(async () => {
    if (hospitals.length > 0) {
      const hospitalsHasPhoto = hospitals.filter(h => h.photos);
      const hospitalsNewArr = [];

      let results = hospitalsHasPhoto.map(h => AxiosService.getHospitalPhoto(h.photos.photo_reference));
      results = await Promise.all(results)

      for (let i = 0; i < hospitalsHasPhoto.length; i++) {
        const hospitalObj = hospitalsHasPhoto[i];
        hospitalObj.imgUrl = results[i].data;

        hospitalsNewArr.push(hospitalObj)
      }

      setHospitalsWithImg(hospitalsNewArr);
    }
  }, [hospitals]);

  const getHospitalInfo = hospitalList => {
    const newArr = hospitalList.length > 0 && hospitalList.map(hospital => (
      {
        name: hospital.name,
        address: hospital.vicinity,
        coordinates: [hospital.geometry.location.lng, hospital.geometry.location.lat],
        photos: hospital.photos && hospital.photos[0],
        place: hospital
      })
    )
    setHospitals(newArr)
  }

  //To limit the number of hospitals displayed
  const slicedData = sliceData(hospitalsWithImg, 0, hospitalSize);

  const moreOrLess = () => {
    let render = 'more';
    if (hospitalSize >= hospitalsWithImg.length) render = 'less';

    return `${render} hospital`;
  };

  const moreHospital = () => {
    let size = hospitalSize + 2;
    if (hospitalSize >= hospitalsWithImg.length) size = 4

    return setHospitalSize(size);
  }

  console.log(slicedData)

  return (
    <section className={styles.container}>
      <header className={styles.healthHeader}>
        <div>
          <BlogHeader label='Find suitable places' />
        </div>
      </header>

      <div className={styles.healthFlex}>
        {hospitals.length > 0 ?
          <div className={styles.healthList}>
            {slicedData.length > 0 && slicedData.map(h => {

              const htmlLink = h.photos.html_attributions[0];
              const linkUrl = htmlLink.slice((htmlLink.indexOf('"') + 1), (htmlLink.indexOf('>') - 1))

              return <Fragment key={h.place.place_id}>
                <div
                  className={styles.healthItems}
                  onClick={() => window.open(linkUrl, '_blank')}
                >
                  <div className={styles.healthPicture}>
                    <img src={h.imgUrl} alt={h.name} />
                  </div>
                  <div className={styles.healthInfo}>
                    <div className={styles.basicInfo}>
                      <header>{h.name}</header>
                      <div>
                        <FaMapMarkerAlt />
                        <span> {h.address}</span>
                      </div>
                    </div>

                    <div className={styles.rating}>
                      <div>{h.place.rating}</div>
                      <Rating
                        name='read-only'
                        readOnly
                        precision={0.5}
                        value={Number(h.place.rating)}
                        color='red'
                      />
                      <div>
                        {h.place.user_ratings_total ? h.place.user_ratings_total : 0} reviews
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            }
            )}
          </div>

          : <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
            <VscLoading style={{ fontSize: 80 }} />
          </div>
        }

        <div className={styles.vimeo}>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>
      </div>

      {slicedData.length > 0 &&
        <div
          className={styles.moreHospital}
          onClick={moreHospital}
        >
          <p>
            <IconContext.Provider value={{ className: "arrow-down" }}>
              {moreOrLess().includes("less") ? (
                <IoIosArrowUp className={styles.arrowDown} />
              ) : (
                <IoIosArrowDown className={styles.arrowDown} />
              )}
            </IconContext.Provider>
            {moreOrLess()}
          </p>
        </div>
      }
    </section>
  )
}

export default Health

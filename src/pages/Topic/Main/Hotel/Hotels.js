import React, { useContext, useEffect, useState, Fragment } from 'react';
import hotel from "./hotels.module.css";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { app, firestore } from '../../../../utils/firebase.utils';
import _ from "lodash";
import like from '../../../../assets/Topic/like.png'
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import HotelServiceCard from '../../Service/HotelServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import { useParams } from 'react-router-dom';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import AmadeusService from '../../Service/amadeus/AmadeusService';
import { sliceData } from '../../../../utils/sliceData';
import moment from 'moment';

const Hotels = () => {
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [showAdsServiceForm, setShowAdsServiceForm] = useState(false);

  const [currentServiceCard, setCurrentServiceCard] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  const [showList, setShowList] = useState(false);

  const [data, setData] = useState([]);
  const [ads, setAds] = useState({});
  const [hotelParams, setHotelParams] = useState({
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    adults: '',
  })

  useEffect(() => {
    getData()
  }, [showAdsServiceForm]);

  useEffect(() => {
    AmadeusService
      .searchHotels(hotelParams.cityCode)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [hotelParams])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setAds(doc.data().advertise)
      setHotelParams({ ...hotelParams, cityCode: doc.data().IATA_code })
    }
  }

  const handleSelect = () => {
    setShowList(!showList);
  }

  const handleList = e => {
    setShowList(false)
    setHotelParams({ ...hotelParams, adults: e.target.value })
  }

  const hotelPrice = price => {
    let string = '€';

    if (price < 50) string = string.repeat(2);
    if (price >= 50 && price < 80) string = string.repeat(3);
    if (price >= 80) string = string.repeat(4);

    return string;
  }

  const openServiceEditForm = () => {
    setShowAdsServiceForm(true);

    setCurrentServiceCard({
      link: ads.link,
      logo: ads.logo,
      text1: ads.text1,
      text2: ads.text2,
      style: ads.style
    })
  }

  const onSelectedService = () => {
    return (
      (showAdsServiceForm && editMode) ?
        <div>
          <HotelServiceCard
            title='Advertisement'
            uploadLabel='Logo'
            uploadDescription=' (The image has to be below 200 KB and PNG/JPG format) '
            setShow={setShowAdsServiceForm}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateServiceCard}
            onFileChange={onFileChange}
          />
        </div>
        : <div></div>
    )
  }

  const updateServiceCard = updatedCard => {
    setShowAdsServiceForm(false);

    const updatedAds = { ...updatedCard, logo: fileUrl || updatedCard.logo };

    return firestore.collection(topicName.admin).doc(cityId).update({
      advertise: updatedAds
    })
  }

  //image handling stuff
  const typeValidation = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/accomodation/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  const sliceHotel = data && sliceData(data, 0, 6)

  //
  const handleChange = e => {
    const { name, value } = e.target;
    setHotelParams({ ...hotelParams, [name]: value })
  }

  console.log('Params', hotelParams)

  const searchHotels = () => {
    setData([]);
    AmadeusService
      .findHotels(hotelParams)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }

  return (
    <section className={hotel.hotel}>
      <BlogHeader label='Find suitable hotels' />

      <div className={hotel.check}>
        <div>
          <input type='date' placeholder="Check-in" name='checkInDate' min={moment(new Date()).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <input type='date' placeholder="Check-out" name='checkOutDate' min={moment(new Date() + 1).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              readOnly={true}
              value={hotelParams.adults}
              onClick={handleSelect}
              name='adults'
              onChange={handleChange}
            />

            <nav style={{ height: showList && "89px" }}>
              <ul>
                <li onClick={handleList} value={1}>1</li>
                <li onClick={handleList} value={2}>2</li>
                <li onClick={handleList} value={3}>3+</li>
              </ul>
            </nav>
          </span>

          <p className={hotel.formselect}>
            <IconContext.Provider
              value={{
                className: "dropIcon",
                style: { transform: showList && "rotate(180deg)" },
              }}
            >
              <TiArrowSortedDown color='white' />
            </IconContext.Provider>
          </p>
        </div>

        <div>
          <button onClick={searchHotels}>Search Hotels</button>
        </div>
      </div>

      <div className={hotel.hotelflex}>

        {data.length > 0 ?
          <div className={hotel.hotelist}>
            {sliceHotel && sliceHotel.map((d) => (
              <div className={hotel.hotelitems} key={d.hotel.hotelId}>
                <div className={hotel.hoteleft}>
                  <img src={d.hotel.media ? d.hotel.media[0].uri : 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fscandic.png?alt=media&token=c8c3febc-26eb-423e-994e-1d032cb32bc2'} alt={d.hotel.name} />
                  {d.recommended && <p>{d.recommended}</p>}
                </div>
                <div className={hotel.hotelright}>
                  <header>{d.hotel.name}</header>

                  <div className={hotel.rightp}>
                    <p>{d.hotel.hotelDistance.distance} km from city center</p>
                    <p>Price: {hotelPrice(d.offers[0].price.total)}</p>
                    <p>
                      {" "}
                      {_.range(d.hotel.rating).map((r) => (
                        <img src={like} alt="like" key={r} />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          : 'Loading..................'
        }

        {ads && (
          <div
            className={hotel.vimeo}
            style={{ ...editStyle }}
          >
            <div
              className={hotel.content}
              style={ads.style ? { backgroundColor: ads.style.backgroundColor } : undefined}
              onClick={editMode ? openServiceEditForm : undefined}
            >
              <header className={hotel.vimeohead}>
                <img src={ads.logo} alt='logo' style={{ width: 100 }} />
              </header>

              <div className={hotel.vimeop}>
                <p>{ads.text1}</p>

                <p>{ads.text2}</p>
              </div>

              <div className={hotel.vimeobtn}>
                <a href={ads.link} target='_blank'>
                  <button
                    style={ads.style ? { backgroundColor: ads.style.buttonColor } : undefined}
                  >
                    Learn more
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
        <div>
          {onSelectedService()}
        </div>

      </div>
    </section>
  )
}

export default Hotels

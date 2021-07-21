import React, { useContext, useEffect, useState } from 'react';
import hotel from "./hotels.module.css";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { app, firestore } from '../../../../utils/firebase.utils';
import _ from "lodash";
import like from '../../../../assets/Topic/like.png'
import { EditContext } from '../../../../contexts/editContext';
import HotelServiceCard from '../../Service/HotelServiceCard';
import { sizeTransform } from '../../../../utils/sizeTransform';
import { useParams } from 'react-router-dom';
import HotelServiceCard2 from '../../Service/HotelServiceCard2';
import { Fragment } from 'react';

const Hotels = () => {
  const { cityId } = useParams();
  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [showAdsServiceForm, setShowAdsServiceForm] = useState(false);
  const [showHotelServiceForm, setShowHotelServiceForm] = useState(false);

  const [currentServiceCard, setCurrentServiceCard] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  const [select, setSelect] = useState('');
  const [showList, setShowList] = useState(false);

  const [data, setData] = useState([]);
  const [ads, setAds] = useState({});

  useEffect(() => {
    getData()
  }, [showAdsServiceForm, showHotelServiceForm])

  const getData = async () => {
    const doc = await firestore.collection('accomodation_items').doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setData(doc.data().hotel)
      setAds(doc.data().advertise)
    }
  }

  const handleSelect = () => {
    setShowList(!showList);
  }

  const handleList = e => {
    setSelect(e.target.innerText);
    setShowList(false)
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

    return firestore.collection('accomodation_items').doc(cityId).update({
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

  //for hotel handling
  const openHotelEditForm = item => {
    setShowHotelServiceForm(true);

    setCurrentServiceCard({
      id: item.id,
      distance: item.distance,
      img: item.img,
      link: item.link,
      price: item.price,
      rating: item.rating,
      recommended: item.recommended,
      title: item.title
    })
  }

  const onHotelService = () => {
    return (
      (showHotelServiceForm && editMode) ?
        <div>
          <HotelServiceCard2
            title='Hotel'
            uploadLabel='Image'
            uploadDescription=' (The image has to be below 200 KB and PNG/JPG format) '
            setShow={setShowHotelServiceForm}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateHotelCard}
            onFileChange={onFileChange}
          />
        </div>
        : <div></div>
    )
  }

  const updateHotelCard = updatedCard => {
    setShowHotelServiceForm(false);

    const updatedHotels = data.map(hotel => {
      return hotel.id === updatedCard.id ? { ...updatedCard, img: fileUrl || updatedCard.img } : hotel;
    })

    return firestore.collection('accomodation_items').doc(cityId).update({
      hotel: updatedHotels
    })
  }

  return (
    <section className={hotel.hotel}>
      <header className={hotel.header}>
        {window.innerWidth <= 515 ? 'Hotels & hostels' : 'Find suitable hotels'}
        <div className={hotel.underline}></div>

        
      </header>

      <div className={hotel.check}>
        <div>
          <input type='date' placeholder='check-in' />
        </div>

        <div>
          <input type="date" placeholder="Check-out" />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              readOnly={true}
              value={select}
              onClick={handleSelect}
            />

            <nav style={{ height: showList && "89px" }}>
              <ul>
                <li onClick={handleList}>1</li>
                <li onClick={handleList}>2</li>
                <li onClick={handleList}>3+</li>
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
              <TiArrowSortedDown />
            </IconContext.Provider>
          </p>
        </div>
      </div>

      <div className={hotel.hotelflex}>
        <div
          className={hotel.hotelist}
          style={{ ...editStyle }}
        >
          {data.map(d => (
            <Fragment key={d.id}>
              <div
                className={!editMode ? hotel.hotelitems : hotel.hotelitemsEdit}
                key={d.id}
                onClick={editMode ? () => openHotelEditForm(d) : undefined}
              >
                <div className={hotel.hoteleft}>
                  <img src={d.img} alt={d.title} />
                  {d.recommended && <p>{d.recommended}</p>}
                </div>

                <div className={hotel.hotelright}>
                  <header>{d.title}</header>

                  <div className={hotel.rightp}>
                    <p>{d.distance} km from city center</p>
                    <p>Price: {hotelPrice(d.price)}</p>
                    <p>
                      {" "}
                      {_.range(d.rating).map(r => (
                        <img src={like} alt='like' key={r} />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              {d.id === currentServiceCard.id &&
                <div>
                  {onHotelService()}
                </div>
              }
            </Fragment>
          ))}
        </div>

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

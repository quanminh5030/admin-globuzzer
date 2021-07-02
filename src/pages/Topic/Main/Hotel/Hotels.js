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

const Hotels = () => {
  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentServiceCard, setCurrentServiceCard] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  const [select, setSelect] = useState('');
  const [showList, setShowList] = useState(false);

  const [data, setData] = useState([]);
  const [ads, setAds] = useState({});
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    getData()
  }, [showServiceForm])

  const getData = async () => {
    const doc = await firestore.collection('topic_items').doc('accomodation').get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setData(doc.data().helsinki.hotels)
      setAds(doc.data().helsinki.advertise)
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
    setShowServiceForm(true);

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
      (showServiceForm && editMode) ?
        <div>
          <HotelServiceCard
            title='Advertisement'
            uploadLabel='Logo'
            uploadDescription=' (The image has to be below 200 KB and PNG/JPG format) '
            setShow={setShowServiceForm}
            currentFeatureCard={currentServiceCard}
            updateFeatureCard={updateServiceCard}
            onFileChange={onFileChange}
          />
        </div>
        : <div></div>
    )
  }

  const updateServiceCard = updatedCard => {
    setShowServiceForm(false);

    const updatedAds = { ...updatedCard, logo: fileUrl || updatedCard.logo };

    return firestore.collection('topic_items').doc('accomodation').update({
      'helsinki.advertise': updatedAds
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
          style={!editMode ? { cursor: 'pointer' } : {}}
        >
          {data.map(d => (
            <div
              className={!editMode ? hotel.hotelitems : hotel.hotelitemsEdit} key={d.id}
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

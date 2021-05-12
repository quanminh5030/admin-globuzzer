import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/SectionBannerPhotoForm';
import { AiFillCaretRight } from "react-icons/ai";
import {Link} from 'react-router-dom';
import SearchBar from '../../pages/Section/Header/SearchBar/SearchBar';

const SHeader = ({ contentEditable, cityId }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  let header = useRef();
  let place = useRef();
  const rawPlace = {text: '', color: '', link: ''};
  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };
  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [currentText, setCurrentText] = useState(rawText);
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);
  
  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setBanners([{img: doc.data().img }])
        setFetchedTexts([{id: 'title', content: doc.data().title.content, style: doc.data().title.style}, {id: 'subtitle', content: doc.data().subtitle.content, style: doc.data().subtitle.style}])
        setPlaces([{id: 'placeOne', color: doc.data().placeOne.color, link: doc.data().placeOne.link, text: doc.data().placeOne.text}, {id: 'placeTwo', color: doc.data().placeTwo.color, link: doc.data().placeTwo.link, text: doc.data().placeTwo.text}, {id: 'placeThree', color: doc.data().placeThree.color, link: doc.data().placeThree.link, text: doc.data().placeThree.text}])
        setLoading(false);
      }
    };
    getCurrentCity();
}, [cityId, currentText, currentPlace]);

// select the clicked 'place'
const handleClick = (e) => {
  const newPlace = places.filter((place) => {
    return place.id === e.target.name;
  });
  setCurrentPlace(newPlace[0]);
};

// select the clicked 'text' on banner
const getCurrentText = (e) => {
  const newText = fetchedTexts.filter((text) => {
    return text.id === e.target.id;
  });
  setCurrentText(newText[0]);
};

// change handler for place
const handleChangePlace = (e) => {
  const { name, value } = e.target;
  setCurrentPlace({...currentPlace, [name]: value});
};

// change handler for banner text
const handleChangeText = (e) => {
   // const { name, value } = e.target;
    setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
};

const formTextStyle = !showTextForm ? { display: "none" }
            : {
              position:'relative',
              left: '20%',
              };

const handleSubmitText = async () => {
  switch(currentText.id) {
    case 'title':
      await firestore.collection("section_items").doc(cityId).update({...currentCity, title: {content: currentText.content, style: currentText.style} });
      break;
    case 'subtitle':
      await firestore.collection("section_items").doc(cityId).update({...currentCity, subtitle: {content: currentText.content, style: currentText.style} });
      break;
      default:
  }
  setShowTextForm(false);
};

const handleSubmitPlace = async () => {
  switch(currentPlace.id) {
    case 'placeOne':
      await firestore.collection("section_items").doc(cityId).update({...currentCity, placeOne: currentPlace });
      break;
    case 'placeTwo':
      await firestore.collection("section_items").doc(cityId).update({...currentCity, placeTwo: currentPlace });
      break;
      case 'placeThree':
        await firestore.collection("section_items").doc(cityId).update({...currentCity, placeThree: currentPlace });
        break;
      default:
  }
  setShowPlaceForm(false);
};

const onSelectedText = (text, currentText) => {
  return (
    editMode && showTextForm && text.id === currentText.id &&
    <TextEdit 
      currentText={currentText} 
      formTextStyle={formTextStyle} 
      setShowForm={setShowTextForm} 
      save={handleSubmitText}
    />
  );
};

const onSelectedPlace = (place, currentPlace) => {
  return(
    editMode && showPlaceForm && place.id === currentPlace.id &&
    <BannerPlacesForm 
    showPlaceForm={showPlaceForm}
    currentPlace={currentPlace}
    handleChangePlace={handleChangePlace}
    setShowPlaceForm={setShowPlaceForm}
    save={handleSubmitPlace}
    />
  );
};

  return (
    <Fragment>
      <div style={{position: 'relative', bottom: "-60px"}}>
      <BannerPhotoForm 
        collection="section_items"
        doc={cityId}
      />
      </div>
      {banners.map(banner => (
        <section 
          key={banner.img} 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${banner.img})`}} 
        >
        <div className="city_header_url">
        <Link to="/landing">
          <p>Landing Page</p>
        </Link>
          <AiFillCaretRight className="city_header_url_icon" />
          <p>{currentCity.name}</p>
        </div>
        <div 
          className="headers" 
          ref={header} 
        >
          {fetchedTexts.map((t) => (
            <Fragment key={t.id}>
              <div>{onSelectedText(t, currentText)}</div>
              <p
                id={t.id}
                name={t.id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onFocus={getCurrentText}
                onBlur={handleChangeText}
                onClick={() => setShowTextForm(true)}
              >
                {t.content}
              </p>
            </Fragment>
          ))}
        </div>
        {/* <SearchCity /> */}
        <SearchBar sectionName={currentCity.name}/>
        <div ref={place}>
          <div id="header_suggestion" className="places">
            Maybe{" "}
            {places.map((p) => (
              <Fragment key={p.id}>
                {onSelectedPlace(p, currentPlace)}
                <a
                  href={p.link}
                  target="_new"
                  name={p.id}
                  contentEditable={contentEditable}
                  suppressContentEditableWarning="true"
                  style={{ ...editStyle, color: p.color }}
                  onFocus={handleClick}
                  onClick={() => setShowPlaceForm(true)}
                >
                  {p.text}
                </a>
              </Fragment>
            ))}
          </div>
        </div>
        </section>
      ))}
    </Fragment>
  );
};

export default SHeader;
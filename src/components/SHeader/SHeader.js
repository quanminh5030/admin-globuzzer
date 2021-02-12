import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';

const SHeader = ({ contentEditable, cityId }) => {
  const { editStyle } = useContext(EditContext);
  const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  // let header = useRef();
  // let place = useRef();
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
  console.log('currentText:',currentText)
 // fetch current city data
 useEffect(() => {
  const getCurrentCity = async () => {
    const doc = await firestore.collection('section_items').doc(cityId).get();
    if (!doc.exists) {
      setLoading(true);
    } else {
      setLoading(false);
      setCurrentCity(doc.data());
      setBanner(doc.data().banner);
      setFetchedTexts(doc.data().banner.texts);
      setPlaces(doc.data().banner.places);
    }
  };
  getCurrentCity();
}, [cityId]);

// select the clicked 'place'
const handleClick = (e) => {
  const newPlace = places.filter((place) => {
    return place.id === e.target.name;
  });
  setCurrentPlace(newPlace[0]);
};

// select the clicked 'text' on banner
const getCurrentText = (e) => {
  console.log(e.target)
  const newText = fetchedTexts.filter((text, id) => {
    return id === parseInt(e.target.id, 10);
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
                // position:'absolute',
                left: '30%',
                // top: '10%'
              };

const handleSubmitText = async () => {
    if(currentText.id) {
      await firestore.collection("texts").doc(currentText.id).update(currentText);
      console.log(currentText.id, "saved to db")
    }
};

const handleSubmitPlace = async () => {
    if(currentPlace.id) {
      await firestore.collection("places").doc(currentPlace.id).update(currentPlace);
      console.log(currentPlace.id, "saved to db")
    }
};

const onSelectedText = (id, currentText) => {
  return (
    showTextForm && id === parseInt(currentText.id, 10) &&
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
    showPlaceForm && place.id === currentPlace.id &&
    <BannerPlacesForm 
    showPlaceForm={showPlaceForm}
    currentPlace={currentPlace}
    handleChangePlace={handleChangePlace}
    setShowPlaceForm={setShowPlaceForm}
    save={handleSubmitPlace}
    />
  );
};

const renderedHeader = () => {
  return (
    <Fragment>
      <BannerPhotoForm 
        collection="banners"
        doc="banner"
      />
        <section 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${banner.img})`}} 
        >
        <div 
          className="headers" 
          // ref={header} 
        >
          {fetchedTexts.map((t, id) => (
            <Fragment key={`${id}-${t.content}-${t.style.fontSize}`}>
              <div>{onSelectedText(id, currentText)}</div>
              <p
                id={id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onClick={getCurrentText}
                onBlur={handleChangeText}
                // onClick={() => setShowTextForm(true)}
              >
                {t.content}
              </p>
            </Fragment>
          ))}
        </div>
        <SearchCity />
        <div 
          // ref={place}
        >
          <div id="header_suggestion" className="places">
            Maybe{" "}
            {places.map((p, id) => (
              <Fragment key={`${id}-${p.content}-${p.color}`}>
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
    </Fragment>
  );
};

  return (
    <Fragment>
      {loading ? <div>loading...</div> : renderedHeader()}
    </Fragment>
  );
};

export default SHeader;
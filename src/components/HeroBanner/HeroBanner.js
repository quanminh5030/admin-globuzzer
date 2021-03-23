import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';

const HeroBanner = ({ contentEditable }) => {
  const { editStyle, editMode } = useContext(EditContext);
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

  // fetch 'banners' content from db
  useEffect(() => {
    const fetchBanners = async () => {
      const bannersCollection = await firestore.collection('banners').get();
      setBanners(bannersCollection.docs.map(doc => {
        return doc.data();
      }));
    }
    fetchBanners();
  }, []);

  // fetch banner 'texts' content from db
  useEffect(() => {
    const getTexts = firestore
      .collection("texts")
      .onSnapshot((snapshot) => {
        const newText = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedTexts(newText);
      });
      return () => getTexts();
}, []);

  // fetch 'places' content from db
  useEffect(() => {
    const getPlaces = firestore
      .collection("places")
      .onSnapshot((snapshot) => {
        const newPlace = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlaces(newPlace);
        // console.log('new place:', newPlace);
      });
      return () => getPlaces();
  }, []);

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
                // position:'absolute',
                left: '30%',
                // top: '10%'
              };

const handleSubmitText = async () => {
    if(currentText.id) {
      await firestore.collection("texts").doc(currentText.id).update(currentText);
      setShowTextForm(false);
      console.log(currentText.id, "saved to db")
    }
};

const handleSubmitPlace = async () => {
    if(currentPlace.id) {
      await firestore.collection("places").doc(currentPlace.id).update(currentPlace);
      setShowPlaceForm(false)
      console.log(currentPlace.id, "saved to db")
    }
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

const onSelectedPlace = (currentPlace) => {
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
      <BannerPhotoForm 
        collection="banners"
        doc="banner"
      />
      {banners.map(banner => (
        <section 
          key={banner.img} 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${banner.img})`}} 
        >
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
        <SearchCity />
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

export default HeroBanner;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import { useFetchHeader } from '../../hooks/useFetchData';

const SHeader = ({ contentEditable, cityId }) => {
  const { loading, banner, fetchedTexts, places } = useFetchHeader(cityId);
  const { editStyle } = useContext(EditContext);
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
  const [currentText, setCurrentText] = useState(rawText);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);

// select the clicked 'place'
const getCurrentPlace = (e) => {
  const newPlace = places.filter((place, id) => {
    return id === parseInt(e.target.id, 10);
  });
  setCurrentPlace({...newPlace[0], id: e.target.id});
};

// select the clicked 'text' on banner
const getCurrentText = (e) => {
  const newText = fetchedTexts.filter((text, id) => {
    return id === parseInt(e.target.id, 10);
  });
  // setShowTextForm(true);
  setCurrentText({...newText[0], id: e.target.id});
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

const onSelectedPlace = (id, currentPlace) => {
  return(
    showPlaceForm && id === parseInt(currentPlace.id, 10) &&
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
        <div 
          // ref={place}
        >
          <div id="header_suggestion" className="places">
            Maybe{" "}
            {places.map((p, id) => (
              <Fragment key={`${id}-${p.content}-${p.color}`}>
                {onSelectedPlace(id, currentPlace)}
                <a
                  id={id}
                  href={p.link}
                  target="_new"
                  contentEditable={contentEditable}
                  suppressContentEditableWarning="true"
                  style={{ ...editStyle, color: p.color }}
                  onFocus={getCurrentPlace}
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
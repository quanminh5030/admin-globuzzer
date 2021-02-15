import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import { useFetchHeader } from '../../hooks/useFetchData';
import { updObj, updArr } from '../../utils/actions.firebase';
import useForm from '../../hooks/useForm';

const SHeader = ({ contentEditable, cityId, callback }) => {
  const { loading, banner, fetchedTexts, places, currentCity } = useFetchHeader(cityId);
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
//   // ////////////////
//   const [test, setTest] = useState(null)
//   useEffect(() => {
//     const unsubscribe = firestore
//       .collection('section_items')
//       .onSnapshot(
//         (snapshot) => {
//           setTest(
//             snapshot.docs.map((doc) => ({
//               ...doc.data()
//             })),
//           );
//         },
//       );
//       return () => unsubscribe();
//   }, [cityId]);
//   console.log(test.filter(t => {
//     return t.id === cityId
//   }))
// // ////////////////////////////
  const [currentText, setCurrentText] = useState(rawText);
  const [currentTextId, setCurrentTextId] = useState(null);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentBanner, setCurrentBanner] = useState({});
  
// select the clicked 'place'
const getCurrentPlace = (e) => {
  const newPlace = places.filter((place, id) => {
    return id === parseInt(e.target.id, 10);
  });
  setCurrentPlace({...newPlace[0]});
  setCurrentPlaceId(e.target.id);
};
// select the clicked 'text' on banner
const getCurrentText = (e) => {
  const newText = fetchedTexts.filter((text, id) => {
    return id === parseInt(e.target.id, 10);
  });
  setCurrentText({...newText[0]});
  setCurrentTextId(e.target.id);
};
// change handler for place
const handleChangePlace = (e) => {
  const { name, value } = e.target;
  setCurrentBanner(updObj(banner, 'places', updArr(banner.places, currentPlaceId, {...currentPlace, [name]: value})));
  setCurrentPlace({...currentPlace, [name]: value});
};

// change handler for banner text
const handleChangeText = (e) => {
    setCurrentBanner(updObj(banner, 'texts', updArr(banner.texts, e.target.id, {...currentText, content: e.target.innerText})));
    // setCurrentText({...currentText, content: e.target.innerText});
};

const formTextStyle = !showTextForm ? { display: "none" }
            : {
                // position:'absolute',
                left: '30%',
                // top: '10%'
              };

const handleSubmitText = async () => {
  if(currentTextId) {
    await firestore.collection("section_items").doc(cityId).update({banner:{...currentBanner}});
    console.log(currentTextId, "saved to db")
  }
};

const handleSubmitPlace = async () => {
    await firestore.collection("section_items").doc(cityId).update({banner:{...currentBanner}});
    console.log(currentPlaceId, "saved to db")
};

const onSelectedText = (id, currentText) => {
  return (
    showTextForm && id === parseInt(currentTextId, 10) &&
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
    showPlaceForm && id === parseInt(currentPlaceId, 10) &&
    <BannerPlacesForm 
    showPlaceForm={showPlaceForm}
    currentPlace={currentPlace}
    handleChangePlace={handleChangePlace}
    setShowPlaceForm={setShowPlaceForm}
    save={handleSubmitPlace}
    />
  );
};

const style = {
  position: 'relative',
  top: '36px',
};

const renderedHeader = () => {
  return (
    <Fragment>
      <div style={style}>
      <BannerPhotoForm 
        collection="section_items"
        doc={cityId}
      />
      </div>
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
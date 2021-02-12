import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEdit';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import useFetch from '../../hooks/useFetch';
import { updateData } from '../../utils/actions.firebase';

const HeroHeader = ({ contentEditable, cityId }) => {
  const { loading, items } = useFetch('section_items');
  const { editStyle } = useContext(EditContext);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  // let header = useRef();
  // let place = useRef();
  
  const currentItem = items.find(item => item.id === cityId);
  // let texts = [];
  // const [fetchedTexts, setFetchedTexts] = useState();
  const [currentText, setCurrentText] = useState(null);
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState({});
  const [updatedItem, setUpdatedItem] = useState(currentItem);
  // console.log(updatedItem.banner.texts);
// select the clicked 'place'
// if (!loading) {
//   texts = [...currentItem.banner.texts];
// }
// console.log('texts:', texts);

const handleClick = (e) => {
  const newPlace = places.filter((place) => {
    return place.id === e.target.name;
  });
  setCurrentPlace(newPlace[0]);
};

// select the clicked 'text' on banner
const getCurrentText = async (e) => {
  const newText = await currentItem.banner.texts.filter((text, id) => {
    return id === parseInt(e.target.id, 10);
  });
  setCurrentText({...newText[0], content: e.target.innerText, id: e.target.id});
  // setUpdatedItem({...currentItem, banner: {...currentItem.banner, texts: [...currentItem.banner.texts, currentItem.banner.texts[parseInt(currentText.id, 10)] = currentText ]}});
  
  setShowTextForm(true);
};

// change handler for place
const handleChangePlace = (e) => {
  const { name, value } = e.target;
  setCurrentPlace({...currentPlace, [name]: value});
};

// change handler for banner text

const formTextStyle = !showTextForm ? { display: "none" }
            : {
                // position:'absolute',
                left: '30%',
                // top: '10%'
              };

const handleSubmitText = async () => {
    // if(currentText.id) {
    //   await firestore.collection("texts").doc(currentText.id).update(currentText);
    //   console.log(currentText.id, "saved to db")
    // }
    updateData("section_items", currentItem, updatedItem);
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
  let texts = [...currentItem.banner.texts];
  const handleChangeText = (e) => {
    // const { name, value } = e.target;
     // setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
     console.log(currentText)
    //  texts[currentText.id] = currentText;
     console.log('texts1:', texts);
 };
 
  // console.log('ttt',texts)
  return (
    <Fragment>
      <BannerPhotoForm 
        collection="banners"
        doc="banner"
      />
        <section 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${currentItem.banner.img})`}} 
        >
        <div 
          className="headers" 
          // ref={header} 
        >
          {currentItem.banner.texts.map((t, id) => (
            <Fragment key={`${t.id}-${t.content}-${t.style.fontSize}`}>
              <div>{onSelectedText(id, currentText)}</div>
              <p
                id={id}
                contentEditable={contentEditable}
                style={{ ...editStyle, ...t.style }}
                suppressContentEditableWarning="true"
                onClick={getCurrentText}
                // onFocus={getCurrentText}
                onFocus={handleChangeText}
              >
                {t.content}
              </p>
            </Fragment>
          ))}
        </div>
        {/* <SearchCity />
        <div ref={place}>
          <div id="header_suggestion" className="places">
            Maybe{" "}
            {currentItem.banner.places.map((p) => (
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
        </div> */}
        </section>
    </Fragment>
  );
}

  return (
    <Fragment>
      {loading ? <div>Loading....gogule</div> : renderedHeader()}
    </Fragment>
  );
};

export default HeroHeader;
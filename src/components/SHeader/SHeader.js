import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEditSection';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import { useFetchHeader } from '../../hooks/useFetchData';
import store from 'store';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';

const SHeader = ({ contentEditable, cityId, callback }) => {
  const { editMode } = useContext(EditContext)
  const { loading, fetchedCurrentCity } = useFetchHeader(cityId);
  const [currentCity, setCurrentCity] = useState({});
  const { editStyle } = useContext(EditContext);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});
  const [currentSubtitle, setCurrentSubtitle] = useState({});
  const [header, setHeader] = useState('');
  const [currentPlace, setCurrentPlace] = useState({});
  const [place, setPlace] = useState('');

  const style = {
    position: 'relative',
    top: '36px',
  };

  const formTextStyle = !showTextForm ? { display: "none" }
            : {
                position: 'relative',
                top: header === "title" ? '50px' : '140px'
              };
// console.log(currentCity)
  useEffect(() => {
    store.set('currentCity', fetchedCurrentCity) //set localStorage at mount
    setCurrentCity(store.get('currentCity'))
    // return () => store.remove('currentCity') //clean localStorage after unmont
  },[fetchedCurrentCity])

const renderedHeader = () => {
  const { bannerImg, title, subtitle, placeOne, placeTwo, placeThree, url } = currentCity;
console.log(showPlaceForm)
  const onSelectedText = (text) => {
    return (
      editMode && showTextForm && text &&
      <TextEdit 
        header={header}
        changeHandler={changeHandler}
        currentText={text} 
        formTextStyle={formTextStyle} 
        setShowForm={setShowTextForm} 
        save={handleSubmitText}
      />
    );
  };

  const getCurrentText = (e) => {
    setShowTextForm(true);
    setHeader(e.target.id);
  };

  const getCurrentPlace = (e) => {
    // setShowPlaceForm(true);
    switch (e.target.id) {
      case 'one':
        setCurrentPlace(placeOne);
        setPlace('placeOne')
        break;
      case 'two':
        setCurrentPlace(placeTwo);
        setPlace('placeTwo')
        break;
      case 'three':
        setCurrentPlace(placeThree);
        setPlace('placeThree')
        break;
        default:
    }
  };

  const handleChangeText = (e) => {
    if (e.target.id === "title") {
      setCurrentTitle({...title, content: e.target.innerText});
    } else if (e.target.id === "subtitle") {
      setCurrentSubtitle({...subtitle, content: e.target.innerText});
    } else {
      
    }   
  };

  const changeHandler = (target, value) => {
    if (target === "title") {
      setCurrentTitle({...currentTitle, style:{...currentTitle.style, ...value}})
    } else if (target === "subtitle") {
      setCurrentSubtitle({...subtitle, style:{...subtitle.style, ...value}})
    }
  };

  const handleSubmitText = async () => {
    // store.set('currentCity', { ...currentCity, title: currentTitle, subtitle: currentSubtitle })
    await firestore.collection("section_items").doc(cityId).update({...currentCity, title: currentTitle, subtitle: currentSubtitle });
  };

  // change handler for place
  const handleChangePlace = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({...currentPlace, [name]: value});
  };

  const handleSubmitPlace = async () => {
    await firestore.collection("section_items").doc(cityId).update({...currentCity, [place]: currentPlace });
    setShowPlaceForm(false)
  };

  const onSelectedPlace = (currentPlace) => {
    return(
      editMode && showPlaceForm &&
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
      <div style={style}>
        <BannerPhotoForm 
          collection="section_items"
          doc={cityId}
        />
      </div>
      <section 
          className="section_header" 
          id="section_header" 
          style={{backgroundImage: `url(${bannerImg})`}} 
      >
        <div 
          className="headers" 
          // style={editStyle}
          // onClick={getCurrentText}
        >
          {header === "title" && onSelectedText(title)}
          {header === "subtitle" && onSelectedText(subtitle)}
          <p
            contentEditable={contentEditable}
            style={{...title.style, ...editStyle, ...currentTitle.style}}
            suppressContentEditableWarning="true"
            id="title"
            onFocus={getCurrentText}
            onBlur={handleChangeText}
          >
            {title.content}</p>
          
          <p
            contentEditable={contentEditable}
            style={{...subtitle.style, ...editStyle, ...currentSubtitle.style}}
            suppressContentEditableWarning="true"
            id="subtitle"
            onFocus={getCurrentText}
            onBlur={handleChangeText}
          >
            {subtitle.content}</p>
        </div>
          <SearchCity />
        <div 
          // ref={place}
        >
          <div id="header_suggestion" className="places">
          {onSelectedPlace(currentPlace)}
            Maybe{" "}
              <a
                href={placeOne.link}
                target="_new"
                id="one"
                contentEditable={contentEditable}
                suppressContentEditableWarning="true"
                style={{ ...editStyle, color: placeOne.color }}
                onFocus={getCurrentPlace}
                onClick={() => setShowPlaceForm(true)}
              >
                {placeOne.text}
              </a>
              <a
                href={placeTwo.link}
                target="_new"
                id="two"
                contentEditable={contentEditable}
                suppressContentEditableWarning="true"
                style={{ ...editStyle, color: placeTwo.color }}
                onFocus={getCurrentPlace}
                onClick={() => setShowPlaceForm(true)}
              >
                {placeTwo.text}
              </a>
              <a
                href={placeThree.link}
                target="_new"
                id="three"
                contentEditable={contentEditable}
                suppressContentEditableWarning="true"
                style={{ ...editStyle, color: placeThree.color }}
                onFocus={getCurrentPlace}
                onClick={() => setShowPlaceForm(true)}
              >
                {placeThree.text}
              </a>
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
import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEditSection';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import { useFetchHeader } from '../../hooks/useFetchData';
import store from 'store';

const SHeader = ({ contentEditable, cityId, callback }) => {
  const { loading, fetchedCurrentCity } = useFetchHeader(cityId);
  const [currentCity, setCurrentCity] = useState({});
  const { editStyle } = useContext(EditContext);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [currentTitle, setCurrentTitle] = useState({});
  const [currentSubtitle, setCurrentSubtitle] = useState({});
  const [header, setHeader] = useState('');
console.log(currentTitle.style)

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

  const onSelectedText = (text) => {
    return (
      showTextForm && text &&
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
    // await firestore.collection("section_items").doc(cityId).update(textsState);
    // setShowTextForm(false);
    // console.log("saved to dbs")
    // localStorage.setItem('texts', JSON.stringify({...currentCity, texts: textsState.texts}))
    // setTest(JSON.parse(localStorage.getItem('texts')))
    store.set('currentCity', { ...currentCity, title: currentTitle, subtitle: currentSubtitle })
    // setCurrentCity(store.get('currentCity'))
    // console.log(textsState)
    await firestore.collection("section_items").doc(cityId).update({...currentCity, title: currentTitle, subtitle: currentSubtitle });
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
          <div id="header_suggestion" className="places" onClick={() => setShowPlaceForm(true)}>
            Maybe{" "}
            <p
              style={{color: placeOne.color}}
              id="one"
            >
              {placeOne.text}
            </p>
            <p
              style={{color: placeTwo.color}}
              id="two"
            >
              {placeTwo.text}
            </p>
            <p
              style={{color: placeThree.color}}
              id="three"
            >
              {placeThree.text}</p>
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
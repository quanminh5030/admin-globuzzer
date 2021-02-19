import React, { useContext, useEffect, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase.utils';
import { EditContext } from '../../contexts/editContext';
import { SearchCity } from '../SearchCity/SearchCity';
import { Fragment } from 'react';
import TextEdit from '../TextEdit/TextEditSection';
import BannerPlacesForm from '../../pages/Admin/BannerForm/BannerPlacesForm';
import BannerPhotoForm from '../../pages/Admin/BannerForm/BannerPhotoForm';
import { useFetchHeader } from '../../hooks/useFetchData';
import { updObj, updArr } from '../../utils/actions.firebase';
import useForm from '../../hooks/useForm';

const SHeader = ({ contentEditable, cityId, callback }) => {
  const { loading, currentCity } = useFetchHeader(cityId);
  const { editStyle } = useContext(EditContext);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [title, setTitle] = useState({});
  const [subtitle, setSubtitle] = useState({});
  const [header, setHeader] = useState('');

  const style = {
    position: 'relative',
    top: '36px',
  };

  const formTextStyle = !showTextForm ? { display: "none" }
            : {
                position: 'relative',
                top: header === "title" ? '50px' : '140px'
              };

const renderedHeader = () => {
  // console.log('ct',title, subtitle);
  // console.log('crt', header)
  const { bannerImg, name, places, texts } = currentCity;
  const { one, two, three } = places;
  const textsState = {
    texts:{
      ...texts, 
      subtitle: {...texts.subtitle, ...subtitle}, 
      title: {...texts.title, ...title}
    }
  };
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

  const changeHandler = (target, val) => {
    if (target === "title") {
      setTitle({...title, style:{...title.style, ...val}})
    } else if (target === "subtitle") {
      setSubtitle({...subtitle, style:{...subtitle.style, ...val}})
    }
  };

  const handleSubmitText = async () => {
    await firestore.collection("section_items").doc(cityId).update(textsState);
    setShowTextForm(false);
    // console.table({texts:{...texts, subtitle: {...texts.subtitle, ...currentSubtitle}, title: {...texts.title, ...currentTitle}}});
    console.log("saved to dbs")
  };

  const getCurrentText = (e) => {
    setShowTextForm(true);
    setHeader(e.target.id);
    if (e.target.id === "title") {
      setTitle({...texts.title, content: e.target.innerText});
    } else if (e.target.id === "subtitle") {
      setSubtitle({...texts.subtitle, content: e.target.innerText});
    } else {
      
    }
  };

  const handleChangeText = (e) => {
    if (e.target.id === "title") {
      setTitle({...title, content: e.target.innerText});;
    } else if (e.target.id === "subtitle") {
      setSubtitle({...subtitle, content: e.target.innerText});
    } else {
      
    }   
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
            style={{...texts.title.style, ...editStyle, ...title.style}}
            suppressContentEditableWarning="true"
            id="title"
            onFocus={getCurrentText}
            onKeyUp={handleChangeText}
          >
            {texts.title.content}</p>
          
          <p
            contentEditable={contentEditable}
            style={{...texts.subtitle.style, ...editStyle, ...subtitle.style}}
            suppressContentEditableWarning="true"
            id="subtitle"
            onFocus={getCurrentText}
            onKeyUp={handleChangeText}
          >
            {texts.subtitle.content}</p>
        </div>
          <SearchCity />
        <div 
          // ref={place}
        >
          <div id="header_suggestion" className="places" onClick={() => setShowPlaceForm(true)}>
            Maybe{" "}
            <p
              style={{color: one.color}}
              id="one"
            >
              {one.text}
            </p>
            <p
              style={{color: two.color}}
              id="two"
            >
              {two.text}
            </p>
            <p
              style={{color: three.color}}
              id="three"
            >
              {three.text}</p>
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
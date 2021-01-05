import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showCommunityForm, setShowCommunitytForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);

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

  const [fetchedCommunityTexts, setFetchedCommunityTexts] = useState([]);
  const [currentCommunityText, setCurrentCommunityText] = useState(rawText);

  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace);

  const [banners, setBanners] = useState([]);
 
  // add red marks around editable content
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px"
    } : {};
    
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
          // console.log('new snapshot:', newText);
        });
        return () => getTexts();
  }, []);

  // fetch comunnity 'texts' content from db
  useEffect(() => {
    const getTexts = firestore
      .collection("community")
      .onSnapshot((snapshot) => {
        const newText = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchedCommunityTexts(newText);
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

  // fetch 'banners' content from db
  useEffect(() => {
    const fetchBanners = async () => {
      const bannersCollection = await firestore.collection('banners').get();
      setBanners(bannersCollection.docs.map(doc => {
        return doc.data();
      }))
    }
    fetchBanners();
  }, [])

  // change handler for place
  const handleChangePlace = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({...currentPlace, [name]: value});
  }

  // change handler for banner text
  const handleChangeText = (e) => {
     // const { name, value } = e.target;
      setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
  }

  // change handler for community text
  const handleChangeCommunityText = (e) => {
    setCurrentCommunityText({...currentCommunityText, content: e.target.innerText, id: e.target.id});
 }

  const handleSubmit = (collection, document) => (e) => {
    e.preventDefault();
      if(document.id) {firestore.collection(collection).doc(document.id).update(document)}
  }

  // const handleSubmitPlaces = (e) => {
  //   e.preventDefault();
  //     firestore.collection('places').doc(currentPlace.id).update(currentPlace);
  // }

  // const handleSubmitText = (e) => {
  //    e.preventDefault();
  //       firestore.collection('texts').doc(currentText.id).update(currentText);
  // }

  const handleEditMode = () => {
    setEditMode(true);
    [ ...document.querySelectorAll('.content-editable')].forEach((element)=>{
      element.classList.add('edit-mode');
  })
  }

  const showEditPictureForm = (e) => {
    if (e.target.id === "camera") {
      e.target.style.color = "#F35270";
      setShowPhotoForm(true);
    }
  }

  const showBannerForms = (e) => {
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;
    
    if (editMode) {
      if (parent.classList.contains('headers')) {
        sibling ? setHeaderID(1) : setHeaderID(2);
        setShowTextForm(true)
      } else if (parent.nodeName === "P") {
        setShowPlaceForm(true);
      }
    }
  }

  const showCommunityForms = (e) => {
    console.log(e.target)
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;
    console.log(parent, sibling);
    setShowCommunitytForm(!showCommunityForm);
    console.log(showCommunityForm)
  }
  
  return (
    <EditContext.Provider
    value={{
      fetchedTexts, handleChangePlace, handleSubmit,
      handleEditMode, editMode, setEditMode, editStyle, places,
      showPlaceForm, setShowPlaceForm, showTextForm, setShowTextForm,
      showBannerForms, currentPlace, setCurrentPlace, handleChangeText, headerID, currentText, setCurrentText, showEditPictureForm, showPhotoForm, setShowPhotoForm, fileUrl, setFileUrl, banners, fetchedCommunityTexts, currentCommunityText, showCommunityForms
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

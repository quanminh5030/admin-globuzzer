import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);

  const rawPlace = {text: '', color: '', link: ''};
  const rawBanner = {img: ''};
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

  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(rawBanner);
  console.log(banners)

  // add red marks around editable content
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px"
    } : {};

  // fetch 'texts' content from db
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
    const getBanners = firestore
      .collection("banners")
      .onSnapshot((snapshot) => {
        const newBanner = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBanners(newBanner);
        // console.log('new place:', newPlace);
      });
      return () => getBanners();
  }, []);

  // change handler for place
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({...currentPlace, [name]: value});
  }

  // change handler for text
  const handleChangeText = (e) => {
     // const { name, value } = e.target;
      setCurrentText({...currentText, content: e.target.innerText, id: e.target.id});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      firestore.collection('places').doc(currentPlace.id).update(currentPlace);
  }

  const handleSubmitText = (e) => {
     e.preventDefault();
        firestore.collection('texts').doc(currentText.id).update(currentText);
    //    console.log('updated:', currentText.id)
    // console.log("saved...")
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
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

  const handleShowForm = (e) => {
    const parent = e.target.parentElement;
    const sibling = e.target.nextSibling;
    
    if (editMode) {
      if (parent.classList.contains('headers')) {
        sibling ? setHeaderID(1) : setHeaderID(2);
        setShowTextForm(true)
      } else if (parent.nodeName === "P") {
        setShowForm(true);
      }
    }
  }

  return (
    <EditContext.Provider
    value={{
      fetchedTexts, handleChange, handleSubmit,
      handleEditMode, editMode, editStyle, places,
      showForm, setShowForm, showTextForm, setShowTextForm,
      handleShowForm, currentPlace, setCurrentPlace, handleChangeText, headerID,
      handleSubmitText, currentText, setCurrentText, showEditPictureForm, showPhotoForm, setShowPhotoForm
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

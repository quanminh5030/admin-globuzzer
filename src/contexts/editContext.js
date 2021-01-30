import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPlaceForm, setShowPlaceForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showTextCommunityForm, setShowTextCommunityForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);
  const [textCommunityID, setTextCommunityID] = useState(null);
  const [coord, setCoord] = useState({X: null, Y: null});

  const rawText = {
    content: '',
    style: {
      color: '',
      fontSize: '',
      fontWeight: '',
      textAlign: ''
    }
  };

  const [fetchedCommunityTexts, setFetchedCommunityTexts] = useState([]);
  const [currentCommunityText, setCurrentCommunityText] = useState(rawText);

  const [videos, setVideos] = useState([]);

  // add red marks around editable content
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px"
    } : {};
  
  //capture X Y coordinates of the click
  const getCoordinates = (e) => {
    setCoord({X:e.clientX, Y:e.clientY});
    console.log(coord.X, coord.Y)
  }

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

  // fetch 'videos' content from db
  useEffect(() => {
    const fetchVideos = firestore
    .collection('video')
    .onSnapshot((snapshot) => {
      const newVideo = snapshot.docs.map((doc) => ({
        ...doc.data()
      }));
      setVideos(newVideo);
    });
    return () => fetchVideos();
  }, [])

  // change handler for community text
  const handleChangeCommunityText = (e) => {
    setCurrentCommunityText({...currentCommunityText, content: e.target.innerText, id: e.target.id});
 };

  const handleSubmit = (collection, document) => (e) => {
    e.preventDefault();
      if(document.id) {firestore.collection(collection).doc(document.id).update(document);
        console.log(document.id, "saved to db")
      }
  };

  const handleEditMode = () => {
    setEditMode(true);
    [ ...document.querySelectorAll('.content-editable')].forEach((element)=>{
      element.classList.add('edit-mode');
  })
  };

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
  };

  const showCommunityForms = (e) => {
    if (editMode) {
      console.log(e.target.classList.value)
      setTextCommunityID(e.target.classList.value);
      setShowTextCommunityForm(true); 
    }
  };
  
  return (
    <EditContext.Provider
    value={{
      handleSubmit,
      handleEditMode, editMode, setEditMode, editStyle,
      showPlaceForm, setShowPlaceForm, showTextForm, setShowTextForm,
      showBannerForms, headerID, showEditPictureForm, showPhotoForm, setShowPhotoForm, fileUrl, setFileUrl, fetchedCommunityTexts, currentCommunityText, showCommunityForms, showTextCommunityForm, setShowTextCommunityForm, textCommunityID, setCurrentCommunityText, handleChangeCommunityText, videos, getCoordinates, coord
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

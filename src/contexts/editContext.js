import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [pos, setPos] = useState({X: 0, Y: 0});

  const rawPlace = {
    text: '',
    color: '',
    link: ''
  }

  const [text, setText] = useState([]);
  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [currentPlace, setCurrentPlace] = useState(rawPlace)

  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px"
    } : {};

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlace({...currentPlace, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      firestore.collection('places').doc(currentPlace.id).update(currentPlace);
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleShowForm = (e) => {
    if (editMode) {
      if (e.target.id === "header_1" || e.target.id === "header_2") {
        setPos({X: e.clientX,Y: e.clientY})
        setShowTextForm(true)
      } else if (currentPlace.id === e.target.name) {
        setShowForm(true);
      }
    }
    console.log("form:",showForm, "text:", showTextForm)
  }

  const saveIt = () => {

  }

  const viewIt = () => {

  }

  const releaseIt = () => {

  }

 // const gogu = firestore.collection("texts").doc();
 // console.log("firestore:", gogu)


  return (
    <EditContext.Provider
    value={{
      text, fetchedTexts, handleChange, handleSubmit,
      handleEditMode, editMode, saveIt, viewIt,
      releaseIt, editStyle, places, showForm, setShowForm,showTextForm, setShowTextForm, handleShowForm,
      currentPlace, setCurrentPlace, pos
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

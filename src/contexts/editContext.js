import React, { createContext, useState, useEffect } from 'react';
import { firestore } from "../utils/firebase.utils";
export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTextForm, setShowTextForm] = useState(false);
  const [headerID, setHeaderID] = useState(null);
  const [pos, setPos] = useState({X: 0, Y: 0});

  const rawPlace = {
    text: '',
    color: '',
    link: ''
  };

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
       // console.log('updated:', currentText.id)
    // console.log(e.target)
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleShowForm = (e) => {
    if (editMode) {
      setPos({X: e.clientX, Y: e.clientY})
      if (e.target.id === "K7I3zyv8v93zTKbBhYRA" || e.target.id === "ser7qi3yciM8HQLU6aDv") {
        if (e.target.id === "K7I3zyv8v93zTKbBhYRA") {
          setHeaderID(1)
        } else if (e.target.id === "ser7qi3yciM8HQLU6aDv") {
          setHeaderID(2)
        } else {

        }
        setShowTextForm(true)
      } else if (currentPlace.id === e.target.name) {
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
      handleSubmitText, currentText, setCurrentText
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

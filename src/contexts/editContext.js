import React, { createContext, useState } from 'react';
import { firestore } from "../utils/firebase.utils";

export const TopicPathContext = createContext();

export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [coord, setCoord] = useState({ X: null, Y: null });

  // add red marks around editable content
  const editStyle =
    editMode ? {
      border: "2px solid #F26678",
      boxSizing: "border-box",
      borderRadius: "5px",
      padding: "8px"
    } : {};

  const editStyle2 =
    editMode ? {
      background: 'rgba(244, 121, 137, 0.2)',  
    } : {};

  //capture X Y coordinates of the click
  const getCoordinates = (e) => {
    setCoord({ X: e.clientX, Y: e.clientY });
    console.log(coord.X, coord.Y)
  }

  const handleSubmit = async (collection, document) => async (e) => {
    console.log('submit called')
    e.preventDefault();
    if (document.id) {
      await firestore.collection(collection).doc(document.id).update(document);
      console.log(document.id, "saved to db")
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
    [...document.querySelectorAll('.content-editable')].forEach((element) => {
      element.classList.add('edit-mode');
    })
  };

  return (
    <EditContext.Provider
      value={{
        handleSubmit,
        handleEditMode, editMode, setEditMode, editStyle, editStyle2, fileUrl, setFileUrl, getCoordinates, coord
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

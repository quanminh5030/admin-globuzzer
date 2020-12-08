import React, { createContext, useState } from 'react';

export const EditContext = createContext();

const EditContextProvider = (props) => {
  const [texts, setTexts] = useState({
    textOne: 'The global community of locals and expats',
    textTwo: 'Commplete guidance when relocating to a new city',
    newPlace: 'Stockholm'
  });

  const rawDetails = {
    color: '',
    text: '',
    link: '',
  }
  const [details, setDetails] = useState(rawDetails);
  const [editMode, setEditMode] = useState(false);

  const handleForm = (e) => {
    const value = e.target.value;
    setDetails({...details, [e.target.id]: value});
     // console.log(details)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(details);
    setDetails(rawDetails);
  }

  const handleCancel = () => {
    setDetails(rawDetails);
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const saveIt = () => {
    alert("details saved");
  }

  const viewIt = () => {
    alert("view it");
  }

  const releaseIt = () => {
    alert("release it");
  }

  return (
    <EditContext.Provider
    value={{
      texts, handleForm, handleSubmit, handleCancel,
      details, handleEditMode, editMode, saveIt, viewIt,
      releaseIt
       }}
    >
      {props.children}
    </EditContext.Provider>
  );
}

export default EditContextProvider;

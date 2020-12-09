import React, { createContext, useState } from 'react';

export const EditContext = createContext();

const EditContextProvider = (props) => {
  const rawDetails = {
    color: '',
    text: '',
    link: '',
  }
  const [details, setDetails] = useState({
    color: '#f24b6a',
    text: 'Stockholm',
    link: 'https://globuzzer.mn.co/groups/195831/feed',
  });
  const [editMode, setEditMode] = useState(false);
  const [texts, setTexts] = useState([{
    textOne: {
      content: 'The global community of locals and expats',
      style: {}
    },
    textTwo: {
      content: 'Commplete guidance when relocating to a new city',
      style: {}
    }
  }]);

  // console.log(texts)


  const handleForm = (e) => {
    const value = e.target.value;
    setDetails({...details, [e.target.id]: value});
     // console.log(details)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setDetails(rawDetails);
  }

  const handleCancel = () => {
    setDetails(rawDetails);
    setEditMode(false);
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const saveIt = () => {

  }

  const viewIt = () => {

  }

  const releaseIt = () => {

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

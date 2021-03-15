import React, { useEffect, useState, useContext } from 'react';
import { EditContext } from '../../contexts/editContext';
import FeatureCardForm from '../../pages/Admin/FeatureCardForm/FeatureCardForm';
import { app, firestore } from '../../utils/firebase.utils';
import { sizeTransform } from '../../utils/sizeTransform';
import FeatureCard from './FeatureCard';
import styles from './FeatureCard.module.css';

const FeatureCardPage = () => {
  const [featureCards, setFeatureCards] = useState([]);
  const [show, setShow] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const initialFeatureCardState = [
    {id: null, text:"", image:"", title:""},
  ];
  const [currentFeatureCard, setCurrentFeatureCard] = useState(initialFeatureCardState);
  const { editStyle, editMode } = useContext(EditContext);

  useEffect(() => {
    //fetch FeatureCard data from firebase
    const unsubscribe = firestore
      .collection("features")
      // .orderBy("title")
      .onSnapshot((snapshot) => {
        const newCards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeatureCards(newCards);
      });
      return () => unsubscribe();
  }, []);

  const openEditForm = (data) => {
    setShow(true);
    setCurrentFeatureCard({
      id: data.id,
      text: data.text,
      title: data.title,
      image: data.image,
    })
  };

  const updateFeatureCard = (({currentFeatureCard}, updatedFeatureCard) => {
    setShow(false);
    firestore.collection('features').doc(currentFeatureCard.id).update(updatedFeatureCard)
  });

  // on form submit, the file url is set in firestore
  const onSubmit = async (data) => {
    const getCollection = firestore.collection('features');
    await getCollection.doc(currentFeatureCard.id).set({
      image: fileUrl || data.image,
      text: data.text,
      title: data.title
    })
    console.log("file saved:", fileUrl)
    setShow(false);
  }


  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  } 
  // manage the upload file form + type and size validation
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`features/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

const onSelectedCard = (card, currentCard) => {
  return (
    card.id === currentCard.id &&
    show && editMode &&
    <div>
    <FeatureCardForm 
      setShow={setShow} 
      currentFeatureCard={currentFeatureCard} 
      updateFeatureCard={updateFeatureCard} 
      onFileChange={onFileChange}
      onFileSubmit={onSubmit}
    />
  </div>
  );
};


  return (
    <div>
      <div className={styles.home_value_container}>
        {featureCards.map((card) => (
          <div key={card.id} >
            <FeatureCard 
              card={card} 
              editFeatureCard={() => openEditForm(card)} 
            />
            {onSelectedCard(card, currentFeatureCard)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCardPage;
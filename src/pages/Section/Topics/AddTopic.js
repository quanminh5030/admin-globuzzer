import React, { useEffect, useState } from 'react';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';
import { v4 as uuidv4 } from 'uuid';
import CityForm from '../../Admin/CityForm/SectionAddTopicForm';


const AddArticle = ({ cityId }) => {
  const [show, setShow] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [currentService, setCurrentService] = useState(
    {
      link: "",
      text: "",
      image: "",
      id: uuidv4(),
    }
  );
  
  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setTopics(doc.data().topics)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [show, cityId]);

  const createService = async (data)=> {
    setShow(false);
    await firestore.collection('section_items').doc(cityId).update({topics: [...topics, {...data, image: imgUrl}]});
  };

  //validations
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`section/services/${file.name}`);
      await fileRef.put(file);
      setImgUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  };

  return (
    <div>
      <div 
        className="add_article"
        style={{backgroundColor: show ? '#f24b6a' : '#C4C4C4', left:'850px', bottom: '-190px'}}
        onClick={() => setShow(true)}
      >
        +
      </div>
      {show && 
        <CityForm
          setIsVisible={setShow}
          onFileChange={onFileChange}
          updateItem={createService}
          currentItem={currentService}
      />
      }
    </div>
  );
};

export default AddArticle;
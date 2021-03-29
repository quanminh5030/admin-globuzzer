import React, { useEffect, useState } from 'react';
import AddArticleForm from './AddArticleForm';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';
import { v4 as uuidv4 } from 'uuid';

const AddArticle = ({cityId}) => {
  const [show, setShow] = useState(false);
  const [coverUrl, setCoverUrl] = useState(null);
  const [authUrl, setAuthUrl] = useState(null);
  const [createdId, setCreatedId] = useState(null);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(
    {
      coverImg: coverUrl,
      title: "title",
      link: "",
      authImg: authUrl,
      authName: "author",
      likes: "0",
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
        setArticles(doc.data().articles)
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId, show]);

  const createArticle = async (data)=> {
    setShow(false);
    await firestore.collection('section_items').doc(cityId).update({articles: [...articles, data]});
  };

  //validations
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  };

  const onCoverChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`section/articles/${file.name}`);
      await fileRef.put(file);
      setCoverUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }
  
  const onAuthorChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`section/articles/${file.name}`);
      await fileRef.put(file);
      setAuthUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }
  }

  return (
    <div>
      <div 
        className="add_article"
        style={{backgroundColor: show ? '#f24b6a' : '#C4C4C4'}}
        onClick={() => setShow(true)}
      >
        +
      </div>
      {show && 
        <AddArticleForm
          setShow={setShow}
          onCoverChange={onCoverChange}
          onAuthorChange={onAuthorChange}
          createArticle={createArticle}
          createdId={createdId}
          currentArticle={currentArticle}
      />
      }
    </div>
  );
};

export default AddArticle;
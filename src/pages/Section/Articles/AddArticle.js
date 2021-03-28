import React, { useState } from 'react';
import AddArticleForm from './AddArticleForm';
import { firestore, app } from '../../../utils/firebase.utils';
import { sizeTransform } from '../../../utils/sizeTransform';

const AddArticle = ({cityId}) => {
  const [show, setShow] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [createdId, setCreatedId] = useState(null);
 
  const createArticle = async (data)=> {
    setShow(false);
    // const result = await firestore.collection('section_items').doc(cityId).update({articles: data});
    // setCreatedId(result.id);
    // await firestore.collection("services").doc(result.id).update({...data, id: result.id})
  };

  //validations
  const typeValidation = ["image/png",  "image/jpeg", "image/jpg"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    
    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) 
    {
      const fileRef = storageRef.child(`articles/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }     
  };

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
          onFileChange={onFileChange}
          fileUrl={fileUrl}
          createArticle={createArticle}
          serviceId={createdId}
      />
      }
    </div>
  );
};

export default AddArticle;
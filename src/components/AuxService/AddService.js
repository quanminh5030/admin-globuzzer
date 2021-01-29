import React, { useState } from 'react';
import AddServiceForm from '../../pages/Admin/ServiceForm/AddServiceForm';
import { firestore, app } from '../../utils/firebase.utils';
import { sizeTransform } from '../../utils/sizeTransform';

const AddService = () => {
  const [display, setDisplay] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [createdId, setCreatedId] = useState(null);
 
  const createService = async (data)=> {
    setDisplay(false);
    const result = await firestore.collection("services").add(data);
    setCreatedId(result.id);
    await firestore.collection("services").doc(result.id).update({...data, id: result.id})
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
      const fileRef = storageRef.child(`services/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    } else {
      alert(message(file))
    }     
  };

  return (
    <div>
      <div 
        className="add_service"
        style={{backgroundColor: display ? '#f24b6a' : '#C4C4C4'}}
        onClick={() => setDisplay(true)}
      >
        +
      </div>
      {display && 
        <AddServiceForm
          setDisplay={setDisplay}
          onFileChange={onFileChange}
          fileUrl={fileUrl}
          createService={createService}
          serviceId={createdId}
      />
      }
    </div>
  );
};

export default AddService;
import React, { useState } from 'react';
import AddServiceForm from '../../pages/Admin/ServiceForm/AddServiceForm';
import { firestore } from '../../utils/firebase.utils';

const AddService = () => {
  const [display, setDisplay] = useState(false);
  console.log(display)
  const currentService = {
    des: "",
    link: "",
    logo: "",
    name: ""
  };
  const createService = (service)=> {
    setDisplay(false);
    firestore.collection("services").add({
      des: service.des,
      link: service.link,
      logo: service.logo,
      name: service.name
    })
  };

  const showAddForm = () => {
    return (
      <div>
        <AddServiceForm
          setDisplay={setDisplay}
        />
      </div>
    );
  }
  return (
    <div>
      <div 
        className="add_service"
        onClick={() => setDisplay(true)}
      >
        +
      </div>
      {display && 
        <AddServiceForm
        setDisplay={setDisplay}
      />
      }
    </div>
  );
};

export default AddService;
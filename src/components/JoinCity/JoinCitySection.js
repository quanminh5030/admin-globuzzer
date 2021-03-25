import React, {useState, useEffect, useContext} from 'react';
import {JoinCity} from './JoinCity';
import "../../css/Home.css";
import { app, firestore } from "../../utils/firebase.utils";
import CityForm from '../../pages/Admin/CityForm/CityForm';
import {RequestNewCity} from '../RequestNewCity/RequestNewCity';
import { sizeTransform } from '../../utils/sizeTransform';
import { EditContext } from '../../contexts/editContext';
const JoinCitySection = () => {
  const { editMode } = useContext(EditContext);
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const initialItemState = [
    { id: null, name: "", img: "", members: ""},
  ];
  const [currentItem, setCurrentItem] = useState(initialItemState);

  useEffect(() => {
    const unsubscribe=firestore
      .collection("cities")
      .orderBy("name")
      .limit(11)
      .onSnapshot((snapshot) => {
        const newCity = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJoinCity(newCity);
        // console.log(newCity);
      });
      return () => unsubscribe();
  }, []);
  
   
const formHandler = (cityData) => {
  setIsVisible(true);
  setCurrentItem({
    id: cityData.id,
    name:cityData.name,
    members: cityData.members,
    img:cityData.img,
    join:cityData.join
  })
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
    const fileRef = storageRef.child(`cities/${file.name}`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  } else {
    alert(message(file))
  }     
};

const onSelectedCity = (data, city) => {
  return (
    city.id === data.id &&
    isVisible && editMode &&
      <div>
        <CityForm 
          setIsVisible={setIsVisible} 
          currentItem={currentItem} 
          updateItem={updateItem}
          onFileChange={onFileChange}
          fileUrl={fileUrl}
        />                
      </div>
  );
}

const updateItem = (({currentItem}, updatedItem)=> {
  console.log("it sends item to the updated item function", updatedItem, currentItem.id);
  setIsVisible(false);
  firestore.collection('cities').doc(currentItem.id).update(updatedItem);
});

return (
    <div>
    <div className="joincity_grid">
      {joinCity.map((cityData) => (
        <div key={cityData.id}>
          <JoinCity 
            cityData={cityData}  
            openForm={()=>formHandler(cityData)}
          />
          {onSelectedCity(cityData, currentItem)}
        </div>
      ))}
      {!moreJoinCity && joinCity.length > 0 && (
        <JoinCity
          cityData={{ name: "Explore more cities" }}
          isViewMore
          setMoreJoinCity={setMoreJoinCity}
        />
      )}
      {moreJoinCity && joinCity.length > 0 && <RequestNewCity />}
      {/* {isVisible &&  <div>
      <CityForm setIsVisible={setIsVisible} currentItem={currentItem} updateItem={updateItem}/>                
    </div>}   */}
    </div> 
    
    <div className="no_item">
      {joinCity.length === 0 && <RequestNewCity />}
    </div>
    </div>
  );
}

export default JoinCitySection;

import React, {useState, useEffect} from 'react';
import {JoinCity} from './JoinCity';
import "../../css/Home.css";
import { firestore } from "../../utils/firebase.utils";
import CityForm from '../../pages/Admin/CityForm/CityForm';
import {RequestNewCity} from '../RequestNewCity/RequestNewCity';
const JoinCitySection = () => {
    const [moreJoinCity, setMoreJoinCity] = useState(false);
    const [joinCity, setJoinCity] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
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
          console.log(newCity);
        });
        return () => unsubscribe();
    }, []);
  
   
  const formHandler = (cityData) => {
    setIsVisible(true);
    setCurrentItem({
     id: cityData.id,
     name:cityData.name,
     members: cityData.members,
     img:cityData.img
   })
  };
  
  const updateItem = (({currentItem}, updatedItem)=> {
    console.log("it sends item to the updated item function", updatedItem, currentItem.id);
    setIsVisible(false);
    firestore.collection('cities').doc(currentItem.id).update(updatedItem);
  })
    return (
        <div>
        <div className="joincity_grid">
          {joinCity.map((cityData) => (
            <JoinCity cityData={cityData} key={cityData.id} openForm={()=>formHandler(cityData)}/>
          ))}
          {!moreJoinCity && joinCity.length > 0 && (
            <JoinCity
              cityData={{ name: "Explore more cities" }}
              isViewMore
              setMoreJoinCity={setMoreJoinCity}
            />
          )}
          {moreJoinCity && joinCity.length > 0 && <RequestNewCity />}
          {isVisible &&  <div>
          <CityForm setIsVisible={setIsVisible} currentItem={currentItem} updateItem={updateItem}/>                
        </div>}  
        </div> 
       
        <div className="no_item">
          {joinCity.length === 0 && <RequestNewCity />}
        </div>
        </div>
    );
}

export default JoinCitySection;

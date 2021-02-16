import { useState, useEffect } from "react";
import { firestore } from "../utils/firebase.utils";

export const useFetchHeader = (cityId) => {
  const [items, setItems] = useState(null);
  const [currentCity, setCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});
  const [fetchedTexts, setFetchedTexts] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setLoading(false);
        setCurrentCity(doc.data());
        setBanner(doc.data().banner);
        setFetchedTexts(doc.data().banner.texts);
        setPlaces(doc.data().banner.places);
      }
    };
    getCurrentCity();
  }, [cityId]);
  
  // useEffect(() => {
  //   const unsubscribe = () => {

  //     const doc = firestore.collection('section_items').doc(cityId);
  //     doc.onSnapshot(docSnapshot => {
  //        const current = docSnapshot.data();
  //        if(!current) {
  //         setLoading(true);
  //       } else {
  //         setLoading(false);
  //         setCurrentCity(current);
  //         setBanner(current.banner);
  //         setFetchedTexts(current.banner.texts);
  //         setPlaces(current.banner.places);
  //       }
  //     }, error => {
  //       console.log(error)
  //     });
  //   };
  //     return () => unsubscribe();
  // }, [cityId, currentCity]);

  return {
    currentCity,
    loading,
    banner,
    fetchedTexts,
    places
  };
};

export const useCityId = () => {
  const [cityId, setCityId] = useState(null);
  
  useEffect(() => {

  })
};

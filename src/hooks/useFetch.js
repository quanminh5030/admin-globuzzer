import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils"

const useFetch = (collection) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    items: [],
  });

  useEffect(() => {
    const unsubscribe = firestore
      .collection(collection)
      .onSnapshot(
        (snapshot) => {
          setData({
            error: null,
            loading: false,
            items: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            })),
          });
        },
        (error) => {
          setData({
            error,
            loading: false,
            items: [],
          });
        },
      );
      return () => unsubscribe();
  }, [collection, setData]);
  return data;
};

export default useFetch;
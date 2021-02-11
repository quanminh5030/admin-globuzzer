import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils"

const useUpload = (data) => {
  useEffect(() => {
    const uploadData = async (data)=> {
      await firestore.collection("section_items").add(data);
    };
    uploadData(data);
  }, [data]);
};

export default useUpload;
import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils"

const useUploadSection = (data) => {
  useEffect(() => {
    const uploadData = async (data)=> {
      await firestore.collection("section_items").add(data);
    };
    uploadData(data);
  }, [data]);
};

export default useUploadSection;
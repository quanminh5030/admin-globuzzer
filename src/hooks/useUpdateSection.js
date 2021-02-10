import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils"

const useUpdateSection = (doc) => {
  useEffect(() => {
    const updateData = async (doc)=> {
      await firestore.collection("section_items").doc(doc.id).update({...doc})
    };
    updateData(doc);
  }, [doc]);
};

export default useUpdateSection;

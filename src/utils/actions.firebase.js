import { firestore } from "./firebase.utils";
// create a new doc in db
export const createNew = async (collection, doc) => {
  await firestore.collection(collection).add(doc);
};

// read data from db is done via useFetch custom hook

// update a doc in db
export const updateData = async (collection, currentDoc, updatedDoc) => {
  if (currentDoc.id) {
    await firestore.collection(collection).doc(currentDoc.id).update({ ...currentDoc, ...updatedDoc })
  }
};

// delete doc from db
export const deleteData = async (collection, data) => {
  await firestore.collection(collection).doc(data.id).delete();
};
// delete doc from db
export const deleteWithId = async (collection, id) => {
  await firestore.collection(collection).doc(id).delete();
};
// read data from db
export const readData = async (collection, id) => {
  const itemRef = firestore.collection(collection);
  const snapshot = await itemRef.where('id', '==', id).get();
  let docId = ""
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    docId = doc.id
  });
  return docId
};

// update a certain key in an object -->>
export const updateObject = (obj, key, value) => {
  const updatedObj = { ...obj, [key]: value };
  return updatedObj;
};
// obj[key] = value

// object update inside an object
export const updObj = (obj, key, value) => {
  const myObj = { ...obj };
  myObj[key] = value;
  return myObj;
};
// array update inside an object
export const updArr = (arr, index, value) => {
  // console.log(Array.isArray(a))
  const myArr = [...arr];
  myArr[index] = value;
  return myArr;
};
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAQGOwD9MPOnKz89-APoso1AeWwNoSrhqg",
  authDomain: "admin-project-9c459.firebaseapp.com",
  projectId: "admin-project-9c459",
  storageBucket: "admin-project-9c459.appspot.com",
  messagingSenderId: "509265017455",
  appId: "1:509265017455:web:770b8bb41fdfe3b507ab9a"
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { password, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        password,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

//sign in with google

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

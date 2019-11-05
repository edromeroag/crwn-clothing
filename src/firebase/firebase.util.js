import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBabJ0G9A8oi8Rv7zAiyTBtpmeD0069tyk",
  authDomain: "crwn-db-e23ad.firebaseapp.com",
  databaseURL: "https://crwn-db-e23ad.firebaseio.com",
  projectId: "crwn-db-e23ad",
  storageBucket: "crwn-db-e23ad.appspot.com",
  messagingSenderId: "369218744725",
  appId: "1:369218744725:web:647d7ed75695c094e3069c"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

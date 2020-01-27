import firebaseSDK from 'firebase';

/* eslint-disable no-undef */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appID: process.env.REACT_APP_APPID,
};
/* eslint-enable no-undef */

const firebase = firebaseSDK.initializeApp(firebaseConfig, "YourFeed");
firebase.auth().useDeviceLanguage();

export default firebase;
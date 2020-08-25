import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCWO1mwtIFAcqhxsEmfhTrI6ar5qrPC-j4",
    authDomain: "what-sup-5d9d6.firebaseapp.com",
    databaseURL: "https://what-sup-5d9d6.firebaseio.com",
    projectId: "what-sup-5d9d6",
    storageBucket: "what-sup-5d9d6.appspot.com",
    messagingSenderId: "194038566953",
    appId: "1:194038566953:web:bdc98c8e31fc11fd1c4c38",
    measurementId: "G-2L75MX2V95"
  };


  const  firebaseapp = firebase.initializeApp(firebaseConfig);
  const db =firebaseapp.firestore();
  const auth = firebase.auth();
  const provider =  new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export  default db;

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  // add your config here
  });

  const db = firebaseApp.firestore();

  export default db;
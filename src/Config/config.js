import * as firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyA9smzzOAGuP2RVn9k1RLLVinsL6Tpgc7g",
    authDomain: "testapp-e5299.firebaseapp.com",
    databaseURL: "https://testapp-e5299.firebaseio.com",
    projectId: "testapp-e5299",
    storageBucket: "testapp-e5299.appspot.com",
    messagingSenderId: "58873909693"
  };

firebase.initializeApp(DB_CONFIG);

export const database = firebase.database();
export const storage = firebase.storage().ref();
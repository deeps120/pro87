import * as firebase from 'firebase'
require('@firebase/firestore')

 var firebaseConfig = {
    apiKey: "AIzaSyBp6ikInqPGooLpWSUgERuRuBR-a0BPA8M",
    authDomain: "storyhub-c1523.firebaseapp.com",
    databaseURL: "https://storyhub-c1523.firebaseio.com",
    projectId: "storyhub-c1523",
    storageBucket: "storyhub-c1523.appspot.com",
    messagingSenderId: "559269109303",
    appId: "1:559269109303:web:47d1c33b7778535cda29b2",
    measurementId: "G-HVSQ5EDJ7M"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()
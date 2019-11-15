import firebase from 'firebase/app'; 
import 'firebase/database'; 
import 'firebase/auth';


let firebaseConfig = {
    apiKey: "AIzaSyDGm87r-2w3wHpa7DidwS2vienKfVMJ2nY",
    authDomain: "tripdiary-c73d5.firebaseapp.com",
    databaseURL: "https://tripdiary-c73d5.firebaseio.com",
    projectId: "tripdiary-c73d5",
    storageBucket: "tripdiary-c73d5.appspot.com",
    messagingSenderId: "189918485383",
    appId: "1:189918485383:web:ce7a0645a1733f05c15122"
  };

  firebase.initializeApp(firebaseConfig); 

  export default firebase; 


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzKML6uWACqwhwIdWbh9FbnF6tlID2crY",
    authDomain: "pizzashop-73322.firebaseapp.com",
    projectId: "pizzashop-73322",
    storageBucket: "pizzashop-73322.appspot.com",
    messagingSenderId: "50506438137",
    appId: "1:50506438137:web:01f07e17f42ba355c01928"
  };
   
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
 export const db = getFirestore(app);
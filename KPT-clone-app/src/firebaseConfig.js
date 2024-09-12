// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsVP2nY7qfseeFBZlivLcfLjqIMx1yY98",
  authDomain: "kpt-clone.firebaseapp.com",
  projectId: "kpt-clone",
  storageBucket: "kpt-clone.appspot.com",
  messagingSenderId: "795033219061",
  appId: "1:795033219061:web:5b76219ad782fd11a13abc",
  measurementId: "G-WX3S5337HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
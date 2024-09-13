import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: "AIzaSyCsVP2nY7qfseeFBZlivLcfLjqIMx1yY98",
  authDomain: "kpt-clone.firebaseapp.com",
  projectId: "kpt-clone",
  storageBucket: "kpt-clone.appspot.com",
  messagingSenderId: "795033219061",
  appId: "1:795033219061:web:5b76219ad782fd11a13abc",
  measurementId: "G-WX3S5337HV"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore와 Authentication 객체 가져오기
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);

export { auth, db, doc, setDoc, getDoc, firestore };

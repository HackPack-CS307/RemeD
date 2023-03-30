// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwQ3kDX8g54eUpBnebFj4a-MSrc4pM3-0",
  authDomain: "remed-82140.firebaseapp.com",
  projectId: "remed-82140",
  storageBucket: "remed-82140.appspot.com",
  messagingSenderId: "50476036108",
  appId: "1:50476036108:web:983074577682d720293e29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

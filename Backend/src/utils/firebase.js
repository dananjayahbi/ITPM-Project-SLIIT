// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSydsdsdafgdsgdsg",
  authDomain: "fdsfdsf.firebaseapp.com",
  projectId: "fdsfdsfds",
  storageBucket: "fsfsdfsd.com",
  messagingSenderId: "8fdsfsdfsdf",
  appId: "1:545451515:web:45454545",
  measurementId: "G-YESfsdfsgsd"
};

// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appfirebase);
 export default appfirebase;
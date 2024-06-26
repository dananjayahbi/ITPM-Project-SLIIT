import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import firebase from "firebase/compat/app";

const firebaseConfig = {}
firebase.initializeApp = (firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </React.StrictMode>
)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBywe_-n1GJ4dbt-zqQI-GN1EJq8C4TiLM",
    authDomain: "count-down-mapp.firebaseapp.com",
    databaseURL: "https://count-down-mapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "count-down-mapp",
    storageBucket: "count-down-mapp.appspot.com",
    messagingSenderId: "356234291619",
    appId: "1:356234291619:web:446f0d47839dc1ce865216",
    measurementId: "G-106DXYGSNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

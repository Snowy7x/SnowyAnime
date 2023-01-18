// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCg6AxQV0G7Jd8vVGheLjlQf22WvZ2CuBI",
    authDomain: "snowyanime-e5543.firebaseapp.com",
    projectId: "snowyanime-e5543",
    storageBucket: "snowyanime-e5543.appspot.com",
    messagingSenderId: "730022085811",
    appId: "1:730022085811:web:25fb9642639ffcbc9f9cc6",
    measurementId: "G-QCWX99W2M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
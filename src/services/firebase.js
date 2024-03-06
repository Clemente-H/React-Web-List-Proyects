import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-I-841a11HSN2RjUycXWze79ZZLkLwRg",
    authDomain: "react-projects-96a6c.firebaseapp.com",
    projectId: "react-projects-96a6c",
    storageBucket: "react-projects-96a6c.appspot.com",
    messagingSenderId: "311831988857",
    appId: "1:311831988857:web:f1e0b7d4d852369018e2a8",
    measurementId: "G-J2NT81S1DX"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export { auth, db };

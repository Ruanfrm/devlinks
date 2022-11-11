import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAZqHRVTLOc2dcgkFfRAf5rU_IgM_FF9IE",
  authDomain: "devlink-cebe6.firebaseapp.com",
  projectId: "devlink-cebe6",
  storageBucket: "devlink-cebe6.appspot.com",
  messagingSenderId: "41530512404",
  appId: "1:41530512404:web:0d3f6e13c5ce2bb3c84301",
  measurementId: "G-L98XNJHTSR"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp);

export {db, auth};

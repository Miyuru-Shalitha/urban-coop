import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    FapiKey: "AIzaSyC-x6af0Fwu_s9XBs1jLnje6r1WnSzn9jY",
    authDomain: "urban-coop-28042401.firebaseapp.com",
    projectId: "urban-coop-28042401",
    storageBucket: "urban-coop-28042401.appspot.com",
    messagingSenderId: "226076819218",
    appId: "1:226076819218:web:899bac32b365efcb2b7dcb"
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

export default storage;
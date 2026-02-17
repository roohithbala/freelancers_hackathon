import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIObJz-MXWzVr5ODkF5HQ1pstLxusXxg8",
    authDomain: "hackathon-fe6a5.firebaseapp.com",
    projectId: "hackathon-fe6a5",
    storageBucket: "hackathon-fe6a5.firebasestorage.app",
    messagingSenderId: "283942635798",
    appId: "1:283942635798:web:bfeb7d8ab5ce55dcd1e837"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

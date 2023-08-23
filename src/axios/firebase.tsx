import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// eslint-disable-next-line import/no-duplicates
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// eslint-disable-next-line import/no-duplicates
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_GOOGLE_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();

export default firebaseApp;
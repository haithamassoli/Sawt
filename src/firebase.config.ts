import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';

// initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage);
// });

export const firebaseConfig = {
  apiKey: "AIzaSyC9EhXED9zGPNbS66gGlMKH7rgEBtVu5x8",
  authDomain: "sawt-jo.firebaseapp.com",
  projectId: "sawt-jo",
  storageBucket: "sawt-jo.appspot.com",
  messagingSenderId: "538339777554",
  appId: "1:538339777554:web:ef5efccf3ef1b36dcd0ccb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

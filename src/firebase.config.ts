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

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = Constants?.expoConfig?.extra?.firebase;

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

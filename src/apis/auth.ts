import { storeDataToStorage } from "@utils/helper";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import {
  signOut,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth, db } from "@src/firebase.config";
import { useStore } from "@zustand/store";

export const loginMutation = () => {
  return useMutation({
    mutationFn: (data: { code: string; verificationId: string }) =>
      login(data.code, data.verificationId),
    onSuccess: (data: any) => {
      useStore.setState({ user: data, snackbarText: "تم تسجيل الدخول بنجاح" });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};
const login = async (code: string, verificationId: string) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(userRef, where("uid", "==", user.uid))
    );
    let userWithData = {};
    querySnapshot.forEach((doc) => {
      userWithData = {
        ...user,
        name: doc.data().name,
        phoneNumber: doc.data().phoneNumber,
      };
    });
    return userWithData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyCodeMutation = () => {
  return useMutation({
    mutationFn: (data: {
      code: string;
      verificationId: string;
      name: string;
    }) => verifyCode(data.code, data.verificationId, data.name),
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};
const verifyCode = async (
  code: string,
  verificationId: string,
  name: string
) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      uid: user.uid,
      name: name,
      phoneNumber: user.phoneNumber,
      createdAt: new Date(),
    });
    const userWithData = { ...user, name: name, phoneNumber: user.phoneNumber };
    return userWithData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutMutation = () => {
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      useStore.setState({ snackbarText: "تم تسجيل الخروج بنجاح", user: null });
    },
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    await storeDataToStorage("user", null);
  }
};

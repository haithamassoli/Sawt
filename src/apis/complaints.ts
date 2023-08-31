import { collection, addDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

export interface IComplaintData {
  complaints: string;
  images?: string[];
  createdAt: Date;
}

export const addComplaintMutation = () => {
  return useMutation((data: IComplaintData) => addComplaint(data));
};

const addComplaint = async (data: IComplaintData) => {
  try {
    await addDoc(collection(db, "complaints"), data);
  } catch (e: any) {
    console.error("Error adding document: ", e);
  }
};

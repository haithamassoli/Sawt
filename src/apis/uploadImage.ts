import { storage } from "@src/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@zustand/store";

export const uploadImageMutation = () => {
  return useMutation({
    mutationFn: (uri: string) => uploadImageAsync(uri),
    onError: (error: any) => {
      useStore.setState({ snackbarText: error.message });
    },
  });
};

async function uploadImageAsync(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const fileName = uri.split("/").pop();
  const fileRef = ref(storage, `images/${fileName}-${Date.now()}`);
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
}

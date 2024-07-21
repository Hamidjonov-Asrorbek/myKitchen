import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase/config";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user.providerData));
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

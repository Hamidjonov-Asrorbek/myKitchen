import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signInWithGoogle } from "../../authService";

// Define types using the `type` keyword
type SignData = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
};

type Errors = {
  email: string;
  password: string;
  firebase: string;
};

function SignUp() {
  const navigate = useNavigate();
  const [signData, setSignData] = useState<SignData>({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    firebase: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Example: Password must be at least 6 characters long
  };

  const validateInputs = () => {
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(signData.email)) {
      emailError = "Invalid email address.";
    }

    if (!validatePassword(signData.password)) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, firebase: "" });
      return false;
    }

    setErrors({ email: "", password: "", firebase: "" });
    return true;
  };

  // const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Handle profile update logic here
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;

    createUserWithEmailAndPassword(auth, signData.email, signData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: signData.displayName,
          photoURL: signData.photoURL,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrors((prevErrors) => ({
          ...prevErrors,
          firebase: "Failed to sign up. Please check your credentials.",
        }));
      });

    localStorage.setItem(
      "user",
      JSON.stringify(auth.currentUser?.providerData[0])
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firebase: "Failed to sign in with Google. Please try again.",
      }));
    }
  };

  return (
    <>
      <form
        className="w-1/3 flex flex-col gap-5 m-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-center">Sign Up</h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={signData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSignData({ ...signData, email: e.target.value })
            }
          />
        </label>
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={signData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSignData({ ...signData, password: e.target.value })
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={signData.displayName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSignData({ ...signData, displayName: e.target.value })
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 opacity-70"
          >
            <path d="M12 2a1 1 0 0 1 1 1v5h2.586l-3.293-3.293a1 1 0 1 1 1.414-1.414L16.707 7.586A1 1 0 0 1 16 9H13v4a1 1 0 0 1-2 0V9H8a1 1 0 0 1-.707-1.707L10.293 4.707a1 1 0 0 1 1.414 1.414L8.414 10H11V3a1 1 0 0 1 1-1zM5 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm14-1a1 1 0 0 0-1 1v4.172l-1.586-1.586a2 2 0 0 0-2.828 0L11.828 20.172a1 1 0 0 0 0 1.414L16.586 27a2 2 0 0 0 2.828 0L22 24.414V18a1 1 0 0 0-1-1h-2zm1 6.586L19.414 21H21v2.586z" />
          </svg>
          <input
            type="link"
            className="grow"
            placeholder="Image link"
            value={signData.photoURL}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSignData({ ...signData, photoURL: e.target.value })
            }
          />
        </label>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        {errors.firebase && <p className="text-red-500">{errors.firebase}</p>}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <button className="btn btn-success w-full" onClick={handleGoogleSignIn}>
          Google
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          I have an account
        </button>
      </form>
      {/* <form
        className="w-1/3 flex flex-col gap-5 m-auto"
        onSubmit={handleUpdateProfile}
      >
        <h1 className="text-3xl text-center">User info</h1> */}

      {/* <button type="submit" className="btn btn-primary">
          User create
        </button>
      </form> */}
    </>
  );
}

export default SignUp;

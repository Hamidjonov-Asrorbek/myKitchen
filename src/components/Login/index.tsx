import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../authService";

// Define types
type LoginData = {
  email: string;
  password: string;
};

type Errors = {
  email?: string;
  password?: string;
  firebase?: string;
};

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
    firebase: "",
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Example: Password must be at least 6 characters long
  };

  const validateInputs = (): boolean => {
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(loginData.email)) {
      emailError = "Invalid email address.";
    }

    if (!validatePassword(loginData.password)) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, firebase: "" });
      return false;
    }

    setErrors({ email: "", password: "", firebase: "" });
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user.providerData));
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrors((prevErrors) => ({
          ...prevErrors,
          firebase: "Failed to sign in. Please check your credentials.",
        }));
      })
      .finally(() => {
        setLoginData({
          email: "",
          password: "",
        });
      });
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
    <form className="w-1/3 flex flex-col gap-5 m-auto" onSubmit={handleSubmit}>
      <h1 className="text-3xl text-center">Login</h1>
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
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
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
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </label>
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      {errors.firebase && <p className="text-red-500">{errors.firebase}</p>}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <button className="btn btn-success w-full" onClick={handleGoogleSignIn}>
        Google
      </button>
      <button
        className="btn btn-secondary w-full"
        onClick={() => navigate("/signup")}
      >
        I have no account yet
      </button>
    </form>
  );
}

export default Login;

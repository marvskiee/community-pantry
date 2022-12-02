import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authLogin, registerUser } from "../../services/user.services";
import { NotVisible, VisibleSvg } from "../Svg";
import { sendEmail } from "../../services/sendgrid.services";
const AuthLayout = ({ authMode, setAuthMode }) => {
  // password toggle
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState(false);

  const usernameRef = useRef();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();
  const registerField = [
    {
      ref: usernameRef,
      label: "Username",
      type: "text",
      error: "usernameError",
    },
    {
      ref: emailRef,
      label: "Email",
      type: "email",
      error: "emailError",
    },
    {
      ref: passwordRef,
      label: "Password",
      type: "password",
      error: "passwordError",
      toggle: passwordToggle,
      setToggle: () => setPasswordToggle(!passwordToggle),
    },
    {
      ref: confirmPasswordRef,
      label: "Confirm Password",
      type: "password",
      error: "confirmPasswordError",
      toggle: repeatToggle,
      setToggle: () => setRepeatToggle(!repeatToggle),
    },
  ];
  const loginField = [
    {
      ref: usernameRef,
      label: "Username",
      type: "text",
      error: "usernameError",
    },
    {
      ref: passwordRef,
      label: "Password",
      type: "password",
      error: "passwordError",
    },
  ];
  const loginHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newData = {
      username: usernameRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };
    const { success, errors, data } = await authLogin(newData);
    console.log(errors);
    if (success) {
      // console.log(data);
      router.push("/" + data?.role);
    } else {
      setErrors(errors);
      setIsLoading(false);
    }
  };
  const registerHandler = async () => {
    setIsLoading(true);
    const newData = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "'",
    };
    console.log(newData);
    const { success, errors, data } = await registerUser(newData);
    if (success) {
      console.log(data);
      const { username, _id, email } = data;
      const emailData = {
        email: email,
        link: _id,
        username,
      };
      await sendEmail(emailData);
      setIsLoading(false);
      setSuccess(true);
      setErrors(null);
    } else {
      setIsLoading(false);
      setErrors(errors);
    }
    // const {success} =  await
  };
  const clearForms = () => {
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };
  const loginCard = () => {
    return (
      <>
        <div className="bg-white p-10 rounded-xl w-full sm:w-2/3">
          <p className="text-xl font-semibold">Login</p>
          {loginField.map(({ ref, label, type, error }, index) => (
            <div className="flex flex-col gap-2" key={`${index}`}>
              <label className="text-center font-semibold p-4">{label}:</label>
              {errors && (
                <span className="text-center text-rose-500" key={index + 5}>
                  {errors[error]}
                </span>
              )}
              <input
                className="rounded-full px-4 py-3 border"
                type={type}
                ref={ref}
              />
            </div>
          ))}

          <p className="text-emerald-500 font-semibold my-4 text-center w-full">
            <Link href="/forgot_password">Forgot Password</Link>
          </p>
          <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
            {!isLoading ? (
              <button
                onClick={loginHandler}
                className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
              >
                Log In
              </button>
            ) : (
              <span className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
                Logging In...
              </span>
            )}
            <p className="font-semibold">
              Don&apos;t have an account yet?{"  "}
              <span
                className="cursor-pointer text-emerald-500"
                onClick={() => {
                  setSuccess(false);
                  clearForms();
                  setErrors(null);
                  setAuthMode("register");
                }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </>
    );
  };
  const registerCard = () => {
    return (
      <>
        {!success ? (
          <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full">
            <p className="text-xl font-semibold">
              Get Started with us today! Create your account by filling out the
              information below.
            </p>
            {registerField.map(
              ({ setToggle, ref, toggle, label, type, error }, index) => (
                <div className="relative flex flex-col gap-2" key={`${index}`}>
                  <label className="text-center font-semibold pt-4">
                    {label}:
                  </label>
                  {errors && (
                    <span className="text-center text-rose-500">
                      {errors[error]}
                    </span>
                  )}
                  <div className="relative">
                    <input
                      className="w-full rounded-full px-4 py-3 border"
                      type={toggle ? "text" : type}
                      ref={ref}
                    />
                    {type == "password" && (
                      <button
                        onClick={setToggle}
                        className="absolute top-3 cursor-pointer right-5"
                      >
                        {toggle ? <VisibleSvg /> : <NotVisible />}
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
            <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
              {!isLoading ? (
                <button
                  onClick={registerHandler}
                  className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
                >
                  Sign Up
                </button>
              ) : (
                <span className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
                  Signing up ...
                </span>
              )}
              <p className="font-semibold">
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-emerald-500"
                  onClick={() => {
                    setAuthMode("login");
                    setErrors(null);
                    clearForms();
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full flex flex-col items-center">
            <p className="text-xl font-semibold">
              Please check your email and confirm to be able to login.
            </p>
            <button
              onClick={() => {
                setAuthMode("login");
              }}
              className=" px-10 py-3 text-xl text-white bg-emerald-500 mt-5 rounded-full font-bold"
            >
              Login
            </button>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="max-w-authCard w-full rounded-2xl flex-col sm:flex-row bg-emerald-500  flex items-center justify-center ">
      <div className="text-white sm:w-1/3 w-full p-4 sm:p-10 flex items-center justify-center flex-col">
        <img alt="logo" src="/logo.png" className="w-20 h-20" />
        <p className="font-bold text-3xl">Welcome to</p>
        <p className="font-semibold text-xl">Community Basket by Wawangpulo</p>
      </div>
      {authMode == "register" ? registerCard() : loginCard()}
    </div>
  );
};

export default AuthLayout;

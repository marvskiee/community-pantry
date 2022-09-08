import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const AuthLayout = ({ authMode, setAuthMode }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();
  const registerField = [
    {
      ref: usernameRef,
      label: "Username",
      type: "text",
    },
    {
      ref: emailRef,
      label: "Email",
      type: "email",
    },
    {
      ref: passwordRef,
      label: "Password",
      type: "password",
    },
    {
      ref: confirmPasswordRef,
      label: "Confirm Password",
      type: "password",
    },
  ];
  const loginField = [
    {
      ref: usernameRef,
      label: "Username",
      type: "text",
    },
    {
      ref: passwordRef,
      label: "Password",
      type: "password",
    },
  ];
  const loginHandler = (e) => {
    e.preventDefault();
    if (
      usernameRef.current.value == "admin" &&
      passwordRef.current.value == "admin"
    ) {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };
  const loginCard = () => {
    return (
      <>
        <div className="bg-white p-10 rounded-xl w-full sm:w-2/3">
          <p className="text-xl font-semibold">Login</p>
          {loginField.map(({ ref, label, type }, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label className="text-center font-semibold p-4">{label}:</label>
              <input
                className="rounded-full px-4 py-3 border"
                type={type}
                ref={ref}
              />
            </div>
          ))}
          <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
            <button
              onClick={loginHandler}
              className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
            >
              Log In
            </button>
            <p className="font-semibold">
              Don&apos;t have an account yet?{"  "}
              <span
                className="cursor-pointer text-emerald-500"
                onClick={() => setAuthMode("register")}
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
        <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full">
          <p className="text-xl font-semibold">
            Get Started with us today! Create your account by filling out the
            information below.
          </p>
          {registerField.map(({ ref, label, type }, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label className="text-center font-semibold p-4">{label}:</label>
              <input
                className="rounded-full px-4 py-3 border"
                type={type}
                ref={ref}
              />
            </div>
          ))}
          <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
            <button className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
              Sign Up
            </button>
            <p className="font-semibold">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-emerald-500"
                onClick={() => setAuthMode("login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="max-w-authCard w-full rounded-2xl flex-col sm:flex-row bg-emerald-500  flex items-center justify-center ">
      <div className="text-white sm:w-1/3 w-full p-4 sm:p-10 flex items-center justify-center flex-col">
        <img alt="logo" src="logo.png" className="w-20 h-20" />
        <p className="font-bold text-3xl">Welcome to</p>
        <p className="font-semibold text-xl">Community Basket</p>
      </div>
      {authMode == "register" ? registerCard() : loginCard()}
    </div>
  );
};

export default AuthLayout;

import React, { useRef, useState } from "react";
import { Footer, HeaderLayout, NavBar } from "../components";
import Link from "next/link";
import { useRouter } from "next/router";
import { emailChecker, generateCode } from "../services/password.services";
import { sendCode } from "../services/sendgrid.services";
import { updatePassword } from "../services/user.services";
const ForgotPassword = () => {
  const router = useRouter();
  const emailRef = useRef();
  const codeRef = useRef();
  const idRef = useRef();
  const [success, setSuccess] = useState(false);
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [resend, setResend] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    code: null,
    password: null,
    confirmPassword: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("forgot");
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setErrors({
    //   ...errors,
    //   password: null,
    // });
    let tmpError = {
      password: null,
      confirmPassword: null,
    };
    if (newPasswordRef.current.value.length < 8) {
      tmpError.password =
        "Please enter password and must be atleast 8 characters!";
    }
    if (newPasswordRef.current?.value != confirmPasswordRef.current?.value) {
      tmpError.confirmPassword = "Password mismatch!";
    }
    setErrors({ ...errors, ...tmpError });
    if (tmpError.password == null && tmpError.confirmPassword == null) {
      console.log("pwede");
      const newData = {
        password: newPasswordRef.current.value,
      };
      const res = await updatePassword(idRef.current._id, newData);
      if (res.success) {
        console.log(res);
        setSuccess(true);
      } else {
        console.log(res);
      }
    } else {
      console.log("asd");

      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    // router.push("/login");
  };
  const resendHandler = async (res_checker) => {
    const code = Math.floor(Math.random() * 1000000);

    const res_gen_code = await generateCode(res_checker.data._id, { code });
    if (res_gen_code.success) {
      //send code data fields
      const newData = {
        email: res_checker.data.email,
        username: `${res_checker.data.username}`,
        code,
      };
      //send code via email
      await sendCode(newData);
    }
  };
  const nextHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const res_checker = await emailChecker(emailRef.current?.value);
    if (res_checker.success) {
      await resendHandler(res_checker);
      idRef.current = res_checker.data;
      setMode("check");
      // console.log(res);
      setErrors({ ...errors, email: null });
    } else {
      setErrors({ ...errors, email: "Email is not registered yet!" });
    }
    setIsLoading(false);
  };
  const verifyHandler = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const res_checker = await emailChecker(idRef.current.email);
    if (res_checker.success && res_checker.data.code == codeRef.current.value) {
      setMode("reset");
      setErrors({ ...errors, code: null });
    } else {
      setErrors({ ...errors, code: "Wrong verification code!" });
    }
    setIsLoading(false);
  };
  const forgotPasswordUI = () => {
    return (
      <>
        <form onSubmit={nextHandler} className="w-full sm:w-2/3">
          <div className="bg-white p-10 rounded-xl w-full ">
            <p className="text-xl font-semibold">Forgot Password?</p>
            <div className="flex flex-col gap-2">
              <label className="text-center font-semibold p-4">
                Enter your email:
              </label>
              {errors.email && (
                <span className="text-center text-rose-500">
                  {errors.email}
                </span>
              )}
              <input
                key={1}
                required
                className="rounded-full px-4 py-3 border"
                type="email"
                ref={emailRef}
              />
            </div>
            <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
              {!isLoading ? (
                <button
                  type="submit"
                  className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
                >
                  Next
                </button>
              ) : (
                <span className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
                  ...
                </span>
              )}
              <p className="font-semibold">
                <Link href="/login">Back to login</Link>
              </p>
            </div>
          </div>
        </form>
      </>
    );
  };
  const resetPasswordUI = () => {
    return (
      <>
        {!success ? (
          <form onSubmit={submitHandler} className="w-full sm:w-2/3">
            <div className="bg-white p-10 rounded-xl w-full ">
              <p className="text-xl font-semibold">Forgot Password?</p>
              <div className="flex flex-col gap-2">
                <label className="text-center font-semibold p-4">
                  New Password:
                </label>
                {errors.password && (
                  <span className="text-center text-rose-500">
                    {errors?.password}
                  </span>
                )}
                <input
                  required
                  className="rounded-full px-4 py-3 border"
                  type="password"
                  ref={newPasswordRef}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-center font-semibold p-4">
                  Confirm Password:
                </label>
                {errors.confirmPassword && (
                  <span className="text-center text-rose-500">
                    {errors?.confirmPassword}
                  </span>
                )}
                <input
                  required
                  className="rounded-full px-4 py-3 border"
                  type="password"
                  ref={confirmPasswordRef}
                />
              </div>
              <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
                {!isLoading ? (
                  <button
                    type="submit"
                    className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
                  >
                    Submit
                  </button>
                ) : (
                  <span className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
                    ...
                  </span>
                )}
                <p className="font-semibold">
                  <Link href="/login">Back to login</Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-white p-10 rounded-xl w-full sm:w-2/3">
            <p className="text-xl font-semibold">
              Password changed successfully! You may now login
            </p>
            <p className="mt-5 text-center cursor-pointer">
              <Link href="/login">
                <span className="rounded-full bg-zinc-100 py-5 px-10 font-semibold my-10 text-center">
                  Back to login
                </span>
              </Link>
            </p>
          </div>
        )}
      </>
    );
  };
  const checkYourEmailUI = () => {
    return (
      <form onSubmit={verifyHandler} className="w-full sm:w-2/3">
        <div className="bg-white p-10 rounded-xl w-full ">
          <p className="text-xl font-semibold">Check your Email</p>
          <div className="flex flex-col gap-2">
            <label className="text-center font-semibold p-4">
              Enter the code sent to your email:
            </label>
            {errors.code && (
              <span className="text-center text-rose-500">{errors.code}</span>
            )}
            <input
              key={2}
              required
              className="rounded-full px-4 py-3 border"
              type="text"
              defaultValue={""}
              ref={codeRef}
            />
          </div>
          <p className="font-semibold w-full text-center my-4">
            Didn't receive a code?{" "}
            <button
              type="button"
              onClick={resendHandler}
              className="text-emerald-500 font-semibold"
            >
              Resend
            </button>
          </p>
          <div className="mt-4 w-full gap-4  flex flex-col items-center justify-center">
            {!isLoading ? (
              <button
                type="submit"
                className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold"
              >
                Verify
              </button>
            ) : (
              <span className=" px-10 py-3 text-xl text-white bg-emerald-500 rounded-full font-bold">
                ...
              </span>
            )}
            <p className="font-semibold">
              <Link href="/login">Back to login</Link>
            </p>
          </div>
        </div>
      </form>
    );
  };
  const modeUI = () => {
    switch (mode) {
      case "forgot":
        return forgotPasswordUI();
      case "check":
        return checkYourEmailUI();
      case "reset":
        return resetPasswordUI();
    }
  };
  return (
    <div>
      <HeaderLayout title="Login" />
      <NavBar />
      <div className="  w-full relative  min-h-screen-nav">
        <img
          alt="bg"
          src="/im2.png"
          className="w-full h-screen object-cover fixed -z-10 top-0 left-0"
        />
        <div className="relative p-10 w-full justify-center min-h-screen-nav flex flex-col items-center z-10 bg-slate-900/50">
          <div className="max-w-authCard w-full rounded-2xl flex-col sm:flex-row bg-emerald-500  flex items-center justify-center ">
            <div className="text-white sm:w-1/3 w-full p-4 sm:p-10 flex items-center justify-center flex-col">
              <img alt="logo" src="logo.png" className="w-20 h-20" />
              <p className="font-bold text-3xl">Welcome to</p>
              <p className="font-semibold text-xl">
                Community Basket by Wawangpulo
              </p>
            </div>
            {modeUI()}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;

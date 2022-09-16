import Head from "next/head";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import {
  AuthLayout,
  BackgroundLayout,
  HeaderLayout,
  NavBar,
} from "../components";
import { getUser } from "../services/user.services";
import { useRouter } from "next/router";
const Login = () => {
  const [authMode, setAuthMode] = useState();
  const mounted = useRef();
  const router = useRouter();

  return (
    <div>
      <HeaderLayout title="Login" />
      <NavBar />
      <div className="bg-slate-900  w-full relative  min-h-screen-nav">
        <div className="relative p-10 w-full justify-center min-h-screen-nav flex flex-col items-center z-10 bg-slate-900/50">
          <AuthLayout authMode={authMode} setAuthMode={setAuthMode} />
        </div>
        <BackgroundLayout />
      </div>
    </div>
  );
};

export default Login;

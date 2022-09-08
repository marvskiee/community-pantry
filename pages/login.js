import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { AuthLayout, NavBar } from "../components";

const Login = () => {
  const [authMode, setAuthMode] = useState();
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className="bg-slate-900  w-full relative overflow-hidden h-screen max-h-screen-nav">
        <div className="w-full justify-center h-screen overflow-auto flex flex-col items-center p-10 top-0 absolute bg-slate-200/20">
          <AuthLayout authMode={authMode} setAuthMode={setAuthMode} />
        </div>
        <img
          alt="bg"
          src="/homebg.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

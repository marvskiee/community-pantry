import Head from "next/head";
import Image from "next/image";
import { NavBar } from "../components";
const Home = () => {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className="bg-slate-900 w-full relative overflow-hidden h-screen max-h-screen-nav">
        <div className="w-full h-screen flex flex-col items-center justify-center top-0 absolute bg-slate-200/20">
          <img src="homebarangay.png" className="px-10" />
          <button className="p-4 text-2xl text-white bg-emerald-500 rounded-full font-bold px-10 ">
            Get Started with us
          </button>
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

export default Home;

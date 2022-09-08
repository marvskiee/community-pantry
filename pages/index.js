import Image from "next/image";
import { BackgroundLayout, HeaderLayout, NavBar } from "../components";
const Home = () => {
  return (
    <div>
      <HeaderLayout title="" />
      <NavBar />
      <div className="bg-slate-900 w-full relative min-h-screen-nav">
        <div className="relative p-10 flex flex-col gap-5 items-center justify-center z-10 min-h-screen-nav bg-slate-900/50">
          <p className="text-6xl text-white font-bold p-10 text-center">
            Barangay Community Pantry
          </p>
          <button className="p-4 text-2xl text-white bg-emerald-500 rounded-full font-bold px-10 ">
            Get Started with us
          </button>
        </div>
        <BackgroundLayout />
      </div>
    </div>
  );
};

export default Home;

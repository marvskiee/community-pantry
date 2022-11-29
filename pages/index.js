import Image from "next/image";
import Link from "next/link";
import { BackgroundLayout, Footer, HeaderLayout, NavBar } from "../components";
const Home = () => {
  return (
    <div>
      <HeaderLayout title="" />
      <NavBar />
      <div className="bg-customgreen w-full relative min-h-screen-nav">
        <div className="relative flex gap-5 items-center justify-center z-10 min-h-screen-nav bg-slate-900/50">
          <div className="flex flex-col items-center gap-4 w-full p-10">
            <p className="w-full sm:text-5xl text-3xl text-white font-bold text-left">
              Barangay Community Pantry
            </p>
            <p className="w-full text-left text-white font-semibold text-2xl">
              Take what you need, give what you can.
            </p>
            <Link href="/login">
              <a className="p-4 mt-5 text-center sm:text-2xl text-xl bg-yellow-500 rounded-full font-bold px-10 ">
                Get Started with us
              </a>
            </Link>
          </div>
          <div className="sm:block hidden w-full">
            <BackgroundLayout />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

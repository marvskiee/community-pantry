import Head from "next/head";
import Image from "next/image";
import { HeaderLayout, NavBar, BackgroundLayout } from "../components";

const About = () => {
  return (
    <div>
      <HeaderLayout title="About" />
      <NavBar />
      <div className="  w-full min-h-screen-nav relative flex flex-col items-center p-10 justify-center">
        <div className="text-white rounded-lg relative z-10 flex flex-col gap-4 bg-slate-900/50 p-10">
          <p className="mb-10 text-white text-3xl font-bold">About Us</p>
          <p className="font-semibold text-xl">The Researchers</p>
          <p className="text-justify text-white text-lg max-w-laptop">
            We are fourth year college students of the PLV or Pamantasan ng
            Lungsod ng Valenzuela and we developed Community Basket, a
            web-system that is trying to solve some of the problems of community
            pantries. We want to promote the “Bayanihan Spirit” in the hearts of
            the people in our country. We genuinely hope that you take pleasure
            in using our services as much as we do, please contact us if you
            have any questions or recommendations.{" "}
          </p>
          <p className="font-semibold text-xl">Mission</p>
          <p className="text-justify text-white text-lg max-w-laptop">
            From the inspiration we got from the effectiveness of community
            pantry in the midst of pandemic, we developed this website entitled
            Community Basket. This website’s goal is to make the common
            community pantries effectiveness to reach its peak.
          </p>
          <p className="font-semibold text-xl">Vission</p>
          <p className="text-justify text-white text-lg max-w-laptop">
            The researchers and the web-system itself will deliver a service
            that will satisfy every users.
          </p>
        </div>
        <BackgroundLayout />
      </div>
    </div>
  );
};

export default About;

import Head from "next/head";
import Image from "next/image";
import { HeaderLayout, NavBar, BackgroundLayout } from "../components";

const About = () => {
  return (
    <div>
      <HeaderLayout title="About" />
      <NavBar />
      <div className="  w-full min-h-screen-nav relative flex flex-col items-center p-10 justify-center">
        <div className="rounded-lg relative z-10 bg-slate-900/50 p-10">
          <p className="mb-10 text-white text-3xl font-bold">About Us</p>
          <p className="text-justify text-white text-lg max-w-laptop">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>
        <BackgroundLayout />
      </div>
    </div>
  );
};

export default About;

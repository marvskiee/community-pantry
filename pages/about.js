import Head from "next/head";
import Image from "next/image";
import { NavBar } from "../components";

const About = () => {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className="bg-slate-900 w-full relative overflow-hidden h-screen max-h-screen-nav">
        <div className="  w-full h-screen flex flex-col items-center p-10 top-0 absolute bg-slate-200/20">
          <p className="mb-10 text-white text-3xl font-bold">About Us</p>
          <p className="text-justify text-white text-2xl max-w-laptop">
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
        <img
          alt="bg"
          src="/homebg.png"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default About;

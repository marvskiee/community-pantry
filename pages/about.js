import Head from "next/head";
import Image from "next/image";
import { HeaderLayout, NavBar, BackgroundLayout, Footer } from "../components";
import SubFooter from "../components/Layout/SubFooter";

const About = () => {
  const data = [
    {
      title: "Importance",
      image: "/im1.png",
      description:
        "Community pantries serve vulnerable populations with high rates of chronic illness, making them an ideal location for community-based health promotion initiatives.",
      color: "bg-customlightgreen",
      image_position: "left",
    },
    {
      title: "Mission",
      image: "/im3.png",
      description:
        "From the inspiration we got from the effectiveness of community pantry in the midst of pandemic, we developed this website entitled Community Basket. This website’s goal is to make the common community pantries effectiveness to reach its peak.",
      color: "bg-customgreen",
      image_position: "right",
    },
    {
      title: "Vision",
      image: "/im5.png",
      description:
        "The researchers and the web-system itself will deliver a service that will satisfy every users.",
      color: "bg-customlightgreen",
      image_position: "left",
    },
    {
      title: "The proponents",
      image: "/im4.png",
      description:
        "We are fourth year college students of the PLV or Pamantasan ng Lungsod ng Valenzuela and we developed Community Basket, a web-system that is trying to solve some of the problems of community pantries. We want to promote the “Bayanihan Spirit” in the hearts of the people in our country. We genuinely hope that you take pleasure in using our services as much as we do, please contact us if you have any questions or recommendations.",
      color: "bg-customgreen",
      image_position: "center",
    },
  ];
  return (
    <div>
      <HeaderLayout title="About" />
      <NavBar />
      <div className="text-white w-full min-h-screen-nav relative flex flex-col">
        {data.map(
          ({ title, image, color, description, image_position }, index) => (
            <div
              key={index}
              className={`p-10 ${
                image_position == "left" && "lg:flex-row-reverse"
              } flex-col lg:flex-row gap-10 flex items-center justify-center py-40 ${color}`}
            >
              <div className="w-full max-w-about flex gap-4 flex-col">
                <p className="font-semibold text-7xl mb-10">{title}</p>
                <div className="">
                  <p className="text-xl">{description}</p>
                </div>
              </div>

              <div className="w-full max-w-about">
                <img
                  src={image}
                  className="object-cover w-full aspect-square"
                />
              </div>
            </div>
          )
        )}
        <SubFooter />
        <Footer />
      </div>
    </div>
  );
};

export default About;

import React from "react";
import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Login",
      link: "/login",
    },
  ];
  return (
    <div className=" flex items-center justify-between px-4 sticky top-0 z-20 bg-white">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <div className="flex">
        {links.map(({ name, link }, index) => (
          <Link href={link} key={index}>
            <p className=" cursor-pointer hover:text-slate-700 transition-colors py-5 px-4 font-medium text-md uppercase">
              {name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;

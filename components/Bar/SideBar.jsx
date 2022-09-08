import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MenuSvg } from "../Svg";
const SideBar = () => {
  const router = useRouter();
  const [pageData, setPageData] = useState();
  useEffect(() => {
    const role = router.pathname.split("/")[1];
    setPageData({
      pathname: router.pathname.split("/")[2],
      links: role == "admin" ? adminLinks : userLinks,
    });
  }, []);
  const userLinks = [
    {
      name: "Home",
      link: "/user",
    },
    {
      name: "Pantries",
      link: "/user/pantries",
    },
    {
      name: "My Story",
      link: "/user/my_story",
    },
    {
      name: "My Account",
      link: "/user/my_account",
    },
  ];
  const adminLinks = [
    {
      name: "For Approval Pantry",
      link: "/admin/for_approval_pantry",
    },
    {
      name: "For Approval Story",
      link: "/admin/for_approval_story",
    },
    {
      name: "Approved Pantry",
      link: "/admin/approved_pantry",
    },
    {
      name: "Approved Story",
      link: "/admin/approved_story",
    },
    {
      name: "Deleted Pantry",
      link: "/admin/deleted_pantry",
    },
    {
      name: "Deleted Story",
      link: "/admin/deleted_story",
    },
  ];
  const signOutHandler = () => {
    router.push("/login");
  };
  return (
    <div className="max-h-sidebar min-h-screen py-10  overflow-y-auto scroll-smooth bg-emerald-600 flex flex-col sm:max-w-xs max-w-min justify-between">
      <div className="flex items-center justify-center flex-col">
        {/* <button
          onClick={() => setHidden(!hidden)}
          className="p-2 rounded-full mb-4 border-white hover:border-emerald-400  border-4 transition-all bg-white "
        >
          <MenuSvg />
        </button> */}
        <img src="../logo.png" className="w-full aspect-video object-contain" />
      </div>
      <div>
        {pageData &&
          pageData.links.map(({ name, link }, index) => (
            <Link href={link} key={index}>
              <p
                className={`${
                  pageData.pathname == link.split("/")[2] &&
                  "bg-white text-emerald-500"
                } p-4 sm:text-left text-center sm:px-8 px-4 text-white hover:bg-emerald-700 sm:text-lg text-sm cursor-pointer transition-colors`}
              >
                {name}
              </p>
            </Link>
          ))}
      </div>
      <button
        onClick={signOutHandler}
        className="text-white sm:text-lg text-sm font-semibold text-center p-4 transition-colors hover:bg-emerald-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;

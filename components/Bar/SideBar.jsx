import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    <div className="min-h-screen bg-emerald-600 flex py-10 flex-col max-w-xs justify-between">
      <img src="../logo.png" className="w-full aspect-video object-contain" />
      <div>
        {pageData &&
          pageData.links.map(({ name, link }, index) => (
            <Link href={link} key={index}>
              <p
                className={`${
                  pageData.pathname == link.split("/")[2] &&
                  "bg-white text-emerald-500"
                } p-4 px-8 text-white hover:bg-emerald-700 text-lg cursor-pointer transition-colors`}
              >
                {name}
              </p>
            </Link>
          ))}
      </div>
      <button
        onClick={signOutHandler}
        className="text-white text-lg font-semibold text-center p-4 transition-colors hover:bg-emerald-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SideBar;

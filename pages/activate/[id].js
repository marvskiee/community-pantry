import React, { useState, useRef, useEffect } from "react";
import { AuthLayout, Footer, HeaderLayout, NavBar } from "../../components";
import { useRouter } from "next/router";
import { getUser, idChecker } from "../../services/user.services";
import Link from "next/link";
const Activate = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(-1);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      let id = router.query.id;
      if (id) {
        const res = await idChecker(id);
        if (res.success) {
          setSuccess(1);
        } else {
          setSuccess(0);
        }
        setIsLoading(false);
      }
    };
    load();
    console.log("sheeshh");
  }, [router.query.id]);
  return (
    <div>
      <HeaderLayout title="Activate" />
      <NavBar />
      {isLoading ? (
        <div className="  w-full relative  min-h-screen-nav">
          <img
            alt="bg"
            src="../im2.png"
            className="w-full h-screen object-cover fixed -z-10 top-0 left-0"
          />
          <div className="relative p-10 w-full justify-center min-h-screen-nav flex flex-col items-center z-10 bg-slate-900/50">
            <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full flex flex-col items-center">
              <p className="text-xl font-semibold">Validating Please Wait...</p>
            </div>
          </div>
          <Footer />
        </div>
      ) : success == 0 ? (
        <div className="  w-full relative  min-h-screen-nav">
          <img
            alt="bg"
            src="../im2.png"
            className="w-full h-screen object-cover fixed -z-10 top-0 left-0"
          />
          <div className="relative p-10 w-full justify-center min-h-screen-nav flex flex-col items-center z-10 bg-slate-900/50">
            <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full flex flex-col items-center">
              <p className="text-xl font-semibold">Error Account Not Found</p>

              <Link href="/login">
                <button className=" px-10 py-3 text-xl text-white bg-emerald-500 mt-5 rounded-full font-bold">
                  Back to Login
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="  w-full relative  min-h-screen-nav">
          <img
            alt="bg"
            src="../im2.png"
            className="w-full h-screen object-cover fixed -z-10 top-0 left-0"
          />
          <div className="relative p-10 w-full justify-center min-h-screen-nav flex flex-col items-center z-10 bg-slate-900/50">
            <div className="bg-white p-10 rounded-xl sm:w-2/3 w-full flex flex-col items-center">
              <p className="text-xl font-semibold">
                Your account is now verified, You may now proceed to login.
              </p>
              <Link href="/login">
                <button className=" px-10 py-3 text-xl text-white bg-emerald-500 mt-5 rounded-full font-bold">
                  Back to Login
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Activate;

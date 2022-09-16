import React, { useEffect, useRef } from "react";
import { getUser } from "../services/user.services";
import { useRouter } from "next/router";
const Authenticate = () => {
  const mounted = useRef();
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      const { data, success } = await getUser();
      if (success) {
        console.log(data?.role);
        router.push("/" + data?.role);
      }
      router.push("/");

      mounted.current = true;
    };
    if (!mounted.current) {
      load();
    }
  });
  return <div></div>;
};

export default Authenticate;

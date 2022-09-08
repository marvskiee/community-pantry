import { Router } from "next/router";
import React from "react";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  }, [input]);
  return <div></div>;
};

export default index;

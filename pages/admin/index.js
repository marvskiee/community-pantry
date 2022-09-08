import React, { useEffect } from "react";
import { useRouter } from "next/router";
const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/for_approval_pantry");
  }, []);
  return <div></div>;
};

export default Admin;

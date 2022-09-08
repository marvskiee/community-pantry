import React from "react";

const AdminWrapperLayout = ({ children, title }) => {
  return (
    <div className="bg-slate-100 w-full max-h-screen overflow-auto">
      <p className="z-20 sticky top-0 bg-slate-100 sm:p-10 p-5 text-2xl uppercase tracking-wide font-light text-center ">
        {title}
      </p>
      <div className="sm:p-10 p-5">{children}</div>
    </div>
  );
};

export default AdminWrapperLayout;

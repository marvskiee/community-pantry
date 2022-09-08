import React from "react";

const UserWrapperLayout = ({ children, title, buttons }) => {
  return (
    <div className=" bg-slate-100 w-full max-h-screen overflow-auto">
      <div className="sm:p-10 p-5 sm:py-5 py-0 bg-slate-100 z-20 sticky flex-col sm:flex-row sm:items-center items-start top-0 w-full flex justify-between">
        <p className="py-5 text-2xl uppercase tracking-wide font-light text-center ">
          {title}
        </p>
        <>{buttons && buttons()}</>
      </div>
      <div className="sm:px-10 px-5 sm:pb-10 pb-5">{children}</div>
    </div>
  );
};

export default UserWrapperLayout;

import React from "react";

const WrapperLayout = ({ children, title }) => {
  return (
    <div className="bg-slate-100 w-full min-h-screen">
      <p className="p-10 text-2xl uppercase tracking-wide font-light text-center ">
        {title}
      </p>
      <div className="p-10">{children}</div>
    </div>
  );
};

export default WrapperLayout;

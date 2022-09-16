import React from "react";

const ModalLayout = ({ children }) => {
  return (
    <div className="z-30 bg-black/50 w-full h-full flex items-center justify-center fixed top-0 left-0">
      <div className=" overflow-auto max-h-modal rounded-lg border p-5 sm:p-10 bg-white">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

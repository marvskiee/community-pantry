import React from "react";

const SubFooter = () => {
  return (
    <div className="flex items-center justify-center bg-zinc-900 flex-col p-10 gap-10 text-white">
      <div className="max-w-authCard flex flex-col py-10 gap-4 justify-center items-center">
        <p className="font-semibold text-4xl">Community Pantry</p>
        <p className="text-xl text-center">
          A location where food is provided to those who cannot afford to buy
          it, such as through a charity: Homeless shelters and food pantries are
          reporting an increase in the demand for their services. Contribute to
          your neighborhood food pantry if you have more than you can use.
        </p>
      </div>
    </div>
  );
};

export default SubFooter;

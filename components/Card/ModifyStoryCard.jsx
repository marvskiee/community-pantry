import React from "react";
import { CheckSvg, DeleteSvg, EditSvg } from "../Svg";

const ModifyStoryCard = () => {
  const data = [
    {
      username: "John Doe",
      pantryName: "Yes Sir Pantry",
    },
    {
      username: "John Doe",
      pantryName: "Yes Sir Pantry",
    },
    {
      username: "John Doe",
      pantryName: "Yes Sir Pantry",
    },
  ];
  return (
    <div className="flex flex-col sm:gap-10 gap-5">
      {data &&
        data.map(({ username, pantryName }, index) => (
          <div className="rounded-lg border bg-white sm:p-10 p-5 " key={index}>
            <div className="flex items-center justify-between flex-col gap-4 sm:flex-row mb-4">
              <p className="font-semibold text-lg ">{username}</p>
              <div className="bg-white flex items-center rounded-full overflow-hidden">
                <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                  <CheckSvg />
                </span>
                <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                  <EditSvg />
                </span>
                <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                  <DeleteSvg />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="rounded-md w-52 h-52 bg-slate-300"
                src="../logo.png"
              />
              <p className="font-semibold text-lg my-4">{pantryName}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ModifyStoryCard;

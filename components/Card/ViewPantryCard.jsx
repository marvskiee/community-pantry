import React from "react";
import moment from "moment";
const ViewPantryCard = () => {
  const data = [
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
      pantryDetails:
        "Lore asdmi mugasd  koqwe asdytu asdpq sidahsuj asdas djan",
      address: "3489 jhhsjd 09 city",
    },
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
      pantryDetails:
        "Lore asdmi mugasd  koqwe asdytu asdpq sidahsuj asdas djan",
      address: "3489 jhhsjd 09 city",
    },
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
      pantryDetails:
        "Lore asdmi mugasd  koqwe asdytu asdpq sidahsuj asdas djan",
      address: "3489 jhhsjd 09 city",
    },
  ];
  return (
    <div className="flex flex-col sm:gap-10 gap-5">
      {data &&
        data.map(
          (
            { username, dateTime, pantryName, pantryDetails, address },
            index
          ) => (
            <div
              className="rounded-lg border bg-white sm:p-10 p-5 "
              key={index}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-lg">{username}</p>
                <p>{moment(dateTime).format("MMM DD YYYY")}</p>
              </div>
              <div className="flex items-start justify-center sm:flex-row flex-col gap-4">
                <img
                  src="../logo.png"
                  className="w-52 h-52 rounded-lg bg-slate-200"
                />
                <div className="w-full flex gap-4 flex-col">
                  <p className="">
                    <span className="font-semibold ">Pantry Name: </span>
                    {pantryName}
                  </p>
                  <p className="">
                    <span className="font-semibold ">Address: </span>
                    {address}
                  </p>
                  <p className="">
                    <span className="font-semibold ">Pantry Details: </span>
                    {pantryDetails}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <p className="font-semibold cursor-pointer transition-colors hover:text-emerald-500 mt-4">
                  View More
                </p>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default ViewPantryCard;

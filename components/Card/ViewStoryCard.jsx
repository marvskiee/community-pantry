import React from "react";
import moment from "moment";
const ViewStoryCard = () => {
  const data = [
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
    },
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
    },
    {
      username: "John Doe",
      dateTime: "2022-02-10",
      pantryName: "Art",
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
            <>
              <div
                className="rounded-lg border bg-white sm:p-10 p-5 "
                key={index}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-lg">{username}</p>
                  <p>{moment(dateTime).format("MMM DD YYYY")}</p>
                </div>
                <div className="flex items-center justify-center flex-col ">
                  <img
                    src="../logo.png"
                    className="w-52 h-52 rounded-lg bg-slate-200"
                  />
                  <p className="font-semibold text-lg mt-4">{pantryName}</p>
                </div>
              </div>
            </>
          )
        )}
    </div>
  );
};

export default ViewStoryCard;

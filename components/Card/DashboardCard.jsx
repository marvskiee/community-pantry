import React from "react";

const DashboardCard = () => {
  const data = [
    {
      pantryName: "New Pantry is added Check it Out!",
      time: ["1:00AM", "2:00AM"],
    },
    { pantryName: "Maginhawa Pantry", time: ["12:00 AM", "1:00PM"] },
    { pantryName: "Pantry 3", time: ["12:00 AM", "1:00PM"] },
  ];
  return (
    <>
      <div className="sm:p-10 p-5 rounded-lg border sm:w-1/2 w-full bg-white">
        <p className="font-semibold text-lg text-center">Dashboard</p>
        <div className="my-4 flex gap-4 flex-col">
          {data &&
            data.map(({ pantryName, time }, index) => (
              <div
                key={index}
                className="text-center bg-slate-200 w-full rounded-lg p-4"
              >
                <p>{pantryName}</p>
                <p>
                  ( {time[0]} to {time[1]} )
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DashboardCard;

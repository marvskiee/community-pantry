import React from "react";

const DashboardCard = ({ data }) => {
  const datas = [
    {
      pantryName: "New Pantry is added Check it Out!",
      time: ["1:00AM", "2:00AM"],
    },
    { pantryName: "Maginhawa Pantry", time: ["12:00 AM", "1:00PM"] },
    { pantryName: "Pantry 3", time: ["12:00 AM", "1:00PM"] },
  ];
  return (
    <>
      <div className="sm:p-10 p-5 rounded-lg border lg:w-1/2 w-full bg-white">
        <p className="font-semibold text-lg text-center mb-2">Dashboard</p>
        <p className="text-center py-2 bg-emerald-200 text-emerald-600 rounded-lg">
          New listed pantry today!
        </p>
        <div className="my-4 flex gap-6 flex-col">
          {data && data.length > 0 ? (
            data.map(({ pantryName, pantryImage }, index) => (
              <div
                key={index}
                className="flex items-center justify-start gap-2 text-center w-full rounded-lg "
              >
                <img
                  className="rounded-lg h-10 aspect-square"
                  src={pantryImage}
                />
                <p>{pantryName}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardCard;

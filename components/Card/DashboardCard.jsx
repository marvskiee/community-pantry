import React from "react";
import moment from "moment";
import { BasketSvg } from "../Svg";
const DashboardCard = ({ data, guidelines }) => {
  const datas = [
    {
      pantryName: "New Pantry is added Check it Out!",
      time: ["1:00AM", "2:00AM"],
    },
    { pantryName: "Maginhawa Pantry", time: ["12:00 AM", "1:00PM"] },
    { pantryName: "Pantry 3", time: ["12:00 AM", "1:00PM"] },
  ];
  return (
    <div className="flex flex-col gap-10">
      <div className="sm:p-10 p-5 rounded-lg border w-full bg-white">
        <p className="font-semibold text-xl text-center mb-2">Guidelines</p>
        <pre id="guide" className=" font-sans bg-white rounded-md">
          {guidelines}
        </pre>
      </div>
      <div className="sm:p-10 p-5 rounded-lg border w-full bg-white">
        <p className="font-semibold text-xl text-center mb-2">Announcements</p>
        <p className="text-center py-2 font-semibold">
          New listed pantry today! <br />
        </p>
        <p className="text-center">{moment().format("MMM DD, YYYY")}</p>
        <div className="my-4 flex gap-6 flex-col">
          {data && data.length > 0 ? (
            data.map(({ pantryName, address, open, close }, index) => (
              <div
                key={index}
                className="flex gap-2 text-center w-full rounded-lg "
              >
                <BasketSvg />
                <div className="text-left">
                  <p className="text-lg font-semibold">{pantryName}</p>
                  <p className="">
                    {moment(open).add(8, "hours").format("hh:mm A")}
                    {" - "}
                    {moment(close).add(8, "hours").format("hh:mm A")}
                  </p>
                  <p className="">{address}</p>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

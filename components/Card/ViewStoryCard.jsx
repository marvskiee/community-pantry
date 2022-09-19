import React from "react";
import moment from "moment";
const ViewStoryCard = ({ data }) => {
  return (
    <div className="flex flex-col sm:gap-10 gap-5">
      {data && data?.length > 0 ? (
        data.map(({ username, image, created_at }, index) => (
          <div key={index} className="rounded-lg border bg-white sm:p-10 p-5 ">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-lg">{username}</p>
              <p>{moment(created_at).format("MMM DD YYYY")}</p>
            </div>
            <div className="flex items-center justify-center flex-col ">
              <img
                src={image}
                className="w-full aspect-video object-cover  rounded-lg bg-slate-200"
              />
            </div>
          </div>
        ))
      ) : (
        <p>No records</p>
      )}
    </div>
  );
};

export default ViewStoryCard;

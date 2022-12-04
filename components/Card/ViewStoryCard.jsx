import React, { useState, useRef } from "react";
import moment from "moment";
import { DeleteSvg } from "../Svg";
import DeletedModal from "../Modal/DeletedModal";
const ViewStoryCard = ({ data, own }) => {
  const [modalMode, setModalMode] = useState("");
  const deleteHandler = (index) => {
    selectedDataRef.current = index;
    setModalMode("deleted");
  };
  const selectedDataRef = useRef();

  return (
    <>
      {modalMode == "deleted" && (
        <DeletedModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].username,
            id: data[selectedDataRef.current]._id,
          }}
          type="story"
        />
      )}
      <div className="flex flex-col sm:gap-10 gap-5">
        {data && data?.length > 0 ? (
          data.map(({ username, image, created_at, caption }, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white sm:p-10 p-5 "
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-lg">{username}</p>
                <div className="flex flex-row-reverse items-center gap-4 justify-center">
                  {own && (
                    <button
                      onClick={() => deleteHandler(index)}
                      className="p-2 rounded-full bg-rose-500"
                    >
                      <DeleteSvg />
                    </button>
                  )}
                  <p>{moment(created_at).format("MMM DD YYYY")}</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col ">
                <img
                  src={image}
                  className="object-cover max-h-96 h-screen rounded-lg bg-slate-200"
                />
                <p className="w-full font-semibold text-lg my-4">
                  Caption: {caption}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No records</p>
        )}
      </div>
    </>
  );
};

export default ViewStoryCard;

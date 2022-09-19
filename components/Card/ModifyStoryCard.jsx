import React, { useState, useRef } from "react";
import { CheckSvg, DeleteSvg, EditSvg, RestoreSvg } from "../Svg";
import {
  ApprovedModal,
  DeletedModal,
  RestoreModal,
  UpdateStoryModal,
  PermanentDeletedStory,
} from "../index";

const ModifyStoryCard = ({ data, status }) => {
  const [modalMode, setModalMode] = useState("");
  const selectedDataRef = useRef();
  return (
    <>
      {modalMode == "edit" && (
        <UpdateStoryModal
          setModalMode={setModalMode}
          data={data[selectedDataRef.current]}
        />
      )}
      {modalMode == "approved" && (
        <ApprovedModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].username,
            id: data[selectedDataRef.current]._id,
          }}
          type="story"
        />
      )}
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
      {modalMode == "restore" && (
        <RestoreModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].username,
            id: data[selectedDataRef.current]._id,
          }}
          type="story"
        />
      )}
      {modalMode == "permanent_deleted" && (
        <PermanentDeletedStory
          setModalMode={setModalMode}
          data={data[selectedDataRef.current]}
        />
      )}
      <div className="flex flex-col sm:gap-10 gap-5">
        {data && data.length > 0 ? (
          data.map(({ username, pantryName, image }, index) => (
            <div
              className="rounded-lg border bg-white sm:p-10 p-5 "
              key={index}
            >
              <div className="flex items-center justify-between flex-col gap-4 sm:flex-row mb-4">
                <p className="font-semibold text-lg ">{username}</p>
                <div className="bg-white flex items-center rounded-full overflow-hidden">
                  {status == "pending" && (
                    <span
                      onClick={() => {
                        selectedDataRef.current = index;
                        setModalMode("approved");
                      }}
                      className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                    >
                      <CheckSvg />
                    </span>
                  )}
                  <span
                    onClick={() => {
                      selectedDataRef.current = index;
                      setModalMode("edit");
                    }}
                    className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                  >
                    <EditSvg />
                  </span>
                  {status == "deleted" && (
                    <>
                      <span
                        onClick={() => {
                          selectedDataRef.current = index;
                          setModalMode("restore");
                        }}
                        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                      >
                        <RestoreSvg />
                      </span>
                      <span
                        onClick={() => {
                          console.log("hello");
                          selectedDataRef.current = index;
                          setModalMode("permanent_deleted");
                        }}
                        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                      >
                        <DeleteSvg />
                      </span>
                    </>
                  )}
                  {status != "deleted" && (
                    <span
                      onClick={() => {
                        selectedDataRef.current = index;
                        console.log(data[index]);
                        setModalMode("deleted");
                      }}
                      className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                    >
                      <DeleteSvg />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  className="w-full rounded-md aspect-video object-cover bg-slate-300"
                  src={image}
                />
                <p className="font-semibold text-lg my-4">{pantryName}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No record</p>
        )}
      </div>
    </>
  );
};

export default ModifyStoryCard;

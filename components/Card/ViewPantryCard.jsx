import React, { useRef, useState } from "react";
import moment from "moment";
import { CheckSvg, DeleteSvg, EditSvg, RestoreSvg } from "../Svg";
import UpdatePantryModal from "../Modal/UpdatePantryModal";
import DeletedModal from "../Modal/DeletedModal";

const ViewPantryCard = ({ data, setViewMoreModal, meOnly }) => {
  const [modalMode, setModalMode] = useState("");
  const selectedDataRef = useRef();
  const en = process.env.NEXT_PUBLIC_ADD_HOURS;

  return (
    <>
      {modalMode == "edit" && (
        <UpdatePantryModal
          meOnly={true}
          setModalMode={setModalMode}
          data={data[selectedDataRef.current]}
        />
      )}

      {modalMode == "deleted" && (
        <DeletedModal
          staticReason={true}
          meOnly={true}
          setModalMode={setModalMode}
          type="pantry"
          data={data[selectedDataRef.current]}
        />
      )}
      {modalMode == "deleted_info" && (
        <DeletedModal
          restrict={true}
          setModalMode={setModalMode}
          type="pantry"
          data={data[selectedDataRef.current]}
        />
      )}
      <div className="flex flex-col sm:gap-10 gap-5">
        {data && data.length > 0 ? (
          data.map(
            (
              {
                username,
                created_at,
                pantryImage,
                pantryName,
                aboutUs,
                address,
                status,
                open,
                close,
              },
              index
            ) => (
              <div
                className="rounded-lg border bg-white sm:p-10 p-5 "
                key={index}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-lg">{username}</p>
                  <p>{moment(created_at).format("MMM DD YYYY")}</p>
                </div>
                <div className="flex items-start justify-center lg:flex-row flex-col gap-4">
                  <img
                    src={pantryImage}
                    className="w-full lg:w-auto object-cover h-52 aspect-video rounded-lg bg-slate-200"
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
                      <span className="font-semibold ">
                        Rules and Regulation:{" "}
                      </span>
                      {aboutUs}
                    </p>
                    <p>
                      <span className="font-semibold ">
                        Opening and Closing hours:{" "}
                      </span>
                      {moment(open)
                        .add(parseInt(en), "hours")
                        .format("hh:mm A")}{" "}
                      -{" "}
                      {moment(close)
                        .add(parseInt(en), "hours")
                        .format("hh:mm A")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  {meOnly ? (
                    <div className="bg-white flex items-center rounded-full overflow-hidden">
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
                              setModalMode("deleted_info");
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

                            setModalMode("deleted");
                          }}
                          className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                        >
                          <DeleteSvg />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="flex items-end flex-col">
                    {meOnly && (
                      <p className="text-xl text-right text-rose-500">
                        {status == "pending"
                          ? "WAITING FOR APPROVAL"
                          : status.toUpperCase() + " PANTRY"}
                      </p>
                    )}
                    <p
                      onClick={() => setViewMoreModal(data[index])}
                      className="font-semibold cursor-pointer transition-colors hover:text-emerald-500"
                    >
                      View More
                    </p>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p>No records</p>
        )}
      </div>
    </>
  );
};

export default ViewPantryCard;

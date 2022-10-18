import React, { useState, useRef } from "react";
import { CheckSvg, DeleteSvg, EditSvg, RestoreSvg } from "../Svg";
import {
  ApprovedModal,
  DeletedModal,
  RestoreModal,
  UpdatePantryModal,
  PermanentDeletedPantry,
} from "../index";
import moment from "moment";
const UserPantryCard = ({ data, status, meOnly }) => {
  const [modalMode, setModalMode] = useState("");
  const selectedDataRef = useRef();
  return (
    <>
      {modalMode == "edit" && (
        <UpdatePantryModal
          setModalMode={setModalMode}
          data={data[selectedDataRef.current]}
        />
      )}
      {modalMode == "permanent_deleted" && (
        <PermanentDeletedPantry
          setModalMode={setModalMode}
          data={data[selectedDataRef.current]}
        />
      )}
      {modalMode == "approved" && (
        <ApprovedModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].pantryName,
            id: data[selectedDataRef.current]._id,
          }}
          type="pantry"
        />
      )}
      {modalMode == "deleted" && (
        <DeletedModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].pantryName,
            id: data[selectedDataRef.current]._id,
          }}
          type="pantry"
        />
      )}
      {modalMode == "restore" && (
        <RestoreModal
          setModalMode={setModalMode}
          data={{
            name: data[selectedDataRef.current].pantryName,
            id: data[selectedDataRef.current]._id,
          }}
          type="pantry"
        />
      )}
      <div className="flex flex-col gap-5">
        {data && data.length > 0 ? (
          data.map(
            (
              {
                username,
                pantryName,
                pantryImage,
                aboutUs,
                address,
                contact,
                supply,
                status,
                close,
                open,
              },
              index
            ) => (
              <div
                className="rounded-lg border bg-white sm:p-10 p-5 "
                key={index}
              >
                <div className="flex items-center justify-between mb-4 gap-4 sm:flex-row flex-col">
                  <p className="font-semibold text-lg">{username}</p>
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
                          setModalMode("deleted");
                        }}
                        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
                      >
                        <DeleteSvg />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex lg:flex-row flex-col">
                  <img
                    src={pantryImage}
                    className="mb-4 rounded-md w-40 h-40 mr-10 bg-slate-300 object-cover"
                  />
                  <div className="w-full">
                    <div>
                      <p>
                        <span className="font-semibold text-lg">
                          Pantry Name:{" "}
                        </span>
                        {pantryName}
                      </p>
                      <p>
                        <span className="font-semibold text-lg">
                          Contact Information:{" "}
                        </span>
                        {contact}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold text-lg">Address: </span>{" "}
                        {address}
                      </p>
                      <p>
                        <span className="font-semibold text-lg">
                          Rules and Regulation:{" "}
                        </span>
                        {aboutUs}
                      </p>
                      <p>
                        <span className="font-semibold text-lg">
                          Opening and Closing hours:{" "}
                        </span>
                        {moment(open).format("hh:mm A")} -{" "}
                        {moment(close).format("hh:mm A")}
                      </p>
                      <p>
                        <span className="font-semibold text-lg">
                          Available Supplies:{" "}
                        </span>
                      </p>
                      <div className="flex gap-4 mt-4 flex-wrap">
                        {supply.map(
                          (
                            {
                              name,
                              quantity,
                              image,
                              expiration_date,
                              date_added,
                            },
                            index
                          ) => (
                            <div
                              key={index}
                              className="flex border rounded-md p-4 gap-4 w-full"
                            >
                              <div className="relative ">
                                <img
                                  src={image}
                                  className="w-20 h-20 rounded-lg bg-slate-200"
                                />
                                <p className="flex items-center text-center justify-center aspect-square w-8 h-8 rounded-full bg-slate-600 text-white absolute top-0 right-0">
                                  {quantity}
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold">{name}</p>
                                <div className="flex gap-4">
                                  <p>
                                    Expiration Date: <br />
                                    {moment(expiration_date).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </p>

                                  <p>
                                    Date added: <br />
                                    {moment(date_added).format("YYYY-MM-DD")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {meOnly && (
                  <p className="text-xl text-right text-rose-500">
                    {status == "pending"
                      ? "WAITING FOR APPROVAL"
                      : status.toUpperCase() + " PANTRY"}
                  </p>
                )}
              </div>
            )
          )
        ) : (
          <p>No record</p>
        )}
      </div>
    </>
  );
};

export default UserPantryCard;

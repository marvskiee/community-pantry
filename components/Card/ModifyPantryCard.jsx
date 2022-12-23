import React, { useState, useRef } from "react";
import { CheckSvg, DeleteSvg, EditSvg, RestoreSvg, DeclineSvg } from "../Svg";
import {
  ApprovedModal,
  DeletedModal,
  RestoreModal,
  UpdatePantryModal,
  PermanentDeletedPantry,
} from "../index";
import moment from "moment";
import {
  reasonsForDeletion,
  reasonsForNotApproving,
  reasonsForNotApprovingRequest,
} from "../../services/reason.services";
import { newMetadata } from "../../services/metadata.services";
import { hour } from "../../services/hous";
const ModifyPantryCard = ({ data, status, deleted, declineIcon, approved }) => {
  const [modalMode, setModalMode] = useState("");
  const selectedDataRef = useRef();

  const reasonHandler = (mode) => {
    console.log(mode);
    switch (mode) {
      case "deleted":
        return reasonsForDeletion;
      case "not approved":
        return reasonsForNotApproving;
      case "request not approved":
        return reasonsForNotApprovingRequest;
    }
  };
  const deleteUI = (index, permanent) => {
    return (
      <span
        onClick={() => {
          selectedDataRef.current = index;
          if (permanent) {
            console.log("ha?");
            setModalMode("permanent_deleted");
          } else {
            setModalMode("deleted");
          }
        }}
        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
      >
        {declineIcon ? <DeclineSvg /> : <DeleteSvg />}
      </span>
    );
  };
  const editUI = (index) => {
    return (
      <span
        onClick={() => {
          selectedDataRef.current = index;
          setModalMode("edit");
        }}
        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
      >
        <EditSvg />
      </span>
    );
  };
  const approveUI = (index) => {
    return (
      <span
        onClick={() => {
          selectedDataRef.current = index;
          setModalMode("approved");
        }}
        className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 "
      >
        <CheckSvg />
      </span>
    );
  };
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
          approved={approved}
          setModalMode={setModalMode}
          data={{
            expiredCount: data[selectedDataRef.current].expirationCount,
            distributedCount: data[selectedDataRef.current].distributedCount,
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
            status: data[selectedDataRef.current].status,
          }}
          type="pantry"
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
          data.map((item, index) => (
            <div
              className="rounded-lg border bg-white sm:p-10 p-5 "
              key={index}
            >
              <div className="flex items-center justify-between mb-4 gap-4 sm:flex-row flex-col">
                <p className="font-semibold text-lg">{item.username}</p>
                <div className="bg-white flex items-center rounded-full overflow-hidden">
                  {status == "pending" && (
                    <>
                      {approveUI(index)}
                      {editUI(index)}
                      {deleteUI(index)}
                    </>
                  )}

                  {status == "request" && (
                    <>
                      {approveUI(index)}
                      {editUI(index)}
                      {deleteUI(index)}
                    </>
                  )}

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
                      {editUI(index)}
                      {deleteUI(index, true)}
                    </>
                  )}
                  {status == "approved" && (
                    <>
                      {editUI(index)}
                      {deleteUI(index)}
                    </>
                  )}
                </div>
              </div>
              <div className="flex lg:flex-row flex-col">
                <img
                  src={item.pantryImage}
                  className="mb-4 rounded-md w-40 h-40 mr-10 bg-slate-300 object-cover"
                />
                <div>
                  <div>
                    <p>
                      <span className="font-semibold text-lg">
                        Pantry Name:{" "}
                      </span>
                      {item.pantryName}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">
                        Contact Information:{" "}
                      </span>
                      {item.contact}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold text-lg">Address: </span>{" "}
                      {item.address}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">
                        Rules and Regulation:{" "}
                      </span>
                      {item.aboutUs}
                    </p>
                    <p>
                      <span className="font-semibold ">
                        Opening and Closing hours:{" "}
                      </span>
                      {moment(item.open).add(hour, "hours").format("hh:mm A")} -{" "}
                      {moment(item.close).add(hour, "hours").format("hh:mm A")}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">
                        Available Supplies:{" "}
                      </span>
                    </p>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {item.supply.map(
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
                                className="object-cover w-20 h-20 rounded-lg bg-slate-200"
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
                                  {moment(expiration_date).format("YYYY-MM-DD")}
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
                    {deleted && (
                      <div>
                        <p>
                          <span className="font-semibold text-lg">
                            Deleted By:{" "}
                          </span>
                          {item.reason.deleted_by == "user"
                            ? item.username
                            : "Admin"}
                        </p>
                        <div>
                          <span className="font-semibold text-lg">
                            Reason for deletion:{" "}
                          </span>
                          {reasonHandler(item.status).map(
                            ({ value, label }, index) => (
                              <p key={index}>{item.reason[value] && label}</p>
                            )
                          )}
                          <span className="font-semibold text-lg">
                            Other reason for deletion:
                          </span>
                          {item.reason?.other}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* {meOnly && (
                  <p className="text-xl text-right text-rose-500">
                    {status == "pending"
                      ? "WAITING FOR APPROVAL"
                      : status.toUpperCase() + " PANTRY"}
                  </p>
                )} */}
            </div>
          ))
        ) : (
          <p>No record</p>
        )}
      </div>
    </>
  );
};

export default ModifyPantryCard;

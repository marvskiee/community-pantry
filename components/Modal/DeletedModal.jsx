import React, { useState, useRef, useEffect } from "react";
import ModalLayout from "../Layout/ModalLayout";
import { updatePantry, getPantry } from "../../services/pantry.services";
import { useAppContext } from "../../context/AppContext";
import { updateStory, getStory } from "../../services/story.services";
import {
  reasonsForDeletion,
  reasonsForNotApproving,
  reasonsForNotApprovingRequest,
} from "../../services/reason.services";
const DeletedModal = ({ setModalMode, staticReason, data, type, meOnly }) => {
  console.log(data.status);
  const [decline, setDecline] = useState(reasonsForDeletion);
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState();
  const [reasons, setReasons] = useState({
    r1: false,
    r2: false,
    r3: false,
    r4: false,
  });
  const otherRef = useRef();
  console.log(data);
  useEffect(() => {
    if (!staticReason) {
      if (
        data?.status == "requested" ||
        data?.status == "request not approved"
      ) {
        setDecline(reasonsForNotApprovingRequest);
      }
      if (data?.status == "approved" || data?.status == "deleted") {
        setDecline(reasonsForDeletion);
      }
      if (data?.status == "pending" || data?.status == "not approved") {
        setDecline(reasonsForNotApproving);
      }
    }
  }, []);
  const confirmHandler = async () => {
    setIsLoading(true);

    if (type == "pantry") {
      const newData = {
        reason: {
          ...reasons,
          other: otherRef.current.value,
          deleted_by: meOnly ? "user" : "admin",
        },
        status:
          !staticReason && data?.status == "requested"
            ? "request not approved"
            : !staticReason && data?.status == "pending"
            ? "not approved"
            : "deleted",
      };
      console.log(newData);
      const { success } = await updatePantry(newData, data.id || data._id);
      if (success) {
        const pantry_res = await getPantry();
        if (pantry_res.success) {
          dispatch({ type: "SET_PANTRY", value: pantry_res.data });
          setModalMode("");
          return;
        }
        setIsLoading("false");
      }
    } else {
      const newData = {
        status: "deleted",
      };
      const { success } = await updateStory(newData, data.id || data._id);
      if (success) {
        const story_res = await getStory();
        if (story_res.success) {
          dispatch({ type: "SET_STORY", value: story_res.data });
          setModalMode("");
          return;
        }
        setIsLoading("false");
      }
    }
  };
  const storyType = () => {
    return (
      <div>
        <p className="font-semibold text-lg mb-4">
          Are you sure you want to delete &quot;{data.name}&quot; story?
        </p>
        <div className="flex gap-4 justify-end">
          {!isLoading ? (
            <>
              <button
                onClick={() => setModalMode("")}
                className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={confirmHandler}
                className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Confirm
              </button>
            </>
          ) : (
            <p className="p-3 px-8 bg-emerald-600 text-white rounded-full ">
              Saving...
            </p>
          )}
        </div>
      </div>
    );
  };

  const reasonHandler = (value) => {
    setReasons({ ...reasons, [value + ""]: !reasons[value] });
  };

  const pantryType = () => {
    return (
      <div>
        {data.reason ? (
          <div>
            <p className="text-center text-lg font-semibold">
              REASON WHY YOUR PANTRY HAS BEEN DELETED
            </p>
            <p className="uppercase text-center text-lg font-semibold text-rose-500">
              {data.reason.deleted_by == "user"
                ? "You deleted this pantry"
                : "admin deleted your pantry"}
            </p>
          </div>
        ) : (
          <div>
            {!staticReason && data?.status == "pending" ? (
              <p className="text-center text-lg font-semibold">
                REASON FOR NOT APPROVED OF PANTRY
              </p>
            ) : !staticReason && data?.status == "requested" ? (
              <p className="text-center text-lg font-semibold">
                REASON FOR NOT APPROVING REQUEST OF PANTRY
              </p>
            ) : (
              <p className="text-center text-lg font-semibold">
                REASON FOR DELETION OF PANTRY
              </p>
            )}
          </div>
        )}
        {decline.map(({ value, label }, index) => (
          <div key={index} className="p-2 flex gap-4">
            <input
              disabled={
                data?.status == "request not approved" ||
                data?.status == "deleted" ||
                data?.status == "not approved"
              }
              onChange={() => reasonHandler(value)}
              id={value}
              type="checkbox"
              value={value}
              defaultChecked={data.reason && data.reason[value]}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
        <textarea
          disabled={
            data?.status == "request not approved" ||
            data?.status == "deleted" ||
            data?.status == "not approved"
          }
          ref={otherRef}
          rows={5}
          defaultValue={data.reason?.other}
          className="border rounded-lg p-2 w-full"
          placeholder="Other reason please specify"
        ></textarea>
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => setModalMode("")}
            className="px-4 py-2 text-white bg-slate-500 rounded-full"
          >
            Close
          </button>
          {data?.status != "request not approved" &&
            data?.status != "deleted" &&
            data?.status != "not approved" && (
              <button
                onClick={confirmHandler}
                className="px-4 py-2 text-white bg-emerald-500 rounded-full"
              >
                Submit
              </button>
            )}
        </div>
      </div>
    );
  };
  return (
    <ModalLayout>{type == "story" ? storyType() : pantryType()}</ModalLayout>
  );
};

export default DeletedModal;

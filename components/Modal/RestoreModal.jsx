import React, { useState } from "react";
import ModalLayout from "../Layout/ModalLayout";
import { updatePantry, getPantry } from "../../services/pantry.services";
import { useAppContext } from "../../context/AppContext";
import { updateStory, getStory } from "../../services/story.services";

const RestoreModal = ({ setModalMode, data, type }) => {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState();
  const confirmHandler = async () => {
    setIsLoading(true);
    if (type == "pantry") {
      const newData = {
        status: "pending",
        reason: null,
      };
      const { success, error } = await updatePantry(newData, data.id);
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
        status: "pending",
      };
      const { success } = await updateStory(newData, data.id);
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
  return (
    <ModalLayout>
      <div>
        {type == "pantry" ? (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to restore &quot;{data.name}&quot; pantry?
          </p>
        ) : (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to restore &quot;{data.name}&quot; story?
          </p>
        )}
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
              Savings...
            </p>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default RestoreModal;

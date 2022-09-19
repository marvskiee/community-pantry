import React, { useState, useRef } from "react";
import ModalLayout from "../Layout/ModalLayout";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useAppContext } from "../../context/AppContext";
import { storage } from "../../services/firebase";
import {
  updateStory,
  getStory,
  deleteStory,
} from "../../services/story.services";

const PermanentDeletedStory = ({ setModalMode, data, type }) => {
  const [isLoading, setIsLoading] = useState();
  const { dispatch } = useAppContext();

  // story var
  const deleteFromFirebase = (url) => {
    let pictureRef = ref(storage, url);
    console.log(url);
    deleteObject(pictureRef)
      .then(() => {
        submitHandler();
      })
      .catch((error) => {
        console.log(error);
        submitHandler();
      });
  };
  const submitHandler = async () => {
    const res = await deleteStory(data._id);
    if (res.success) {
      const story_res = await getStory();
      if (story_res.success) {
        setIsLoading(false);
        setModalMode("");
        dispatch({ type: "SET_STORY", value: story_res.data });
      }
    }
  };
  const confirmHandler = () => {
    setIsLoading(true);
    deleteFromFirebase(data.image);
  };
  return (
    <ModalLayout>
      <div>
        {type == "pantry" ? (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to permanently deleted &quot;{data.username}
            &quot; pantry?
          </p>
        ) : (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to permanently deleted &quot;{data.username}
            &quot; story?
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
              Saving...
            </p>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default PermanentDeletedStory;

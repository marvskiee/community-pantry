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
import { updateStory, getStory } from "../../services/story.services";

const UpdateStoryModal = ({ setModalMode, data, type }) => {
  const [isLoading, setIsLoading] = useState();
  const { dispatch } = useAppContext();

  // story var
  const [storyImage, setStoryImage] = useState();
  const hiddenFileInputRef = useRef();
  const setImageUrlRef = useRef();
  const deleteFromFirebase = (url) => {
    let pictureRef = ref(storage, url);
    console.log(pictureRef);
    deleteObject(pictureRef)
      .then(() => {
        uploadFile();
      })
      .catch((error) => {
        console.log(error);
        uploadFile();
      });
  };
  const uploadFile = () => {
    setIsLoading(true);
    if (storyImage?.file == null) {
      setIsLoading(false);
      return;
    }
    const imageRef = ref(storage, `images/${storyImage.file.name + v4()}`);
    uploadBytes(imageRef, storyImage.file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrlRef.current = url;
          submitHandler();
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const submitHandler = async () => {
    const newData = {
      image: setImageUrlRef?.current,
    };
    const res = await updateStory(newData, data._id);
    setModalMode("");
    if (res.success) {
      const story_res = await getStory();
      if (story_res.success) {
        dispatch({ type: "SET_STORY", value: story_res.data });
        setModalMode("");
        setStoryImage(null);
      }
    }
    setIsLoading(false);
  };
  const confirmHandler = () => {
    if (hiddenFileInputRef.current.value == "") {
      setModalMode("");
    } else {
      deleteFromFirebase(data.image);
    }
  };
  const buttons = () => {
    return (
      <div className="flex gap-4 justify-end mt-4">
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
              Save Changes
            </button>
          </>
        ) : (
          <p className="p-3 px-8 bg-emerald-600 text-white rounded-full ">
            Saving...
          </p>
        )}
      </div>
    );
  };
  const storyUI = () => {
    return (
      <div>
        <p className="mb-4 font-semibold text-xl">Username: {data.username}</p>
        <div
          onClick={() => hiddenFileInputRef.current.click()}
          className="relative overflow-hidden cursor-pointer flex bg-slate-900/50 items-center justify-center  rounded-lg aspect-video w-full bg-slate-200"
        >
          <p className="z-10 sm:text-2xl text-sm font-semibold flex items-center justify-center text-white bg-slate-900/20 h-full w-full text-center">
            Choose image to upload
          </p>
          <img
            src={storyImage?.url || data.image}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <input
            className="hidden"
            ref={hiddenFileInputRef}
            type="file"
            onChange={(e) => {
              setStoryImage({
                url: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0],
              });
            }}
            accept="image/*"
          />
        </div>
        {buttons()}
      </div>
    );
  };
  return <ModalLayout>{type == "story" ? storyUI() : <div></div>}</ModalLayout>;
};

export default UpdateStoryModal;

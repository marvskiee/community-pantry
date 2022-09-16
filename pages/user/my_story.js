import {
  HeaderLayout,
  SideBar,
  UserWrapperLayout,
  ViewStoryCard,
} from "../../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../services/firebase";
import { useAppContext } from "../../context/AppContext";

import { useRef, useEffect, useState } from "react";
import { addStory, getOwnStory } from "../../services/story.services";
const MyStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useAppContext();
  const [storyImage, setStoryImage] = useState();
  const hiddenFileInputRef = useRef(null);
  const [story, setStory] = useState([]);
  const setImageUrlRef = useRef();
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
      user_id: state?.user?._id,
      username: state?.user?.username,
      image: setImageUrlRef?.current,
      status: "pending",
    };
    setIsLoading(false);
    setStoryImage(null);
    console.log(newData);
    const res = await addStory(newData);
    console.log(res);
  };
  useEffect(async () => {
    setStory(
      state?.story?.filter(
        (s) => s.user_id == state?.user?._id && s.status == "approved"
      )
    );
  }, [state.user, state?.story]);
  return (
    <div>
      <HeaderLayout title="My Story" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="My Story">
          <div className="sm:p-10 p-5  sm:mb-10 mb-5 border bg-white rounded-lg flex flex-col gap-4 items-center">
            <p className="text-lg font-semibold text-left w-full">
              Username: {state?.user?.username}
            </p>
            <div
              onClick={() => hiddenFileInputRef.current.click()}
              className="relative overflow-hidden cursor-pointer flex bg-slate-900/50 items-center justify-center  rounded-lg aspect-video w-full bg-slate-200"
            >
              <p className="z-10 sm:text-2xl text-sm font-semibold flex items-center justify-center text-white bg-slate-900/20 h-full w-full text-center">
                Choose image to upload
              </p>
              {storyImage?.url && (
                <img
                  src={storyImage?.url}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              )}
              <input
                className="hidden"
                ref={hiddenFileInputRef}
                type="file"
                onChange={(e) => {
                  setStoryImage({
                    url: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  });
                  // console.log(e.target.files[0])
                }}
                accept="image/*"
              />
            </div>
            {isLoading ? (
              <p className="rounded-full p-3 px-8 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold">
                Submitting...
              </p>
            ) : (
              <button
                onClick={uploadFile}
                className="rounded-full p-3 px-8 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold"
              >
                Submit
              </button>
            )}
          </div>
          <ViewStoryCard data={story} />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default MyStory;

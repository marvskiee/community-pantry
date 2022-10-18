import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  newGuidelines,
  setGuidelines,
} from "../../services/guideline.services";
import { useRef } from "react";

const Guidelines = () => {
  const { state, dispatch } = useAppContext();
  const [guideline, setGuideline] = useState();
  const [success, setSuccess] = useState(false);
  const mounted = useRef();
  useEffect(() => {
    setGuideline(state?.guidelines?.guideline);
    if (!mounted.current) {
      console.log(state?.guidelines?.guideline);
      mounted.current = true;
    }
  }, [state?.guidelines?.guideline]);

  const saveHandler = async () => {
    const newData = {
      guideline,
    };
    if (state?.guidelines?._id) {
      const res = await setGuidelines(state?.guidelines?._id, newData);
      if (res.success) {
        dispatch({ type: "SET_GUIDELINE", value: { ...res.data, guideline } });
        setGuideline(res.data.guideline);
        setSuccess(true);
      }
    } else {
      const res = await newGuidelines(newData);
      if (res.success) {
        dispatch({ type: "SET_GUIDELINE", value: res.data });
        setGuideline(res.data.guideline);
        setSuccess(true);
      }
    }
  };

  const cancelHandler = () => {
    setGuideline(state?.guidelines?.guideline);
    setSuccess(false);
  };
  return (
    <div>
      <HeaderLayout title="Guidelines" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Guidelines">
          <div>
            <p className="my-2">Guidelines will be displayed to all users</p>
            {success && (
              <p className="p-4 bg-emerald-500 text-white">Save Successfully</p>
            )}
            <textarea
              onChange={(e) => {
                setGuideline(e.target.value);
              }}
              rows={10}
              className="p-4 w-full"
              value={guideline}
              placeholder="Enter text here"
            />
            <div className="flex justify-around items-center flex-row my-4">
              <button
                onClick={saveHandler}
                className="px-4 w-28 py-2 rounded-full bg-emerald-500 text-white"
              >
                Save
              </button>
              <button
                onClick={cancelHandler}
                className="px-4 w-28 py-2 rounded-full bg-rose-500 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default Guidelines;

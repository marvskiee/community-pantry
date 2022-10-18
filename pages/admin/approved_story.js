import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const ApprovedStory = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    console.log(state?.story);
    setData(state?.story?.filter((s) => s.status == "approved"));
  }, [state?.story]);
  return (
    <div>
      <HeaderLayout title="Approved Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Approved Story">
          <ModifyStoryCard data={data} status="approved" />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedStory;

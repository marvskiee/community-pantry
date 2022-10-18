import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const ForApprovalStory = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.story?.filter((s) => s.status == "pending"));
  }, [state?.story]);
  return (
    <div>
      <HeaderLayout title="For Approval Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="For Approval Story">
          <ModifyStoryCard data={data} status="pending" declineIcon={true} />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalStory;

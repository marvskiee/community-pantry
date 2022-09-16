import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const DeletedStory = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.story?.filter((s) => s.status == "deleted"));
  }, [state?.story]);
  return (
    <div>
      <HeaderLayout title="Deleted Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Deleted Story">
          <ModifyStoryCard data={data} status="deleted" />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default DeletedStory;

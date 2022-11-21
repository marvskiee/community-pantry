import { useEffect, useState } from "react";
import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import { resonsForNotApprovingRequest } from "../../services/reason.services";
const Request = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.pantry?.filter((p) => p.status == "requested"));
  }, [state?.pantry]);
  return (
    <div>
      <HeaderLayout title="For Approval Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Request for changes">
          <ModifyPantryCard data={data} status="request" approved={true} />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default Request;

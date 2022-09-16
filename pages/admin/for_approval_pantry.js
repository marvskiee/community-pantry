import { useEffect, useState } from "react";
import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useAppContext } from "../../context/AppContext";

const ForApprovalPantry = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.pantry?.filter((p) => p.status == "pending"));
  }, [state?.pantry]);
  return (
    <div>
      <HeaderLayout title="For Approval Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="For Approval Pantry">
          <ModifyPantryCard data={data} status="pending" />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalPantry;

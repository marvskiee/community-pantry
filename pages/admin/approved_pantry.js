import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const ApprovedPantry = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.pantry?.filter((p) => p.status == "approved"));
  }, [state?.pantry]);
  return (
    <div>
      <HeaderLayout title="Approved Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Approved Pantry">
          <ModifyPantryCard data={data} status="approved" />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedPantry;

import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { resonsForDeletion } from "../../services/reason.services";
const DeletedPantry = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(
      state?.pantry?.filter(
        (p) =>
          p.status == "deleted" ||
          p.status == "not approved" ||
          p.status == "request not approved"
      )
    );
  }, [state?.pantry]);
  return (
    <div>
      <HeaderLayout title="Deleted Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Deleted Pantry">
          <ModifyPantryCard data={data} status="deleted" deleted={true} />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default DeletedPantry;

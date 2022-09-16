import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const DeletedPantry = () => {
  const { state } = useAppContext();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.pantry?.filter((p) => p.status == "deleted"));
  }, [state?.pantry]);
  return (
    <div>
      <HeaderLayout title="Deleted Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Deleted Pantry">
          <ModifyPantryCard data={data} status="deleted" />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default DeletedPantry;

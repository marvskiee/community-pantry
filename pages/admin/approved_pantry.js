import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const ApprovedPantry = () => {
  return (
    <div>
      <HeaderLayout title="Approved Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Approved Pantry">
          <ModifyPantryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedPantry;

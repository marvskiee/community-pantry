import {
  HeaderLayout,
  ModifyPantryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const ForApprovalPantry = () => {
  return (
    <div>
      <HeaderLayout title="For Approval Pantry" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="For Approval Pantry">
          <ModifyPantryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalPantry;

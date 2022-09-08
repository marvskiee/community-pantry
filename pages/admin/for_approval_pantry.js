import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const ForApprovalPantry = () => {
  return (
    <div>
      <HeaderLayout title="For Approval Pantry" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="For Approval Pantry"></WrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalPantry;

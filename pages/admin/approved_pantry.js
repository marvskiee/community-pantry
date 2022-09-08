import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const ApprovedPantry = () => {
  return (
    <div>
      <HeaderLayout title="Approved Pantry" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Approved Pantry"></WrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedPantry;

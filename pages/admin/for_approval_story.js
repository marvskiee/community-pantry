import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const ForApprovalStory = () => {
  return (
    <div>
      <HeaderLayout title="For Approval Story" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="For Approval Story"></WrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalStory;

import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const ApprovedStory = () => {
  return (
    <div>
      <HeaderLayout title="Approved Story" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Approved Story"></WrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedStory;

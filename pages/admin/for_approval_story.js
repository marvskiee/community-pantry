import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const ForApprovalStory = () => {
  return (
    <div>
      <HeaderLayout title="For Approval Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="For Approval Story">
          <ModifyStoryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ForApprovalStory;

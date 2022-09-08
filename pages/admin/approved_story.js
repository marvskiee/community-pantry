import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const ApprovedStory = () => {
  return (
    <div>
      <HeaderLayout title="Approved Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Approved Story">
          <ModifyStoryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default ApprovedStory;

import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";

const DeletedStory = () => {
  return (
    <div>
      <HeaderLayout title="Deleted Story" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Deleted Story">
          <ModifyStoryCard />
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default DeletedStory;

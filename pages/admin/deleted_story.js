import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const DeletedStory = () => {
  return (
    <div>
      <HeaderLayout title="Deleted Story" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Deleted Story"></WrapperLayout>
      </div>
    </div>
  );
};

export default DeletedStory;

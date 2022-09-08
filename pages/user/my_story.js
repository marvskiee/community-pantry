import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const MyStory = () => {
  return (
    <div>
      <HeaderLayout title="My Story" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="My Story"></WrapperLayout>
      </div>
    </div>
  );
};

export default MyStory;

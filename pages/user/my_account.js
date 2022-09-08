import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const MyAccount = () => {
  return (
    <div>
      <HeaderLayout title="My Account" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="My Account"></WrapperLayout>
      </div>
    </div>
  );
};

export default MyAccount;

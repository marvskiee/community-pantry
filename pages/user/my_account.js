import { HeaderLayout, SideBar, UserWrapperLayout } from "../../components";

const MyAccount = () => {
  return (
    <div>
      <HeaderLayout title="My Account" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="My Account">
          <div className="p-10 rounded-lg bg-white border">
            <div className="flex gap-4 flex-col mb-4">
              <p className=" text-lg">
                <span className="font-semibold">Current Name: </span> @johndoe
              </p>
              <p className=" text-lg">
                <span className="font-semibold">Current Password: </span>{" "}
                *******
              </p>
            </div>
            <div className="flex gap-4 sm:flex-row flex-col items-center justify-end">
              <button className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full ">
                Change Password
              </button>
              <button className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full ">
                Change Username
              </button>
            </div>
          </div>
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default MyAccount;

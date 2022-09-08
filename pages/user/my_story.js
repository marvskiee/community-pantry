import {
  HeaderLayout,
  SideBar,
  User,
  UserWrapperLayout,
  ViewStoryCard,
} from "../../components";

const MyStory = () => {
  return (
    <div>
      <HeaderLayout title="My Story" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="My Story">
          <div className="sm:p-10 p-5  sm:mb-10 mb-5 border bg-white rounded-lg flex flex-col gap-4 items-center">
            <p className="text-lg font-semibold text-left w-full">
              Username: John Doe
            </p>
            <div className="flex items-center justify-center  rounded-lg aspect-video w-full bg-slate-200">
              <p className="text-2xl font-semibold text-slate-500 p-4 text-center">
                Upload your Story
              </p>
            </div>
            <button className="rounded-full p-3 px-8 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold">
              Submit
            </button>
          </div>
          <ViewStoryCard />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default MyStory;

import {
  HeaderLayout,
  SideBar,
  ViewStoryCard,
  UserWrapperLayout,
  DashboardCard,
} from "../../components";

const Home = () => {
  return (
    <div>
      <HeaderLayout title="Home" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="Stories">
          <div className="flex sm:gap-10 gap-5 sm:flex-row flex-col-reverse">
            <div className="w-full">
              <ViewStoryCard />
            </div>
            <DashboardCard />
          </div>
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default Home;

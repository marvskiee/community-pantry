import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const Home = () => {
  return (
    <div>
      <HeaderLayout title="Home" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Home"></WrapperLayout>
      </div>
    </div>
  );
};

export default Home;

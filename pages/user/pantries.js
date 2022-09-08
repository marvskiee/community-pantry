import { HeaderLayout, SideBar, WrapperLayout } from "../../components";

const Home = () => {
  return (
    <div>
      <HeaderLayout title="Pantries" />
      <div className="flex">
        <SideBar />
        <WrapperLayout title="Pantries"></WrapperLayout>
      </div>
    </div>
  );
};

export default Home;

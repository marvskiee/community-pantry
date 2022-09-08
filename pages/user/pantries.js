import {
  HeaderLayout,
  SideBar,
  UserWrapperLayout,
  ViewPantryCard,
} from "../../components";

const buttons = () => {
  return (
    <div className="flex gap-4 sm:flex-row flex-col mb-5">
      <button className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white">
        Create your own pantry
      </button>
      <button className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white">
        Check your pantry
      </button>
    </div>
  );
};
const Home = () => {
  return (
    <div>
      <HeaderLayout title="Pantries" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="Pantries" buttons={buttons}>
          <ViewPantryCard />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default Home;

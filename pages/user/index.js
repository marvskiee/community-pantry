import {
  HeaderLayout,
  SideBar,
  ViewStoryCard,
  UserWrapperLayout,
  DashboardCard,
} from "../../components";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import moment from "moment";
const Home = () => {
  const { state } = useAppContext();
  const [story, setStory] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setStory(state?.story?.filter((s) => s.status == "approved"));
    setData(
      state?.pantry?.filter(
        (p) =>
          p.status == "approved" &&
          moment(p.created_at).format("YYYY-MM-DD") ==
            moment().format("YYYY-MM-DD")
      )
    );
  }, [state?.story]);
  return (
    <div>
      <HeaderLayout title="Home" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="Stories">
          {/* <div className=" sm:py-5 py-2 bg-slate-100 z-20 sticky flex-col lg:flex-row lg:items-center items-start top-0 w-full flex justify-between">
            <p
              className={`py-5 text-2xl uppercase tracking-wide font-light text-center}`}
            >
              Stories
            </p>
          </div> */}
          <div className="flex sm:gap-10 gap-5 md:flex-row flex-col-reverse">
            <div className="w-full">
              <ViewStoryCard data={story} />
            </div>
            <DashboardCard
              data={data}
              guidelines={state?.guidelines?.guideline}
            />
          </div>
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default Home;

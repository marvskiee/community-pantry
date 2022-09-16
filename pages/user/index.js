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
          <div className="flex sm:gap-10 gap-5 md:flex-row flex-col-reverse">
            <div className="w-full">
              <ViewStoryCard data={story} />
            </div>
            <DashboardCard data={data} />
          </div>
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default Home;

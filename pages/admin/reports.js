import {
  HeaderLayout,
  ModifyStoryCard,
  SideBar,
  AdminWrapperLayout,
} from "../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  newGuidelines,
  setGuidelines,
} from "../../services/guideline.services";
import { useRef } from "react";
const Reports = () => {
  const { state, dispatch } = useAppContext();
  const mounted = useRef();
  useEffect(() => {
    mounted.current = {
      pantries: state.pantry?.filter((p) => p.status == "approved").length,
    };
  }, []);
  const metadatadHandler = (index) => {
    let num = [0, 0];
    if (state.metadata?.length > 0) {
      for (let i of state.metadata) {
        num[0] += Number(i.expiredCount);
        num[1] += Number(i.distributedCount);
      }
    }
    console.log(num);
    return num[index];
  };
  const reports_data = [
    {
      label: "approved pantries",
      count: state.pantry?.filter((p) => p.status == "approved").length || 0,
      color: "bg-emerald-500",
    },
    {
      label: "deleted pantries",
      count: state.pantry?.filter(
        (p) =>
          p.status == "deleted" ||
          p.status == "not approved" ||
          p.status == "request not approved"
      )?.length,
      color: "bg-rose-500",
    },
    {
      label: "distributed pantries",
      count: metadatadHandler(1),
      color: "bg-blue-500",
    },
    {
      label: "shared stories",
      count: state.story?.filter((p) => p.status == "approved").length || 0,
      color: "bg-violet-500",
    },
    {
      label: "expired supplies",
      count: metadatadHandler(0),
      color: "bg-zinc-500",
    },
  ];

  return (
    <div>
      <HeaderLayout title="Reports" />
      <div className="flex">
        <SideBar />
        <AdminWrapperLayout title="Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {reports_data.map(({ label, color, count }, index) => (
              <div
                className={`${color} p-4 rounded-md flex flex-col items-center justify-center `}
                key={index}
              >
                <p
                  className={` text-white p-2 font-bold text-xl px-4 rounded-md text-center uppercase`}
                >
                  {label}
                </p>
                <p className="text-4xl p-4 font-bold text-center text-white w-full">
                  {count}
                </p>
              </div>
            ))}
          </div>
        </AdminWrapperLayout>
      </div>
    </div>
  );
};

export default Reports;

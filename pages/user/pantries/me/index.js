import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  HeaderLayout,
  ModalLayout,
  ModifyPantryCard,
  SideBar,
  UserPantryCard,
  UserWrapperLayout,
  ViewMoreModal,
  ViewPantryCard,
} from "../../../../components";
import { useAppContext } from "../../../../context/AppContext";
import moment from "moment";
import { WarningSvg } from "../../../../components/Svg";
const OwnPantry = () => {
  const [expiredModal, setExpiredModal] = useState([]);
  const { state } = useAppContext();
  const [viewMoreData, setViewMoreData] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
    expiredHandler();
    setData(state?.pantry?.filter((p) => p.user_id == state?.user?._id));
  }, [state?.pantry]);
  const [search, setSearch] = useState("");
  const searchSupplyHelper = (sup) => {
    for (let i = 0; i < sup.length; i++) {
      if (sup[i].name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  };
  const searchData = data?.filter(
    (item) =>
      item.pantryName.toLowerCase().includes(search.toLowerCase()) ||
      searchSupplyHelper(item.supply) ||
      item.address.toLowerCase().includes(search.toLowerCase())
  );
  const buttons = () => {
    return (
      <Link href="../pantries">
        <button className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white">
          Back to all Pantries
        </button>
      </Link>
    );
  };
  const expiredHandler = () => {
    let current_date = moment().clone();
    let temp = [];
    let refData = state?.pantry?.filter((p) => p.user_id == state?.user?._id);
    if (refData) {
      for (let i of refData) {
        for (let j of i.supply) {
          if (moment(j.expiration_date).clone().add(3, "days") < current_date)
            temp.push({
              itemname: j.name,
              expiration: j.expiration_date,
              pantryName: i.pantryName,
            });
        }
      }
    }
    setExpiredModal(temp);
    console.log(temp);
  };
  return (
    <div>
      {expiredModal.length > 0 && (
        <ModalLayout>
          <div className="">
            <p className="bg-rose-500 flex gap-4 flex-row  text-white p-4 font-semibold text-xl rounded-md">
              <span>
                <WarningSvg />
              </span>
              Alert: There are supplies that about to expired
            </p>
            <div className="flex flex-col gap-4 my-4">
              {expiredModal.map(
                ({ itemname, expiration, pantryName }, index) => (
                  <div key={index} className="">
                    <p className=" p-2 px-4 rounded-md bg-slate-200 font-semibold ">
                      Pantry Name: {pantryName}
                    </p>

                    <div className="px-4 my-2 flex items-center gap-4 justify-between">
                      <p>{itemname}</p>
                      <p>{moment(expiration).format("MMM DD, YYYY")}</p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => setExpiredModal([])}
                className="bg-slate-400 py-3 p-8 rounded-full text-white"
              >
                Ok
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
      {viewMoreData && (
        <ModalLayout>
          <ViewMoreModal
            data={viewMoreData}
            setViewMoreModal={setViewMoreData}
          />
        </ModalLayout>
      )}
      <HeaderLayout title="Pantries" />
      <div className="flex">
        <SideBar />
        <UserWrapperLayout title="Pantries" buttons={buttons}>
          <div className="flex items-center justify-between">
            <div className="flex w-full relative">
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="Search food, pantry name or location "
                className="w-full rounded-full p-4 mt-2 mb-4"
              />
              {search.length > 0 && (
                <span
                  onClick={() => setSearch("")}
                  className="cursor-pointer right-0 top-2 p-4 absolute"
                >
                  Clear
                </span>
              )}
            </div>
          </div>
          {search.length > 0 && (
            <p className="font-semibold mb-4">
              Search result found: {searchData.length}
            </p>
          )}
          <ViewPantryCard
            data={searchData}
            setViewMoreModal={setViewMoreData}
            meOnly={true}
          />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default OwnPantry;

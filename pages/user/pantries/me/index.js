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

const OwnPantry = () => {
  const { state } = useAppContext();
  const [viewMoreData, setViewMoreData] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
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
  return (
    <div>
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

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  HeaderLayout,
  ModalLayout,
  SideBar,
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
    setData(
      state?.pantry?.filter(
        (p) => p.status == "approved" && p.user_id == state?.user?._id
      )
    );
  }, [state?.pantry]);
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
          <ViewPantryCard data={data} setViewMoreModal={setViewMoreData} />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default OwnPantry;

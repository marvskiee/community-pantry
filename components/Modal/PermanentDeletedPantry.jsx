import React, { useState, useRef } from "react";
import ModalLayout from "../Layout/ModalLayout";
import { ref, deleteObject } from "firebase/storage";
import { useAppContext } from "../../context/AppContext";
import { storage } from "../../services/firebase";
import { getPantry, deletePantry } from "../../services/pantry.services";

const PermanentDeletedPantry = ({ setModalMode, data, type }) => {
  const [isLoading, setIsLoading] = useState();
  const { dispatch } = useAppContext();
  const supplyDeletedCountRef = useRef(0);

  // STEP 1 DELETE IMAGE PATRY
  const deletePantryImage = (url) => {
    let pictureRef = ref(storage, url);
    deleteObject(pictureRef)
      .then(() => {
        deleteSupplyImage();
        console.log("Passed 1");
      })
      .catch((error) => {
        console.log(error);
        deleteSupplyImage();
      });
  };

  // STEP 2 DELETE SUPPLY IMAGE
  const deleteSupplyImage = () => {
    for (let i of data.supply) {
      let pictureRef = ref(storage, i.image);
      deleteObject(pictureRef)
        .then(() => {
          supplyDeletedCountRef.current = supplyDeletedCountRef.current + 1;
          console.log("deleted count", supplyDeletedCountRef.current);
          console.log(
            "supply count",
            supplyDeletedCountRef.currentdata.supply.length
          );

          if (supplyDeletedCountRef.current == data.supply.length) {
            deleteFromDatabase();
            console.log("Passed 2");
          }
        })
        .catch((error) => {
          supplyDeletedCountRef.current = supplyDeletedCountRef.current + 1;
          console.log("deleted count", supplyDeletedCountRef.current);
          if (supplyDeletedCountRef.current == data.supply.length) {
            deleteFromDatabase();
          }
          console.log(error);
        });
    }
  };

  // STEP 3 DELETE DATA FROM DATABASE
  const deleteFromDatabase = async () => {
    const res = await deletePantry(data._id);
    if (res.success) {
      const pantry_res = await getPantry();
      if (pantry_res.success) {
        setIsLoading(false);
        setModalMode("");
        console.log("Passed 3");
        dispatch({ type: "SET_PANTRY", value: pantry_res.data });
      }
    }
  };

  const confirmHandler = () => {
    setIsLoading(true);
    deletePantryImage(data.pantryImage);
  };
  return (
    <ModalLayout>
      <div>
        {type == "pantry" ? (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to permanently deleted &quot;{data.username}
            &quot; pantry?
          </p>
        ) : (
          <p className="font-semibold text-lg mb-4">
            Are you sure you want to permanently deleted &quot;{data.username}
            &quot; story?
          </p>
        )}
        <div className="flex gap-4 justify-end">
          {!isLoading ? (
            <>
              <button
                onClick={() => setModalMode("")}
                className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={confirmHandler}
                className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Confirm
              </button>
            </>
          ) : (
            <p className="p-3 px-8 bg-emerald-600 text-white rounded-full ">
              Saving...
            </p>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default PermanentDeletedPantry;

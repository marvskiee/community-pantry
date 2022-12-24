import React, { useState, useRef } from "react";
import ModalLayout from "../Layout/ModalLayout";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useAppContext } from "../../context/AppContext";
import { storage } from "../../services/firebase";
import { updatePantry, getPantry } from "../../services/pantry.services";
import moment from "moment";

const UpdatePantryModal = ({ setModalMode, data, meOnly }) => {
  console.log(data);
  const [isLoading, setIsLoading] = useState();
  const { dispatch } = useAppContext();
  const [error, setError] = useState();
  // pantry var
  const [pantryImage, setPantryImage] = useState(null);
  const hiddenPantryImageRef = useRef();
  const hiddenSupplyImageRef = useRef();
  const setImageUrlRef = useRef();
  const [supplyList, setSupplyList] = useState(data.supply);
  const supplyImageIndexRef = useRef();
  const deletedSupplyUrl = useRef([]);
  const pantryNameRef = useRef();
  const aboutUsRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  // const guidelineRef = useRef();
  const supplyNameRef = useRef();
  const readyDataRef = useRef();
  const closingRef = useRef();
  const openingRef = useRef();
  const distributedRef = useRef(0);
  const expiredRef = useRef(0);
  const [contacts, setContacts] = useState(data?.contact);

  const [hourError, setHourError] = useState(false);

  // STEP 2 UPDATE THE PANTRY IMAGE IF STATE IS CHANGED
  const updatePantryImage = () => {
    const imageRef = ref(storage, `images/${pantryImage.file.name + v4()}`);
    let pictureRef = ref(storage, data?.pantryImage);
    // console.log(data?.pantryImage);
    deleteObject(pictureRef)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    uploadBytes(imageRef, pantryImage.file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          readyDataRef.current = {
            pantryImage: url,
          };
          updateSupplyImage(true);
        });
      })
      .catch((e) => {
        console.log("Error", e);
        setIsLoading(false);
      });
  };
  // STEP 3 UPDATE THE SUPPLY IMAGE
  const updateSupplyImage = (isImageChanged) => {
    if (!isImageChanged) {
      readyDataRef.current = {
        pantryImage: data.pantryImage,
      };
    }
    let tmp = [];
    for (let i = 0; i < supplyList.length; i++) {
      if (supplyList[i].image?.url) {
        const imageRef = ref(
          storage,
          `images/${supplyList[i].image.file.name + v4()}`
        );
        uploadBytes(imageRef, supplyList[i].image.file).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              tmp.push({ ...supplyList[i], image: url });
              readyDataRef.current.supply = tmp;
              if (tmp.length == supplyList.length) {
                finalHandler();
                // console.log("passed 2");
              }
            })
            .catch((e) => {
              console.log("Error", e);
              setIsLoading(false);
              return;
            });
        });
      } else {
        tmp.push({ ...supplyList[i] });
        readyDataRef.current.supply = tmp;
        if (tmp.length == supplyList.length) {
          finalHandler();
          // console.log("passed 2");
        }
      }
    }
  };
  const specialQuantityHandler = (index, value) => {
    let clone = supplyList;

    if (value > 0 || value.length == 0) {
      clone[index].quantity = value;
      setSupplyList([...clone]);
    }
  };
  const finalHandler = async () => {
    const today = moment().format("YYYY-MM-DD ");
    console.log(
      "final",
      moment(today + openingRef.current.value).format("YYYY-MM-DD hh:mm A")
    );
    const newData = {
      pantryName: pantryNameRef.current?.value.trim(),
      aboutUs: aboutUsRef.current?.value.trim(),
      address: addressRef.current?.value.trim(),
      contact: contacts,
      // guideline: guidelineRef.current?.value.trim(),
      pantryImage: readyDataRef.current.pantryImage,
      supply: readyDataRef.current.supply,

      other: "",
      pantryImage: readyDataRef.current.pantryImage,
      open: moment(today + openingRef.current.value)
        .subtract(hour, "hours")
        .format("YYYY-MM-DD HH:mm"),
      close: moment(today + closingRef.current.value)
        .subtract(hour, "hours")
        .format("YYYY-MM-DD HH:mm"),
      expirationCount: expiredRef.current?.value,
      distributedCount: distributedRef.current?.value,
    };
    if (meOnly) {
      newData.status = "requested";
      newData.reason = null;
    }
    // console.log(newData);
    const { success, error } = await updatePantry(newData, data?._id);
    if (success) {
      deleteFromFirebase();
      setIsLoading(false);
      clearForm();
      // console.log("passed 3");

      const pantry_res = await getPantry();
      if (pantry_res.success) {
        dispatch({ type: "SET_PANTRY", value: pantry_res.data });
        setModalMode("");
        // console.log("passed 4");
      }
    } else {
      console.log(error);
    }
  };
  // STEP 4 DELETE THE IMAGE
  const deleteFromFirebase = (url) => {
    let ct = 0;
    for (let i of deletedSupplyUrl.current) {
      let pictureRef = ref(storage, i);
      console.log(i);
      deleteObject(pictureRef)
        .then(() => {
          ct += 1;
          if (deletedSupplyUrl.length - 1 == ct) {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  const clearForm = () => {
    readyDataRef.current = {};
    setSupplyList([]);
    setPantryImage(null);
    setError(null);
  };
  // STEP 1 VALIDATE THE FORM AND FIELD
  const validateHandler = () => {
    const newData = {
      pantryName: pantryNameRef.current.value.trim(),
      aboutUs: aboutUsRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      contact: contacts,
      // guideline: guidelineRef.current.value.trim(),
      closing: closingRef.current.value,
      opening: openingRef.current.value,
      expirationCount: expiredRef.current.value,
      distributedCount: distributedRef.current.value,
    };
    let {
      pantryName,
      aboutUs,
      expirationCount,
      distributedCount,
      address,
      contact,
      opening,
      closing,
    } = newData;
    console.log(pantryImage);
    console.log("check", supplyList);

    if (
      pantryName.length > 0 &&
      aboutUs.length > 0 &&
      address.length > 0 &&
      contact.length > 0 &&
      // guideline.length > 0 &&
      supplyList.length > 0 &&
      closing != null &&
      opening != null &&
      expirationCount > -1 &&
      distributedCount > -1 &&
      !hourError
    ) {
      for (let list of supplyList) {
        if (list.image == null) {
          setError("All fields are required!");
          return;
        }
      }
      setIsLoading(true);

      console.log("check", supplyList);
      if (pantryImage != null) {
        updatePantryImage();
      } else {
        updateSupplyImage();
      }
      console.log("passed 1");
    } else {
      setError("All fields are required!");
    }
  };

  const supplyHandler = () => {
    if (supplyNameRef.current.value.trim().length > 0) {
      setSupplyList([
        ...supplyList,
        {
          image: null,
          name: supplyNameRef.current.value,
          quantity: 1,
          date_added: moment().format("YYYY-MM-DD"),
          expiration_date: null,
        },
      ]);
      supplyNameRef.current.value = "";
    }
  };
  const quantityHandler = (action, index) => {
    let clone = supplyList;
    let qty = supplyList[index].quantity;
    if (action == "increment") {
      qty += 1;
    } else {
      if (qty > 1) {
        qty -= 1;
      }
    }
    clone[index].quantity = qty;
    setSupplyList([...clone]);
  };
  const removeHandler = (index) => {
    const selected = supplyList[index];
    if (selected?.url) {
      deletedSupplyUrl.current = [...deletedSupplyUrl.current, selected];
    }
    setSupplyList([...supplyList.filter((sup, i) => i != index)]);
  };
  const supplyImageHandler = (index) => {
    console.log(index);
    supplyImageIndexRef.current = index;
    hiddenSupplyImageRef.current?.click();
  };
  const expirationHandler = (index, value) => {
    let clone = supplyList;
    clone[index].expiration_date = value;
    setSupplyList([...clone]);
  };
  const hourHandler = () => {
    let open = parseInt(openingRef.current?.value.replace(":", ""));
    let close = parseInt(closingRef.current?.value.replace(":", ""));
    if (close <= open) {
      setHourError(true);
    } else {
      setHourError(false);
    }
  };
  const pantryUI = () => {
    return (
      <div className="flex flex-col gap-4">
        {error && (
          <p className="rounded-lg p-2 px-4 text-rose-700 bg-rose-300">
            {error}
          </p>
        )}
        <p className="font-semibold text-lg">Update Pantry</p>
        <div
          onClick={() => hiddenPantryImageRef.current.click()}
          className="relative overflow-hidden cursor-pointer flex  items-center justify-center  rounded-lg aspect-video w-full bg-slate-200"
        >
          <p className="z-10 text-2xl h-full w-full flex items-center justify-center font-semibold text-slate-100 bg-slate-900/20 p-4 text-center">
            Choose image to upload
          </p>
          <img
            src={pantryImage?.url || data?.pantryImage}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <input
            className="hidden"
            ref={hiddenPantryImageRef}
            type="file"
            onChange={(e) => {
              try {
                setPantryImage({
                  url: URL?.createObjectURL(e.target.files[0]),
                  file: e.target.files[0],
                });
              } catch (e) {
                console.log(e);
              }
            }}
            accept="image/*"
          />
        </div>

        <input
          className="rounded-full px-4 py-3 border"
          placeholder="Pantry Name"
          type="text"
          defaultValue={data?.pantryName}
          ref={pantryNameRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="About us"
          defaultValue={data?.aboutUs}
          ref={aboutUsRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Address"
          defaultValue={data?.address}
          ref={addressRef}
        />
        <div className="relative">
          <span className="absolute left-4 top-3 text-lg">+63</span>
          <input
            className="w-full pl-14 rounded-full px-4 py-3 border"
            placeholder="Contact Information"
            type="number"
            onChange={(e) => {
              setContacts(e.target.value.slice(0, 10));
            }}
            value={contacts}
          />
        </div>
        <div className="rounded-3xl border p-4">
          {hourError && (
            <p className="py-2 text-rose-500 font-semibold">Invalid time!</p>
          )}
          <label className="text-center text-slate-400 w-full">
            Opening and Closing hours
          </label>
          <div className="flex my-2 items-center justify-around">
            <input
              ref={openingRef}
              className="rounded-full px-4 py-3 border"
              placeholder="Contact Information"
              type="time"
              defaultValue={moment(data?.open).format("hh:mm")}
              onChange={() => {
                hourHandler();
              }}
            />
            <input
              ref={closingRef}
              min={openingRef.current?.value}
              className="rounded-full px-4 py-3 border"
              placeholder="Contact Information"
              type="time"
              defaultValue={moment(data?.close).format("hh:mm")}
              onChange={() => {
                hourHandler();
              }}
            />
          </div>
        </div>
        {/* <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Pantry Guidelines"
          defaultValue={data?.guideline}
          ref={guidelineRef}
        /> */}
        <div className="flex gap-4 items-center justify-end">
          <input
            className="w-full rounded-full px-4 py-3 border"
            placeholder="Enter Supply"
            type="text"
            ref={supplyNameRef}
          />
          {!isLoading && (
            <button
              className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              onClick={supplyHandler}
            >
              Add
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-col">
          {supplyList.map(
            (
              { name, quantity, image, _id, date_added, expiration_date },
              index
            ) => (
              <div className="rounded-3xl border p-4" key={_id || index}>
                <div className="flex items-center justify-between">
                  <input
                    ref={hiddenSupplyImageRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      console.log(supplyImageIndexRef.current);
                      let clone = supplyList;
                      clone[supplyImageIndexRef.current].image = {
                        url: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      };
                      console.log(clone);
                      setSupplyList([...clone]);
                    }}
                    accept="image/*"
                  />
                  <div
                    onClick={() => supplyImageHandler(index)}
                    className="overflow-hidden relative w-14 flex items-center justify-center rounded-lg cursor-pointer aspect-square bg-slate-200 text-sm"
                  >
                    <p className="text-center text-xs z-10 text-white bg-slate-900/40 flex items-center justify-center font-semibold h-full w-full">
                      Pick Image
                    </p>
                    {(image || image?.url) && (
                      <img
                        src={image?.url || image}
                        className="absolute w-full h-full top-0 left-0"
                        alt="supply image"
                      />
                    )}
                  </div>
                  <p className="p-4">{name}</p>

                  {!isLoading && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => quantityHandler("increment", index)}
                        className="p-2 w-10 rounded-full bg-emerald-500 text-white"
                      >
                        +
                      </button>
                      <input
                        type="number"
                        className="p-2 w-20 border rounded-full text-center"
                        value={quantity}
                        onChange={(e) =>
                          specialQuantityHandler(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => quantityHandler("decrement", index)}
                        className="p-2 w-10 rounded-full bg-slate-900 text-white"
                      >
                        -
                      </button>
                      <button
                        onClick={() => removeHandler(index)}
                        className="p-2 w-10 rounded-full bg-rose-600 text-white"
                      >
                        x
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p className="p-2">Expiration Date</p>
                  <input
                    className="w-full rounded-full px-4 py-3 border"
                    type="date"
                    defaultValue={
                      expiration_date &&
                      moment(expiration_date).format("YYYY-MM-DD")
                    }
                    onChange={(e) => expirationHandler(index, e.target.value)}
                  />
                </div>
                <p className="p-2">
                  Date added: {moment(date_added).format("MMM DD YYYY")}
                </p>
              </div>
            )
          )}
        </div>
        <div className="w-full rounded-3xl border p-4 flex-col flex gap-4">
          <label className="text-center text-slate-400 w-full">
            Distributed Supplies
          </label>
          <input
            className="rounded-full px-4 py-3 border"
            placeholder="0"
            type="number"
            min={0}
            defaultValue={data?.distributedCount}
            ref={distributedRef}
          />
        </div>
        <div className="w-full rounded-3xl border p-4 flex-col flex gap-4">
          <label className="text-center text-slate-400 w-full">
            Expired Supplies
          </label>
          <input
            className="rounded-full px-4 py-3 border"
            placeholder="0"
            type="number"
            min={0}
            defaultValue={data?.expirationCount}
            ref={expiredRef}
          />
        </div>

        <div className="flex gap-4 justify-end">
          {isLoading ? (
            <p className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full ">
              Saving...
            </p>
          ) : (
            <>
              <button
                onClick={() => setModalMode("")}
                className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Cancel
              </button>
              <button
                onClick={validateHandler}
                className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full "
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  return <ModalLayout>{pantryUI()}</ModalLayout>;
};

export default UpdatePantryModal;

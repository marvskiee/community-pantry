import {
  HeaderLayout,
  ModalLayout,
  SideBar,
  UserWrapperLayout,
  ViewMoreModal,
  ViewPantryCard,
} from "../../../components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../services/firebase";
import React, { useState, useRef, useEffect } from "react";
import { addPantry } from "../../../services/pantry.services";
import { useAppContext } from "../../../context/AppContext";
import Link from "next/link";
const Home = () => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useAppContext();
  const [success, setSuccess] = useState();
  const modalModeRef = useRef();
  const [data, setData] = useState();
  useEffect(() => {
    setData(state?.pantry?.filter((p) => p.status == "approved"));
  }, [state?.pantry]);
  const savePantryImage = () => {
    setIsLoading(true);
    setError(null);

    if (pantryImage?.file == null) {
      setIsLoading(false);
      return;
    }
    const imageRef = ref(storage, `images/${pantryImage.file.name + v4()}`);
    uploadBytes(imageRef, pantryImage.file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          readyDataRef.current = { ...readyDataRef.current, pantryImage: url };
          saveSupplyImage();
        });
      })
      .catch((e) => {
        console.log("Error", e);
        setIsLoading(false);
      });
  };
  const saveSupplyImage = () => {
    let tmp = [];
    for (let i = 0; i < supplyList.length; i++) {
      console.log(supplyList[i]);
      const imageRef = ref(
        storage,
        `images/${supplyList[i].image.file.name + v4()}`
      );
      uploadBytes(imageRef, supplyList[i].image.file).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // console.log("iterable: ", supplyList[i]);
            // console.log("image: ", url);
            // console.log("index", i);
            tmp.push({ ...supplyList[i], image: url });
            readyDataRef.current.supply = tmp;
            // console.log("log: ", readyDataRef.current);
            // console.log("count: ", tmp.length);
            if (tmp.length == supplyList.length) {
              console.log("******************************* ready");
              finalHandler();
            }
          })
          .catch((e) => {
            console.log("Error", e);
            setIsLoading(false);
            return;
          });
      });
    }
  };
  const finalHandler = async () => {
    const newData = {
      username: state?.user?.username,
      user_id: state?.user?._id,
      pantryName: pantryNameRef.current?.value.trim(),
      aboutUs: aboutUsRef.current?.value.trim(),
      address: addressRef.current?.value.trim(),
      contact: contactRef.current?.value.trim(),
      guideline: guidelineRef.current?.value.trim(),
      status: "pending",
      supply: readyDataRef.current.supply,
      pantryImage: readyDataRef.current.pantryImage,
    };
    // console.log(newData);
    const { success, error } = await addPantry(newData);
    if (success) {
      setIsLoading(false);
      clearForm();
      // console.log(newData);
    } else {
      console.log(error);
    }
  };
  const clearForm = () => {
    readyDataRef.current = {};
    setSupplyList([]);
    setModal(false);
    setPantryImage(null);
    setError(null);
  };
  const validateHandler = () => {
    const newData = {
      pantryName: pantryNameRef.current.value.trim(),
      aboutUs: aboutUsRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      contact: contactRef.current.value.trim(),
      guideline: guidelineRef.current.value.trim(),
    };
    let { pantryName, aboutUs, address, contact, guideline } = newData;
    if (
      pantryImage != null &&
      pantryName.length > 0 &&
      aboutUs.length > 0 &&
      address.length > 0 &&
      contact.length > 0 &&
      guideline.length > 0 &&
      supplyList.length > 0
    ) {
      for (let list of supplyList) {
        if (list.image == null) {
          setError("All fields are required!");
          return;
        }
      }
      savePantryImage();
      console.log("yes");
      console.log(newData);
    } else {
      setError("All fields are required!");
    }
  };

  const pantryNameRef = useRef();
  const aboutUsRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const guidelineRef = useRef();
  const supplyNameRef = useRef();

  const [supplyList, setSupplyList] = useState([]);
  const hiddenSupplyImageRef = useRef();
  const hiddenPantryImageRef = useRef();
  const [pantryImage, setPantryImage] = useState(null);
  const supplyImageIndexRef = useRef();
  const readyDataRef = useRef();

  const [viewMoreData, setViewMoreData] = useState(null);

  const supplyHandler = () => {
    if (supplyNameRef.current.value.trim().length > 0) {
      setSupplyList([
        ...supplyList,
        { image: null, name: supplyNameRef.current.value, quantity: 1 },
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
    setSupplyList([...supplyList.filter((sup, i) => i != index)]);
  };
  const supplyImageHandler = (index) => {
    supplyImageIndexRef.current = index;
    hiddenSupplyImageRef.current.click();
  };
  const addPantryUI = () => {
    return (
      <div className="flex flex-col gap-4">
        {error && (
          <p className="rounded-lg p-2 px-4 text-rose-700 bg-rose-300">
            {error}
          </p>
        )}
        <p className="font-semibold text-lg">Add Pantry</p>
        <div
          onClick={() => hiddenPantryImageRef.current.click()}
          className="relative overflow-hidden cursor-pointer flex  items-center justify-center  rounded-lg aspect-video w-full bg-slate-200"
        >
          <p className="z-10 text-2xl h-full w-full flex items-center justify-center font-semibold text-slate-100 bg-slate-900/20 p-4 text-center">
            Choose image to upload
          </p>
          {pantryImage?.url && (
            <img
              src={pantryImage?.url}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
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
          ref={pantryNameRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="About us"
          ref={aboutUsRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Address"
          ref={addressRef}
        />
        <input
          className="rounded-full px-4 py-3 border"
          placeholder="Contact Information"
          type="number"
          ref={contactRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Pantry Guidelines"
          ref={guidelineRef}
        />
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
          {supplyList.map(({ name, quantity, image }, index) => (
            <div key={index} className="flex items-center justify-between">
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
                {image && (
                  <img
                    src={image?.url}
                    className="absolute w-full h-full top-0 left-0"
                    alt="supply image"
                  />
                )}
              </div>
              <p>{name}</p>
              {!isLoading && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => quantityHandler("increment", index)}
                    className="p-2 w-10 rounded-full bg-emerald-500 text-white"
                  >
                    +
                  </button>
                  <p>{quantity}</p>
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
          ))}
        </div>

        <div className="flex gap-4 justify-end">
          {isLoading ? (
            <p className="p-3 px-8 bg-emerald-600 transition-colors hover:bg-emerald-700 text-white rounded-full ">
              Saving...
            </p>
          ) : (
            <>
              <button
                onClick={() => {
                  clearForm();
                }}
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

  const buttons = () => {
    return (
      <div className="flex gap-4 sm:flex-row flex-col ">
        <button
          onClick={() => {
            modalModeRef.current = "add_pantry";
            setModal(true);
          }}
          className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white"
        >
          Create your own pantry
        </button>
        <Link href={"../user/pantries/me"}>
          <button className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white">
            Check your pantry
          </button>
        </Link>
      </div>
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
      {modal && <ModalLayout>{addPantryUI()}</ModalLayout>}
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

export default Home;

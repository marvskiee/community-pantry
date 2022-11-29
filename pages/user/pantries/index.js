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
import moment from "moment";
const Home = () => {
  const [agreement, setAgreement] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useAppContext();
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

      // guideline: guidelineRef.current?.value.trim(),
      status: "pending",
      supply: readyDataRef.current?.supply,
      pantryImage: readyDataRef.current?.pantryImage,
      open: moment().format("YYYY-MM-DD ") + openingRef.current.value,
      close: moment().format("YYYY-MM-DD ") + closingRef.current.value,
    };
    console.log(newData);
    const { success, error } = await addPantry(newData);
    if (success) {
      setIsLoading(false);
      clearForm();
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
  const expiredHandler = () => {
    let newDate = moment().clone().format("YYYY-MM-DD");
    console.log(newDate);
    for (let i of supplyList) {
      if (i.expiration_date < newDate) {
        return true;
      }
    }
    return false;
  };
  const validateHandler = () => {
    if (expiredHandler()) {
      setError("All fields are required!");
      return;
    }
    const newData = {
      pantryName: pantryNameRef.current.value.trim(),
      aboutUs: aboutUsRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      contact: contactRef.current.value.trim(),
      closing: closingRef.current.value,
      opening: openingRef.current.value,

      // guideline: guidelineRef.current.value.trim(),
    };
    let { pantryName, aboutUs, address, contact, opening, closing } = newData;
    if (
      pantryImage != null &&
      pantryName.length > 0 &&
      aboutUs.length > 0 &&
      address.length > 0 &&
      contact.length > 0 &&
      contact.length == 10 &&
      // guideline.length > 0 &&
      supplyList.length > 0 &&
      closing != null &&
      opening != null &&
      !hourError
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
  // const guidelineRef = useRef();
  const supplyNameRef = useRef();

  const [supplyList, setSupplyList] = useState([]);
  const hiddenSupplyImageRef = useRef();
  const hiddenPantryImageRef = useRef();
  const [pantryImage, setPantryImage] = useState(null);
  const supplyImageIndexRef = useRef();
  const readyDataRef = useRef();
  const closingRef = useRef();
  const openingRef = useRef();
  const [hourError, setHourError] = useState(false);
  const [viewMoreData, setViewMoreData] = useState(null);
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
  const expirationHandler = (index, value) => {
    let clone = supplyList;
    clone[index].expiration_date = value;
    setSupplyList([...clone]);
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
  const hourHandler = () => {
    let open = parseInt(openingRef.current?.value.replace(":", ""));
    let close = parseInt(closingRef.current?.value.replace(":", ""));
    if (close <= open) {
      setHourError(true);
    } else {
      setHourError(false);
    }
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
          placeholder="Rules and Regulations"
          ref={aboutUsRef}
        />
        <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Address"
          ref={addressRef}
        />
        <div className="relative">
          <span className="absolute left-4 top-3 text-lg">+63</span>
          <input
            className="w-full pl-14 rounded-full px-4 py-3 border"
            placeholder="Contact Number"
            type="number"
            ref={contactRef}
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
              onChange={() => {
                hourHandler();
              }}
            />
          </div>
        </div>
        {/* <textarea
          className="rounded-full px-4 py-3 border"
          placeholder="Pantry Guidelines"
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
          {supplyList.map(({ name, quantity, image }, index) => (
            <div className="rounded-3xl border p-4" key={index}>
              <div className="flex items-center justify-between">
                <input
                  ref={hiddenSupplyImageRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    try {
                      console.log(supplyImageIndexRef.current);
                      let clone = supplyList;
                      clone[supplyImageIndexRef.current].image = {
                        url: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      };
                      console.log(clone);
                      setSupplyList([...clone]);
                    } catch (e) {
                      console.log(e);
                    }
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
              <div>
                <p className="p-2">Expiration Date</p>
                <input
                  className="w-full rounded-full px-4 py-3 border"
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  onChange={(e) => expirationHandler(index, e.target.value)}
                />
              </div>
              <p className="p-2">
                Date added: {moment().format("MMM DD YYYY")}
              </p>
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
            setTermsModal(true);
            // setModal(true);
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
  const termsData1 = [
    ` These terms and conditions outline the rules and regulations for the
use of Community Basket's Website, located at
https://bc-pantry.herokuapp.com/user/pantries.`,
    ` By accessing this website we assume you accept these terms and
conditions. Do not continue to use Community Basket if you do not
agree to take all of the terms and conditions stated on this page.`,
    `The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`,
  ];
  const termsUI = () => {
    return (
      <div className="p-2 flex-col flex gap-4">
        <p className="font-semibold text-xl">Terms and conditions</p>
        <p className="font-semibold text-xl">Welcome to Community Basket!</p>
        {termsData1.map((data, index) => (
          <p className="my-2" key={index}>
            {data}
          </p>
        ))}
        <p className="my-2 font-semibold text-xl">Content Liability</p>
        <p className="my-2">
          We shall not be hold responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that is
          rising on your Website. No link(s) should appear on any Website that
          may be interpreted as libelous, obscene or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third party rights.
        </p>
        <p className="my-2 font-semibold text-xl">Disclaimer</p>
        <p className="my-2">
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
          <br />
        </p>
        <ul className="my-2 list-disc pl-10">
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
        <p>
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
          <br />
          <br />
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>
        <div className="flex gap-2 justify-center">
          <input
            id="terms"
            type="checkbox"
            onChange={() => setAgreement(!agreement)}
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        <div className="flex gap-4 justify-center">
          {agreement ? (
            <button
              className="rounded-full p-3 px-8 hover:bg-emerald-700 bg-emerald-600 transition-colors text-white"
              onClick={() => {
                setModal(true);
                setTermsModal(false);
                setAgreement(false);
              }}
            >
              Accept
            </button>
          ) : (
            <p className="rounded-full p-3 px-8 text-center bg-emerald-300 transition-colors text-white">
              Accept
            </p>
          )}
          <button
            className="p-3 px-8 bg-slate-400 transition-colors hover:bg-emerald-700 text-white rounded-full "
            onClick={() => {
              setAgreement(false);
              setTermsModal(false);
            }}
          >
            Close
          </button>
        </div>
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
      {termsModal && <ModalLayout>{termsUI()}</ModalLayout>}
      {modal && <ModalLayout>{addPantryUI()}</ModalLayout>}
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
          />
        </UserWrapperLayout>
      </div>
    </div>
  );
};

export default Home;

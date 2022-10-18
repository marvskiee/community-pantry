import React from "react";
import moment from "moment";
const ViewMoreModal = ({ data, setViewMoreModal }) => {
  const {
    username,
    pantryName,
    pantryImage,
    aboutUs,
    address,
    contact,
    guideline,
    supply,
    open,
    close,
  } = data;
  return (
    <div className=" bg-white">
      <div className="flex items-center justify-between mb-4 gap-4 sm:flex-row flex-col">
        <p className="font-semibold text-lg">{username}</p>
      </div>
      <div className="flex lg:flex-row flex-col">
        <img
          src={pantryImage}
          className="mb-4 rounded-md w-40 h-40 mr-10 bg-slate-300"
        />
        <div>
          <div>
            <p>
              <span className="font-semibold text-lg">Pantry Name: </span>
              {pantryName}
            </p>
            <p>
              <span className="font-semibold text-lg">
                Contact Information:{" "}
              </span>
              {contact}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-lg">Address: </span> {address}
            </p>
            <p>
              <span className="font-semibold text-lg">
                Rules and Regulation:{" "}
              </span>
              {aboutUs}
            </p>
            <p>
              <span className="font-semibold text-lg">
                Opening and Closing hours:{" "}
              </span>
              {moment(open).format("hh:mm A")} -{" "}
              {moment(close).format("hh:mm A")}
            </p>
            {/* <p>
              <span className="font-semibold text-lg">Guidelines: </span>
              {guideline}
            </p> */}
            <p>
              <span className="font-semibold text-lg">
                Available Supplies:{" "}
              </span>
            </p>
            <div className="flex gap-4 mt-4 flex-wrap">
              {supply?.map(
                (
                  { name, quantity, image, expiration_date, date_added },
                  index
                ) => (
                  <div
                    key={index}
                    className="flex border rounded-md p-4 gap-4 w-full"
                  >
                    <div className="relative ">
                      <img
                        src={image}
                        className="w-20 h-20 rounded-lg bg-slate-200"
                      />
                      <p className="flex items-center text-center justify-center aspect-square w-8 h-8 rounded-full bg-slate-600 text-white absolute top-0 right-0">
                        {quantity}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">{name}</p>
                      <div className="flex gap-4">
                        <p>
                          Expiration Date: <br />
                          {moment(expiration_date).format("YYYY-MM-DD")}
                        </p>

                        <p>
                          Date added: <br />
                          {moment(date_added).format("YYYY-MM-DD")}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="font-semibold p-2 w-full mt-4 px-6 rounded-lg bg-slate-200"
        onClick={() => setViewMoreModal(null)}
      >
        Collapse
      </button>
    </div>
  );
};

export default ViewMoreModal;

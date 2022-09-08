import React from "react";
import { CheckSvg, DeleteSvg, EditSvg } from "../Svg";

const ModifyPantryCard = () => {
  const data = [
    {
      username: "John Doe",
      pantryName: "Poblacion V1",
      aboutUs: `
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
      address: "Duon lang poblacion tanong nyo po",
      contact: "09564638238",
      guidelines:
        "lopasdasjda asduhgas sad  as da s f  sa s  asdasdsa ds sads a  ds d a d saadss d s s s",
      supplies: [
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
      ],
    },
    {
      username: "John Doe",
      pantryName: "Poblacion V1",
      aboutUs: `
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
      address: "Duon lang poblacion tanong nyo po",
      contact: "09564638238",
      guidelines:
        "lopasdasjda asduhgas sad  as da s f  sa s  asdasdsa ds sads a  ds d a d saadss d s s s",
      supplies: [
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
      ],
    },
    {
      username: "John Doe",
      pantryName: "Poblacion V1",
      aboutUs: `
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
      address: "Duon lang poblacion tanong nyo po",
      contact: "09564638238",
      guidelines:
        "lopasdasjda asduhgas sad  as da s f  sa s  asdasdsa ds sads a  ds d a d saadss d s s s",
      supplies: [
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
        { name: "carrots", quantity: 20 },
      ],
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      {data &&
        data.map(
          (
            {
              username,
              pantryName,
              aboutUs,
              address,
              contact,
              guidelines,
              supplies,
            },
            index
          ) => (
            <div
              className="rounded-lg border bg-white sm:p-10 p-5 "
              key={index}
            >
              <div className="flex items-center justify-between mb-4 gap-4 sm:flex-row flex-col">
                <p className="font-semibold text-lg">{username}</p>
                <div className="bg-white flex items-center rounded-full overflow-hidden">
                  <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                    <CheckSvg />
                  </span>
                  <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                    <EditSvg />
                  </span>
                  <span className="px-4 py-2 flex hover:bg-emerald-700 cursor-pointer bg-emerald-500 ">
                    <DeleteSvg />
                  </span>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col">
                <img
                  src="../logo.png"
                  className="mb-4 rounded-md w-40 h-40 mr-10 bg-slate-300"
                />
                <div>
                  <div>
                    <p>
                      <span className="font-semibold text-lg">
                        Pantry Name:{" "}
                      </span>
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
                      <span className="font-semibold text-lg">Address: </span>{" "}
                      {address}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">About us: </span>
                      {aboutUs}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">
                        Guidelines:{" "}
                      </span>
                      {guidelines}
                    </p>
                    <p>
                      <span className="font-semibold text-lg">
                        Available Supplies:{" "}
                      </span>
                    </p>
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {supplies.map(({ name, quantity }, index) => (
                        <div key={index} className="relative">
                          <img
                            src="../logo.png"
                            className="w-20 h-20 rounded-lg bg-slate-200"
                          />
                          <p>{name}</p>
                          <p className="px-2 py-1 rounded-full bg-slate-600 text-white absolute top-0 right-0">
                            {quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default ModifyPantryCard;

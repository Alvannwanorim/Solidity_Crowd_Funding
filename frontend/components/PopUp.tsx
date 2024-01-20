import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PopUpProp {
  setOpenModel: Dispatch<SetStateAction<boolean>>;
  setDonate: Dispatch<SetStateAction<any>>;
  donate: any;
  donateFunction: (pID: number, amount: string) => Promise<void>;
  getDonations: (pID: number) => Promise<any>;
}
const PopUp: React.FC<PopUpProp> = ({
  setOpenModel,
  setDonate,
  donate,
  donateFunction,
  getDonations,
}) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState<any[]>([]);

  const createDonation = async () => {
    try {
      const data = await donateFunction(donate.pId, amount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getData() {
      const donationListData = await getDonations(donate.pId);
      setAllDonationData(donationListData);
    }
    getData();
  }, []);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/* Header  */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{donate.title}</h3>
              <button
                onClick={() => setOpenModel(false)}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {donate.description}
              </p>
              <input
                type="text"
                placeholder="amount"
                required
                onChange={(e) => setAmount(e.target.value)}
                name="amount"
                id="amount"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
              />
              {allDonationData.map((donate, i) => (
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  {i + 1}:{donate.donation}
                  {""}
                  {donate.donator.slice(0, 35)}
                </p>
              ))}
            </div>

            {/* footer  */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                close
              </button>
              <button
                className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => createDonation()}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PopUp;

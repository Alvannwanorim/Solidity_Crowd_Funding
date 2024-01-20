import React, { Dispatch, SetStateAction } from "react";
interface CardProp {
  title: string;
  allCampaign: any[];
  setOpenModel: Dispatch<SetStateAction<boolean>>;
  setDonate: Dispatch<SetStateAction<any>>;
}
const Card: React.FC<CardProp> = ({
  title,
  allCampaign,
  setDonate,
  setOpenModel,
}) => {
  const daysLeft = (deadline: number) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays;
  };

  return (
    <div className="px-4 py-16 mx-auto max-w-xl md:max-w-fll lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5">{title}</p>
      <div className="flex flex-col md:flex-row space-x-8">
        {allCampaign?.map((campaign, i) => (
          <div
            onClick={() => (setDonate(campaign), setOpenModel(true))}
            key={i + 1}
            className=" flex w-ull md:w-1/3 flex-col cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded "
          >
            <img
              src="https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&w=640&h=960&dpr=1"
              alt=""
              className="object-cover w-full h-64 rounded"
            />
            <div className="py-5 pl-2">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                Days Left: {daysLeft(campaign.deadline)}
              </p>
              <a
                href="#"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-purple-700 "
              >
                <p className="text-2xl font-bold leading-5">{campaign.title}</p>
              </a>
              <p className="mb-4 text-gray-700">{campaign.description}</p>
              <div className="flex space-x-4">
                <p className="font-semibold">Target: {campaign.target}ETH</p>
                <p className="font-semibold">
                  Raised: {campaign.amountCollected} ETH
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

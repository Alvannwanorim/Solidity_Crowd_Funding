import { CreateCampaign } from "@/interfaces/CreateCampaign";
import React, { useState } from "react";

interface HeroProp {
  titleData: string;
  createCampaign: (campaign: CreateCampaign) => Promise<void>;
}

const Hero: React.FC<HeroProp> = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState<CreateCampaign>({
    target: "",
    title: "",
    description: "",
    deadline: 0,
  });

  const createNewCampaign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(campaign);

      const data = await createCampaign(campaign);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative">
      <span className="cover-line"></span>

      <div className="relative  bg-main">
        {/* <svg
          className="absolute inset-x-0 bottom-0 text-white"
          fill="currentColor"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119. 7C676
88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036
162.5 916 162.50796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.
5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg> */}
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-light text-white sm:text-5xlsm:leading-none">
                Crypto <br className="hidden md:block" />
                Crowd Funding CK
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eligendi vitae suscipit illum?
              </p>
              <a
                href="#"
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 hover:text-teal-700 text-gray-200"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-3"
                  fill="currentColor"
                  viewBox="0 0 12 12 "
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>
                <form>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="title"
                      className="inline-block mb-1 font-medium"
                    >
                      Title
                      <input
                        type="text"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            title: e.target.value,
                          });
                        }}
                        placeholder="title"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm  appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                      />
                    </label>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="title"
                      className="inline-block mb-1 font-medium"
                    >
                      Description
                      <input
                        type="text"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            description: e.target.value,
                          });
                        }}
                        placeholder="description"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm  appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                      />
                    </label>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="target"
                      className="inline-block mb-1 font-medium"
                    >
                      Target Amount
                      <input
                        type="text"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            target: e.target.value,
                          });
                        }}
                        placeholder="target amount"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm  appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        id="target"
                        name="target"
                      />
                    </label>
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="deadline"
                      className="inline-block mb-1 font-medium"
                    >
                      Deadline
                      <input
                        type="date"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            deadline: new Date(e.target.value).getTime(),
                          });
                        }}
                        placeholder="deadline"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm  appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
                        id="deadline"
                        name="deadline"
                      />
                    </label>
                  </div>
                  <div className="mt-4 mb-2 sm:mb-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none new-color"
                      onClick={(e) => createNewCampaign(e)}
                    >
                      Create Campaign{" "}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Create your campaign to raise funds
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

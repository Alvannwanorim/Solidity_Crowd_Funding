import React, { useState } from "react";
import { useCrowdFundingContext } from "@/Context/CrowdFunding";
import { Logo, Menu } from ".";

const NavBar = () => {
  const { currentAccount, connectWallet } = useCrowdFundingContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donations", "Members"];

  return (
    <div className="bg-main">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#"
              className="inline-flex items-center mr-8"
              aria-label="Company"
              title="Company"
            >
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Company
              </span>
            </a>
            <ul className="items-center hidden space-x-8 lg:flex">
              {menuList.map((el, i) => {
                return (
                  <li key={i + 1}>
                    <a
                      href="#"
                      className="font-medium tracking-wide text-gray-200 transition duration-200 hover:text-teal-400"
                    >
                      {el}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {!currentAccount && (
            <ul className=" items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => connectWallet()}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md  hover:bg-purple-700 focus:shadow-outline focus:outline-none bg-mainTwo"
                  aria-label="Sign up"
                  title="sign up"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-md"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>

            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="">
                      <a
                        href="#"
                        className="inline-flex items-center"
                        aria-label="Company"
                        title="Company"
                      >
                        <Logo color="text-black" />
                        <span className="ml-2 text-xl font-bond tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((el, i) => (
                        <li key={i + 1}>
                          <a
                            href="#"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-400"
                            aria-label="Our Product"
                            title="Our Product"
                          >
                            {el}
                          </a>
                        </li>
                      ))}

                      <li>
                        <a
                          href="#"
                          className="inline-flex items-center bg-mainTwo justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none hover:bg-purple-700"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Connect Wallet
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

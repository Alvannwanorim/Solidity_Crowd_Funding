import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";
import Web3Modal from "web3modal";
import React, { ReactNode, useState } from "react";
import { CrowdFundingContextType } from "@/interfaces/CrowdFunding";

const fetchContract = async (signerOrProvider: ethers.Signer) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

async function getContract() {
  const localRpcUrl = "http://localhost:8545";
  try {
    const web3modal = new Web3Modal({
      network: localRpcUrl,
    });
    const connection = await web3modal.connect();
    const provider = new ethers.JsonRpcProvider(localRpcUrl);
    const signer = await provider.getSigner();
    const contract = await fetchContract(signer);
    return contract;
  } catch (err) {
    console.log(err);
  }
}

export const CrowdFundingContext = React.createContext<
  CrowdFundingContextType | undefined
>(undefined);

export const CrowdFundingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const titleData = "Crowd Funding Title";
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const contextValues: CrowdFundingContextType = {};

  return (
    <CrowdFundingContext.Provider value={contextValues}>
      {children}
    </CrowdFundingContext.Provider>
  );
};

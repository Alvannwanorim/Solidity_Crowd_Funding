import { ethers } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";
import Web3Modal from "web3modal";
import React, { ReactNode, useContext, useState } from "react";
import {
  CrowdFunding,
  CrowdFundingContextType,
} from "@/interfaces/CrowdFunding";
import { CreateCampaign } from "@/interfaces/CreateCampaign";

const fetchContract = async (signerOrProvider: ethers.Signer) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export async function getContract() {
  const localRpcUrl = "http://localhost:8545";
  try {
    const provider = new ethers.providers.JsonRpcProvider(localRpcUrl);
    const signer = await provider.getSigner();
    const contract = await fetchContract(signer);
    // console.log(contract);
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
  const [error, setError] = useState<string>("");

  /**
   * @description create campaign
   * @param campaign
   */
  const createCampaign = async (campaign: CreateCampaign) => {
    try {
      if (currentAccount === "") {
        await connectWallet();
      }

      const { title, description, target, deadline } = campaign;
      const contract = await getContract();
      const transactions = await contract?.createCampaign(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(target, 18),
        new Date(deadline).getTime()
      );
      await transactions.wait();
      return transactions;
      console.log("Create campaign  transaction", transactions);
    } catch (error) {
      console.log("CReate campaign failed", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const contract = await getContract();
      const campaigns = await contract?.getCampaigns();

      const parsedCampaigns = campaigns.map(
        (campaign: CrowdFunding, i: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target),
          deadline: campaign.deadline,
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          pId: i,
        })
      );
      console.log(parsedCampaigns);

      return parsedCampaigns;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Get User campaign
   * filter campaigns for login in user
   */
  const getUserCampaigns = async () => {
    const contract = await getContract();
    const campaigns = await contract?.getCampaigns();

    // Refactor this and pull it from state
    const account = await window.ethereum.request({ method: "eth_accounts" });
    const currentAccount = account[0];
    const filteredCampaigns = campaigns.filter(
      (campaign: CrowdFunding) => campaign.owner === currentAccount
    );

    const userCampaigns = filteredCampaigns.map(
      (campaign: CrowdFunding, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target),
        deadline: campaign.deadline,
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      })
    );
    return userCampaigns;
  };

  /**
   * @description donate to a campaign
   * @param pId
   * @param amount
   * @returns
   */
  const donate = async (pId: number, amount: string) => {
    const contract = await getContract();

    const campaignData = await contract?.donate(pId, {
      value: ethers.utils.parseEther(amount),
    });
    await campaignData.wait();
    location.reload();
    return campaignData;
  };

  const getDonations = async (pId: number) => {
    const contract = await getContract();
    const donations = await contract?.getDonations();

    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donors: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  /**
   * @description check for metamask installation
   */
  const checkWalletConnection = async () => {
    if (window.ethereum) setError("Please install metamask");
    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
    } else {
      setError("please metamask and reload");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) setError("Please install metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };
  //Context values
  const contextValues: CrowdFundingContextType = {
    currentAccount,
    setCurrentAccount,
    connectWallet,
    checkWalletConnection,
    titleData,
    getCampaigns,
    donate,
    createCampaign,
    getUserCampaigns,
    getDonations,
  };

  return (
    <CrowdFundingContext.Provider value={contextValues}>
      {children}
    </CrowdFundingContext.Provider>
  );
};

export const useCrowdFundingContext = (): CrowdFundingContextType => {
  const context = useContext(CrowdFundingContext);
  if (!context)
    throw new Error(
      "useCrowdFundingContext must be used within the CrowdFundingContext"
    );

  return context;
};

import { Dispatch, SetStateAction } from "react";
import { CreateCampaign } from "./CreateCampaign";

export interface CrowdFunding {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: number;
  amountCollected: number;
  donors: number[];
  donations: string[];
}

export interface CrowdFundingContextType {
  currentAccount: string;
  setCurrentAccount: Dispatch<SetStateAction<string>>;
  connectWallet: () => Promise<void>;
  checkWalletConnection: () => Promise<void>;
  titleData: string;
  getCampaigns: () => Promise<any>;
  donate: (pID: number, amount: string) => Promise<void>;
  createCampaign: (campaign: CreateCampaign) => Promise<any>;
  getUserCampaigns: () => Promise<any>;
  getDonations: (pId: number) => Promise<any>;
}

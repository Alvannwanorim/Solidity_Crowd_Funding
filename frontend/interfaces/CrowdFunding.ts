import { Dispatch, SetStateAction } from "react";

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
}

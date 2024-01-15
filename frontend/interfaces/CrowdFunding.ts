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
  // crowdFunding: CrowdFunding[],
}

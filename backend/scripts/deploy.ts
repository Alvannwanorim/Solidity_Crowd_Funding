import { ethers } from "hardhat";
async function main() {
  const CrowdFunding = await ethers.deployContract("CrowdFunding");
  const crowdFunding = await CrowdFunding.waitForDeployment();
  console.log(`Contract deployed at: ${await crowdFunding.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
});

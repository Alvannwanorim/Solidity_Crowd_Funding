//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//Error 
error CrowdFunding__PastDateError();
error CrowdFunding__CampaignNotFound();
error CrowdFunding__TransferFailed();
contract CrowdFunding {

    // State Variables
    uint256 private s_numberOfCampaigns;

    //Type Variables
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donors;
        uint256[] donations;
    }

    ///////////////////// 
    //      Mappings   // 
    ///////////////////// 
    mapping(uint256 => Campaign) private s_campaigns; 


    //////////////////// 
    //   Functions    // 
    ////////////////////
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) public returns(uint256){
        uint256 currentCount = s_numberOfCampaigns;
        Campaign storage campaign = s_campaigns[currentCount];

        if(_deadline < block.timestamp){
            revert CrowdFunding__PastDateError();
        }
        campaign.owner = _owner; 
        campaign.title = _title; 
        campaign.description = _description;
        campaign.deadline = _deadline; 
        campaign.target = _target;
        campaign.amountCollected = 0;

        s_numberOfCampaigns++;
        return currentCount;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount  =msg.value;

        if(_id >= s_numberOfCampaigns){
            revert CrowdFunding__CampaignNotFound();
        }
        Campaign storage campaign = s_campaigns[_id];
        campaign.donors.push(msg.sender);
        campaign.donations.push(amount);

        (bool success, ) = payable(campaign.owner).call{value: amount}("");

        if(!success) {
            revert CrowdFunding__TransferFailed();
        }
        campaign.amountCollected =  campaign.amountCollected + amount;
    }

    function getDonations(uint256 _id) public view returns(address[] memory, uint256[] memory) {
        return (s_campaigns[_id].donors, s_campaigns[_id].donations);
    }


    function getCampaigns() public view returns(Campaign[] memory) {
        Campaign[] memory allcampaigns = new Campaign[](s_numberOfCampaigns);

        for(uint i =0; i < s_numberOfCampaigns; i++){
            Campaign storage item = s_campaigns[i];
            allcampaigns[i] = item;
        }
        return allcampaigns;
    }

}
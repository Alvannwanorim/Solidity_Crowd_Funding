import { getContract, useCrowdFundingContext } from "@/Context/CrowdFunding";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import PopUp from "@/components/PopUp";
import { CreateCampaign } from "@/interfaces/CreateCampaign";
import React, { useEffect, useState } from "react";

const Index = () => {
  const {
    titleData,
    getCampaigns,
    donate,
    createCampaign,
    getUserCampaigns,
    getDonations,
  } = useCrowdFundingContext();

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    async function getData() {
      const getCampaignData = await getCampaigns();
      const userCampaignData = await getUserCampaigns();
      setAllCampaign(getCampaignData);
      setUserCampaigns(userCampaignData);
      // await getContract();
    }
    getData();
  }, []);

  //DONATE CAMPAIGN POPUP MODEL

  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card
        title="All Listed Campaign"
        allCampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaigns"
        allCampaign={userCampaigns}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;

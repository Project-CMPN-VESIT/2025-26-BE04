import { useEffect, useState } from "react";
import DonationCard from "../DonationCard/DonationCard";
import "./FeaturedCampaigns.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const DUMMY_DONATIONS_FLAG = false;

const dummyDonationData = [
  {
    name: "Save the Oceans",
    description:
      "A global initiative to clean and protect our oceans from plastic waste.",
    logo: "/src/assets/gal-2.jpg",
    hasGoal: true,
    goal: 500000,
    amountRaised: 235000,
    donations: [
      "6720a2d9b8c1d2a4f8e3a912",
      "6720a2e7b8c1d2a4f8e3a913",
      "6720a2f3b8c1d2a4f8e3a914",
    ],
  },
  {
    name: "Feed the Hungry",
    description:
      "Helping underprivileged families get access to nutritious food.",
    logo: "/src/assets/gal-3.jpg",
    hasGoal: false,
    goal: 9007199254740991,
    amountRaised: 12000,
    donations: ["6720a310b8c1d2a4f8e3a915", "6720a320b8c1d2a4f8e3a916"],
  },
  {
    name: "Education for All",
    description:
      "Providing scholarships and resources to children in rural areas.",
    logo: "/src/assets/bhuk.jpg",
    hasGoal: true,
    goal: 1000000,
    amountRaised: 754320,
    donations: [
      "6720a332b8c1d2a4f8e3a917",
      "6720a345b8c1d2a4f8e3a918",
      "6720a358b8c1d2a4f8e3a919",
      "6720a36cb8c1d2a4f8e3a91a",
    ],
  },
];

const FeaturedCampaigns = () => {
  const {t} = useTranslation();
  const [fundraisers, setFundraisers] = useState(dummyDonationData);

  const getAllFundraisers = async () => {
    try {
      const fundraiserURL =
        "http://127.0.0.1:8000/api/donation/get-fundraisers";
      try {
        const response = await axios({
          method: "get",
          url: fundraiserURL,
          headers: { "Access-Control-Allow-Origin": "*" },
        });

        console.log(response);
        setFundraisers(response.data.fundraisers);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Error fetching fundraisers:", error);
    }
  };

  useEffect(() => {
    if (DUMMY_DONATIONS_FLAG == false) {
      getAllFundraisers();
    }
  }, []);

  return (
    <div className="featured-campaigns-wrapper">
      <div className="featured-campaigns-content">
        <div className="featured-campaigns-text">
          <div className="pre-title">{t("FeaturedPreTitle")}</div>
<div className="title">{t("FeaturedTitle")}</div>
<div className="sub-title">{t("FeaturedSubTitle")}</div>
        </div>
        {fundraisers && (
          <div className="featured-campaigns-cards">
            {fundraisers.map((donation, index) => (
              <DonationCard key={index} donation={donation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCampaigns;

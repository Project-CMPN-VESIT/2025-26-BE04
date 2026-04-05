import { useEffect, useState } from "react";
import "./Donation.css";
import PageBlueprint from "../../components/utilities/PageBlueprint/PageBlueprint";
import DonationCard from "../../components/DonationCard/DonationCard";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
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

function Donation() {
  const [fundraisers, setFundraisers] = useState(dummyDonationData);
  const upiId = "jeeva75069@barodampay";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

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

  const {t} = useTranslation();

  return (
    <PageBlueprint title={t("donateTitle")}>
      <div className="ongoing-campaigns">
        <h3>{t("ongoingCampaigns")}</h3>
        {fundraisers && (
          <div className="featured-campaigns-cards">
            {fundraisers.map((donation, index) => (
              <DonationCard key={index} donation={donation} />
            ))}
          </div>
        )}
      </div>
      <div className="bank-credentials">
        <h3>{t("BankTitle")}</h3>
        <div className="credentials-wrapper">
          <div className="details-wrapper">
            <div className="neft-details">
              {t("BankIntro")}
              <br />
              <div>
                {t("BankAccountNameLabel")} <span>Jeevan Samvardhan Foundation Bank</span>
                <br />
                {t("BankBankNameLabel")}<span>State Bank of India</span>
                <br />
                {t("BankAccountNumberLabel")}<span>123456789012</span>
                <br />
                {t("BankAccountTypeLabel")} <span>Current Account</span>
                <br />
                {t("BankIFSCLabel")}<span>SBIN0001234</span>
                <br />
                {t("BankBranchLabel")} <span>Shivaji Nagar Branch, Pune</span>
                <br />
                {t("BankMICRLabel")} <span>411002345</span>
              </div>
              💡 {t("BankNote")}
            </div>
            <div className="upi-details">
              <div className="upi-card">
                <div className="upi-qr-code">
                  <img
                    src="https://cdn.qrcode-ai.com/qrcode/preview/33e0a6f0cad9822a49ecf1c58385051a-1761940257840.png"
                    alt=""
                  />
                </div>
                <div className="upi-id">
                  {upiId}
                  <MdOutlineContentCopy
                    style={{ cursor: "pointer" }}
                    onClick={handleCopy}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBlueprint>
  );
}

export default Donation;

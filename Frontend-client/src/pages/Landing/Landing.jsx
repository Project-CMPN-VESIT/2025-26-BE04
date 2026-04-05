import { useTranslation } from "react-i18next";
import ContactUs from "../../components/ContactUs/ContactUs";
import DonationContainer from "../../components/DonationContainer/DonationContainer";
import FeaturedCampaigns from "../../components/FeaturedCampaigns/FeaturedCampaigns";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import InfoCard from "../../components/InfoCard/InfoCard";
import Transparency from "../../components/Transparency/Transparency";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import "./Landing.css";


const Landing = () => {
    const {t} = useTranslation();
    
//   const hero_cards = [
//   {
//     title: t("HeroCard1Title"),
//     content:t("HeroCard1Content"),
//     image_url: "/src/assets/lostandfound.jpg",
//   },
//   {
//     title: t("HeroCard2Title"),
//     content: t("HeroCard2Content"),
//     image_url: "/src/assets/q5.jpg",
//   },
// ];
  return (
    <div>
      {/* <Header /> */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-typography">
            {t("HeroSectionTypography")}{" "}
          </div>
          {/* <div className="hero-info-cards">
            <InfoCard info={hero_cards[0]} />
            <InfoCard info={hero_cards[1]} />
          </div> */}
        </div>
      </div>
      <WelcomeBanner />
      <FeaturedCampaigns />
<div id="contact-section">
  <ContactUs />
</div>
      <Transparency />
      {/* <Footer /> */}
    </div>
  );
};

export default Landing;

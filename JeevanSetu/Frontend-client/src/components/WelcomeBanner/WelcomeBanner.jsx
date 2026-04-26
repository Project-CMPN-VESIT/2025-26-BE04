import { useTranslation } from "react-i18next";
import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  const {t} = useTranslation();
  return (
    <div
      className="welcome-banner-wrapper
  "
    >
      <div className="welcome-banner-title">{t("WelcomeBannerTitle")}</div>
      <div className="welcome-banner-desc">
        {t("WelcomeBannerDesc")}
      </div>
      <div className="welcome-banner-buttons">
        <a
          className="welcome-banner-button buttonized-link get-involved-button"
          href="#"
        >
          {t("WelcomeBannerGetInvolved")}
        </a>
        <a
          className="welcome-banner-button buttonized-link donate-now-button"
          href="/donations"
        >
          {t("WelcomeBannerDonateNow")}
        </a>
      </div>
    </div>
  );
};

export default WelcomeBanner;

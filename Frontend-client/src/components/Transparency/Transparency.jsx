import { useTranslation } from "react-i18next";
import "./Transparency.css";

const Transparency = () => {
  const {t} = useTranslation();
  return (
    <div className="transparency-wrapper">
      <div className="transparency-title"> {t("TransparencyTitle")} </div>
      <div className="transparency-desc"> {t("TransparencyDesc")} </div>
    </div>
  );
};

export default Transparency;

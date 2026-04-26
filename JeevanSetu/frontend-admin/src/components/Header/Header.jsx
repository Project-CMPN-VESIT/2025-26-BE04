import { Link } from "react-router-dom";
import MainLogo from "../../assets/main_logo.png";
import "./Header.css";

function Header() {
  // const { i18n } = useTranslation();

  // const languages = [
  //   { code: "en", Lang: "English" },
  //   { code: "hi", Lang: "हिन्दी" },
  //   { code: "mr", Lang: "मराठी" },
  //   { code: "odia", Lang: "ଓଡ଼ିଆ" },
  //   { code: "bangla", Lang: "বাংলা" },
  // ];

  return (
    <div className="header">
      <div className="header-logo-container">
        <Link
          to={"/dashboard/donations"}
          style={{ textDecoration: "None", color: "black" }}
        >
          <img src={MainLogo} alt="mainlogo.svg" className="header-logo" />
        </Link>
        <div className="header-title">JeevanSetu</div>
      </div>

      <nav className="header-nav-container">
        <div className="header-nav-item">
          <Link
            to={"/dashboard/donations"}
            style={{ textDecoration: "None", color: "black" }}
          >
            Donations
          </Link>
        </div>
        <div className="header-nav-item">
          <Link
            to={"/dashboard/housing"}
            style={{ textDecoration: "None", color: "black" }}
          >
            Housing
          </Link>
        </div>
        <div className="header-nav-item">
          <Link
            to={"/dashboard/inventory"}
            style={{ textDecoration: "None", color: "black" }}
          >
            INVENTORY
          </Link>{" "}
        </div>
        <div className="header-nav-item">
          <Link
            to={"/dashboard/drives"}
            style={{ textDecoration: "None", color: "black" }}
          >
            DRIVES
          </Link>{" "}
        </div>
      </nav>

      <div className="header-right-section">
        {/* <Dropdown className="change-language">
          <Dropdown.Toggle id="dropdown-basic">Change Language</Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map((language) => (
              <Dropdown.Item
                key={language.code}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.Lang}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}
        <div className="header-profile-container">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            alt="Profile Icon"
            className="header-profile-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

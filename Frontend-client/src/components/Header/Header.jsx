import { useState, useEffect, useRef } from "react";
import "./Header.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume, FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import LanguageDropdown from "../../utils/LanguageDropdown";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="header-wrapper" ref={menuRef}>
      {/* ── Top Bar (desktop only) ── */}
      <div className="header-top">
        <div className="header-contacts">
          <div className="header-contact">
            <MdOutlineMailOutline />
            jeevansamvardhan@gmail.com
          </div>
          <div className="header-contact">
            <FaPhoneVolume />
            +91 75069 27704
          </div>
          <div className="headerTopLanguageDropDown">
            <LanguageDropdown />
          </div>
        </div>
      </div>

      {/* ── Bottom Nav Bar ── */}
      <div className="header-bottom">
        {/* Logo */}
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/src/assets/JSLogoNoBG.png" alt="JeevanSamvardhan" />
          <span className="company-name">{t("headerTitle")}</span>
        </Link>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <div className={`header-links ${isMenuOpen ? "active" : ""}`}>
          <a href="/" onClick={closeMenu}>
            {t("HeaderHomeLink")}
          </a>
          <a href="/about" onClick={closeMenu}>
            {t("HeaderAboutUsLink")}
          </a>
          <a href="/news" onClick={closeMenu}>
            {t("HeaderNewsLink")}
          </a>

          {/* ── Awards link (NEW) ── */}
          <a href="/awards" onClick={closeMenu} className="header-awards-link">
            {t("HeaderAwardsLink", "Awards")}
          </a>

          <a href="/joinus" onClick={closeMenu}>
            {t("HeaderJoinUsLink")}
          </a>
          <a href="/#contact-section" onClick={closeMenu}>
            {t("HeaderContactLink")}
          </a>

          <button
            className="header-donate-now"
            onClick={() => {
              navigate("/donations");
              closeMenu();
            }}
          >
            {t("HeaderDonateNowLink")}
          </button>

          {/* Mobile-only language dropdown */}
          <div className="mobile-language-wrapper">
            <LanguageDropdown isMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

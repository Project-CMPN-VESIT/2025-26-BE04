import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Awards.css";

const AwardCard = ({ award, index }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`award-card ${visible ? "award-card--visible" : ""} ${
        index % 2 === 0 ? "award-card--left" : "award-card--right"
      }`}
      style={{ "--card-accent": award.color }}
    >
      {/* Timeline node */}
      <div className="award-timeline-node">
        <span className="award-year">{t(award.yearKey)}</span>
        <div className="award-node-circle">
          <span>{award.icon}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="award-card-body">
        <div className="award-card-image-wrap">
          <img
            src={award.image}
            alt={t(award.titleKey)}
            className="award-card-image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("award-card-image-wrap--empty");
            }}
          />
          <div className="award-card-year-badge">{t(award.yearKey)}</div>
        </div>

        <div className="award-card-content">
          <span className="award-category-tag">{t(award.categoryKey)}</span>
          <h2 className="award-card-title">{t(award.titleKey)}</h2>
          <p className="award-card-description">{t(award.descriptionKey)}</p>

          <div className="award-presenter-block">
            <div className="award-presenter-icon">🎖</div>
            <div>
              <p className="award-presenter-name">{t(award.presentedByKey)}</p>
              <p className="award-presenter-title">{t(award.presenterTitleKey)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const awards = [
  {
    id: 1,
    yearKey: "Awards1Year",
    titleKey: "Awards1Title",
    categoryKey: "Awards1Category",
    presentedByKey: "Awards1PresentedBy",
    presenterTitleKey: "Awards1PresenterTitle",
    descriptionKey: "Awards1Description",
    image: "/src/assets/awards/sevadeep2021.png",
    color: "#fca00c",
    icon: "🏆",
  },
  {
    id: 2,
    yearKey: "Awards2Year",
    titleKey: "Awards2Title",
    categoryKey: "Awards2Category",
    presentedByKey: "Awards2PresentedBy",
    presenterTitleKey: "Awards2PresenterTitle",
    descriptionKey: "Awards2Description",
    image: "/src/assets/awards/golden-jubilee2022.png",
    color: "#0e926b",
    icon: "✨",
  },
  {
    id: 3,
    yearKey: "Awards3Year",
    titleKey: "Awards3Title",
    categoryKey: "Awards3Category",
    presentedByKey: "Awards3PresentedBy",
    presenterTitleKey: "Awards3PresenterTitle",
    descriptionKey: "Awards3Description",
    image: "/src/assets/awards/adivasi2023.png",
    color: "#c0392b",
    icon: "🌿",
  },
];

const Awards = () => {
  const { t } = useTranslation();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="awards-page">
      {/* ── Hero ── */}
      <section className={`awards-hero ${heroVisible ? "awards-hero--visible" : ""}`}>
        <div className="awards-hero-bg">
          <div className="awards-hero-orb awards-hero-orb--1" />
          <div className="awards-hero-orb awards-hero-orb--2" />
          <div className="awards-hero-orb awards-hero-orb--3" />
        </div>
        <div className="awards-hero-content">
          <span className="awards-hero-eyebrow">{t("AwardsHeroEyebrow")}</span>
          <h1 className="awards-hero-title">
            {t("AwardsHeroTitle")}
            <br />
            <em>{t("AwardsHeroTitleEm")}</em>
          </h1>
          <p className="awards-hero-subtitle">{t("AwardsHeroSubtitle")}</p>
          <div className="awards-hero-stats">
            <div className="awards-hero-stat">
              <span className="stat-number">{t("AwardsHeroStat1Number")}</span>
              <span className="stat-label">{t("AwardsHeroStat1Label")}</span>
            </div>
            <div className="awards-hero-stat">
              <span className="stat-number">{t("AwardsHeroStat2Number")}</span>
              <span className="stat-label">{t("AwardsHeroStat2Label")}</span>
            </div>
            <div className="awards-hero-stat">
              <span className="stat-number">{t("AwardsHeroStat3Number")}</span>
              <span className="stat-label">{t("AwardsHeroStat3Label")}</span>
            </div>
          </div>
        </div>
        <div className="awards-hero-scroll-hint">
          <span>{t("AwardsHeroScrollHint")}</span>
          <div className="awards-hero-scroll-arrow" />
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="awards-timeline-section">
        <div className="awards-timeline-line" />
        <div className="awards-timeline-container">
          {awards.map((award, i) => (
            <AwardCard key={award.id} award={award} index={i} />
          ))}
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="awards-cta">
        <div className="awards-cta-inner">
          <h2>{t("AwardsCtaTitle")}</h2>
          <p>{t("AwardsCtaDesc")}</p>
          <div className="awards-cta-buttons">
            <a href="/donations" className="awards-cta-btn awards-cta-btn--primary">
              {t("AwardsCtaDonate")}
            </a>
            <a href="/joinus" className="awards-cta-btn awards-cta-btn--secondary">
              {t("AwardsCtaVolunteer")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
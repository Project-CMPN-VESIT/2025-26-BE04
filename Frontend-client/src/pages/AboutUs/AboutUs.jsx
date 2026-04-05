import "./AboutUs.css";
import PageBlueprint from "../../components/utilities/PageBlueprint/PageBlueprint";
import { useTranslation } from "react-i18next";

const basicNeedsIcons = [
  /* Education */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  /* Civilization / Community */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  /* Health */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>,
  /* Vocational */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>,
  /* Skill / Livelihood */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>,
];

function AboutUs() {
  const { t } = useTranslation();
  const basicNeedsPoints = t("basicNeedsPoints", { returnObjects: true });

  return (
    <PageBlueprint title={t("aboutTitle")}>
      <div className="about-page-wrapper">

        {/* ===== MISSION & VISION ===== */}
        <section className="mission-vision-section">
          <div className="mission-block">
            <h2>{t("missionTitle")}</h2>
            <ul>
              {t("missionPoints", { returnObjects: true }).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="vision-block">
            <h2>{t("visionTitle")}</h2>
            <p>{t("visionText")}</p>
          </div>
        </section>

        {/* ===== WHO WE ARE ===== */}
        <section className="who-we-are-section">
          <span className="au-section-label">Our Story</span>
          <h3>{t("whoWeAre")}</h3>
          <div className="who-we-are-heading-bar" />

          <div className="about-summary">
            <div className="summary-text">
              <h4>{t("summaryTitle")}</h4>
              <p>{t("summaryText")}</p>
              <span className="founder-name">{t("founderName")}</span>
            </div>
            <div className="summary-image">
              <img src="/src/assets/sadashivchahan.jpg" alt="Founder" />
            </div>
          </div>
        </section>

        {/* ===== BASIC NEEDS ===== */}
        <section className="basic-needs-section">
          <p className="basic-needs-label">Our Focus Areas</p>
          <h4>{t("basicNeedsTitle")}</h4>
          <ul>
            {basicNeedsPoints.map((point, i) => (
              <li key={i}>
                <div className="bn-icon-chip">
                  {basicNeedsIcons[i] ?? basicNeedsIcons[0]}
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ===== DOCUMENTS ===== */}
        <section className="documents-section">
          <span className="au-section-label">Official Records</span>
          <p className="documents-section-title">Documents</p>
          <div className="documents-heading-bar" />

          <div className="documents-gallery">
            <a
              href="/src/assets/img1.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/img1.jpg" alt="Document 1" />
            </a>
            <a
              href="/src/assets/img3.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/img3.jpg" alt="Document 2" />
            </a>
          </div>
        </section>

      </div>
    </PageBlueprint>
  );
}

export default AboutUs;

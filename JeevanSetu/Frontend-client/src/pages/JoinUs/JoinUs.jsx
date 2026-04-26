import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./JoinUs.css";

export default function JoinUs() {
  const { t } = useTranslation();
  const formRef = useRef();

  const CARDS = [
    { icon: "📚", titleKey: "JoinUsCard1Title", descKey: "JoinUsCard1Desc" },
    { icon: "🌱", titleKey: "JoinUsCard2Title", descKey: "JoinUsCard2Desc" },
    { icon: "🏛️", titleKey: "JoinUsCard3Title", descKey: "JoinUsCard3Desc" },
    { icon: "✨", titleKey: "JoinUsCard4Title", descKey: "JoinUsCard4Desc" },
  ];

  const ACTIVITIES = [
    { icon: "📖", key: "JoinUsActivity1" },
    { icon: "🎨", key: "JoinUsActivity2" },
    { icon: "💼", key: "JoinUsActivity3" },
    { icon: "📣", key: "JoinUsActivity4" },
    { icon: "🏕️", key: "JoinUsActivity5" },
  ];

  const FORM_FIELDS = [
    { labelKey: "JoinUsNameLabel",     name: "user_name",     type: "text",  placeholderKey: "JoinUsNamePlaceholder" },
    { labelKey: "JoinUsMobileLabel",   name: "user_mobile",   type: "tel",   placeholderKey: "JoinUsMobilePlaceholder" },
    { labelKey: "JoinUsEmailLabel",    name: "user_email",    type: "email", placeholderKey: "JoinUsEmailPlaceholder" },
    { labelKey: "JoinUsLocationLabel", name: "user_location", type: "text",  placeholderKey: "JoinUsLocationPlaceholder" },
  ];

  const EMPTY_FORM = {
    user_name: "", user_mobile: "", user_email: "",
    user_location: "", user_role: "", user_comments: "",
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        alert("Thank you for joining us! Your message has been sent successfully.");
        setForm(EMPTY_FORM);
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Oops! Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ju-root">
      {/* ── HERO ── */}
      <section className="ju-hero">
        <div className="ju-container ju-hero__inner">
          <div className="ju-hero__text-content">
            <span className="ju-tag">{t("JoinUsTag")}</span>
            <h1>
              {t("JoinUsHeroTitle")} <br />
              <span className="ju-highlight">{t("JoinUsHeroHighlight")}</span>
            </h1>
            <p>{t("JoinUsHeroDesc")}</p>
            <div className="ju-hero__actions">
              <a href="#join-form" className="ju-btn">{t("JoinUsGetInvolved")}</a>
              <a href="#how-to-help" className="ju-btn ju-btn--outline">{t("JoinUsLearnMore")}</a>
            </div>
          </div>
          <div className="ju-hero__visual">
            <div className="ju-hero__image-card">
              <span className="ju-hero__icon">🤝</span>
              <div className="ju-hero__card-text">
                <strong>{t("JoinUsTogetherWeRise")}</strong>
                <span>{t("JoinUsJoin500")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW YOU CAN HELP ── */}
      <section className="ju-section" id="how-to-help">
        <div className="ju-container">
          <h2 className="ju-section__title">{t("JoinUsHowTitle")}</h2>
          <div className="ju-divider" />
          <p className="ju-section__sub">{t("JoinUsHowSub")}</p>
          <div className="ju-cards">
            {CARDS.map((c) => (
              <div className="ju-card" key={c.titleKey}>
                <span className="ju-card__icon">{c.icon}</span>
                <h3>{t(c.titleKey)}</h3>
                <p>{t(c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section className="ju-section ju-section--alt">
        <div className="ju-container">
          <h2 className="ju-section__title">{t("JoinUsDonateTitle")}</h2>
          <div className="ju-divider" />
          <div className="ju-donate">
            <div className="ju-donate__text">
              <h3>{t("JoinUsDonateSubTitle")}</h3>
              <p>{t("JoinUsDonateDesc1")}</p>
              <p>{t("JoinUsDonateDesc2")}</p>
            </div>
            <div className="ju-donate__blob">
              <span>🤝</span>
              <p>{t("JoinUsDonateBlob")}</p>
              <small>{t("JoinUsDonateGift")}</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER + FORM ── */}
      <section className="ju-section ju-section--navy" id="join-form">
        <div className="ju-container">
          <h2 className="ju-section__title ju-section__title--white">
            {t("JoinUsVolunteerTitle")}
          </h2>
          <div className="ju-divider ju-divider--orange" />
          <div className="ju-volunteer">
            {/* Left info */}
            <div className="ju-volunteer__info">
              <h3>{t("JoinUsVolunteerSub")}</h3>
              <p>{t("JoinUsVolunteerDesc")}</p>
              <ul>
                {ACTIVITIES.map((a) => (
                  <li key={a.key}>{a.icon} {t(a.key)}</li>
                ))}
              </ul>
            </div>

            {/* Right form */}
            <div className="ju-form-card">
              <h2>{t("JoinUsFormTitle")}</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                {FORM_FIELDS.map(({ labelKey, name, type, placeholderKey }) => (
                  <div className="ju-field" key={name}>
                    <label htmlFor={name}>{t(labelKey)}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={t(placeholderKey)}
                      value={form[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="ju-field">
                  <label htmlFor="user_role">{t("JoinUsRoleLabel")}</label>
                  <select
                    id="user_role"
                    name="user_role"
                    value={form.user_role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("JoinUsRoleDefault")}</option>
                    <option value="volunteer">{t("JoinUsRoleVolunteer")}</option>
                    <option value="donor">{t("JoinUsRoleDonor")}</option>
                    <option value="mentor">{t("JoinUsRoleMentor")}</option>
                    <option value="partner">{t("JoinUsRolePartner")}</option>
                  </select>
                </div>

                <div className="ju-field">
                  <label htmlFor="user_comments">{t("JoinUsCommentsLabel")}</label>
                  <textarea
                    id="user_comments"
                    name="user_comments"
                    placeholder={t("JoinUsCommentsPlaceholder")}
                    value={form.user_comments}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="ju-btn ju-btn--submit"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? t("JoinUsSubmitting") : t("JoinUsSubmit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
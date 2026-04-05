import { toast } from "react-toastify";
import "./ContactUs.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const galleryImages = [
  "/src/assets/q1.jpg",
  "/src/assets/q2.jpg",
  "/src/assets/q3.jpg",
  "/src/assets/q4.jpg",
  "/src/assets/q5.jpg",
  "/src/assets/q6.jpg",
];

const EMPTY_FORM = {
  name: "",
  mobile: "",
  email: "",
  question: "",
};

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Your question has been submitted!");
        setFormData(EMPTY_FORM);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Could not connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-wrapper">
      <div className="contact-us-gallery">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            className="contact-us-gallery-image"
            src={image}
            alt={`Gallery ${index + 1}`}
          />
        ))}
      </div>

      <div className="contact-us-form">
        <div className="title">{t("ContactTitle")}</div>
        <div className="sub-title">{t("ContactSubTitle")}</div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>{t("ContactNameLabel")}</label>
          <input
            type="text"
            name="name"
            placeholder={t("ContactNamePlaceholder")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>{t("ContactMobileLabel")}</label>
          <input
            type="tel"
            name="mobile"
            placeholder={t("ContactMobilePlaceholder")}
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label>{t("ContactEmailLabel")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("ContactEmailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>{t("ContactQuestionLabel")}</label>
          <textarea
            name="question"
            placeholder={t("ContactQuestionPlaceholder")}
            rows="4"
            value={formData.question}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Sending..." : t("ContactSubmitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
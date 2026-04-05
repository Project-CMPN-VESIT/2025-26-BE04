import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChildDetailsPage.css";

const API_URL = "http://localhost:8000/api/getchild";

export default function ChildDetailsPage({ childId }) {
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!childId) return;

    const fetchChild = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${childId}`);
        setChild(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load child details");
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [childId]);

  if (loading) return <h2>Loading child details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!child) return <h2>No child found</h2>;

  return (
    <div className="child-details-wrapper">
      <div className="child-details-card">
        <div className="child-details-header">
          <h2>Child Details</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Info label="Name" value={child.name} />
          <Info label="Gender" value={child.gender} />
          <Info label="Age" value={child.age} />
          <Info label="Date of Birth" value={formatDate(child.dob)} />
          <Info label="Centre" value={child.centre?.centreName || "N/A"} />
        </Section>

        {/* IMAGES */}
        <Section title="Photos & Documents">
          <ImageBox label="Child Photo" imageUrl={child.childrenImage} />
          <ImageBox label="Aadhaar Card" imageUrl={child.aadharCardImage} />
        </Section>

        {/* PHYSICAL DETAILS */}
        <Section title="Physical Details">
          <Info label="Height" value={`${child.height} cm`} />
          <Info label="Weight" value={`${child.weight} kg`} />
        </Section>

        {/* PARENT DETAILS */}
        <Section title="Parent / Guardian Details">
          <Info label="Parent Name" value={child.parentName} />
          <Info label="Parent Contact" value={child.parentContact} />
        </Section>

        {/* MEDICAL & ACHIEVEMENTS */}
        <Section title="Medical & Achievements">
          <InfoFull label="Medical History" value={child.medicalHistory} />
          <InfoFull label="Details of Child" value={child.detailsOfChild} />
          <InfoFull label="Achievements" value={child.achievementsOfChild} />
        </Section>

        {/* EDUCATION */}
        <Section title="Education Details">
          <Info
            label="Standard of Education"
            value={child.standardofEducation}
          />
          <Info label="SSC Marks" value={child.sscMarks ?? "N/A"} />
          <Info label="HSC Marks" value={child.hscMarks ?? "N/A"} />
        </Section>

        {/* JOINING DETAILS */}
        <Section title="Joining Details">
          <Info
            label="Date of Joining"
            value={formatDate(child.dateofjoining)}
          />
          <Info label="Age at Joining" value={child.ageOfJoining} />
        </Section>
      </div>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <>
    <h3 className="section-title">{title}</h3>
    <div className="child-details-grid">{children}</div>
  </>
);

const Info = ({ label, value }) => (
  <div className="child-info">
    <label>{label}</label>
    <span>{value || "—"}</span>
  </div>
);

const InfoFull = ({ label, value }) => (
  <div className="child-info full">
    <label>{label}</label>
    <span>{value || "—"}</span>
  </div>
);

const ImageBox = ({ label, imageUrl }) => {
  if (!imageUrl || imageUrl.includes("No Image")) {
    return (
      <div className="child-info">
        <label>{label}</label>
        <span>No image available</span>
      </div>
    );
  }

  return (
    <div className="child-info image-box">
      <label>{label}</label>
      <img
        src={imageUrl}
        alt={label}
        className="child-img"
        onClick={() => window.open(imageUrl, "_blank")}
      />
      <small className="img-hint">Click image to open</small>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

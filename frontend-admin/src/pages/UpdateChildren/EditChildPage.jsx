import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./EditChildPage.css";

const CHILD_API = "http://localhost:8000/api";
const CENTRE_API = "http://localhost:8000/api/centre";

/* ---------- CLOUDINARY UPLOAD ---------- */
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Jeevansetu");
  data.append("cloud_name", "dph8v2aug");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dph8v2aug/image/upload",
    {
      method: "POST",
      body: data,
    },
  );

  const result = await res.json();
  return result.secure_url;
};

const EditChildPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [centres, setCentres] = useState([]);

  /* ---------- IMAGE STATES ---------- */
  const [childImage, setChildImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);

  const [existingImages, setExistingImages] = useState({
    childrenImage: "",
    aadharCardImage: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    centre: "",
    standardofEducation: "",
    sscMarks: "",
    hscMarks: "",
    parentName: "",
    parentContact: "",
    medicalHistory: "",
    detailsOfChild: "",
    achievementsOfChild: "",
  });

  /* ---------- FETCH CENTRES ---------- */
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const res = await axios.get(`${CENTRE_API}/allcentre`);
        setCentres(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch centres", error);
      }
    };

    fetchCentres();
  }, []);

  /* ---------- FETCH CHILD DETAILS ---------- */
  useEffect(() => {
    if (!childId) return;

    const fetchChild = async () => {
      try {
        const res = await axios.get(`${CHILD_API}/getchild/${childId}`);
        const child = res.data.data;

        setFormData({
          name: child.name || "",
          gender: child.gender || "",
          dob: child.dob ? child.dob.slice(0, 10) : "",
          height: child.height || "",
          weight: child.weight || "",
          centre: child.centre?._id || "",
          standardofEducation: child.standardofEducation || "",
          sscMarks: child.sscMarks ?? "",
          hscMarks: child.hscMarks ?? "",
          parentName: child.parentName || "",
          parentContact: child.parentContact || "",
          medicalHistory: child.medicalHistory || "",
          detailsOfChild: child.detailsOfChild || "",
          achievementsOfChild: child.achievementsOfChild || "",
        });

        setExistingImages({
          childrenImage:
            child.childrenImage === "No Image" ? "" : child.childrenImage,
          aadharCardImage:
            child.aadharCardImage === "No Aadhar Image"
              ? ""
              : child.aadharCardImage,
        });
      } catch (error) {
        console.error("Failed to fetch child details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [childId]);

  /* ---------- HANDLE INPUT CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "standardofEducation" &&
        value.toLowerCase() !== "ssc" && { sscMarks: "" }),
      ...(name === "standardofEducation" &&
        value.toLowerCase() !== "hsc" && { hscMarks: "" }),
    }));
  };

  /* ---------- SUBMIT UPDATE ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let childImageUrl = existingImages.childrenImage;
      let aadharImageUrl = existingImages.aadharCardImage;

      if (childImage) {
        childImageUrl = await uploadToCloudinary(childImage);
      }

      if (aadharImage) {
        aadharImageUrl = await uploadToCloudinary(aadharImage);
      }

      const payload = {
        ...formData,
        childrenImage: childImageUrl,
        aadharCardImage: aadharImageUrl,
      };

      await axios.put(`${CHILD_API}/updatechild/${childId}`, payload);

      navigate(`/dashboard/childrenfilter`);
    } catch (error) {
      console.error("Failed to update child", error);
      alert("Update failed. Please try again.");
    }
  };

  if (loading) {
    return <Spinner text="Loading data..." />;
  }

  return (
    <div className="edit-child-wrapper">
      <div className="edit-child-card">
        <div className="edit-child-header">
          <h2>Edit Child Details</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-form-grid">
            <Field label="Name">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Gender">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>

            <Field label="Date of Birth">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Height (cm)">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </Field>

            <Field label="Weight (kg)">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </Field>

            <Field label="Centre">
              <select
                name="centre"
                value={formData.centre}
                onChange={handleChange}
                required
              >
                <option value="">Select Centre</option>
                {centres.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.centreName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Standard of Education">
              <input
                name="standardofEducation"
                value={formData.standardofEducation}
                onChange={handleChange}
                placeholder="e.g. SSC, HSC"
              />
            </Field>

            {formData.standardofEducation?.toLowerCase() === "ssc" && (
              <Field label="SSC Marks (%)">
                <input
                  type="number"
                  name="sscMarks"
                  min="0"
                  max="100"
                  value={formData.sscMarks}
                  onChange={handleChange}
                />
              </Field>
            )}

            {formData.standardofEducation?.toLowerCase() === "hsc" && (
              <Field label="HSC Marks (%)">
                <input
                  type="number"
                  name="hscMarks"
                  min="0"
                  max="100"
                  value={formData.hscMarks}
                  onChange={handleChange}
                />
              </Field>
            )}

            <Field label="Parent Name">
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Parent Contact">
              <input
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
              />
            </Field>

            {/* 📸 IMAGE UPLOADS */}
            <Field label="Child Photo">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setChildImage(e.target.files[0])}
              />
              {existingImages.childrenImage && (
                <small>Current image will be kept</small>
              )}
            </Field>

            <Field label="Aadhaar Card Image">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAadharImage(e.target.files[0])}
              />
              {existingImages.aadharCardImage && (
                <small>Current image will be kept</small>
              )}
            </Field>

            <Field full label="Medical History">
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </Field>

            <Field full label="Details of Child">
              <textarea
                name="detailsOfChild"
                value={formData.detailsOfChild}
                onChange={handleChange}
              />
            </Field>

            <Field full label="Achievements">
              <textarea
                name="achievementsOfChild"
                value={formData.achievementsOfChild}
                onChange={handleChange}
              />
            </Field>
          </div>

          <div className="edit-form-actions">
            <button type="submit">Update</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChildPage;

/* ---------- FIELD HELPER ---------- */
const Field = ({ label, children, full }) => (
  <div style={full ? { gridColumn: "span 3" } : undefined}>
    <label>{label}</label>
    {children}
  </div>
);

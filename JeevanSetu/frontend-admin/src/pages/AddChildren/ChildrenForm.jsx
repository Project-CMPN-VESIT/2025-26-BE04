import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Children.css";

const CHILD_API = "http://localhost:8000/api";
const CENTRE_API = "http://localhost:8000/api/centre";

// Helper for Cloudinary Upload
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

function ChildrenForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [centres, setCentres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // File States
  const [childImage, setChildImage] = useState(null);
  const [aadharImage, setAadharImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    centre: "",
    parentName: "",
    parentContact: "",
    medicalHistory: "",
    dateofjoining: "",
    standardofEducation: "",
    detailsOfChild: "",
    achievementsOfChild: "",
    sscMarks: "",
    hscMarks: "",
    childrenImage: "",
    aadharCardImage: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      dob: "",
      gender: "",
      height: "",
      weight: "",
      centre: "",
      parentName: "",
      parentContact: "",
      medicalHistory: "",
      dateofjoining: "",
      standardofEducation: "",
      detailsOfChild: "",
      achievementsOfChild: "",
      sscMarks: "",
      hscMarks: "",
      childrenImage: "",
      aadharCardImage: "",
    });
    setChildImage(null);
    setAadharImage(null);
    setSelectedId(null);
  };

  // Fetch Centres
  const fetchCentres = async () => {
    try {
      const res = await axios.get(`${CENTRE_API}/allcentre`);
      setCentres(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch centres", err);
    }
  };

  // Main Submit Handler (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      // Use existing images if no new file selected
      let childImageUrl = formData.childrenImage || "";
      let aadharImageUrl = formData.aadharCardImage || "";

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

      if (selectedId) {
        // Update Logic
        await axios.put(`${CHILD_API}/updatechild/${selectedId}`, payload);
      } else {
        // Add Logic
        await axios.post(`${CHILD_API}/addchild`, payload);
      }

      resetForm();
      navigate("/dashboard/childrenfilter");
    } catch (err) {
      console.error("Operation failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchCentres();

    // Load data if editing
    if (location.state?.child) {
      const child = location.state.child;

      setFormData({
        ...child,
        centre: child.centre?._id || "",
        dob: child.dob ? child.dob.split("T")[0] : "",
        dateofjoining: child.dateofjoining
          ? child.dateofjoining.split("T")[0]
          : "",
        childrenImage:
          child.childrenImage === "No Image" ? "" : child.childrenImage,
        aadharCardImage:
          child.aadharCardImage === "No Aadhar Image"
            ? ""
            : child.aadharCardImage,
      });

      setSelectedId(child._id);
    }
  }, [location.state]);

  return (
    <div className="children-wrapper">
      <div className="children-card">
        <div className="form-header-row">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/dashboard/childrenfilter")}
          >
            ← Back
          </button>
          <h2>{selectedId ? "Update Child Details" : "Register New Child"}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Child Information */}
          <h3>Child Information</h3>
          <div className="form-grid">
            <div>
              <label>Child Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Gender *</label>
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
            </div>
          </div>

          {/* Physical Details */}
          <h3>Physical Details</h3>
          <div className="form-grid">
            <div>
              <label>Height (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Centre & Education */}
          <h3>Centre & Education</h3>
          <div className="form-grid">
            <div>
              <label>Centre *</label>
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
            </div>
            <div>
              <label>Date of Joining *</label>
              <input
                type="date"
                name="dateofjoining"
                value={formData.dateofjoining}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Standard of Education</label>
              <input
                name="standardofEducation"
                value={formData.standardofEducation}
                onChange={handleChange}
                placeholder="e.g. SSC, HSC"
              />
            </div>

            {formData.standardofEducation?.toLowerCase() === "ssc" && (
              <div>
                <label>SSC Marks (%)</label>
                <input
                  type="number"
                  name="sscMarks"
                  value={formData.sscMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            )}

            {formData.standardofEducation?.toLowerCase() === "hsc" && (
              <div>
                <label>HSC Marks (%)</label>
                <input
                  type="number"
                  name="hscMarks"
                  value={formData.hscMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            )}
          </div>

          {/* Parent Details */}
          <h3>Parent / Guardian Details</h3>
          <div className="form-grid">
            <div>
              <label>Parent Name</label>
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Parent Contact</label>
              <input
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Uploads Section */}
          <h3>Documents & Photos</h3>
          <div className="form-grid">
            <div>
              <label>
                Child Photo {selectedId && "(Leave empty to keep current)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setChildImage(e.target.files[0])}
              />
            </div>
            <div>
              <label>
                Aadhaar Card Image{" "}
                {selectedId && "(Leave empty to keep current)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAadharImage(e.target.files[0])}
              />
            </div>
          </div>

          {/* Additional Info */}
          <h3>Additional Information</h3>
          <div className="form-grid">
            <div>
              <label>Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Child Details</label>
              <textarea
                name="detailsOfChild"
                value={formData.detailsOfChild}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Achievements</label>
              <textarea
                name="achievementsOfChild"
                value={formData.achievementsOfChild}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="submit" disabled={uploading}>
              {uploading
                ? "Processing..."
                : selectedId
                  ? "Update Child"
                  : "Register Child"}
            </button>
            {selectedId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChildrenForm;

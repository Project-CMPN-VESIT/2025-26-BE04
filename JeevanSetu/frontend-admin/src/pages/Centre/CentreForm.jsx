import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Centre.css";

const API_BASE = "http://localhost:8000/api/centre";

function CentreForm() {
  const [centres, setCentres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centreName: "",
    managerName: "",
    centreAddress: "",
    centreCity: "",
    centreDistrict: "",
    centreState: "",
    centrePincode: "",
    contactNumber: "",
    email: "",
    maxCapacity: 100,
  });

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      centreName: "",
      managerName: "",
      centreAddress: "",
      centreCity: "",
      centreDistrict: "",
      centreState: "",
      centrePincode: "",
      contactNumber: "",
      email: "",
      maxCapacity: 100,
    });
    setSelectedId(null);
  };

  /* ---------------- API CALLS ---------------- */

  const fetchAllCentres = async () => {
    try {
      const res = await axios.get(`${API_BASE}/allcentre`);
      setCentres(res.data.data || []);
    } catch (err) {
      console.error("Fetch centres error:", err);
    }
  };

  const addCentre = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/centrename`, formData);
      alert("Centre registered successfully!");
      fetchAllCentres();
      resetForm();
    } catch (err) {
      console.error("Add centre error:", err);
      alert(err.response?.data?.message || "Error adding centre");
    }
  };

  const updateCentre = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/updatecentre/${selectedId}`, formData);
      alert("Centre updated successfully!");
      fetchAllCentres();
      resetForm();
    } catch (err) {
      console.error("Update centre error:", err);
      alert(err.response?.data?.message || "Error updating centre");
    }
  };

  const deleteCentre = async (id) => {
    if (!window.confirm("Delete this centre?")) return;
    try {
      await axios.delete(`${API_BASE}/deletecentre/${id}`);
      fetchAllCentres();
    } catch (err) {
      console.error("Delete centre error:", err);
    }
  };

  const handleEdit = (centre) => {
    setSelectedId(centre._id);
    setFormData({
      centreName: centre.centreName,
      managerName: centre.managerName,
      centreAddress: centre.centreAddress,
      centreCity: centre.centreCity,
      centreDistrict: centre.centreDistrict,
      centreState: centre.centreState,
      centrePincode: centre.centrePincode,
      contactNumber: centre.contactNumber,
      email: centre.email,
      maxCapacity: centre.maxCapacity,
    });
  };

  /* ---------------- EFFECT ---------------- */

  useEffect(() => {
    fetchAllCentres();
  }, []);

  return (
    <div className="centre-form-wrapper">
      {/* ===== BACK BUTTON ===== */}
      <div className="centre-form-back-nav">
        <button
          className="centre-form-back-btn"
          onClick={() => navigate("/dashboard/centrepage")}
        >
          ← Back
        </button>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="centre-form-card">
        <h2>{selectedId ? "Update Centre" : "Register Centre"}</h2>

        <form onSubmit={selectedId ? updateCentre : addCentre}>
          <div className="form-grid">
            <input
              type="text"
              name="centreName"
              placeholder="Centre Name"
              value={formData.centreName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="managerName"
              placeholder="Manager Name"
              value={formData.managerName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="centreAddress"
              placeholder="Address"
              value={formData.centreAddress}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="centreCity"
              placeholder="City"
              value={formData.centreCity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="centreDistrict"
              placeholder="District"
              value={formData.centreDistrict}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="centreState"
              placeholder="State"
              value={formData.centreState}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="centrePincode"
              placeholder="Pincode"
              value={formData.centrePincode}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="maxCapacity"
              placeholder="Capacity"
              value={formData.maxCapacity}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="centre-form-submit-btn">
              {selectedId ? "Update Centre" : "Register Centre"}
            </button>

            {selectedId && (
              <button
                type="button"
                className="centre-form-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ===== CENTRE LIST ===== */}
      <div className="centre-form-list">
        <h3>Registered Centres</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Manager</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {centres.map((centre) => (
              <tr key={centre._id}>
                <td>{centre.centreName}</td>
                <td>{centre.centreCity}</td>
                <td>{centre.managerName}</td>
                <td>{centre.contactNumber}</td>
                <td className="centre-form-action-btns">
                  <button onClick={() => handleEdit(centre)}>Edit</button>
                  <button
                    className="centre-form-delete-btn"
                    onClick={() => deleteCentre(centre._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CentreForm;

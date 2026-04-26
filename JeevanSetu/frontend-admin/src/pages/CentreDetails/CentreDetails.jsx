import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InventoryDashboard from "../Inventory/InventoryDashboard";
import "./CentreDetails.css";

const API = "http://localhost:8000/api/centre/allcentre";

const CentreDetails = ({ centreId }) => {
  const [centre, setCentre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInventory, setShowInventory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCentre = async () => {
      try {
        const res = await axios.get(API);
        const found = res.data.data.find(c => c._id === centreId);
        setCentre(found);
      } catch (err) {
        console.error("Failed to load centre", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCentre();
  }, [centreId]);

  if (loading) return <div>Loading centre details...</div>;
  if (!centre) return <div>Centre not found</div>;

  return (
    <div className="centre-details-page">

      {/* 🔙 BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard/centrepage")}
      >
        ← Back to Centres
      </button>

      <h1>{centre.centreName}</h1>

      <div className="centre-details-card">
        <p><strong>Manager:</strong> {centre.managerName}</p>
        <p><strong>Address:</strong> {centre.centreAddress}</p>
        <p><strong>City:</strong> {centre.centreCity}</p>
        <p><strong>District:</strong> {centre.centreDistrict}</p>
        <p><strong>State:</strong> {centre.centreState}</p>
        <p><strong>Pincode:</strong> {centre.centrePincode}</p>
        <p><strong>Contact:</strong> {centre.contactNumber}</p>
        <p><strong>Email:</strong> {centre.email}</p>

        <div className="capacity-box">
          <span>Max Capacity: {centre.maxCapacity}</span>
          <span>Current Occupancy: {centre.currentOccupancy}</span>
        </div>
        <button 
  className="check-inventory-btn" 
  onClick={() => navigate(`/dashboard/inventory/${centreId}`)}
>
  Check Inventory
</button>
      </div>
    </div>
  );
};

export default CentreDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CentresPage.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const CENTRE_API = "http://localhost:8000/api/centre/allcentre";

export default function CentresPage() {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const res = await axios.get(CENTRE_API);
        setCentres(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch centres", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCentres();
  }, []);

  if (loading) {
    return <Spinner text="Loading centres" />;
  }

  return (
    <div className="centres-page">
      <div className="centres-header">
        <h1 className="centres-title">Our Centres</h1>

        <button
          className="add-centre-btn"
          onClick={() => navigate("/dashboard/centre")}
        >
          + Add New Centre
        </button>
      </div>

      <div className="centres-grid">
        {centres.map((centre) => {
          const capacity = centre.maxCapacity ?? 0;
          const occupied = centre.currentOccupancy ?? 0;

          return (
            <div key={centre._id} className="centres-card">
              <div className="centres-image-wrapper">
                <img
                  src={
                    centre.image ||
                    "https://images.unsplash.com/photo-1588072432836-e10032774350"
                  }
                  alt={centre.centreName}
                />
                <div className="image-overlay" />
                <span className="status-badge">Active</span>
              </div>

              <div className="centres-content">
                <h2>{centre.centreName}</h2>

                <p className="centres-location">
                  {centre.centreCity}, {centre.centreDistrict}
                </p>

                <div className="centres-meta">
                  <span>Capacity: {capacity}</span>
                  <span>Occupied: {occupied}</span>
                </div>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/dashboard/centrepage?mode=view&id=${centre._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

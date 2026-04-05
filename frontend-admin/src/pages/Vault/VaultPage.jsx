import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import Slider from "@mui/material/Slider";
import "./VaultPage.css";

const API_URL = "http://localhost:8000/api/filterchildren/filter";
const CENTRE_API = "http://localhost:8000/api/centre/allcentre";
const BASE_URL = "http://localhost:8000";

/* ---------- helper to calculate age ---------- */
const calculateAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

export default function VaultPage() {
  const [children, setChildren] = useState([]);
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    gender: "",
    minAge: 0,
    maxAge: 25,
    centre: "",
    standardofEducation: "",
    minSSC: "",
    maxSSC: "",
    minHSC: "",
    maxHSC: "",
  });

  /* ---------- FETCH CENTRES ---------- */
  useEffect(() => {
    axios
      .get(CENTRE_API)
      .then((res) => setCentres(res.data.data || []))
      .catch((err) => console.error("Vault: Failed to fetch centres", err));

    fetchChildren(filters);
  }, []);

  /* ---------- FETCH CHILDREN ---------- */
  const fetchChildren = async (activeFilters = filters) => {
    try {
      setLoading(true);
      const params = Object.fromEntries(
        Object.entries(activeFilters).filter(([, v]) => v !== "" && v !== null),
      );

      const res = await axios.get(API_URL, { params });
      setChildren(res.data.data || []);
    } catch (err) {
      console.error("Vault fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "standardofEducation" &&
        value !== "SSC" && { minSSC: "", maxSSC: "" }),
      ...(name === "standardofEducation" &&
        value !== "HSC" && { minHSC: "", maxHSC: "" }),
    }));
  };

  const handleAgeRangeChange = (_, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minAge: newValue[0],
      maxAge: newValue[1],
    }));
  };

  const removeFilter = (key) => {
    let updated = { ...filters };
    if (key === "age") {
      updated.minAge = 0;
      updated.maxAge = 25;
    } else {
      updated[key] = "";
    }

    if (key === "standardofEducation") {
      updated.minSSC = "";
      updated.maxSSC = "";
      updated.minHSC = "";
      updated.maxHSC = "";
    }

    setFilters(updated);
    fetchChildren(updated);
  };

  const handleOpenImage = (path) => {
    // Extra safety check
    if (!path || path.startsWith("No ")) return;

    const fullUrl = path.startsWith("http") ? path : `${BASE_URL}/${path}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  /* ---------- TABLE COLUMNS ---------- */
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorFn: (row) => row.centre?.centreName || "N/A",
        id: "centre",
        header: "Centre",
      },
      { accessorKey: "standardofEducation", header: "Standard" },
      {
        header: "Age",
        accessorFn: (row) => calculateAge(row.dob),
        id: "age",
      },
      {
        header: "Aadhaar",
        id: "aadhaar",
        Cell: ({ row }) => {
          const path = row.original.aadharCardImage;
          const hasDoc = path && !path.startsWith("No ");
          return (
            <button
              type="button"
              className={`open-btn ${!hasDoc ? "disabled-btn" : ""}`}
              disabled={!hasDoc}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenImage(path);
              }}
            >
              {hasDoc ? "Open" : "—"}
            </button>
          );
        },
      },
      {
        header: "Child Image",
        id: "childImage",
        Cell: ({ row }) => {
          const path = row.original.childrenImage;
          const hasDoc = path && !path.startsWith("No ");
          return (
            <button
              type="button"
              className={`open-btn ${!hasDoc ? "disabled-btn" : ""}`}
              disabled={!hasDoc}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenImage(path);
              }}
            >
              {hasDoc ? "Open" : "—"}
            </button>
          );
        },
      },
    ],
    [centres],
  );

  return (
    <div className="children-filter-wrapper">
      <aside className="filter-panel">
        <h3>Vault Filters</h3>

        <label>Gender</label>
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">None</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>
          Age Range: {filters.minAge} – {filters.maxAge}
        </label>
        <Slider
          value={[filters.minAge, filters.maxAge]}
          onChange={handleAgeRangeChange}
          min={0}
          max={25}
          valueLabelDisplay="auto"
        />

        <label>Centre</label>
        <select name="centre" value={filters.centre} onChange={handleChange}>
          <option value="">None</option>
          {centres.map((c) => (
            <option key={c._id} value={c._id}>
              {c.centreName}
            </option>
          ))}
        </select>

        <label>Standard</label>
        <select
          name="standardofEducation"
          value={filters.standardofEducation}
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="SSC">SSC</option>
          <option value="HSC">HSC</option>
        </select>

        {filters.standardofEducation === "SSC" && (
          <div className="marks-filter-group">
            <label>SSC Marks (%)</label>
            <div className="age-row">
              <input
                type="number"
                name="minSSC"
                placeholder="Min"
                value={filters.minSSC}
                onChange={handleChange}
              />
              <input
                type="number"
                name="maxSSC"
                placeholder="Max"
                value={filters.maxSSC}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {filters.standardofEducation === "HSC" && (
          <div className="marks-filter-group">
            <label>HSC Marks (%)</label>
            <div className="age-row">
              <input
                type="number"
                name="minHSC"
                placeholder="Min"
                value={filters.minHSC}
                onChange={handleChange}
              />
              <input
                type="number"
                name="maxHSC"
                placeholder="Max"
                value={filters.maxHSC}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <button className="apply-btn" onClick={() => fetchChildren(filters)}>
          Apply Filters
        </button>
      </aside>

      <main className="results-panel">
        <div className="results-header">
          <h2>Vault</h2>
        </div>

        <div className="active-filters">
          {filters.gender && (
            <div className="filter-chip">
              Gender: {filters.gender}{" "}
              <span onClick={() => removeFilter("gender")}>×</span>
            </div>
          )}
          {(filters.minAge !== 0 || filters.maxAge !== 25) && (
            <div className="filter-chip">
              Age: {filters.minAge}–{filters.maxAge}{" "}
              <span onClick={() => removeFilter("age")}>×</span>
            </div>
          )}
          {filters.centre && (
            <div className="filter-chip">
              Centre:{" "}
              {centres.find((c) => c._id === filters.centre)?.centreName}
              <span onClick={() => removeFilter("centre")}>×</span>
            </div>
          )}
          {filters.standardofEducation && (
            <div className="filter-chip">
              Std: {filters.standardofEducation}{" "}
              <span onClick={() => removeFilter("standardofEducation")}>×</span>
            </div>
          )}
        </div>

        <MaterialReactTable
          columns={columns}
          data={children}
          state={{ isLoading: loading }}
          enableSorting
          enableGlobalFilter
        />
      </main>
    </div>
  );
}

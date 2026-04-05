import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { MenuItem } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import "./ChildrenFilterPage.css";

const API_URL = "http://localhost:8000/api/filterchildren/filter";
const CENTRE_API = "http://localhost:8000/api/centre/allcentre";

/* ---------- helper to calculate age ---------- */
const calculateAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function ChildrenFilterPage() {
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

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
      .catch((err) => console.error("Failed to fetch centres", err));
  }, []);

  /* ---------- FETCH CHILDREN (ACCEPT FILTERS) ---------- */
  const fetchChildren = async (activeFilters = filters) => {
    try {
      setLoading(true);

      const params = Object.fromEntries(
        Object.entries(activeFilters).filter(([, v]) => v !== "" && v !== null),
      );

      const res = await axios.get(API_URL, { params });
      setChildren(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch children", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren(filters);
  }, []); // initial load only

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "standardofEducation" &&
        value !== "SSC" && {
          minSSC: "",
          maxSSC: "",
        }),

      ...(name === "standardofEducation" &&
        value !== "HSC" && {
          minHSC: "",
          maxHSC: "",
        }),
    }));
  };

  const handleAgeRangeChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minAge: newValue[0],
      maxAge: newValue[1],
    }));
  };

  /* ---------- REMOVE SINGLE FILTER (FIXED) ---------- */
  const removeFilter = (key) => {
    let updatedFilters = { ...filters };

    if (key === "age") {
      updatedFilters.minAge = 0;
      updatedFilters.maxAge = 25;
    } else {
      updatedFilters[key] = "";
    }

    if (key === "standardofEducation") {
      updatedFilters.minSSC = "";
      updatedFilters.maxSSC = "";
      updatedFilters.minHSC = "";
      updatedFilters.maxHSC = "";
    }

    setFilters(updatedFilters);
    fetchChildren(updatedFilters); // ✅ FETCH WITH UPDATED FILTERS
  };

  /* ---------- TABLE COLUMNS ---------- */
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "gender", header: "Gender" },
      {
        header: "Age",
        id: "age",
        accessorFn: (row) => calculateAge(row.dob),
        sortingFn: "basic",
      },
      {
        accessorFn: (row) => row.centre?.centreName || "",
        id: "centreName",
        header: "Centre",
      },
      {
        accessorKey: "standardofEducation",
        header: "Standard",
      },
    ],
    [],
  );

  return (
    <div className="children-filter-wrapper">
      {/* FILTER PANEL */}
      <aside className="filter-panel">
        <h3>Filters</h3>

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
          valueLabelDisplay="auto"
          min={0}
          max={25}
          step={1}
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
          <>
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
          </>
        )}

        {filters.standardofEducation === "HSC" && (
          <>
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
          </>
        )}

        <button className="apply-btn" onClick={() => fetchChildren(filters)}>
          Apply Filters
        </button>
      </aside>

      {/* RESULTS */}
      <main className="results-panel">
        <div className="results-header">
          <h2>Children</h2>
          <button
            className="add-btn"
            onClick={() => navigate("/dashboard/childrenfilter/children")}
          >
            + Add Child
          </button>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        <div className="active-filters">
          {filters.gender && (
            <div className="filter-chip">
              Gender: {filters.gender}
              <span onClick={() => removeFilter("gender")}>×</span>
            </div>
          )}

          {(filters.minAge !== 0 || filters.maxAge !== 25) && (
            <div className="filter-chip">
              Age: {filters.minAge}–{filters.maxAge}
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
              Standard: {filters.standardofEducation}
              <span onClick={() => removeFilter("standardofEducation")}>×</span>
            </div>
          )}

          {filters.minSSC && (
            <div className="filter-chip">
              SSC ≥ {filters.minSSC}
              <span onClick={() => removeFilter("minSSC")}>×</span>
            </div>
          )}

          {filters.maxSSC && (
            <div className="filter-chip">
              SSC ≤ {filters.maxSSC}
              <span onClick={() => removeFilter("maxSSC")}>×</span>
            </div>
          )}

          {filters.minHSC && (
            <div className="filter-chip">
              HSC ≥ {filters.minHSC}
              <span onClick={() => removeFilter("minHSC")}>×</span>
            </div>
          )}

          {filters.maxHSC && (
            <div className="filter-chip">
              HSC ≤ {filters.maxHSC}
              <span onClick={() => removeFilter("maxHSC")}>×</span>
            </div>
          )}
        </div>

        <MaterialReactTable
          columns={columns}
          data={children}
          getRowId={(row) => row._id}
          state={{ isLoading: loading }}
          enableSorting
          enableGlobalFilter
          enablePagination={!isPrinting}
          enableRowActions
          positionActionsColumn="last"
          initialState={{ sorting: [{ id: "age", desc: true }] }}
          renderRowActionMenuItems={({ row }) => [
            <MenuItem
              key="view"
              onClick={() =>
                navigate(
                  `/dashboard/childrenfilter?mode=view&id=${row.original._id}`,
                )
              }
            >
              View
            </MenuItem>,
            <MenuItem
              key="edit"
              onClick={() =>
                navigate(
                  `/dashboard/childrenfilter?mode=edit&id=${row.original._id}`,
                )
              }
            >
              Edit
            </MenuItem>,
          ]}
        />
      </main>
    </div>
  );
}

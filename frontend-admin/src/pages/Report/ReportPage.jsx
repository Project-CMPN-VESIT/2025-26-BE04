import React, { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

const ReportPage = () => {
  const [year, setYear] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef();

  const fetchReport = async () => {
    if (!year) return;

    setLoading(true);
    setMarkdown("");
    setRawData(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/report/yearly/${year}`
      );

      if (response.data?.report) {
        setMarkdown(response.data.report.markdown || "");
        setRawData(response.data.report.rawData || null);
      } else {
        setMarkdown("No report found for this year.");
      }
    } catch (error) {
      console.error(error);
      setMarkdown("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 2
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Annual-Report-${year}.pdf`);
  };

  return (
    <div style={{ padding: "2rem", background: "#f3f4f6", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          maxWidth: "1200px",
          margin: "0 auto 2rem auto"
        }}
      >
        <h2 style={{ fontWeight: 700, color: "#111827", fontSize: "1.875rem", margin: 0 }}>Yearly Analytics Report</h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <input
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
            }}
          />

          <button
            onClick={fetchReport}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#9ca3af" : "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "background-color 0.2s"
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {markdown && (
            <button
              onClick={downloadReport}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#111827",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem"
              }}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {!markdown && !loading && (
          <div
            style={{
              padding: "60px 40px",
              background: "white",
              borderRadius: "16px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.125rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          >
            <svg style={{ width: "48px", height: "48px", margin: "0 auto 16px auto", color: "#9ca3af" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Enter a year above to generate and view the analytics report.</p>
          </div>
        )}

        {/* Main Content Wrapper for PDF */}
        <div ref={reportRef} style={{ background: "#f3f4f6", padding: "10px" }}>
          
          {/* Enhanced Markdown Insights Card */}
          {markdown && !loading && (
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                marginBottom: "40px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                borderTop: "6px solid #4f46e5"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
                <span style={{ fontSize: "1.75rem" }}>📊</span>
                <h2 style={{ margin: 0, color: "#111827", fontSize: "1.5rem" }}>AI Insights & Performance Report</h2>
              </div>
              
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => <h1 style={{ fontSize: "1.875rem", color: "#111827", borderBottom: "2px solid #e5e7eb", paddingBottom: "12px", marginTop: "32px", marginBottom: "16px", fontWeight: 700 }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ fontSize: "1.5rem", color: "#1f2937", marginTop: "32px", marginBottom: "16px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={{ fontSize: "1.25rem", color: "#374151", marginTop: "24px", marginBottom: "12px", fontWeight: 600, borderLeft: "4px solid #4f46e5", paddingLeft: "12px" }} {...props} />,
                    p: ({ node, ...props }) => <p style={{ color: "#4b5563", lineHeight: "1.7", fontSize: "1.05rem", marginBottom: "16px" }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ listStyleType: "none", paddingLeft: "0", marginBottom: "24px" }} {...props} />,
                    li: ({ node, ...props }) => (
                      <li style={{ position: "relative", paddingLeft: "24px", marginBottom: "10px", color: "#4b5563", lineHeight: "1.6" }} {...props}>
                        <span style={{ position: "absolute", left: 0, top: "-1px", color: "#4f46e5", fontSize: "1.2rem" }}>•</span>
                        {props.children}
                      </li>
                    ),
                    strong: ({ node, ...props }) => <strong style={{ color: "#111827", fontWeight: 600 }} {...props} />,
                    table: ({ node, ...props }) => (
                      <div style={{ overflowX: "auto", marginBottom: "24px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }} {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }} {...props} />,
                    th: ({ node, ...props }) => <th style={{ padding: "12px 16px", color: "#374151", fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }} {...props} />,
                    td: ({ node, ...props }) => <td style={{ padding: "12px 16px", color: "#4b5563", borderBottom: "1px solid #e5e7eb", fontSize: "0.95rem" }} {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote style={{ borderLeft: "4px solid #f59e0b", background: "#fffbeb", padding: "16px", margin: "0 0 24px 0", borderRadius: "0 8px 8px 0", color: "#92400e" }} {...props} />
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Charts Section */}
          {rawData && !loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
              {/* Financial Chart */}
              <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
                <h3 style={{ margin: "0 0 20px 0", color: "#111827" }}>Financial Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Total Donations", value: rawData.financials.totalDonations },
                      { name: "Net Received", value: rawData.financials.netAmountReceived },
                      { name: "Gateway Deductions", value: rawData.financials.totalGatewayDeduction }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {[
                        rawData.financials.totalDonations,
                        rawData.financials.netAmountReceived,
                        rawData.financials.totalGatewayDeduction
                      ].map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Children Pie */}
              <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
                <h3 style={{ margin: "0 0 20px 0", color: "#111827" }}>Children Statistics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Active", value: rawData.childrenStats.activeChildren },
                        { name: "Joined", value: rawData.childrenStats.childrenJoined },
                        { name: "Left", value: rawData.childrenStats.childrenLeft }
                      ]}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={index} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Centre Performance */}
              <div style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", gridColumn: "1 / -1" }}>
                <h3 style={{ margin: "0 0 20px 0", color: "#111827" }}>Centre Capacity vs Occupancy</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { name: "Capacity", value: rawData.centreStats.totalCapacity },
                      { name: "Occupancy", value: rawData.centreStats.totalOccupancy }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      strokeWidth={4}
                      dot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
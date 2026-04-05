// import { generateYearlyReport } from "../services/reportService.js";

export const getYearlyReport = async (req, res) => {
  const { year } = req.params;

  // const report = await generateYearlyReport(year);

  res.json({ year, message: "Report generation logic is under development." });
};